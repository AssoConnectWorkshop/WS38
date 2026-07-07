import "server-only";
import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-sonnet-5";
const MAX_RETRIES = 5;

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
    client = new Anthropic({ apiKey });
  }
  return client;
}

function textFromContent(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

export async function callClaudeText(prompt: string, maxTokens = 1500): Promise<string> {
  const response = await getClient().messages.create(
    {
      model: MODEL,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    },
    { maxRetries: MAX_RETRIES }
  );
  return textFromContent(response.content);
}

export async function callClaudeTool<T>(
  prompt: string,
  tool: Anthropic.Tool,
  maxTokens = 2000
): Promise<T> {
  const response = await getClient().messages.create(
    {
      model: MODEL,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
      tools: [tool],
      tool_choice: { type: "tool", name: tool.name },
    },
    { maxRetries: MAX_RETRIES }
  );

  const block = response.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === "tool_use" && b.name === tool.name
  );
  if (block && block.input && typeof block.input === "object") {
    return block.input as T;
  }

  const textOut = textFromContent(response.content);
  if (textOut.trim()) {
    try {
      return parseJsonLoose(textOut) as T;
    } catch {
      // fall through to error below
    }
  }
  const preview = textOut.replace(/\s+/g, " ").trim().slice(0, 160);
  throw new Error(
    `The model did not return structured output (stop reason: ${response.stop_reason ?? "?"})` +
      (preview ? ` — it replied: "${preview}…"` : "")
  );
}

export function parseJsonLoose<T = unknown>(text: string): T {
  let t = text.trim();
  t = t.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/```\s*$/, "");
  const first = t.indexOf("{");
  const last = t.lastIndexOf("}");
  if (first !== -1 && last !== -1) t = t.slice(first, last + 1);
  return JSON.parse(t) as T;
}

export function parseJsonArrayLoose<T = unknown>(text: string): T {
  let t = text.trim();
  t = t.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/```\s*$/, "");
  const first = t.indexOf("[");
  const last = t.lastIndexOf("]");
  if (first !== -1 && last !== -1) t = t.slice(first, last + 1);
  return JSON.parse(t) as T;
}

// One-retry guard: if the model's JSON is malformed (rare — usually an unescaped
// quote/newline in verbatim pasted text), hand it back once for a corrected version.
export async function parseWithRetry<T>(text: string, parser: (t: string) => T): Promise<T> {
  try {
    return parser(text);
  } catch (e) {
    const fixed = await callClaudeText(
      `The following was supposed to be valid JSON but did not parse (error: ${
        e instanceof Error ? e.message : String(e)
      }). Return ONLY the corrected JSON — identical structure and content, properly escaped, no markdown fences, no commentary:\n\n${text}`
    );
    return parser(fixed);
  }
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
