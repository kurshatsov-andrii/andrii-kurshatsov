
-- Restrict storage listing to admin only (public direct URLs still work for public buckets)
drop policy if exists "portfolio_public_read_objects" on storage.objects;
drop policy if exists "site_public_read_objects" on storage.objects;

create policy "portfolio_admin_list_objects" on storage.objects
  for select to authenticated using (bucket_id = 'portfolio' and public.is_admin());

create policy "site_admin_list_objects" on storage.objects
  for select to authenticated using (bucket_id = 'site' and public.is_admin());

-- Lock down is_admin() execution
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;
