create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

alter table cities enable row level security;

create policy "Public read access"
  on cities
  for select
  using (true);

insert into cities (name) values
  ('Paris'),
  ('Lyon'),
  ('Marseille'),
  ('Toulouse'),
  ('Bordeaux'),
  ('Nantes'),
  ('Strasbourg'),
  ('Lille'),
  ('Nice'),
  ('Rennes');
