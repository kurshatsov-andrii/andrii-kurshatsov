import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { adminLoadTable } from "@/lib/adminSupabase";
import { SEO_DEFAULTS, SEO_PAGES, type SeoLocale } from "@/lib/seo";
import { Save, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/admin/seo")({ component: AdminSeo });

type Row = { title: string; description: string };
type State = Record<string, Record<SeoLocale, Row>>;

const TITLE_MAX = 60;
const DESC_MAX = 160;

function AdminSeo() {
  const [state, setState] = useState<State>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await adminLoadTable<{ page: string; locale: SeoLocale; title: string; description: string }>(
      "seo_meta",
      "select=*",
    );
    if (error) console.error("[admin] seo load:", error);
    const next: State = {};
    for (const p of SEO_PAGES) {
      next[p.key] = {
        uk: { title: "", description: "" },
        en: { title: "", description: "" },
      };
    }
    for (const row of data ?? []) {
      if (!next[row.page]) continue;
      const locale = (row.locale as SeoLocale);
      if (locale !== "uk" && locale !== "en") continue;
      next[row.page][locale] = {
        title: row.title ?? "",
        description: row.description ?? "",
      };
    }
    setState(next);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const update = (page: string, locale: SeoLocale, key: keyof Row, value: string) => {
    setState((s) => ({
      ...s,
      [page]: { ...s[page], [locale]: { ...s[page][locale], [key]: value } },
    }));
  };

  const resetToDefault = (page: string, locale: SeoLocale) => {
    const d = SEO_DEFAULTS[page][locale];
    setState((s) => ({
      ...s,
      [page]: { ...s[page], [locale]: { title: d.title, description: d.description } },
    }));
  };

  const save = async () => {
    setSaving(true);
    const payload: { page: string; locale: SeoLocale; title: string; description: string; updated_at: string }[] = [];
    for (const p of SEO_PAGES) {
      for (const l of ["uk", "en"] as SeoLocale[]) {
        const row = state[p.key][l];
        payload.push({
          page: p.key,
          locale: l,
          title: row.title,
          description: row.description,
          updated_at: new Date().toISOString(),
        });
      }
    }
    const { error } = await supabase.from("seo_meta").upsert(payload, { onConflict: "page,locale" });
    setSaving(false);
    if (error) alert(error.message);
    else alert("SEO збережено");
  };

  if (loading) return <div className="text-muted-foreground">Завантаження…</div>;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-2xl">SEO — заголовки та описи</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Тайтл до {TITLE_MAX} символів, опис до {DESC_MAX} символів. Якщо поле порожнє — використається значення за замовчуванням.
        </p>
      </div>

      {SEO_PAGES.map((p) => (
        <div key={p.key} className="glass rounded-2xl p-6 space-y-6">
          <h3 className="font-display text-lg">{p.label}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {(["uk", "en"] as SeoLocale[]).map((l) => {
              const row = state[p.key][l];
              const def = SEO_DEFAULTS[p.key][l];
              const titleLen = row.title.length;
              const descLen = row.description.length;
              return (
                <div key={l} className="space-y-3 rounded-xl border border-border/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {l === "uk" ? "Українська" : "English"}
                    </span>
                    <button
                      type="button"
                      onClick={() => resetToDefault(p.key, l)}
                      className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                    >
                      <RotateCcw className="h-3 w-3" /> За замовчуванням
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm text-muted-foreground">SEO Title</label>
                      <span className={`text-xs ${titleLen > TITLE_MAX ? "text-destructive" : "text-muted-foreground"}`}>
                        {titleLen}/{TITLE_MAX}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={row.title}
                      placeholder={def.title}
                      onChange={(e) => update(p.key, l, "title", e.target.value)}
                      className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm text-foreground"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm text-muted-foreground">SEO Description</label>
                      <span className={`text-xs ${descLen > DESC_MAX ? "text-destructive" : "text-muted-foreground"}`}>
                        {descLen}/{DESC_MAX}
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={row.description}
                      placeholder={def.description}
                      onChange={(e) => update(p.key, l, "description", e.target.value)}
                      className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm text-foreground resize-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={save}
        disabled={saving}
        className="btn-electric rounded-full px-6 py-2.5 text-sm inline-flex items-center gap-2 disabled:opacity-60"
      >
        <Save className="h-4 w-4" /> {saving ? "Збереження…" : "Зберегти SEO"}
      </button>
    </div>
  );
}
