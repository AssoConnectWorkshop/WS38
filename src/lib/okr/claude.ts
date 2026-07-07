import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { Trace, describeError } from "./trace";

const MODEL = "claude-sonnet-5";

// The SDK already retries 429/529/5xx with exponential backoff and honors retry-after.
const SDK_MAX_RETRIES = 3;
// Per-request timeout. Stage-level retries sit on top of this, and the route's
// maxDuration is the overall ceiling — one hung call must not eat the whole budget.
const REQUEST_TIMEOUT_MS = 90_000;

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
    client = new Anthropic({ apiKey, maxRetries: SDK_MAX_RETRIES, timeout: REQUEST_TIMEOUT_MS });
  }
  return client;
}

export class OkrStageError extends Error {
  constructor(
    public readonly stage: string,
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "OkrStageError";
  }
}

function friendlyApiError(err: unknown): string {
  if (err instanceof Anthropic.APIError) {
    const status = err.status;
    if (status === 401 || status === 403)
      return "the Anthropic API key was rejected — check ANTHROPIC_API_KEY on Vercel";
    if (status === 429) return "the Anthropic API is rate-limiting us — wait a minute and retry";
    if (status === 529 || (status && status >= 500))
      return "the Anthropic API is temporarily overloaded — retry in a moment";
    if (status === 400) return `the request was rejected by the Anthropic API (${err.message})`;
    return `Anthropic API error ${status ?? "?"} (${err.message})`;
  }
  if (err instanceof Anthropic.APIConnectionError) {
    return "couldn't reach the Anthropic API (network error)";
  }
  return describeError(err);
}

function isNonRetryable(err: unknown): boolean {
  return (
    err instanceof Anthropic.APIError &&
    typeof err.status === "number" &&
    [400, 401, 403, 404, 413].includes(err.status)
  );
}

function textFromContent(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

// Last-resort salvage when a forced tool call somehow comes back as text anyway.
function parseJsonLoose(text: string): unknown {
  let t = text.trim();
  t = t.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/```\s*$/, "");
  const first = t.indexOf("{");
  const last = t.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) {
    throw new Error("no JSON object found in text output");
  }
  return JSON.parse(t.slice(first, last + 1));
}

export type ToolCallOptions = {
  stage: string;
  trace: Trace;
  maxTokens?: number;
  attempts?: number;
};

// Every structured stage goes through here: the model MUST answer by calling the tool,
// so the API returns already-parsed JSON (tool_use.input). No hand-written JSON, no
// free-text "repair" round-trips. Thinking is explicitly disabled — these are
// mechanical extraction/judgment calls, and thinking tokens would eat the max_tokens
// budget and risk truncating the tool input mid-JSON.
export async function callClaudeTool<T>(
  prompt: string,
  tool: Anthropic.Tool,
  options: ToolCallOptions
): Promise<T> {
  const { stage, trace } = options;
  const attempts = options.attempts ?? 3;
  let maxTokens = options.maxTokens ?? 4000;
  let lastError: unknown = null;

  let anthropic: Anthropic;
  try {
    // Config errors (missing key) fail fast — retrying them is pure noise.
    anthropic = getClient();
  } catch (err) {
    trace.error(stage, "client_init_failed", { error: describeError(err) });
    throw new OkrStageError(stage, describeError(err), err);
  }

  trace.info(stage, "start", {
    tool: tool.name,
    prompt_chars: prompt.length,
    prompt,
    max_tokens: maxTokens,
  });

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const done = trace.time(stage, "api_call");
    let response: Anthropic.Message;
    try {
      response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: maxTokens,
        thinking: { type: "disabled" },
        messages: [{ role: "user", content: prompt }],
        tools: [tool],
        tool_choice: { type: "tool", name: tool.name },
      });
    } catch (err) {
      done({ attempt, error: describeError(err) });
      lastError = err;
      if (isNonRetryable(err)) break;
      continue;
    }

    done({
      attempt,
      stop_reason: response.stop_reason,
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
    });

    if (response.stop_reason === "max_tokens") {
      // Truncated tool input is unusable — retry with a doubled budget.
      lastError = new Error(`response truncated at max_tokens=${maxTokens}`);
      maxTokens *= 2;
      trace.warn(stage, "truncated_retrying", { attempt, next_max_tokens: maxTokens });
      continue;
    }

    const block = response.content.find(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use" && b.name === tool.name
    );
    if (block && block.input && typeof block.input === "object") {
      trace.info(stage, "tool_input_received", {
        attempt,
        input_json: JSON.stringify(block.input),
      });
      return block.input as T;
    }

    const textOut = textFromContent(response.content);
    trace.warn(stage, "no_tool_use_block", {
      attempt,
      stop_reason: response.stop_reason,
      text_output: textOut,
    });
    try {
      const salvaged = parseJsonLoose(textOut);
      trace.warn(stage, "salvaged_from_text", { attempt });
      return salvaged as T;
    } catch (err) {
      lastError = new Error(
        `model did not call the tool (stop_reason: ${response.stop_reason ?? "?"})`
      );
      void err;
    }
  }

  trace.error(stage, "failed", { error: describeError(lastError) });
  throw new OkrStageError(stage, friendlyApiError(lastError), lastError);
}

// Runs async tasks with limited concurrency to avoid bursting into rate limits.
export async function runWithConcurrency<I, O>(
  items: I[],
  limit: number,
  worker: (item: I, index: number) => Promise<O>
): Promise<O[]> {
  const results = new Array<O>(items.length);
  let next = 0;
  async function runNext(): Promise<void> {
    const i = next++;
    if (i >= items.length) return;
    results[i] = await worker(items[i], i);
    return runNext();
  }
  const runners = Array.from({ length: Math.min(limit, items.length) }, runNext);
  await Promise.all(runners);
  return results;
}
