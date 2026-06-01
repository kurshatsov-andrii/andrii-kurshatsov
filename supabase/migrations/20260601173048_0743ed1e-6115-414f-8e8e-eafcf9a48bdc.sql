-- FAQ items
CREATE TABLE public.faq_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_uk TEXT NOT NULL DEFAULT '',
  question_en TEXT NOT NULL DEFAULT '',
  answer_uk TEXT NOT NULL DEFAULT '',
  answer_en TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faq_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faq_items TO authenticated;
GRANT ALL ON public.faq_items TO service_role;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY faq_public_read ON public.faq_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY faq_admin_insert ON public.faq_items FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY faq_admin_update ON public.faq_items FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY faq_admin_delete ON public.faq_items FOR DELETE TO authenticated USING (is_admin());

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  role_uk TEXT NOT NULL DEFAULT '',
  role_en TEXT NOT NULL DEFAULT '',
  text_uk TEXT NOT NULL DEFAULT '',
  text_en TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY tst_public_read ON public.testimonials FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY tst_admin_insert ON public.testimonials FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY tst_admin_update ON public.testimonials FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY tst_admin_delete ON public.testimonials FOR DELETE TO authenticated USING (is_admin());

-- Services
CREATE TABLE public.services_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  title_uk TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  desc_uk TEXT NOT NULL DEFAULT '',
  desc_en TEXT NOT NULL DEFAULT '',
  price_uk TEXT NOT NULL DEFAULT '',
  price_en TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services_items TO authenticated;
GRANT ALL ON public.services_items TO service_role;
ALTER TABLE public.services_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY srv_public_read ON public.services_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY srv_admin_insert ON public.services_items FOR INSERT TO authenticated WITH CHECK (is_admin());
CREATE POLICY srv_admin_update ON public.services_items FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY srv_admin_delete ON public.services_items FOR DELETE TO authenticated USING (is_admin());

-- Seed default FAQ (uk + en) from current i18n
INSERT INTO public.faq_items (question_uk, answer_uk, question_en, answer_en, sort_order) VALUES
('Як зазвичай починається співпраця?', 'Спершу 30-хвилинний дзвінок-знайомство, потім платний discovery-спринт (1–2 тижні) для узгодження обсягу, метрик і термінів.', 'How do engagements typically start?', 'We begin with a 30-minute fit call, then a paid discovery sprint (1–2 weeks) to align on scope, success metrics and timeline.', 1),
('Працюєш сам чи з командою?', 'І так, і так. Бренд і стратегію веду особисто; більші продуктові проєкти підсилюю студією з 2–6 сеньйорів.', 'Do you work solo or with a team?', 'Both. Brand and strategy work I lead personally; larger product engagements bring in a vetted studio team of 2–6 senior craftspeople.', 2),
('Які типові терміни?', 'Бренд-спринти: 4–6 тижнів. Продуктові MVP: 8–14 тижнів. Ретейнери — від 3 місяців.', 'What''s your typical timeline?', 'Brand sprints: 4–6 weeks. Product MVPs: 8–14 weeks. Ongoing retainers start at 3 months.', 3),
('Де ти базуєшся?', 'Київ. Працюю з фаундерами ЄС, Великої Британії та Америки. Async-first з тижневими синками.', 'Where are you based?', 'Kyiv-based, working with founders across EU, UK and the Americas. Async-first with weekly syncs.', 4),
('Береш частку (equity)?', 'Вибірково. Для виняткових команд відкритий до комбінації cash + equity.', 'Do you take equity?', 'Selectively. For exceptional teams I''m open to a blended cash + equity arrangement.', 5);

-- Seed testimonials
INSERT INTO public.testimonials (name, role_uk, role_en, text_uk, text_en, sort_order) VALUES
('Elena Marchetti', 'CEO, Northwind Capital', 'CEO, Northwind Capital', 'Андрій переосмислив наше позиціювання за три тижні. Ми закрили Series A з пітч-деком, який створили разом.', 'Andrii reframed our entire positioning in three weeks. We closed our Series A with the deck he helped us build.', 1),
('James Okafor', 'Засновник, Lumen Labs', 'Founder, Lumen Labs', 'Найбільш стратегічний дизайнер, з яким я працював. Якість топ-студії, комунікація фаундера.', 'The most strategic designer I''ve ever worked with. Ships at the bar of a top product studio, communicates like a founder.', 2),
('Sofia Hartmann', 'CMO, Halo Audio', 'CMO, Halo Audio', 'Квартал запуску перевищив план на 220%. Бренд-світ Андрія тримав усю кампанію.', 'Our launch quarter beat plan by 220%. The brand world Andrii built carried the entire campaign.', 3);

-- Seed services
INSERT INTO public.services_items (icon, title_uk, title_en, desc_uk, desc_en, price_uk, price_en, sort_order) VALUES
('Compass', 'Бренд-стратегія', 'Brand Strategy', 'Позиціювання, наратив та айдентика для фаундерів, готових бути впізнаваними.', 'Positioning, narrative and identity systems for founders ready to be unmistakable.', 'від €8тис.', 'from €8k', 1),
('Layers', 'Продуктовий дизайн', 'Product Design', 'Повний цикл — дослідження, UX, UI і дизайн-системи, які люблять інженери.', 'End-to-end product surfaces — research, UX, UI and design systems that engineers love.', 'від €12тис.', 'from €12k', 2),
('Rocket', 'Лендинг і запуск', 'Launch & Web', 'Преміальні сайти з моушеном, копірайтом та архітектурою конверсії.', 'Premium marketing sites with motion, copy, and conversion architecture built in.', 'від €6тис.', 'from €6k', 3),
('LineChart', 'Growth-консалтинг', 'Growth Advisory', 'Фракційне лідерство дизайну для профінансованих команд 0 → 1 → 10.', 'Fractional design leadership for funded teams scaling 0 → 1 → 10.', 'місячний ретейнер', 'monthly retainer', 4);
