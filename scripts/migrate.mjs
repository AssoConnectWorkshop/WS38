#!/usr/bin/env node
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'psftjpszvvkwlelysgze';
const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;

if (!TOKEN) {
  console.error('ERROR: SUPABASE_ACCESS_TOKEN is not set');
  process.exit(1);
}

const API = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

async function query(sql, params = []) {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql, params }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Query failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function main() {
  await query(`
    create table if not exists schema_migrations (
      name text primary key,
      applied_at timestamptz not null default now()
    )
  `);

  const rows = await query('select name from schema_migrations order by name');
  const applied = new Set(rows.map(r => r.name));

  const __dir = dirname(fileURLToPath(import.meta.url));
  const migrationsDir = join(__dir, '..', 'supabase', 'migrations');
  const files = readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  let ran = 0;
  for (const file of files) {
    if (applied.has(file)) {
      console.log(`  skip  ${file}`);
      continue;
    }
    console.log(`  apply ${file}`);
    const sql = readFileSync(join(migrationsDir, file), 'utf8');
    await query(sql);
    await query(`insert into schema_migrations (name) values ('${file.replace(/'/g, "''")}')`)
    ran++;
  }

  console.log(`\nMigrations done: ${ran} applied, ${applied.size} already up to date.`);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
