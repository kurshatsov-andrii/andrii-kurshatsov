
-- Admin check function (security definer to read JWT email)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((auth.jwt() ->> 'email') = 'andreswebit@gmail.com', false);
$$;

-- ============ page_sections ============
create table public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section_key text not null,
  locale text not null check (locale in ('uk','en')),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (page, section_key, locale)
);

grant select on public.page_sections to anon, authenticated;
grant all on public.page_sections to service_role, authenticated;

alter table public.page_sections enable row level security;

create policy "page_sections_public_read" on public.page_sections
  for select to anon, authenticated using (true);

create policy "page_sections_admin_insert" on public.page_sections
  for insert to authenticated with check (public.is_admin());

create policy "page_sections_admin_update" on public.page_sections
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "page_sections_admin_delete" on public.page_sections
  for delete to authenticated using (public.is_admin());

-- ============ portfolio_items ============
create table public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('songs','ads','clips','code')),
  title_uk text not null default '',
  title_en text not null default '',
  description_uk text default '',
  description_en text default '',
  cover_url text,
  video_url text,
  video_platform text check (video_platform in ('youtube','instagram','tiktok') or video_platform is null),
  audio_url text,
  external_url text,
  tags text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index portfolio_items_category_sort on public.portfolio_items(category, sort_order);

grant select on public.portfolio_items to anon, authenticated;
grant all on public.portfolio_items to service_role, authenticated;

alter table public.portfolio_items enable row level security;

create policy "portfolio_public_read" on public.portfolio_items
  for select to anon, authenticated using (true);

create policy "portfolio_admin_insert" on public.portfolio_items
  for insert to authenticated with check (public.is_admin());

create policy "portfolio_admin_update" on public.portfolio_items
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "portfolio_admin_delete" on public.portfolio_items
  for delete to authenticated using (public.is_admin());

-- ============ social_links ============
create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  label text,
  sort_order int not null default 0
);

grant select on public.social_links to anon, authenticated;
grant all on public.social_links to service_role, authenticated;

alter table public.social_links enable row level security;

create policy "social_public_read" on public.social_links
  for select to anon, authenticated using (true);

create policy "social_admin_insert" on public.social_links
  for insert to authenticated with check (public.is_admin());

create policy "social_admin_update" on public.social_links
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "social_admin_delete" on public.social_links
  for delete to authenticated using (public.is_admin());

-- ============ site_assets ============
create table public.site_assets (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  url text not null,
  updated_at timestamptz not null default now()
);

grant select on public.site_assets to anon, authenticated;
grant all on public.site_assets to service_role, authenticated;

alter table public.site_assets enable row level security;

create policy "site_assets_public_read" on public.site_assets
  for select to anon, authenticated using (true);

create policy "site_assets_admin_insert" on public.site_assets
  for insert to authenticated with check (public.is_admin());

create policy "site_assets_admin_update" on public.site_assets
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "site_assets_admin_delete" on public.site_assets
  for delete to authenticated using (public.is_admin());

-- ============ Storage buckets ============
insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('site', 'site', true) on conflict do nothing;

-- Storage policies: public read, admin write
create policy "portfolio_public_read_objects" on storage.objects
  for select to anon, authenticated using (bucket_id = 'portfolio');

create policy "portfolio_admin_write_objects" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio' and public.is_admin());

create policy "portfolio_admin_update_objects" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio' and public.is_admin());

create policy "portfolio_admin_delete_objects" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio' and public.is_admin());

create policy "site_public_read_objects" on storage.objects
  for select to anon, authenticated using (bucket_id = 'site');

create policy "site_admin_write_objects" on storage.objects
  for insert to authenticated with check (bucket_id = 'site' and public.is_admin());

create policy "site_admin_update_objects" on storage.objects
  for update to authenticated using (bucket_id = 'site' and public.is_admin());

create policy "site_admin_delete_objects" on storage.objects
  for delete to authenticated using (bucket_id = 'site' and public.is_admin());
