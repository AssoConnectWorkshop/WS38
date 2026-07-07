import { OkrDiagnosticError, runOkrDiagnostic } from "@/lib/okr/evaluate";
import type { StreamEvent } from "@/lib/okr/types";

export const maxDuration = 60;

function encodeEvent(event: StreamEvent): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(event) + "\n");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const text = typeof (body as { text?: unknown })?.text === "string" ? (body as { text: string }).text : "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const data = await runOkrDiagnostic(text, (message) => {
          controller.enqueue(encodeEvent({ type: "status", message }));
        });
        controller.enqueue(encodeEvent({ type: "result", data }));
      } catch (err) {
        const message =
          err instanceof OkrDiagnosticError
            ? err.message
            : `Something went wrong running the diagnostic: ${
                err instanceof Error ? err.message : String(err)
              }. Try again in a moment.`;
        controller.enqueue(encodeEvent({ type: "error", message }));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
