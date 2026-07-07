import Anthropic from "@anthropic-ai/sdk";
import type { EvaluatedObjective, ObjectiveInput } from "./types";

const CHECK_SCHEMA = {
  type: "object" as const,
  properties: {
    label: { type: "string" },
    pass: { type: "boolean" },
    note: { type: "string", description: "One short, specific sentence referencing the actual wording." },
  },
  required: ["label", "pass", "note"],
};

const SCORE_SCHEMA = {
  type: "string" as const,
  enum: ["calibrated", "needs_work", "off_target"],
};

// ---------- Stage 1: structure extraction ----------

export function buildStructurePrompt(pastedText: string): string {
  return `Below is one team's OKR section, pasted as plain text. Extract its structure faithfully — do not evaluate
it. Answer by calling the "report_structure" tool.

--- PASTED CONTENT START ---
${pastedText}
--- PASTED CONTENT END ---

Rules:
- Identify the Objectives and Key Results in this section. Trim every objective/KR text to under 20 words, keeping
  the verbatim wording (emojis may be dropped); do not translate or paraphrase.
- If an objective has no clearly-labeled Key Results (e.g. it's just a list of bullet initiatives, owner/area
  placeholders, or tasks), set has_explicit_krs to false, leave key_results empty, and put up to 5 of those bullets
  (trimmed to under 12 words each) in candidate_items. Do not invent Key Results that aren't there.
- Skip clearly-labeled draft/backlog/"old draft"/"won't do" sub-areas entirely.
- If the pasted content has no recognizable Objectives, call the tool with the error field set to a short reason.`;
}

export const STRUCTURE_TOOL: Anthropic.Tool = {
  name: "report_structure",
  description: "Report the extracted OKR structure of one team's section.",
  input_schema: {
    type: "object",
    properties: {
      section_title: { type: "string", description: "The team/section name, e.g. 'Marketing'." },
      error: { type: "string", description: "Set ONLY if no recognizable Objectives were found; a short reason." },
      objectives: {
        type: "array",
        items: {
          type: "object",
          properties: {
            tag: { type: "string", description: "O1, O2, ..." },
            text: { type: "string", description: "Verbatim objective text, trimmed under 20 words." },
            has_explicit_krs: { type: "boolean" },
            key_results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  tag: { type: "string", description: "KR1, KR2, ..." },
                  text: { type: "string", description: "Verbatim KR text, trimmed under 20 words." },
                },
                required: ["tag", "text"],
              },
            },
            candidate_items: {
              type: "array",
              items: { type: "string" },
              description: "Loose bullets when there are no explicit KRs; else empty.",
            },
          },
          required: ["tag", "text", "has_explicit_krs", "key_results", "candidate_items"],
        },
      },
    },
    required: ["section_title", "objectives"],
  },
};

// ---------- Stage 2: per-objective evaluation ----------

export function buildEvalPrompt(objective: ObjectiveInput, guidelines: string): string {
  const krLines = objective.key_results.length
    ? objective.key_results.map((k) => `- ${k.tag}: ${k.text}`).join("\n")
    : objective.candidate_items.length
      ? `(No explicit Key Results. Loose sub-items found:)\n` +
        objective.candidate_items.map((i) => `- ${i}`).join("\n")
      : "(No Key Results or sub-items found.)";

  return `Evaluate ONE Objective and its Key Results against these guidelines:

${guidelines}

Objective ${objective.tag}: ${objective.text}
Key Results:
${krLines}

Answer by calling the "report_evaluation" tool. Keep every note and rewrite_suggestion to one short, specific
sentence, referencing the actual wording above.

Requirements for the tool call:
- tag: "${objective.tag}"; text: the verbatim objective text above.
- The objective's checks must be exactly these three, in order: "Ambitious", "Achievable this quarter",
  "Simple / catchy".
- Each key result's checks must be exactly these four, in order: "Specific & time-bound",
  "Measurable & verifiable", "Outcome, not activity", "Aggressive yet realistic".
- rewrite_suggestion must be an empty string when the score is "calibrated".
- Include one key_results entry per KR listed above, with its exact tag and verbatim text. If there were no
  explicit Key Results, return key_results: [] and let the objective's checks/rewrite_suggestion note that KRs
  are missing.

Calibration note for "Outcome, not activity": a KR with a concrete, verifiable target already attached (a signup
count, revenue figure, % lift, churn rate, etc.) IS an outcome — pass this check. Do not fail a KR just because a
different downstream metric could theoretically be chosen (e.g. don't demand "activated users" instead of
"signups" when signups is a real, quantified result). A binary launch/ship milestone is ALSO a valid outcome even
without a number attached — e.g. "Ship the new onboarding flow" or "Blog live in Spain" are verifiable end-states,
not activities-in-progress. Pass this check for those; suggesting a paired follow-on metric is optional color for
the note, never a reason to fail. Only fail this check when the KR describes doing work with no verifiable
end-state at all — quantified or binary (e.g. "work on onboarding", "help the sales team", "consult with users").

Calibration note for "Aggressive yet realistic": a binary milestone that is itself a genuine stretch — a new build,
a first-time launch, entering a new market or country — already satisfies "aggressive." The stretch is in doing the
thing at all, not in whatever could theoretically be bolted onto it afterward. Do NOT suggest adding a publish
cadence, a traffic target, an adoption number, or any other follow-on metric to a binary KR "to clarify what done
ambitiously looks like" — that turns one clear, achievable KR into a bundle of KRs, which is scope creep, not rigor.
Only fail or flag this check when the milestone itself is trivially easy or genuinely business-as-usual for the
team (something they'd ship in the ordinary course of work, no stretch involved). "Build a blog system and take it
live in Spain" is aggressive on its face — do not ask for more.

Calibration note for "Simple / catchy" (Objective): the bar is that the team reading this, in its actual context —
this quarter, this season, this known campaign — pictures the same win. It is NOT that a stranger with zero context
could parse it in isolation. A punchy phrase anchored to a real, specific situation (a season, a campaign, a named
audience, a known moment) passes even without a number or a fully spelled-out mechanism — e.g. "We are extra
visible during the Back-to-School bump" names a concrete moment and a clear direction; that's enough. Only fail
this check when the phrase has NO anchor at all and could describe genuinely different goals depending on who
reads it (e.g. "Improve onboarding", "Be more efficient", "Optimize the funnel" — no season, no campaign, no
audience, nothing to picture). Do not fail or suggest a rewrite just because a more surgically precise version is
theoretically possible — that is a taste preference, not a guideline violation, and proposing "sharper" wording for
an already-clear, already-catchy Objective is exactly the over-nitpicking this tool must avoid.`;
}

export const EVAL_TOOL: Anthropic.Tool = {
  name: "report_evaluation",
  description: "Report the evaluation of one Objective and its Key Results.",
  input_schema: {
    type: "object",
    properties: {
      tag: { type: "string" },
      text: { type: "string", description: "Verbatim objective text." },
      score: SCORE_SCHEMA,
      checks: {
        type: "array",
        description:
          'Exactly three checks: "Ambitious", "Achievable this quarter", "Simple / catchy".',
        items: CHECK_SCHEMA,
      },
      rewrite_suggestion: {
        type: "string",
        description: "Empty string if score is calibrated.",
      },
      key_results: {
        type: "array",
        items: {
          type: "object",
          properties: {
            tag: { type: "string" },
            text: { type: "string", description: "Verbatim KR text." },
            score: SCORE_SCHEMA,
            checks: {
              type: "array",
              description:
                'Exactly four checks: "Specific & time-bound", "Measurable & verifiable", "Outcome, not activity", "Aggressive yet realistic".',
              items: CHECK_SCHEMA,
            },
            rewrite_suggestion: {
              type: "string",
              description: "Empty string if score is calibrated.",
            },
          },
          required: ["tag", "text", "score", "checks", "rewrite_suggestion"],
        },
      },
    },
    required: ["tag", "text", "score", "checks", "rewrite_suggestion", "key_results"],
  },
};

// ---------- Stage 3: leniency review ----------

export type FailedCheckItem = {
  id: string;
  level: "Objective" | "Key Result";
  tag: string;
  label: string;
  text: string;
  note: string;
};

export function buildLeniencyPrompt(guidelines: string, items: FailedCheckItem[]): string {
  const list = items
    .map(
      (it) =>
        `${it.id} | ${it.level} ${it.tag} | Check: "${it.label}" | Wording: "${it.text}" | First-pass note: "${it.note}"`
    )
    .join("\n");

  return `You are the second pass on an OKR evaluator. The first pass just failed some checks. Your only job is to
catch cases where the first pass was too strict — because if this tool nitpicks well-written OKRs, the Execs using
it will stop trusting it and stop using it. That failure mode is worse than letting a borderline item through.

The actual bar to apply is these guidelines — nothing stricter than this:
${guidelines}

Checks that FAILED in the first pass:
${list}

For each one, decide:
- "uphold" — a real, specific violation of the guidelines above. Keep it failed.
- "overturn" — the item actually satisfies the guideline; the first pass demanded a theoretically-better version,
  applied a stricter bar than the guidelines set, or was pedantic about wording rather than substance. Change to pass.
- "soften" — there's a real, small gap, but it reads as a should-fix suggestion rather than a blocking problem.
  Keep it failed, but rewrite the note as a light, constructive suggestion.

Default to "overturn" or "soften" over "uphold" whenever the item is already specific, measurable, and quarter-scoped
but the first pass wanted something more — that's a taste difference, not a guideline violation. This applies
equally to Objectives judged on "Simple / catchy": if the wording is anchored to a real, specific situation (a
season, a campaign, a named audience, a known moment) and the first pass merely wanted more surgically precise
phrasing, overturn it — a catchy phrase with a clear anchor is not ambiguous just because a stranger without
context might parse it differently. It also applies to KRs judged on "Aggressive yet realistic": if the KR is
already a binary milestone that's a genuine stretch (a new build, a first launch, a new market) and the first pass
wanted a bolted-on cadence or traffic number to make it feel more ambitious, overturn it — that ask is scope creep,
not a real guideline gap.

Answer by calling the "report_leniency_review" tool with one verdict per check listed above, using each id
exactly as given.`;
}

export const LENIENCY_TOOL: Anthropic.Tool = {
  name: "report_leniency_review",
  description: "Report the second-pass verdict for each failed check.",
  input_schema: {
    type: "object",
    properties: {
      verdicts: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string", description: "The exact id from the list, unchanged." },
            verdict: { type: "string", enum: ["uphold", "overturn", "soften"] },
            note: { type: "string", description: "Revised one-sentence note." },
          },
          required: ["id", "verdict", "note"],
        },
      },
    },
    required: ["verdicts"],
  },
};

// ---------- Stage 4: section-level synthesis ----------

export function buildSynthesisPrompt(
  sectionTitle: string,
  objectives: EvaluatedObjective[],
  guidelines: string
): string {
  const compact = objectives
    .map((o) => `${o.tag} [${o.score}${o.has_explicit_krs ? "" : ", no explicit KRs"}]: ${o.text}`)
    .join("\n");

  return `Section "${sectionTitle}" has these evaluated Objectives:
${compact}

Guidelines for the 4 classic traps:
${guidelines}

Answer by calling the "report_synthesis" tool:
- structure_note: one sentence on overall structure, e.g. objective/KR count vs guideline.
- within_max_5: ${objectives.length <= 5 ? "true" : "false"} (${objectives.length} objectives).
- traps: one entry per trap, using exactly these keys and labels:
  not_ambitious_or_bau ("Not ambitious / BAU"), task_list_not_okr ("Task list, not OKRs"),
  compulsive_cascading ("Compulsive cascading"), performance_management_risk ("Performance-management risk").
- top_recommendations: max 4 short, concrete, prioritized action items.`;
}

export const SYNTHESIS_TOOL: Anthropic.Tool = {
  name: "report_synthesis",
  description: "Report the section-level synthesis: structure note, traps, recommendations.",
  input_schema: {
    type: "object",
    properties: {
      structure_note: { type: "string" },
      within_max_5: { type: "boolean" },
      traps: {
        type: "array",
        items: {
          type: "object",
          properties: {
            key: {
              type: "string",
              enum: [
                "not_ambitious_or_bau",
                "task_list_not_okr",
                "compulsive_cascading",
                "performance_management_risk",
              ],
            },
            label: { type: "string" },
            detected: { type: "boolean" },
            evidence: { type: "string", description: "Short; empty string if not detected." },
          },
          required: ["key", "label", "detected", "evidence"],
        },
      },
      top_recommendations: {
        type: "array",
        items: { type: "string" },
        description: "Max 4 short, concrete, prioritized action items.",
      },
    },
    required: ["structure_note", "within_max_5", "traps", "top_recommendations"],
  },
};
