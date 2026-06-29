-- Execute este SQL no Supabase Studio (SQL Editor) do seu servidor self-hosted

create table if not exists public.shopping_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quantity integer not null default 1 check (quantity >= 1),
  unit text not null default 'un',
  category text not null default 'outros',
  purchased boolean not null default false,
  created_at bigint not null default (extract(epoch from now()) * 1000)::bigint
);

alter table public.shopping_items enable row level security;

create policy "Permitir leitura para anon"
  on public.shopping_items for select
  to anon, authenticated
  using (true);

create policy "Permitir inserção para anon"
  on public.shopping_items for insert
  to anon, authenticated
  with check (true);

create policy "Permitir atualização para anon"
  on public.shopping_items for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Permitir exclusão para anon"
  on public.shopping_items for delete
  to anon, authenticated
  using (true);

-- Habilita sincronização em tempo real entre dispositivos na rede
alter publication supabase_realtime add table public.shopping_items;
