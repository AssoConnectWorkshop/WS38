import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contacts" };

type Contact = {
  "@id": string;
  type: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  mobilePhone?: string;
  landlinePhone?: string;
};

type ContactsCollection = {
  "hydra:member": Contact[];
  "hydra:totalItems": number;
};

async function getContacts(): Promise<ContactsCollection> {
  const token = process.env.ASSOCONNECT_API_KEY;
  const ulid = process.env.ASSOCONNECT_ORGANIZATION_ULID;
  if (!token) throw new Error("ASSOCONNECT_API_KEY is not set");
  if (!ulid) throw new Error("ASSOCONNECT_ORGANIZATION_ULID is not set");

  const res = await fetch(
    `https://app.assoconnect.com/api/v1/organizations/${ulid}/contacts?itemsPerPage=3`,
    {
      headers: {
        Accept: "application/ld+json",
        "X-AUTH-TOKEN": token,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`AssoConnect API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export default async function ContactsPage() {
  let contacts: Contact[] = [];
  let total = 0;
  let error: string | null = null;

  try {
    const data = await getContacts();
    contacts = data["hydra:member"];
    total = data["hydra:totalItems"];
  } catch (e) {
    error = e instanceof Error ? e.message : "Erreur inconnue";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold">3 premiers contacts</h1>

      {error ? (
        <p className="text-red-400 bg-red-950 px-4 py-2 rounded">{error}</p>
      ) : (
        <>
          <p className="text-gray-400">{total} contacts au total</p>
          <div className="flex flex-col gap-4 w-full max-w-lg">
            {contacts.map((c) => (
              <div
                key={c["@id"]}
                className="bg-gray-800 rounded-xl p-5 flex flex-col gap-1"
              >
                <p className="font-semibold text-lg">
                  {c.firstname || c.lastname
                    ? `${c.firstname ?? ""} ${c.lastname ?? ""}`.trim()
                    : "—"}
                  <span className="ml-2 text-xs text-gray-400 font-normal">
                    {c.type}
                  </span>
                </p>
                {c.email && (
                  <p className="text-blue-400 text-sm">{c.email}</p>
                )}
                {(c.mobilePhone || c.landlinePhone) && (
                  <p className="text-gray-400 text-sm">
                    {c.mobilePhone ?? c.landlinePhone}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
