-- Run this in the Supabase SQL editor (Dashboard > SQL Editor > New query)

create table invoices (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  status text not null default 'unpaid',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table invoices enable row level security;

-- Single policy covering all operations: users can only touch their own rows
create policy "Users manage their own invoices"
  on invoices for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
