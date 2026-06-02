CREATE TABLE public.seo_meta (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page text NOT NULL,
  locale text NOT NULL,
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (page, locale)
);

GRANT SELECT ON public.seo_meta TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_meta TO authenticated;
GRANT ALL ON public.seo_meta TO service_role;

ALTER TABLE public.seo_meta ENABLE ROW LEVEL SECURITY;

CREATE POLICY seo_public_read ON public.seo_meta FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY seo_admin_insert ON public.seo_meta FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY seo_admin_update ON public.seo_meta FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY seo_admin_delete ON public.seo_meta FOR DELETE TO authenticated USING (is_admin());