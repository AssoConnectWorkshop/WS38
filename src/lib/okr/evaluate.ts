import "server-only";
import {
  callClaudeText,
  callClaudeTool,
  parseJsonArrayLoose,
  parseJsonLoose,
  parseWithRetry,
  runWithConcurrency,
} from "./claude";
import {
  buildEvalPrompt,
  buildLeniencyPrompt,
  buildStructurePrompt,
  buildSynthesisPrompt,
  STRUCTURE_TOOL,
  type FailedCheckItem,
} from "./prompts";
import { OKR_GUIDELINES } from "./guidelines";
import type {
  Check,
  DiagnosticResult,
  EvaluatedObjective,
  LeniencyStats,
  Structure,
  Synthesis,
} from "./types";

export class OkrDiagnosticError extends Error {}

type MutableCheck = Check & { _touched?: boolean };

type LeniencyVerdict = {
  id: string;
  verdict: "uphold" | "overturn" | "soften";
  note?: string;
};

type OnProgress = (message: string) => void;

export async function runOkrDiagnostic(
  rawText: string,
  onProgress: OnProgress = () => {}
): Promise<DiagnosticResult> {
  const text = rawText.trim();
  if (!text) {
    throw new OkrDiagnosticError("Paste a team's OKR section first.");
  }

  onProgress("Reading the section…");
  const structure = await callClaudeTool<Structure>(buildStructurePrompt(text), STRUCTURE_TOOL);

  if (structure.error) {
    throw new OkrDiagnosticError(
      `Couldn't read that section: ${structure.error}. Check the pasted text includes a team's objectives and key results.`
    );
  }

  const objectives = structure.objectives ?? [];
  if (!objectives.length) {
    throw new OkrDiagnosticError(
      "Couldn't find any Objectives in the pasted text. Make sure it includes a team's objectives and their key results."
    );
  }

  onProgress(`Scoring ${objectives.length} objective${objectives.length === 1 ? "" : "s"}…`);
  const evaluated = await runWithConcurrency(objectives, 2, async (objective) => {
    const raw = await callClaudeText(buildEvalPrompt(objective, OKR_GUIDELINES));
    return parseWithRetry(raw, (t) => parseJsonLoose<EvaluatedObjective>(t));
  });

  onProgress("Double-checking we're not being too harsh…");
  const leniency = await reviewForOverreach(evaluated);

  onProgress("Compiling recommendations…");
  const synthText = await callClaudeText(
    buildSynthesisPrompt(structure.section_title || "Section", evaluated, OKR_GUIDELINES)
  );
  const synth = await parseWithRetry(synthText, (t) => parseJsonLoose<Synthesis>(t));

  return {
    section_title: structure.section_title || "Section",
    objective_count: evaluated.length,
    structure_note: synth.structure_note,
    within_max_5: synth.within_max_5,
    traps: synth.traps ?? [],
    objectives: evaluated,
    top_recommendations: synth.top_recommendations ?? [],
    leniency,
  };
}

// Gathers every failed check across all Objectives/KRs, with a stable id and a live
// reference back into the evaluated data so verdicts can be applied in place.
function collectFailedChecks(
  evaluated: EvaluatedObjective[]
): Array<FailedCheckItem & { ref: MutableCheck }> {
  const items: Array<FailedCheckItem & { ref: MutableCheck }> = [];
  evaluated.forEach((obj) => {
    (obj.checks ?? []).forEach((c) => {
      if (!c.pass) {
        items.push({
          id: `${obj.tag}::obj::${c.label}`,
          level: "Objective",
          tag: obj.tag,
          label: c.label,
          text: obj.text,
          note: c.note,
          ref: c,
        });
      }
    });
    (obj.key_results ?? []).forEach((kr) => {
      (kr.checks ?? []).forEach((c) => {
        if (!c.pass) {
          items.push({
            id: `${obj.tag}::${kr.tag}::${c.label}`,
            level: "Key Result",
            tag: `${obj.tag}/${kr.tag}`,
            label: c.label,
            text: kr.text,
            note: c.note,
            ref: c,
          });
        }
      });
    });
  });
  return items;
}

function recomputeScore(checks: Check[] | undefined): EvaluatedObjective["score"] {
  if (!checks || !checks.length) return "needs_work";
  const passCount = checks.filter((c) => c.pass).length;
  if (passCount === checks.length) return "calibrated";
  if (passCount >= Math.ceil(checks.length / 2)) return "needs_work";
  return "off_target";
}

// Runs the leniency review in small batches (in case there are many failed checks) and
// applies the verdicts back onto the evaluated Objectives/KRs, recomputing scores as needed.
async function reviewForOverreach(evaluated: EvaluatedObjective[]): Promise<LeniencyStats> {
  const flagged = collectFailedChecks(evaluated);
  if (!flagged.length) return { overturned: 0, softened: 0 };

  const chunkSize = 10;
  const chunks: Array<typeof flagged> = [];
  for (let i = 0; i < flagged.length; i += chunkSize) chunks.push(flagged.slice(i, i + chunkSize));

  const verdictLists = await runWithConcurrency(chunks, 2, async (chunk) => {
    try {
      const raw = await callClaudeText(buildLeniencyPrompt(OKR_GUIDELINES, chunk));
      return await parseWithRetry(raw, (t) => parseJsonArrayLoose<LeniencyVerdict[]>(t));
    } catch {
      // if a batch fails, leave those checks as first-pass decided rather than blocking the whole run
      return [] as LeniencyVerdict[];
    }
  });

  const verdictMap = new Map<string, LeniencyVerdict>();
  verdictLists.flat().forEach((v) => {
    if (v && v.id) verdictMap.set(v.id, v);
  });

  let overturned = 0;
  let softened = 0;
  flagged.forEach((item) => {
    const v = verdictMap.get(item.id);
    if (!v) return;
    if (v.verdict === "overturn") {
      item.ref.pass = true;
      item.ref.note = v.note || item.ref.note;
      item.ref._touched = true;
      overturned++;
    } else if (v.verdict === "soften") {
      item.ref.note = v.note || item.ref.note;
      item.ref._touched = true;
      softened++;
    } else if (v.note) {
      item.ref.note = v.note;
    }
  });

  // Recompute scores AND rewrite_suggestion, so a suggestion never survives after the check
  // that justified it gets overturned or softened — that mismatch is exactly what looked broken.
  evaluated.forEach((obj) => {
    obj.score = recomputeScore(obj.checks);
    const objTouched = (obj.checks ?? []).some((c) => (c as MutableCheck)._touched);
    if (obj.score === "calibrated") {
      obj.rewrite_suggestion = "";
    } else if (objTouched) {
      obj.rewrite_suggestion = (obj.checks ?? [])
        .filter((c) => !c.pass)
        .map((c) => c.note)
        .join(" ");
    }
    (obj.key_results ?? []).forEach((kr) => {
      kr.score = recomputeScore(kr.checks);
      const krTouched = (kr.checks ?? []).some((c) => (c as MutableCheck)._touched);
      if (kr.score === "calibrated") {
        kr.rewrite_suggestion = "";
      } else if (krTouched) {
        kr.rewrite_suggestion = (kr.checks ?? [])
          .filter((c) => !c.pass)
          .map((c) => c.note)
          .join(" ");
      }
    });
    (obj.checks ?? []).forEach((c) => delete (c as MutableCheck)._touched);
    (obj.key_results ?? []).forEach((kr) => (kr.checks ?? []).forEach((c) => delete (c as MutableCheck)._touched));
  });

  return { overturned, softened };
}
