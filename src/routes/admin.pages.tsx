import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TextField } from "@/components/admin/Fields";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/pages")({ component: AdminPages });

type Locale = "uk" | "en";

type PageDef = {
  page: string;
  label: string;
  sections: { key: string; label: string; fields: { key: string; label: string; multiline?: boolean }[] }[];
};

const PAGES: PageDef[] = [
  {
    page: "home",
    label: "Головна (Hero)",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Бейдж" },
          { key: "title", label: "Заголовок", multiline: true },
          { key: "intro", label: "Інтро", multiline: true },
          { key: "cta_primary", label: "Основна кнопка" },
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
          { key: "title", label: "Заголовок" },
          { key: "body", label: "Текст", multiline: true },
        ],
      },
    ],
  },
  {
    page: "services",
    label: "Послуги",
    sections: [
      {
        key: "intro",
        label: "Інтро",
        fields: [
          { key: "kicker", label: "Підпис" },
          { key: "title", label: "Заголовок" },
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
        ],
      },
    ],
  },
  {
    page: "faq",
    label: "FAQ",
    sections: [
      {
        key: "intro",
        label: "Інтро",
        fields: [
          { key: "kicker", label: "Підпис" },
          { key: "title", label: "Заголовок" },
        ],
      },
    ],
  },
  {
    page: "testimonials",
    label: "Відгуки",
    sections: [
      {
        key: "intro",
        label: "Інтро",
        fields: [
          { key: "kicker", label: "Підпис" },
          { key: "title", label: "Заголовок" },
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
      map[sec.key] = (row?.data as Record<string, string>) ?? {};
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
              {sec.fields.map((f) => (
                <TextField
                  key={f.key}
                  label={f.label}
                  multiline={f.multiline}
                  value={data[sec.key]?.[f.key] ?? ""}
                  onChange={(v) => setData({ ...data, [sec.key]: { ...(data[sec.key] ?? {}), [f.key]: v } })}
                />
              ))}
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
