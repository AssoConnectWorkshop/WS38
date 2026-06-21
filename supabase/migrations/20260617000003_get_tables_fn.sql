create or replace function get_public_tables()
returns table(table_name text)
language sql
security definer
as $$
  select table_name::text
  from information_schema.tables
  where table_schema = 'public'
  order by table_name;
$$;
