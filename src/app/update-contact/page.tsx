import type { Metadata } from "next";

export const metadata: Metadata = { title: "Modifier contact" };

type Contact = {
  "@id": string;
  type: string;
  firstname?: string;
  lastname?: string;
  email?: string;
};

type ContactsCollection = {
  "hydra:member": Contact[];
  "hydra:totalItems": number;
  "hydra:view"?: { "hydra:next"?: string };
};

async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const token = process.env.ASSOCONNECT_API_KEY;
  if (!token) throw new Error("ASSOCONNECT_API_KEY is not set");

  const res = await fetch(`https://app.assoconnect.com${path}`, {
    ...options,
    headers: {
      Accept: "application/ld+json",
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": token,
      ...(options?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AssoConnect ${path}: ${res.status} ${res.statusText} — ${body}`);
  }

  return res.json() as Promise<T>;
}

async function findContact(
  firstname: string,
  lastname: string
): Promise<Contact | null> {
  const ulid = process.env.ASSOCONNECT_ORGANIZATION_ULID;
  if (!ulid) throw new Error("ASSOCONNECT_ORGANIZATION_ULID is not set");

  let page = 1;
  while (true) {
    const data = await apiRequest<ContactsCollection>(
      `/api/v1/organizations/${ulid}/contacts?page=${page}&itemsPerPage=100&type=person`
    );
    const found = data["hydra:member"].find(
      (c) =>
        c.firstname?.toLowerCase() === firstname.toLowerCase() &&
        c.lastname?.toLowerCase() === lastname.toLowerCase()
    );
    if (found) return found;
    if (!data["hydra:view"]?.["hydra:next"]) break;
    page++;
  }
  return null;
}

async function updatePerson(
  contactId: string,
  firstname: string,
  lastname: string
): Promise<Contact> {
  return apiRequest<Contact>(`/api/v1/crm/persons/${contactId}`, {
    method: "PUT",
    body: JSON.stringify({ firstname, lastname }),
  });
}

async function runUpdate(): Promise<{ success: boolean; message: string; contact?: Contact }> {
  try {
    const contact = await findContact("Pierre", "Foucault");
    if (!contact) {
      return { success: false, message: "Contact Pierre Foucault introuvable." };
    }

    const idMatch = contact["@id"].match(/\/([^/]+)$/);
    if (!idMatch) {
      return { success: false, message: `ID de contact invalide: ${contact["@id"]}` };
    }
    const contactId = idMatch[1];

    const updated = await updatePerson(contactId, "Henri", "Debreuil");
    return {
      success: true,
      message: `Contact mis à jour avec succès (id: ${contactId})`,
      contact: updated,
    };
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : "Erreur inconnue",
    };
  }
}

export default async function UpdateContactPage() {
  const result = await runUpdate();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 bg-gray-950 text-white">
      <h1 className="text-2xl font-bold">Modification de contact</h1>
      <div
        className={`rounded-xl px-6 py-5 max-w-lg w-full ${
          result.success ? "bg-green-900" : "bg-red-950"
        }`}
      >
        <p className={`font-semibold ${result.success ? "text-green-300" : "text-red-400"}`}>
          {result.success ? "✓ Succès" : "✗ Erreur"}
        </p>
        <p className="mt-2 text-sm text-gray-300">{result.message}</p>
        {result.contact && (
          <pre className="mt-3 text-xs text-gray-400 overflow-auto">
            {JSON.stringify(result.contact, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
