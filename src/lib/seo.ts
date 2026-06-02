import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

export type SeoLocale = "uk" | "en";

export type SeoEntry = { title: string; description: string };

export const SEO_PAGES: { key: string; label: string }[] = [
  { key: "home", label: "Головна" },
  { key: "about", label: "Про мене" },
  { key: "services", label: "Послуги" },
  { key: "work", label: "Портфоліо" },
  { key: "testimonials", label: "Відгуки" },
  { key: "faq", label: "FAQ" },
  { key: "contact", label: "Контакти" },
];

export const SEO_DEFAULTS: Record<string, Record<SeoLocale, SeoEntry>> = {
  home: {
    uk: {
      title: "Андрій Куршацов — Бренд та продуктовий стратег",
      description:
        "Преміальний брендинг, продуктовий дизайн і запуски для засновників, які створюють компанії, що задають категорію.",
    },
    en: {
      title: "Andrii Kurshatsov — Brand & Product Strategist",
      description:
        "Premium brand strategy, product design and launch partnerships for founders building category-defining companies.",
    },
  },
  about: {
    uk: {
      title: "Про мене — Андрій Куршацов",
      description:
        "Стратег і продуктовий дизайнер, який допомагає засновникам запускати преміальні цифрові продукти, що виділяються.",
    },
    en: {
      title: "About — Andrii Kurshatsov",
      description:
        "Strategist and product designer partnering with founders to ship category-defining premium digital products.",
    },
  },
  services: {
    uk: {
      title: "Послуги — Андрій Куршацов",
      description:
        "Брендинг, продуктовий дизайн і партнерства із запуску для амбітних засновників та команд.",
    },
    en: {
      title: "Services — Andrii Kurshatsov",
      description:
        "Brand strategy, product design and launch partnerships for ambitious founders and teams.",
    },
  },
  work: {
    uk: {
      title: "Портфоліо — Андрій Куршацов",
      description: "Вибрані кейси, продуктові запуски та брендингові проєкти Андрія Куршацова.",
    },
    en: {
      title: "Work — Andrii Kurshatsov",
      description: "Selected case studies, product launches and branding work by Andrii Kurshatsov.",
    },
  },
  testimonials: {
    uk: {
      title: "Відгуки клієнтів — Андрій Куршацов",
      description: "Що говорять засновники та підприємці про роботу з Андрієм Куршацовим.",
    },
    en: {
      title: "Clients — Andrii Kurshatsov",
      description: "What founders and operators say about working with Andrii Kurshatsov.",
    },
  },
  faq: {
    uk: {
      title: "Питання та відповіді — Андрій Куршацов",
      description: "Відповіді на найпоширеніші запитання про співпрацю з Андрієм Куршацовим.",
    },
    en: {
      title: "FAQ — Andrii Kurshatsov",
      description: "Answers to the most common questions about working with Andrii Kurshatsov.",
    },
  },
  contact: {
    uk: {
      title: "Контакти — Андрій Куршацов",
      description: "Напишіть Андрію Куршацову в Telegram, Instagram або через форму на сайті.",
    },
    en: {
      title: "Contact — Andrii Kurshatsov",
      description: "Write to Andrii Kurshatsov via Telegram, Instagram or the contact form.",
    },
  },
};

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function applySeo(entry: SeoEntry) {
  if (typeof document === "undefined") return;
  document.title = entry.title;
  setMeta('meta[name="description"]', "name", "description", entry.description);
  setMeta('meta[property="og:title"]', "property", "og:title", entry.title);
  setMeta('meta[property="og:description"]', "property", "og:description", entry.description);
  setMeta('meta[name="twitter:title"]', "name", "twitter:title", entry.title);
  setMeta('meta[name="twitter:description"]', "name", "twitter:description", entry.description);
}

/** Mount in a page component to apply (and live-update) SEO based on locale + DB overrides. */
export function useSeo(page: string) {
  const { lang } = useI18n();
  const locale: SeoLocale = lang === "ua" ? "uk" : "en";
  const fallback = SEO_DEFAULTS[page]?.[locale] ?? { title: "", description: "" };
  const [entry, setEntry] = useState<SeoEntry>(fallback);

  useEffect(() => {
    let cancelled = false;
    // Apply fallback immediately so something is set even before fetch resolves.
    applySeo(fallback);
    supabase
      .from("seo_meta")
      .select("title,description")
      .eq("page", page)
      .eq("locale", locale)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const next: SeoEntry = {
          title: data?.title?.trim() ? data.title : fallback.title,
          description: data?.description?.trim() ? data.description : fallback.description,
        };
        setEntry(next);
        applySeo(next);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, locale]);

  return entry;
}
