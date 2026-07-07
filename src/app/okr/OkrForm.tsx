"use client";

import { useRef, useState } from "react";
import type { DiagnosticResult, EvaluatedKeyResult, EvaluatedObjective, Score, StreamEvent } from "@/lib/okr/types";

const SCORE_COLOR: Record<Score, string> = {
  calibrated: "#16a34a",
  needs_work: "#d97706",
  off_target: "#dc2626",
};

const SCORE_LABEL: Record<Score, string> = {
  calibrated: "Calibrated",
  needs_work: "Needs work",
  off_target: "Off target",
};

const SCORE_ANGLE: Record<Score, number> = {
  off_target: -55,
  needs_work: 0,
  calibrated: 55,
};

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

function ScoreDial({ score, size = 108 }: { score: Score; size?: number }) {
  const cx = 60;
  const cy = 54;
  const r = 42;
  const color = SCORE_COLOR[score];
  const angle = SCORE_ANGLE[score];
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 120 76" className="block">
      <path d={arcPath(cx, cy, r, -70, -20)} stroke="#fca5a5" strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d={arcPath(cx, cy, r, -18, 18)} stroke="#fcd34d" strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d={arcPath(cx, cy, r, 20, 70)} stroke="#86efac" strokeWidth={6} fill="none" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={3.5} fill={color} />
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - 34}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: `rotate(${angle}deg)`,
          transition: "transform 0.6s cubic-bezier(.2,.9,.25,1)",
        }}
      />
    </svg>
  );
}

function CheckRow({ label, pass, note }: { label: string; pass: boolean; note: string }) {
  return (
    <div className="flex items-start gap-2 text-sm text-gray-600">
      <span
        className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded text-[10px] font-bold ${
          pass ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
        }`}
      >
        {pass ? "✓" : "!"}
      </span>
      <span>
        <strong className="text-gray-900">{label}:</strong> {note}
      </span>
    </div>
  );
}

function KeyResultCard({ kr }: { kr: EvaluatedKeyResult }) {
  return (
    <div className="flex gap-3 border-t border-gray-100 py-3 first:border-t-0">
      <div className="mt-0.5 flex-shrink-0">
        <ScoreDial score={kr.score} size={48} />
      </div>
      <div className="flex-1">
        <div className="font-mono text-[11px] text-gray-500">
          {kr.tag} &middot; {SCORE_LABEL[kr.score]}
        </div>
        <div className="mb-2 mt-0.5 text-sm font-medium text-gray-900">{kr.text}</div>
        <div className="flex flex-col gap-1.5">
          {kr.checks.map((c) => (
            <CheckRow key={c.label} label={c.label} pass={c.pass} note={c.note} />
          ))}
        </div>
        {kr.rewrite_suggestion && (
          <div className="mt-2 border-l-2 border-blue-400 pl-3 text-sm text-blue-700">{kr.rewrite_suggestion}</div>
        )}
      </div>
    </div>
  );
}

function ObjectiveCard({ obj }: { obj: EvaluatedObjective }) {
  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-start gap-4 border-b border-gray-100 p-5">
        <div className="flex-shrink-0">
          <ScoreDial score={obj.score} />
        </div>
        <div className="flex-1">
          <div className="font-mono text-xs text-blue-600">
            {obj.tag} &middot; {SCORE_LABEL[obj.score]}
          </div>
          <div className="mb-2 mt-1 text-base font-semibold text-gray-900">{obj.text}</div>
          <div className="flex flex-col gap-1.5">
            {obj.checks.map((c) => (
              <CheckRow key={c.label} label={c.label} pass={c.pass} note={c.note} />
            ))}
            {obj.has_explicit_krs === false && (
              <CheckRow
                label="Key Results"
                pass={false}
                note="No explicit KRs found under this objective — sub-items read like initiatives, not measurable results."
              />
            )}
          </div>
        </div>
      </div>
      {obj.rewrite_suggestion && (
        <div className="m-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-blue-600">Recalibrated wording</div>
          {obj.rewrite_suggestion}
        </div>
      )}
      {obj.key_results.length > 0 && (
        <div className="px-5 pb-4">
          {obj.key_results.map((kr) => (
            <KeyResultCard key={kr.tag} kr={kr} />
          ))}
        </div>
      )}
    </div>
  );
}

function overallScore(objectives: EvaluatedObjective[]): Score {
  const total = objectives.length;
  if (total === 0) return "needs_work";
  const calibratedCount = objectives.filter((o) => o.score === "calibrated").length;
  if (calibratedCount === total) return "calibrated";
  if (calibratedCount === 0) return "off_target";
  return "needs_work";
}

async function streamDiagnostic(text: string, onEvent: (event: StreamEvent) => void): Promise<void> {
  const res = await fetch("/api/okr/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok || !res.body) {
    onEvent({ type: "error", message: `Request failed (${res.status}). Try again in a moment.` });
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let terminalEventSeen = false;

  const consumeLine = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    let event: StreamEvent;
    try {
      event = JSON.parse(trimmed) as StreamEvent;
    } catch {
      // A malformed line must never take the UI down — skip it.
      return;
    }
    if (event.type === "ping") return;
    if (event.type === "result" || event.type === "error") terminalEventSeen = true;
    onEvent(event);
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
      consumeLine(buffer.slice(0, newlineIndex));
      buffer = buffer.slice(newlineIndex + 1);
    }
  }
  consumeLine(buffer);

  if (!terminalEventSeen) {
    // The connection died mid-run (timeout, network drop) without a result or error event.
    onEvent({
      type: "error",
      message:
        "The diagnostic stream ended unexpectedly before finishing — this usually means the run timed out. Try again, or paste a smaller section.",
    });
  }
}

export default function OkrForm() {
  const [text, setText] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const runIdRef = useRef(0);

  async function runDiagnostic() {
    const trimmed = text.trim();
    setError(null);
    setResult(null);
    if (!trimmed) {
      setError("Paste a team's OKR section first.");
      return;
    }

    const runId = ++runIdRef.current;
    setIsRunning(true);
    setStatusMessage("Starting diagnostic…");

    try {
      await streamDiagnostic(trimmed, (event) => {
        if (runId !== runIdRef.current) return;
        if (event.type === "status") setStatusMessage(event.message);
        else if (event.type === "result") setResult(event.data);
        else if (event.type === "error") setError(event.message);
      });
    } catch (err) {
      if (runId === runIdRef.current) {
        setError(err instanceof Error ? err.message : "Something went wrong running the diagnostic.");
      }
    } finally {
      if (runId === runIdRef.current) setIsRunning(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-9 border-b border-gray-200 pb-6">
        <p className="mb-1.5 font-mono text-xs uppercase tracking-widest text-blue-600">Exec / OKR Instrumentation</p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">OKR Calibration</h1>
        <p className="mt-2 max-w-md text-sm text-gray-500">
          Paste one team&apos;s Objectives and Key Results. Get a structured read against AssoConnect&apos;s OKR
          guidelines.
        </p>
      </header>

      <div className="mb-10 rounded-xl border border-gray-200 bg-white p-5">
        <label htmlFor="okr-text" className="mb-2 block font-mono text-xs uppercase tracking-wide text-gray-500">
          Paste one team&apos;s OKR section
        </label>
        <textarea
          id="okr-text"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the Objectives and Key Results for a single team here (e.g. Marketing). Include the objective titles and their key results — copy straight from Notion, a doc, or a slide."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm leading-relaxed text-gray-900 outline-none focus:border-blue-500"
        />
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={runDiagnostic}
            disabled={isRunning}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isRunning ? "Running…" : "Run diagnostic"}
          </button>
        </div>
        <p className="mt-2.5 text-xs text-gray-500">
          Paste one team&apos;s section at a time. Titles, objectives, and key results in any format — the tool
          structures and scores them against a fixed internal guideline reference.
        </p>
      </div>

      {isRunning && (
        <div className="mb-6 flex items-center gap-3 py-2 font-mono text-sm text-gray-500">
          <span className="h-4 w-4 flex-shrink-0 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
          {statusMessage}
        </div>
      )}

      {error && (
        <div className="mb-7 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-relaxed text-red-800">
          {error}
        </div>
      )}

      {result && (
        <div>
          {result.warnings.length > 0 && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-800">
              <p className="mb-1 font-semibold">Partial results</p>
              <ul className="list-disc space-y-1 pl-5">
                {result.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mb-7 flex flex-col items-center gap-6 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row">
            <div className="flex-shrink-0 text-center">
              <ScoreDial score={overallScore(result.objectives)} size={120} />
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wide text-gray-500">
                {SCORE_LABEL[overallScore(result.objectives)]}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xl font-semibold text-gray-900">{result.section_title}</p>
              <p className="font-mono text-xs text-gray-500">
                {result.objective_count} objective{result.objective_count === 1 ? "" : "s"}
                {result.within_max_5 === false ? (
                  <span className="text-amber-600"> — over the 5-objective guideline</span>
                ) : (
                  " · within guideline"
                )}
              </p>
              {result.structure_note && <p className="mt-1.5 font-mono text-xs text-gray-500">{result.structure_note}</p>}
              {(result.leniency.overturned > 0 || result.leniency.softened > 0) && (
                <p className="mt-1.5 font-mono text-xs text-gray-500">
                  Leniency review: {result.leniency.overturned} check{result.leniency.overturned === 1 ? "" : "s"} overturned,{" "}
                  {result.leniency.softened} softened to a suggestion.
                </p>
              )}
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {result.traps.map((t) => (
              <div
                key={t.key}
                title={t.evidence}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs ${
                  t.detected ? "border-amber-300 text-amber-700" : "border-gray-200 text-gray-500"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${t.detected ? "bg-amber-500" : "bg-green-500"}`} />
                {t.label}
              </div>
            ))}
          </div>

          <div>
            {result.objectives.map((obj) => (
              <ObjectiveCard key={obj.tag} obj={obj} />
            ))}
          </div>

          {result.top_recommendations.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-3.5 text-base font-semibold text-gray-900">Top recommendations</h3>
              <ol className="list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-gray-700">
                {result.top_recommendations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ol>
            </div>
          )}

          <p className="mt-6 text-center font-mono text-[10px] text-gray-400">run {result.run_id}</p>
        </div>
      )}
    </div>
  );
}
