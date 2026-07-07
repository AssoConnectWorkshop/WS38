import "server-only";
import { callClaudeTool, OkrStageError, runWithConcurrency } from "./claude";
import { OKR_GUIDELINES } from "./guidelines";
import {
  normalizeEvaluatedObjective,
  normalizeLeniencyVerdicts,
  normalizeStructure,
  normalizeSynthesis,
  recomputeScore,
  type LeniencyVerdict,
} from "./normalize";
import {
  buildEvalPrompt,
  buildLeniencyPrompt,
  buildStructurePrompt,
  buildSynthesisPrompt,
  EVAL_TOOL,
  LENIENCY_TOOL,
  STRUCTURE_TOOL,
  SYNTHESIS_TOOL,
  type FailedCheckItem,
} from "./prompts";
import { Trace, describeError } from "./trace";
import type {
  Check,
  DiagnosticResult,
  EvaluatedObjective,
  LeniencyStats,
  ObjectiveInput,
  Synthesis,
} from "./types";

// User-facing errors (bad input, empty section) — safe to show verbatim.
export class OkrDiagnosticError extends Error {}

const MAX_INPUT_CHARS = 60_000;
// Cost/latency guard. The guideline itself says max 5 objectives per team; far
// beyond that, the paste is almost certainly more than one team's section.
const MAX_OBJECTIVES = 10;
const EVAL_CONCURRENCY = 2;

type OnProgress = (message: string) => void;

export async function runOkrDiagnostic(
  rawText: string,
  trace: Trace,
  onProgress: OnProgress = () => {}
): Promise<DiagnosticResult> {
  const warnings: string[] = [];
  const text = rawText.trim();

  trace.info("pipeline", "start", { input_chars: text.length });

  if (!text) {
    throw new OkrDiagnosticError("Paste a team's OKR section first.");
  }
  if (text.length > MAX_INPUT_CHARS) {
    throw new OkrDiagnosticError(
      `That paste is very large (${text.length.toLocaleString()} characters — the limit is ${MAX_INPUT_CHARS.toLocaleString()}). Paste one team's OKR section at a time.`
    );
  }

  // Stage 1: structure extraction (forced tool call → validated JSON).
  onProgress("Reading the section…");
  const structureRaw = await callClaudeTool<unknown>(buildStructurePrompt(text), STRUCTURE_TOOL, {
    stage: "structure",
    trace,
    maxTokens: 4000,
  });
  const structure = normalizeStructure(structureRaw, trace);

  if (structure.error) {
    trace.info("structure", "model_reported_error", { error: structure.error });
    throw new OkrDiagnosticError(
      `Couldn't read that section: ${structure.error}. Check the pasted text includes a team's objectives and key results.`
    );
  }

  let objectives = structure.objectives;
  if (!objectives.length) {
    throw new OkrDiagnosticError(
      "Couldn't find any Objectives in the pasted text. Make sure it includes a team's objectives and their key results."
    );
  }
  if (objectives.length > MAX_OBJECTIVES) {
    trace.warn("structure", "objectives_capped", {
      found: objectives.length,
      cap: MAX_OBJECTIVES,
    });
    warnings.push(
      `Found ${objectives.length} objectives — only the first ${MAX_OBJECTIVES} were scored. Paste one team's section at a time.`
    );
    objectives = objectives.slice(0, MAX_OBJECTIVES);
  }
  trace.info("structure", "extracted", {
    section_title: structure.section_title,
    objectives: objectives.length,
    key_results: objectives.reduce((n, o) => n + o.key_results.length, 0),
  });

  // Stage 2: per-objective evaluation. One failing objective degrades to a
  // placeholder + warning instead of killing the whole run — unless ALL fail.
  onProgress(`Scoring ${objectives.length} objective${objectives.length === 1 ? "" : "s"}…`);
  let evalFailures = 0;
  let lastEvalError: unknown = null;
  const evaluated = await runWithConcurrency(objectives, EVAL_CONCURRENCY, async (objective) => {
    try {
      const raw = await callClaudeTool<unknown>(buildEvalPrompt(objective, OKR_GUIDELINES), EVAL_TOOL, {
        stage: `evaluate:${objective.tag}`,
        trace,
        maxTokens: 6000,
      });
      return normalizeEvaluatedObjective(raw, objective, trace);
    } catch (err) {
      evalFailures++;
      lastEvalError = err;
      trace.error("evaluate", "objective_failed", {
        objective: objective.tag,
        error: describeError(err),
      });
      warnings.push(`${objective.tag} couldn't be scored on this run — re-run the diagnostic.`);
      return unscoredPlaceholder(objective);
    }
  });

  if (evalFailures === objectives.length) {
    // Nothing was actually scored — a page of placeholders would be misleading.
    throw lastEvalError instanceof OkrStageError
      ? lastEvalError
      : new OkrStageError("evaluate", describeError(lastEvalError), lastEvalError);
  }

  // Stage 2.5: leniency review — protects trust in the tool, but is never worth
  // failing the run over. Any error here degrades to "no adjustments".
  onProgress("Double-checking we're not being too harsh…");
  let leniency: LeniencyStats = { overturned: 0, softened: 0 };
  try {
    leniency = await reviewForOverreach(evaluated, trace);
  } catch (err) {
    trace.error("leniency", "pass_failed", { error: describeError(err) });
    warnings.push("The leniency review pass failed — scores shown are the strict first pass.");
  }

  // Stage 3: section-level synthesis. Degrades to a locally-computed fallback.
  onProgress("Compiling recommendations…");
  let synthesis: Synthesis;
  try {
    const synthesisRaw = await callClaudeTool<unknown>(
      buildSynthesisPrompt(structure.section_title, evaluated, OKR_GUIDELINES),
      SYNTHESIS_TOOL,
      { stage: "synthesis", trace, maxTokens: 3000 }
    );
    synthesis = normalizeSynthesis(synthesisRaw, evaluated.length, trace);
  } catch (err) {
    trace.error("synthesis", "failed_using_fallback", { error: describeError(err) });
    warnings.push("Trap detection and recommendations couldn't be generated on this run.");
    synthesis = fallbackSynthesis(evaluated);
  }

  const result: DiagnosticResult = {
    run_id: trace.runId,
    section_title: structure.section_title,
    objective_count: evaluated.length,
    structure_note: synthesis.structure_note,
    within_max_5: synthesis.within_max_5,
    traps: synthesis.traps,
    objectives: evaluated,
    top_recommendations: synthesis.top_recommendations,
    leniency,
    warnings,
  };

  trace.info("pipeline", "done", {
    total_ms: trace.elapsedMs(),
    objectives: evaluated.length,
    eval_failures: evalFailures,
    overturned: leniency.overturned,
    softened: leniency.softened,
    warnings: warnings.length,
  });

  return result;
}

function unscoredPlaceholder(input: ObjectiveInput): EvaluatedObjective {
  const failedCheck: Check = {
    label: "Evaluation",
    pass: false,
    note: "This couldn't be scored on this run — re-run the diagnostic.",
  };
  return {
    tag: input.tag,
    text: input.text,
    has_explicit_krs: input.has_explicit_krs,
    score: "needs_work",
    checks: [failedCheck],
    rewrite_suggestion: "",
    key_results: input.key_results.map((kr) => ({
      tag: kr.tag,
      text: kr.text,
      score: "needs_work",
      checks: [failedCheck],
      rewrite_suggestion: "",
    })),
  };
}

function fallbackSynthesis(objectives: EvaluatedObjective[]): Synthesis {
  const needingWork = objectives.filter((o) => o.score !== "calibrated").map((o) => o.tag);
  return {
    structure_note: `${objectives.length} objective${objectives.length === 1 ? "" : "s"} evaluated.`,
    within_max_5: objectives.length <= 5,
    traps: [],
    top_recommendations: needingWork.length
      ? [`Revisit ${needingWork.join(", ")} — see the failed checks above.`]
      : [],
  };
}

// ---------- Leniency review ----------

type MutableCheck = Check & { _touched?: boolean };

// Gathers every failed check across all Objectives/KRs, with a stable id and a live
// reference back into the evaluated data so verdicts can be applied in place.
function collectFailedChecks(
  evaluated: EvaluatedObjective[]
): Array<FailedCheckItem & { ref: MutableCheck }> {
  const items: Array<FailedCheckItem & { ref: MutableCheck }> = [];
  evaluated.forEach((obj) => {
    obj.checks.forEach((c) => {
      // Placeholder "Evaluation" checks come from our own failure path, not the model.
      if (!c.pass && c.label !== "Evaluation") {
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
    obj.key_results.forEach((kr) => {
      kr.checks.forEach((c) => {
        if (!c.pass && c.label !== "Evaluation") {
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

// Runs the leniency review in small batches (in case there are many failed checks) and
// applies the verdicts back onto the evaluated Objectives/KRs, recomputing scores as needed.
async function reviewForOverreach(
  evaluated: EvaluatedObjective[],
  trace: Trace
): Promise<LeniencyStats> {
  const flagged = collectFailedChecks(evaluated);
  trace.info("leniency", "start", { failed_checks: flagged.length });
  if (!flagged.length) return { overturned: 0, softened: 0 };

  const chunkSize = 10;
  const chunks: Array<typeof flagged> = [];
  for (let i = 0; i < flagged.length; i += chunkSize) chunks.push(flagged.slice(i, i + chunkSize));

  const verdictLists = await runWithConcurrency(chunks, 2, async (chunk, index) => {
    try {
      const raw = await callClaudeTool<unknown>(buildLeniencyPrompt(OKR_GUIDELINES, chunk), LENIENCY_TOOL, {
        stage: `leniency:batch${index + 1}`,
        trace,
        maxTokens: 4000,
      });
      return normalizeLeniencyVerdicts(raw);
    } catch (err) {
      // If a batch fails, leave those checks as first-pass decided rather than blocking the run.
      trace.warn("leniency", "batch_failed", { batch: index + 1, error: describeError(err) });
      return [] as LeniencyVerdict[];
    }
  });

  const verdictMap = new Map<string, LeniencyVerdict>();
  verdictLists.flat().forEach((v) => verdictMap.set(v.id, v));
  const unmatched = flagged.filter((item) => !verdictMap.has(item.id)).length;
  if (unmatched > 0) trace.warn("leniency", "verdicts_missing", { unmatched });

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
  // that justified it gets overturned or softened — that mismatch is exactly what looks broken.
  evaluated.forEach((obj) => {
    obj.score = recomputeScore(obj.checks);
    const objTouched = obj.checks.some((c) => (c as MutableCheck)._touched);
    if (obj.score === "calibrated") {
      obj.rewrite_suggestion = "";
    } else if (objTouched) {
      obj.rewrite_suggestion = obj.checks
        .filter((c) => !c.pass)
        .map((c) => c.note)
        .join(" ");
    }
    obj.key_results.forEach((kr) => {
      kr.score = recomputeScore(kr.checks);
      const krTouched = kr.checks.some((c) => (c as MutableCheck)._touched);
      if (kr.score === "calibrated") {
        kr.rewrite_suggestion = "";
      } else if (krTouched) {
        kr.rewrite_suggestion = kr.checks
          .filter((c) => !c.pass)
          .map((c) => c.note)
          .join(" ");
      }
    });
    obj.checks.forEach((c) => delete (c as MutableCheck)._touched);
    obj.key_results.forEach((kr) => kr.checks.forEach((c) => delete (c as MutableCheck)._touched));
  });

  trace.info("leniency", "done", { overturned, softened });
  return { overturned, softened };
}
