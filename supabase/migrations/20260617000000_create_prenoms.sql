create table if not exists prenoms (
  id   bigint generated always as identity primary key,
  nom  text not null
);

insert into prenoms (nom) values
  ('Alice'),
  ('Bob'),
  ('Charlie'),
  ('Diana'),
  ('Étienne');
