-- Run this in the Supabase SQL editor (Dashboard > SQL Editor > New query)

-- Profiles table (run this if not already created)
create table if not exists profiles (
  id uuid references auth.users primary key,
  display_name text,
  business_name text,
  business_email text,
  abn text,
  phone text,
  logo_url text,
  payment_terms text default '14',
  next_invoice_num int default 1,
  updated_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users manage own profile"
  on profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ----

create table if not exists invoices (
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
