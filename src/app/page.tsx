import Image from "next/image";
import { getOrganization } from "@/lib/assoconnect";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function testDatabase(): Promise<{ ok: boolean; tables: string[] }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_public_tables");
    if (error) throw error;
    return { ok: true, tables: data?.map((r: { table_name: string }) => r.table_name) ?? [] };
  } catch {
    return { ok: false, tables: [] };
  }
}

async function testApi(): Promise<{ ok: boolean; platformName: string | null }> {
  try {
    const org = await getOrganization();
    return { ok: true, platformName: org.name };
  } catch {
    return { ok: false, platformName: null };
  }
}

function StatusIcon({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="text-green-500 text-2xl">✓</span>
  ) : (
    <span className="text-red-500 text-2xl">✗</span>
  );
}

export default async function Home() {
  const [db, api] = await Promise.all([testDatabase(), testApi()]);
  const wsName = (await import("@/config/site")).siteConfig.name;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-8">
      <div className="absolute top-4 left-4 text-sm font-bold bg-black text-white px-3 py-1 rounded-full">
        {wsName}
      </div>
      <div className="flex flex-col items-center gap-4">
        <Image src="/mascot.png" alt="Mascot" width={160} height={160} priority />
        <h1 className="text-4xl font-bold">Welcome young padawan!</h1>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-md">
        <div className="border rounded-xl p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <StatusIcon ok={db.ok} />
            <h2 className="text-lg font-semibold">Test database connection</h2>
          </div>
          {db.ok && (
            <p className="text-sm text-gray-600">
              Number of tables: {db.tables.length}
              {db.tables.length > 0 && (
                <span className="ml-1 opacity-60">
                  ({db.tables.slice(0, 3).join(", ")}
                  {db.tables.length > 3 ? "…" : ""})
                </span>
              )}
            </p>
          )}
        </div>

        <div className="border rounded-xl p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <StatusIcon ok={api.ok} />
            <h2 className="text-lg font-semibold">Test API connection</h2>
          </div>
          {api.ok && api.platformName && (
            <p className="text-sm text-gray-600">
              Name of the platform: <span className="font-medium">{api.platformName}</span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
