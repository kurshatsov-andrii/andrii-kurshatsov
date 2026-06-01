import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TextField } from "@/components/admin/Fields";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/pages")({ component: AdminPages });

type Locale = "uk" | "en";

type Field = { key: string; label: string; multiline?: boolean; placeholder?: string };
type Section = { key: string; label: string; fields: Field[] };
type PageDef = { page: string; label: string; sections: Section[] };

const PAGES: PageDef[] = [
  {
    page: "home",
    label: "Головна (Hero)",
    sections: [
      {
        key: "hero",
        label: "Hero блок",
        fields: [
          { key: "badge", label: "Бейдж (зверху)" },
          { key: "title_1", label: "Заголовок — рядок 1" },
          { key: "title_2", label: "Заголовок — рядок 2 (виділено)" },
          { key: "title_3", label: "Заголовок — рядок 3" },
          { key: "intro", label: "Інтро / опис", multiline: true },
          { key: "cta_primary", label: "Основна кнопка" },
          { key: "cta_telegram", label: "Кнопка Telegram" },
          { key: "currently", label: "Картка «Зараз» — підпис" },
          { key: "currently_text", label: "Картка «Зараз» — текст" },
          { key: "scroll", label: "Підпис прокрутки" },
        ],
      },
      {
        key: "hero_stats",
        label: "Hero — статистика",
        fields: [
          { key: "s1_value", label: "Показник 1 — значення", placeholder: "120+" },
          { key: "s1_label", label: "Показник 1 — підпис" },
          { key: "s2_value", label: "Показник 2 — значення" },
          { key: "s2_label", label: "Показник 2 — підпис" },
          { key: "s3_value", label: "Показник 3 — значення" },
          { key: "s3_label", label: "Показник 3 — підпис" },
        ],
      },
    ],
  },
  {
    page: "about",
    label: "Про мене",
    sections: [
      {
        key: "main",
        label: "Основне",
        fields: [
          { key: "kicker", label: "Підпис" },
          { key: "title", label: "Заголовок", multiline: true },
          { key: "body", label: "Текст", multiline: true },
          { key: "skill_1", label: "Навичка 1" },
          { key: "skill_2", label: "Навичка 2" },
          { key: "skill_3", label: "Навичка 3" },
          { key: "skill_4", label: "Навичка 4" },
        ],
      },
      {
        key: "timeline",
        label: "Таймлайн (4 пункти)",
        fields: [
          { key: "y1", label: "Рік 1" }, { key: "t1", label: "Заголовок 1" }, { key: "d1", label: "Опис 1", multiline: true },
          { key: "y2", label: "Рік 2" }, { key: "t2", label: "Заголовок 2" }, { key: "d2", label: "Опис 2", multiline: true },
          { key: "y3", label: "Рік 3" }, { key: "t3", label: "Заголовок 3" }, { key: "d3", label: "Опис 3", multiline: true },
          { key: "y4", label: "Рік 4" }, { key: "t4", label: "Заголовок 4" }, { key: "d4", label: "Опис 4", multiline: true },
        ],
      },
    ],
  },
  {
    page: "services",
    label: "Послуги — заголовок",
    sections: [
      {
        key: "intro",
        label: "Інтро",
        fields: [
          { key: "kicker", label: "Підпис" },
          { key: "title", label: "Заголовок", multiline: true },
          { key: "cta", label: "Текст кнопки на картці" },
        ],
      },
    ],
  },
  {
    page: "contact",
    label: "Контакти",
    sections: [
      {
        key: "intro",
        label: "Інтро",
        fields: [
          { key: "kicker", label: "Підпис" },
          { key: "title", label: "Заголовок" },
          { key: "body", label: "Текст", multiline: true },
          { key: "socials_kicker", label: "Підпис над соцмережами" },
        ],
      },
      {
        key: "quick",
        label: "Швидкий зв'язок",
        fields: [
          { key: "label", label: "Підпис блоку", placeholder: "Швидкий зв'язок: Telegram або Instagram" },
          { key: "telegram_url", label: "Посилання на Telegram", placeholder: "https://t.me/username" },
          { key: "instagram_url", label: "Посилання на Instagram", placeholder: "https://instagram.com/username" },
        ],
      },
    ],
  },
  {
    page: "faq",
    label: "FAQ — заголовок",
    sections: [
      {
        key: "intro",
        label: "Інтро",
        fields: [
          { key: "kicker", label: "Підпис" },
          { key: "title", label: "Заголовок", multiline: true },
        ],
      },
    ],
  },
  {
    page: "testimonials",
    label: "Відгуки — заголовок",
    sections: [
      {
        key: "intro",
        label: "Інтро",
        fields: [
          { key: "kicker", label: "Підпис" },
          { key: "title", label: "Заголовок", multiline: true },
        ],
      },
    ],
  },
];

function AdminPages() {
  const [activePage, setActivePage] = useState(PAGES[0].page);
  const [locale, setLocale] = useState<Locale>("uk");
  const [data, setData] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const def = PAGES.find((p) => p.page === activePage)!;

  const load = async () => {
    setLoading(true);
    const { data: rows } = await supabase
      .from("page_sections")
      .select("*")
      .eq("page", activePage)
      .eq("locale", locale);
    const map: Record<string, Record<string, string>> = {};
    for (const sec of def.sections) {
      const row = rows?.find((r: any) => r.section_key === sec.key);
      map[sec.key] = ((row?.data as Record<string, string>) ?? {});
    }
    setData(map);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, locale]);

  const save = async () => {
    setSaving(true);
    for (const sec of def.sections) {
      const { error } = await supabase
        .from("page_sections")
        .upsert(
          { page: activePage, section_key: sec.key, locale, data: data[sec.key] ?? {}, updated_at: new Date().toISOString() },
          { onConflict: "page,section_key,locale" }
        );
      if (error) {
        alert(error.message);
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    alert("Збережено");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {PAGES.map((p) => (
            <button
              key={p.page}
              onClick={() => setActivePage(p.page)}
              className={`px-4 py-2 rounded-full text-sm ${activePage === p.page ? "bg-foreground text-background" : "glass"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="glass rounded-full p-1 inline-flex">
          {(["uk", "en"] as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase ${locale === l ? "bg-foreground text-background" : ""}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Завантаження…</div>
      ) : (
        <div className="space-y-6">
          {def.sections.map((sec) => (
            <div key={sec.key} className="glass rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-lg">{sec.label}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {sec.fields.map((f) => (
                  <div key={f.key} className={f.multiline ? "md:col-span-2" : ""}>
                    <TextField
                      label={f.label}
                      multiline={f.multiline}
                      placeholder={f.placeholder}
                      value={data[sec.key]?.[f.key] ?? ""}
                      onChange={(v) => setData({ ...data, [sec.key]: { ...(data[sec.key] ?? {}), [f.key]: v } })}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={save}
            disabled={saving}
            className="btn-electric rounded-full px-6 py-2.5 text-sm inline-flex items-center gap-2 disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {saving ? "Збереження…" : "Зберегти"}
          </button>
        </div>
      )}
    </div>
  );
}
