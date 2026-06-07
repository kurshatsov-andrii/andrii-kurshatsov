import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { adminLoadTable } from "@/lib/adminSupabase";
import { TextField, FileUpload } from "@/components/admin/Fields";
import { Plus, Trash2, Save, ChevronUp, ChevronDown } from "lucide-react";
import type { TestimonialRow } from "@/lib/usePageData";

export const Route = createFileRoute("/admin/testimonials")({ component: AdminTestimonials });

type Draft = Omit<TestimonialRow, "id"> & { id?: string };

function AdminTestimonials() {
  const [items, setItems] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await adminLoadTable<TestimonialRow>("testimonials", "select=*&order=sort_order.asc");
    if (error) console.error("[admin] testimonials load:", error);
    setItems(data);
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
      { name: "", role_uk: "", role_en: "", text_uk: "", text_en: "", avatar_url: null, rating: 5, sort_order: items.length + 1 },
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
    if (!confirm("Видалити цей відгук?")) return;
    if (it.id) {
      const { error } = await supabase.from("testimonials").delete().eq("id", it.id);
      if (error) return alert(error.message);
    }
    setItems(items.filter((_, j) => j !== i));
  };

  const saveAll = async () => {
    setSaving(true);
    for (const it of items) {
      const payload = {
        name: it.name,
        role_uk: it.role_uk,
        role_en: it.role_en,
        text_uk: it.text_uk,
        text_en: it.text_en,
        avatar_url: it.avatar_url,
        rating: it.rating,
        sort_order: it.sort_order,
        updated_at: new Date().toISOString(),
      };
      if (it.id) {
        const { error } = await supabase.from("testimonials").update(payload).eq("id", it.id);
        if (error) { alert(error.message); setSaving(false); return; }
      } else {
        const { error } = await supabase.from("testimonials").insert(payload);
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
            <TextField label="Імʼя" value={it.name} onChange={(v) => update(i, { name: v })} />
            <TextField label="Рейтинг (1-5)" type="number" value={String(it.rating)} onChange={(v) => update(i, { rating: Math.max(1, Math.min(5, parseInt(v) || 5)) })} />
            <TextField label="Посада (UA)" value={it.role_uk} onChange={(v) => update(i, { role_uk: v })} />
            <TextField label="Role (EN)" value={it.role_en} onChange={(v) => update(i, { role_en: v })} />
            <TextField label="Відгук (UA)" multiline value={it.text_uk} onChange={(v) => update(i, { text_uk: v })} />
            <TextField label="Quote (EN)" multiline value={it.text_en} onChange={(v) => update(i, { text_en: v })} />
          </div>
          <FileUpload
            bucket="site"
            accept="image/*"
            label="Аватар (необов.)"
            currentUrl={it.avatar_url}
            onUploaded={(url) => update(i, { avatar_url: url })}
            folder="testimonials"
          />
        </div>
      ))}
      <div className="flex gap-3">
        <button onClick={add} className="glass rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> Додати відгук
        </button>
        <button onClick={saveAll} disabled={saving} className="btn-electric rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2 disabled:opacity-60">
          <Save className="h-4 w-4" /> {saving ? "Збереження…" : "Зберегти все"}
        </button>
      </div>
    </div>
  );
}
