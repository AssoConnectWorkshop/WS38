create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  content text,
  created_at timestamptz not null default now()
);

alter table notes enable row level security;

create policy "Public read access"
  on notes
  for select
  using (true);
