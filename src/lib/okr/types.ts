export type Score = "calibrated" | "needs_work" | "off_target";

export type Check = {
  label: string;
  pass: boolean;
  note: string;
};

export type KeyResultInput = {
  tag: string;
  text: string;
};

export type ObjectiveInput = {
  tag: string;
  text: string;
  has_explicit_krs: boolean;
  key_results: KeyResultInput[];
  candidate_items: string[];
};

export type Structure = {
  section_title: string;
  error?: string;
  objectives: ObjectiveInput[];
};

export type EvaluatedKeyResult = {
  tag: string;
  text: string;
  score: Score;
  checks: Check[];
  rewrite_suggestion: string;
};

export type EvaluatedObjective = {
  tag: string;
  text: string;
  has_explicit_krs: boolean;
  score: Score;
  checks: Check[];
  rewrite_suggestion: string;
  key_results: EvaluatedKeyResult[];
};

export type Trap = {
  key: string;
  label: string;
  detected: boolean;
  evidence: string;
};

export type Synthesis = {
  structure_note: string;
  within_max_5: boolean;
  traps: Trap[];
  top_recommendations: string[];
};

export type LeniencyStats = {
  overturned: number;
  softened: number;
};

export type DiagnosticResult = {
  section_title: string;
  objective_count: number;
  structure_note: string;
  within_max_5: boolean;
  traps: Trap[];
  objectives: EvaluatedObjective[];
  top_recommendations: string[];
  leniency: LeniencyStats;
};

export type ProgressEvent = { type: "status"; message: string };
export type ResultEvent = { type: "result"; data: DiagnosticResult };
export type ErrorEvent = { type: "error"; message: string };
export type StreamEvent = ProgressEvent | ResultEvent | ErrorEvent;
