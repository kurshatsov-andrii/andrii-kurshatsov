import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { SEO_DEFAULTS, type SeoEntry, type SeoLocale } from "./seo";

function detectLocaleFromHeader(h: string | null | undefined): SeoLocale {
  if (!h) return "uk";
  const lower = h.toLowerCase();
  if (lower.includes("uk") || lower.includes("ru")) return "uk";
  return "en";
}

export const getSeoForPage = createServerFn({ method: "GET" })
  .inputValidator((data: { page: string }) => {
    if (!data?.page || typeof data.page !== "string") throw new Error("page required");
    return { page: data.page.slice(0, 64) };
  })
  .handler(async ({ data }): Promise<SeoEntry & { locale: SeoLocale }> => {
    let locale: SeoLocale = "uk";
    try {
      const req = getRequest();
      locale = detectLocaleFromHeader(req.headers.get("accept-language"));
    } catch {
      // not in a request context
    }
    const fallback = SEO_DEFAULTS[data.page]?.[locale] ?? { title: "", description: "" };

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return { ...fallback, locale };

    try {
      const supa = createClient(url, key);
      const { data: row } = await supa
        .from("seo_meta")
        .select("title,description")
        .eq("page", data.page)
        .eq("locale", locale)
        .maybeSingle();
      return {
        title: row?.title?.trim() ? row.title : fallback.title,
        description: row?.description?.trim() ? row.description : fallback.description,
        locale,
      };
    } catch {
      return { ...fallback, locale };
    }
  });
