import "server-only";
import type { Trace } from "./trace";
import type {
  Check,
  EvaluatedKeyResult,
  EvaluatedObjective,
  ObjectiveInput,
  Score,
  Structure,
  Synthesis,
  Trap,
} from "./types";

const SCORES: readonly Score[] = ["calibrated", "needs_work", "off_target"];

export const TRAP_DEFS: ReadonlyArray<{ key: string; label: string }> = [
  { key: "not_ambitious_or_bau", label: "Not ambitious / BAU" },
  { key: "task_list_not_okr", label: "Task list, not OKRs" },
  { key: "compulsive_cascading", label: "Compulsive cascading" },
  { key: "performance_management_risk", label: "Performance-management risk" },
];

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function asBool(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function recomputeScore(checks: Check[]): Score {
  if (!checks.length) return "needs_work";
  const passCount = checks.filter((c) => c.pass).length;
  if (passCount === checks.length) return "calibrated";
  if (passCount >= Math.ceil(checks.length / 2)) return "needs_work";
  return "off_target";
}

function normalizeChecks(value: unknown): Check[] {
  return asArray(value)
    .map((raw) => {
      const r = asRecord(raw);
      const label = asString(r.label);
      if (!label) return null;
      return { label, pass: asBool(r.pass), note: asString(r.note) };
    })
    .filter((c): c is Check => c !== null);
}

function normalizeScore(value: unknown, checks: Check[]): Score {
  return SCORES.includes(value as Score) ? (value as Score) : recomputeScore(checks);
}

export function normalizeStructure(raw: unknown, trace: Trace): Structure {
  const r = asRecord(raw);
  const objectives: ObjectiveInput[] = asArray(r.objectives)
    .map((rawObj, i) => {
      const o = asRecord(rawObj);
      const text = asString(o.text);
      if (!text) return null;
      const keyResults = asArray(o.key_results)
        .map((rawKr, j) => {
          const kr = asRecord(rawKr);
          const krText = asString(kr.text);
          if (!krText) return null;
          return { tag: asString(kr.tag, `KR${j + 1}`), text: krText };
        })
        .filter((kr): kr is { tag: string; text: string } => kr !== null);
      return {
        tag: asString(o.tag, `O${i + 1}`),
        text,
        has_explicit_krs: asBool(o.has_explicit_krs, keyResults.length > 0),
        key_results: keyResults,
        candidate_items: asArray(o.candidate_items).map((c) => asString(c)).filter(Boolean),
      };
    })
    .filter((o): o is ObjectiveInput => o !== null);

  const dropped = asArray(r.objectives).length - objectives.length;
  if (dropped > 0) {
    trace.warn("structure", "objectives_dropped_by_normalization", { dropped });
  }

  return {
    section_title: asString(r.section_title, "Section"),
    error: asString(r.error) || undefined,
    objectives,
  };
}

export function normalizeEvaluatedObjective(
  raw: unknown,
  input: ObjectiveInput,
  trace: Trace
): EvaluatedObjective {
  const r = asRecord(raw);
  const checks = normalizeChecks(r.checks);

  const keyResults: EvaluatedKeyResult[] = asArray(r.key_results)
    .map((rawKr, j) => {
      const kr = asRecord(rawKr);
      const krChecks = normalizeChecks(kr.checks);
      const text = asString(kr.text, input.key_results[j]?.text ?? "");
      if (!text) return null;
      return {
        tag: asString(kr.tag, input.key_results[j]?.tag ?? `KR${j + 1}`),
        text,
        score: normalizeScore(kr.score, krChecks),
        checks: krChecks,
        rewrite_suggestion: asString(kr.rewrite_suggestion),
      };
    })
    .filter((kr): kr is EvaluatedKeyResult => kr !== null);

  // The model skipped KRs the input clearly had — surface them as unscored rather
  // than silently vanishing from the report.
  if (input.key_results.length > 0 && keyResults.length < input.key_results.length) {
    trace.warn("evaluate", "key_results_missing_from_evaluation", {
      objective: input.tag,
      expected: input.key_results.length,
      received: keyResults.length,
    });
    const covered = new Set(keyResults.map((kr) => kr.tag));
    input.key_results
      .filter((kr) => !covered.has(kr.tag))
      .forEach((kr) => {
        keyResults.push({
          tag: kr.tag,
          text: kr.text,
          score: "needs_work",
          checks: [
            {
              label: "Evaluation",
              pass: false,
              note: "This KR wasn't scored on this run — re-run the diagnostic to score it.",
            },
          ],
          rewrite_suggestion: "",
        });
      });
  }

  return {
    tag: asString(r.tag, input.tag),
    text: asString(r.text, input.text),
    has_explicit_krs: input.has_explicit_krs,
    score: normalizeScore(r.score, checks),
    checks,
    rewrite_suggestion: asString(r.rewrite_suggestion),
    key_results: keyResults,
  };
}

export function normalizeSynthesis(raw: unknown, objectiveCount: number, trace: Trace): Synthesis {
  const r = asRecord(raw);

  const rawTraps = asArray(r.traps).map(asRecord);
  const traps: Trap[] = TRAP_DEFS.map((def) => {
    const found = rawTraps.find((t) => asString(t.key) === def.key);
    if (!found) trace.warn("synthesis", "trap_missing_from_output", { key: def.key });
    return {
      key: def.key,
      label: def.label,
      detected: asBool(found?.detected),
      evidence: asString(found?.evidence),
    };
  });

  return {
    structure_note: asString(r.structure_note),
    within_max_5:
      typeof r.within_max_5 === "boolean" ? r.within_max_5 : objectiveCount <= 5,
    traps,
    top_recommendations: asArray(r.top_recommendations)
      .map((rec) => asString(rec))
      .filter(Boolean)
      .slice(0, 4),
  };
}

export type LeniencyVerdict = {
  id: string;
  verdict: "uphold" | "overturn" | "soften";
  note: string;
};

export function normalizeLeniencyVerdicts(raw: unknown): LeniencyVerdict[] {
  const r = asRecord(raw);
  return asArray(r.verdicts)
    .map((rawV) => {
      const v = asRecord(rawV);
      const id = asString(v.id);
      const verdict = asString(v.verdict);
      if (!id || !["uphold", "overturn", "soften"].includes(verdict)) return null;
      return { id, verdict: verdict as LeniencyVerdict["verdict"], note: asString(v.note) };
    })
    .filter((v): v is LeniencyVerdict => v !== null);
}
