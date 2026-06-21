#!/usr/bin/env node
/**
 * Creates N workspaces, each with:
 * - A GitHub repo (from template AssoConnectWorkshop/WS1)
 * - A Supabase project
 * - A Vercel project linked to the GitHub repo
 *
 * Usage: node scripts/bootstrap-workspaces.mjs
 *
 * Required env vars:
 *   GITHUB_TOKEN       — PAT with repo scope
 *   SUPABASE_ACCESS_TOKEN — Personal Access Token
 *   VERCEL_TOKEN       — Personal Access Token
 *   VERCEL_TEAM_ID     — team_xxx
 *
 * Optional:
 *   WS_START=2         — first workspace index (default 2)
 *   WS_END=11          — last workspace index inclusive (default 11)
 *   SUPABASE_DB_PASS   — shared db password (generated if omitted)
 *   SUPABASE_REGION    — default eu-central-2
 *   SUPABASE_ORG_ID    — required for project creation
 */

import { randomBytes } from 'crypto';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const SUPABASE_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
const GITHUB_ORG = 'AssoConnectWorkshop';
const TEMPLATE_REPO = 'WS1';
const SUPABASE_REGION = process.env.SUPABASE_REGION || 'eu-central-2';
const SUPABASE_ORG_ID = process.env.SUPABASE_ORG_ID;
const WS_START = parseInt(process.env.WS_START || '2');
const WS_END = parseInt(process.env.WS_END || '11');

for (const [name, val] of [
  ['GITHUB_TOKEN', GITHUB_TOKEN],
  ['SUPABASE_ACCESS_TOKEN', SUPABASE_TOKEN],
  ['VERCEL_TOKEN', VERCEL_TOKEN],
  ['VERCEL_TEAM_ID', VERCEL_TEAM_ID],
  ['SUPABASE_ORG_ID', SUPABASE_ORG_ID],
]) {
  if (!val) { console.error(`Missing env var: ${name}`); process.exit(1); }
}

// ── API helpers ─────────────────────────────────────────────────────────────

async function github(method, path, body) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`GitHub ${method} ${path}: ${json.message}`);
  return json;
}

async function supabase(method, path, body) {
  const res = await fetch(`https://api.supabase.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${SUPABASE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Supabase ${method} ${path}: ${JSON.stringify(json)}`);
  return json;
}

async function vercel(method, path, body) {
  const url = new URL(`https://api.vercel.com${path}`);
  url.searchParams.set('teamId', VERCEL_TEAM_ID);
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Vercel ${method} ${path}: ${JSON.stringify(json.error ?? json)}`);
  return json;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Main ─────────────────────────────────────────────────────────────────────

async function createWorkspace(n) {
  const name = `WS${n}`;
  const repoName = name;
  console.log(`\n── ${name} ──────────────────────────`);

  // 1. GitHub repo from template
  console.log(`  [1/3] GitHub: creating ${GITHUB_ORG}/${repoName}...`);
  const repo = await github('POST', `/repos/${GITHUB_ORG}/${TEMPLATE_REPO}/generate`, {
    owner: GITHUB_ORG,
    name: repoName,
    private: false,
    include_all_branches: false,
    description: `Workspace ${n}`,
  });
  console.log(`        ✓ ${repo.html_url}`);

  // 2. Supabase project (sequential — API enforces it)
  console.log(`  [2/3] Supabase: creating project ${name}...`);
  const dbPass = process.env.SUPABASE_DB_PASS || randomBytes(16).toString('hex');
  const project = await supabase('POST', '/projects', {
    name,
    organization_id: SUPABASE_ORG_ID,
    db_pass: dbPass,
    region: SUPABASE_REGION,
    plan: 'pro',
  });
  console.log(`        ✓ ${project.id} (status: ${project.status})`);
  console.log(`        waiting for project to be ready...`);

  // Poll until ACTIVE_HEALTHY
  for (let i = 0; i < 30; i++) {
    await sleep(10_000);
    const p = await supabase('GET', `/projects/${project.id}`);
    if (p.status === 'ACTIVE_HEALTHY') { console.log(`        ✓ ready`); break; }
    if (i === 29) throw new Error(`Project ${project.id} never became healthy`);
    process.stdout.write('.');
  }

  // Fetch anon key
  const keys = await supabase('GET', `/projects/${project.id}/api-keys`);
  const anonKey = keys.find(k => k.name === 'anon')?.api_key;
  const supabaseUrl = `https://${project.id}.supabase.co`;

  // 3. Vercel project linked to GitHub
  console.log(`  [3/3] Vercel: creating project ${name}...`);
  const vProject = await vercel('POST', '/v10/projects', {
    name: name.toLowerCase(),
    framework: 'nextjs',
    gitRepository: {
      type: 'github',
      repo: `${GITHUB_ORG}/${repoName}`,
    },
    environmentVariables: [
      { key: 'SUPABASE_URL', value: supabaseUrl, target: ['production', 'preview'] },
      { key: 'SUPABASE_ANON_KEY', value: anonKey, target: ['production', 'preview'] },
      { key: 'SUPABASE_PROJECT_REF', value: project.id, target: ['production', 'preview'] },
      // SUPABASE_ACCESS_TOKEN and ASSOCONNECT_* must be added manually per project
    ],
  });
  console.log(`        ✓ ${vProject.link?.deployHooks?.[0] ?? vProject.id}`);

  return { name, repoUrl: repo.html_url, supabaseId: project.id, supabaseUrl, vercelId: vProject.id };
}

async function main() {
  console.log(`Creating workspaces WS${WS_START} → WS${WS_END}`);
  const results = [];

  for (let n = WS_START; n <= WS_END; n++) {
    const ws = await createWorkspace(n);
    results.push(ws);
  }

  console.log('\n\n══ Summary ═════════════════════════════════');
  for (const ws of results) {
    console.log(`${ws.name}: GitHub=${ws.repoUrl}  Supabase=${ws.supabaseUrl}  Vercel=${ws.vercelId}`);
  }
  console.log('\n⚠️  Still needed per project (add manually in Vercel dashboard):');
  console.log('   SUPABASE_ACCESS_TOKEN, ASSOCONNECT_API_KEY, ASSOCONNECT_ORGANIZATION_ULID');
}

main().catch(err => { console.error(err.message); process.exit(1); });
