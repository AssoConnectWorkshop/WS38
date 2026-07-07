import "server-only";
import type { TraceEntry } from "./types";

// OKR_DEBUG=1 on Vercel switches from truncated previews to full payload logging.
const FULL_DEBUG = process.env.OKR_DEBUG === "1";

const PREVIEW_LENGTH = 400;

function truncateForLog(value: unknown): unknown {
  if (FULL_DEBUG) return value;
  if (typeof value === "string" && value.length > PREVIEW_LENGTH) {
    return `${value.slice(0, PREVIEW_LENGTH)}… (${value.length} chars)`;
  }
  return value;
}

export class Trace {
  readonly runId: string;
  readonly entries: TraceEntry[] = [];
  private readonly startedAt = Date.now();

  constructor() {
    this.runId = `okr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }

  info(stage: string, event: string, data?: Record<string, unknown>): void {
    this.emit("info", stage, event, data);
  }

  warn(stage: string, event: string, data?: Record<string, unknown>): void {
    this.emit("warn", stage, event, data);
  }

  error(stage: string, event: string, data?: Record<string, unknown>): void {
    this.emit("error", stage, event, data);
  }

  // Returns a completion callback that logs the event with its duration.
  time(stage: string, event: string): (data?: Record<string, unknown>) => void {
    const start = Date.now();
    return (data?: Record<string, unknown>) =>
      this.info(stage, event, { ...data, duration_ms: Date.now() - start });
  }

  elapsedMs(): number {
    return Date.now() - this.startedAt;
  }

  private emit(
    level: TraceEntry["level"],
    stage: string,
    event: string,
    data?: Record<string, unknown>
  ): void {
    const clean = data
      ? Object.fromEntries(Object.entries(data).map(([k, v]) => [k, truncateForLog(v)]))
      : undefined;
    const entry: TraceEntry = { t: Date.now() - this.startedAt, level, stage, event, data: clean };
    this.entries.push(entry);

    const line = `[okr:${this.runId}] +${entry.t}ms ${level.toUpperCase()} ${stage}.${event}${
      clean ? " " + JSON.stringify(clean) : ""
    }`;
    if (level === "error") console.error(line);
    else if (level === "warn") console.warn(line);
    else console.log(line);
  }
}

export function describeError(err: unknown): string {
  if (err instanceof Error) return `${err.name}: ${err.message}`;
  return String(err);
}
