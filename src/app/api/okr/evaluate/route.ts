import { OkrDiagnosticError, runOkrDiagnostic } from "@/lib/okr/evaluate";
import { OkrStageError } from "@/lib/okr/claude";
import { Trace, describeError } from "@/lib/okr/trace";
import type { StreamEvent } from "@/lib/okr/types";

// Full pipeline is 1 structure call + N eval calls + leniency batches + synthesis;
// with retries a big section legitimately needs a few minutes.
export const maxDuration = 300;

const HEARTBEAT_MS = 15_000;

export async function POST(request: Request) {
  const trace = new Trace();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    trace.warn("route", "invalid_json_body");
    return Response.json({ error: "Invalid JSON body", run_id: trace.runId }, { status: 400 });
  }

  const record = (body ?? {}) as Record<string, unknown>;
  const text = typeof record.text === "string" ? record.text : "";
  // debug: true echoes the full trace back in the result event for client-side inspection.
  const debug = record.debug === true;

  trace.info("route", "request_received", { input_chars: text.length, debug });

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: StreamEvent) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
        } catch {
          // Client disconnected mid-stream; keep the pipeline finishing quietly.
          closed = true;
          trace.warn("route", "client_disconnected");
        }
      };

      // NDJSON heartbeat so proxies don't kill the connection during long stages.
      const heartbeat = setInterval(() => send({ type: "ping" }), HEARTBEAT_MS);

      try {
        const data = await runOkrDiagnostic(text, trace, (message) =>
          send({ type: "status", message })
        );
        send({ type: "result", data, trace: debug ? trace.entries : undefined });
      } catch (err) {
        let message: string;
        if (err instanceof OkrDiagnosticError) {
          message = err.message;
        } else if (err instanceof OkrStageError) {
          message = `The diagnostic failed at the "${err.stage}" step: ${err.message}. (run ${trace.runId})`;
        } else {
          message = `Something went wrong running the diagnostic: ${describeError(err)}. (run ${trace.runId})`;
        }
        trace.error("route", "request_failed", {
          error: describeError(err),
          stack: err instanceof Error ? err.stack : undefined,
        });
        send({ type: "error", message, run_id: trace.runId });
      } finally {
        clearInterval(heartbeat);
        trace.info("route", "request_finished", { total_ms: trace.elapsedMs() });
        if (!closed) {
          closed = true;
          try {
            controller.close();
          } catch {
            // already closed by the runtime
          }
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Okr-Run-Id": trace.runId,
    },
  });
}
