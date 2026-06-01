import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TextField } from "@/components/admin/Fields";
import { Plus, Trash2, Save, ChevronUp, ChevronDown } from "lucide-react";
import type { ServiceRow } from "@/lib/usePageData";

export const Route = createFileRoute("/admin/services")({ component: AdminServices });

type Draft = Omit<ServiceRow, "id"> & { id?: string };

const ICON_OPTIONS = ["Sparkles", "Compass", "Layers", "Rocket", "LineChart", "Music", "Video", "Globe", "Play", "Star", "Mail", "Send"];

function AdminServices() {
  const [items, setItems] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("services_items").select("*").order("sort_order");
    setItems((data ?? []) as ServiceRow[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const update = (i: number, patch: Partial<Draft>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    setItems(next);
  };

  const add = () =>
    setItems([
      ...items,
      { icon: "Sparkles", title_uk: "", title_en: "", desc_uk: "", desc_en: "", price_uk: "", price_en: "", sort_order: items.length + 1 },
    ]);

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    next.forEach((it, idx) => (it.sort_order = idx + 1));
    setItems(next);
  };

  const remove = async (i: number) => {
    const it = items[i];
    if (!confirm("Видалити цю послугу?")) return;
    if (it.id) {
      const { error } = await supabase.from("services_items").delete().eq("id", it.id);
      if (error) return alert(error.message);
    }
    setItems(items.filter((_, j) => j !== i));
  };

  const saveAll = async () => {
    setSaving(true);
    for (const it of items) {
      const payload = {
        icon: it.icon,
        title_uk: it.title_uk,
        title_en: it.title_en,
        desc_uk: it.desc_uk,
        desc_en: it.desc_en,
        price_uk: it.price_uk,
        price_en: it.price_en,
        sort_order: it.sort_order,
        updated_at: new Date().toISOString(),
      };
      if (it.id) {
        const { error } = await supabase.from("services_items").update(payload).eq("id", it.id);
        if (error) { alert(error.message); setSaving(false); return; }
      } else {
        const { error } = await supabase.from("services_items").insert(payload);
        if (error) { alert(error.message); setSaving(false); return; }
      }
    }
    setSaving(false);
    alert("Збережено");
    load();
  };

  if (loading) return <div className="text-muted-foreground">Завантаження…</div>;

  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <div key={it.id ?? `new-${i}`} className="glass rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">№ {i + 1}</span>
            <div className="flex gap-1">
              <button onClick={() => move(i, -1)} className="p-1.5 glass rounded-full"><ChevronUp className="h-3.5 w-3.5" /></button>
              <button onClick={() => move(i, 1)} className="p-1.5 glass rounded-full"><ChevronDown className="h-3.5 w-3.5" /></button>
              <button onClick={() => remove(i)} className="p-1.5 text-destructive border border-destructive/30 rounded-full"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <label className="block space-y-1.5">
              <span className="text-xs text-muted-foreground">Іконка</span>
              <select
                value={it.icon}
                onChange={(e) => update(i, { icon: e.target.value })}
                className="w-full rounded-xl bg-input/50 border border-border px-3 py-2 text-sm text-foreground"
              >
                {ICON_OPTIONS.map((p) => <option key={p} value={p} className="bg-background text-foreground">{p}</option>)}
              </select>
            </label>
            <div />
            <TextField label="Назва (UA)" value={it.title_uk} onChange={(v) => update(i, { title_uk: v })} />
            <TextField label="Title (EN)" value={it.title_en} onChange={(v) => update(i, { title_en: v })} />
            <TextField label="Опис (UA)" multiline value={it.desc_uk} onChange={(v) => update(i, { desc_uk: v })} />
            <TextField label="Description (EN)" multiline value={it.desc_en} onChange={(v) => update(i, { desc_en: v })} />
            <TextField label="Ціна (UA)" value={it.price_uk} onChange={(v) => update(i, { price_uk: v })} placeholder="від €8тис." />
            <TextField label="Price (EN)" value={it.price_en} onChange={(v) => update(i, { price_en: v })} placeholder="from €8k" />
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        <button onClick={add} className="glass rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> Додати послугу
        </button>
        <button onClick={saveAll} disabled={saving} className="btn-electric rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2 disabled:opacity-60">
          <Save className="h-4 w-4" /> {saving ? "Збереження…" : "Зберегти все"}
        </button>
      </div>
    </div>
  );
}
