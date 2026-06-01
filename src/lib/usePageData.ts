import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

export type Locale = "uk" | "en";

export function useLocale(): Locale {
  const { lang } = useI18n();
  return lang === "ua" ? "uk" : "en";
}

/** Returns the merged data object for a page section in the current locale.
 * If nothing saved yet, returns {} so consumers fall back to defaults. */
export function usePageSection(page: string, sectionKey: string) {
  const locale = useLocale();
  const [data, setData] = useState<Record<string, string>>({});
  useEffect(() => {
    let cancelled = false;
    supabase
      .from("page_sections")
      .select("data")
      .eq("page", page)
      .eq("section_key", sectionKey)
      .eq("locale", locale)
      .maybeSingle()
      .then(({ data: row }) => {
        if (!cancelled) setData(((row?.data as any) ?? {}) as Record<string, string>);
      });
    return () => {
      cancelled = true;
    };
  }, [page, sectionKey, locale]);
  return data;
}

export type FaqRow = {
  id: string;
  question_uk: string;
  question_en: string;
  answer_uk: string;
  answer_en: string;
  sort_order: number;
};

export type TestimonialRow = {
  id: string;
  name: string;
  role_uk: string;
  role_en: string;
  text_uk: string;
  text_en: string;
  avatar_url: string | null;
  rating: number;
  sort_order: number;
};

export type ServiceRow = {
  id: string;
  icon: string;
  title_uk: string;
  title_en: string;
  desc_uk: string;
  desc_en: string;
  price_uk: string;
  price_en: string;
  sort_order: number;
};

export function useFaqItems() {
  const [items, setItems] = useState<FaqRow[]>([]);
  useEffect(() => {
    supabase.from("faq_items").select("*").order("sort_order").then(({ data }) => {
      setItems((data ?? []) as FaqRow[]);
    });
  }, []);
  return items;
}

export function useTestimonials() {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  useEffect(() => {
    supabase.from("testimonials").select("*").order("sort_order").then(({ data }) => {
      setItems((data ?? []) as TestimonialRow[]);
    });
  }, []);
  return items;
}

export function useServicesItems() {
  const [items, setItems] = useState<ServiceRow[]>([]);
  useEffect(() => {
    supabase.from("services_items").select("*").order("sort_order").then(({ data }) => {
      setItems((data ?? []) as ServiceRow[]);
    });
  }, []);
  return items;
}
