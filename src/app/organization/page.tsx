import { getOrganization } from "@/lib/assoconnect";

export const dynamic = "force-dynamic";

export default async function OrganizationPage() {
  let org;
  let error: string | null = null;
  try {
    org = await getOrganization();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 p-8">
      <h1 className="text-3xl font-bold">Organization</h1>

      {error && (
        <p className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</p>
      )}

      {org && (
        <dl className="grid grid-cols-[8rem_1fr] gap-y-3 text-sm">
          <dt className="font-medium opacity-60">Name</dt>
          <dd>{org.name}</dd>
          <dt className="font-medium opacity-60">Brand</dt>
          <dd>{org.brand}</dd>
          <dt className="font-medium opacity-60">Phone</dt>
          <dd>{org.phoneNumber}</dd>
          <dt className="font-medium opacity-60">URL</dt>
          <dd>
            <a className="text-blue-600 underline" href={org.url}>
              {org.url}
            </a>
          </dd>
        </dl>
      )}
    </main>
  );
}
