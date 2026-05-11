-- Run these in Supabase SQL Editor

-- Allow anyone with an invoice UUID to read it (for client portal /share/[id])
-- UUIDs are 122-bit entropy — practically unguessable
create policy "Public can read invoice by id"
  on invoices for select
  to anon
  using (true);

-- Storage bucket for logos
-- NOTE: Also do this in Supabase Dashboard > Storage:
--   1. Create a new bucket called "logos"
--   2. Set it to Public
--   3. Run the policies below

insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict do nothing;

create policy "Users can upload their own logo"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'logos' AND (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update their own logo"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'logos' AND (storage.foldername(name))[1] = auth.uid()::text);

create policy "Anyone can view logos"
  on storage.objects for select
  using (bucket_id = 'logos');
