import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { adminLoadTable } from "@/lib/adminSupabase";
import { TextField } from "@/components/admin/Fields";
import { Plus, Trash2, Save, ChevronUp, ChevronDown } from "lucide-react";
import type { FaqRow } from "@/lib/usePageData";

export const Route = createFileRoute("/admin/faq")({ component: AdminFaq });

type FaqDraft = Omit<FaqRow, "id"> & { id?: string };

function AdminFaq() {
  const [items, setItems] = useState<FaqDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await adminLoadTable<FaqRow>("faq_items", "select=*&order=sort_order.asc");
    if (error) console.error("[admin] faq load:", error);
    setItems(data);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const update = (i: number, patch: Partial<FaqDraft>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    setItems(next);
  };

  const add = () =>
    setItems([
      ...items,
      { question_uk: "", question_en: "", answer_uk: "", answer_en: "", sort_order: items.length + 1 },
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
    if (!confirm("Видалити це питання?")) return;
    if (it.id) {
      const { error } = await supabase.from("faq_items").delete().eq("id", it.id);
      if (error) return alert(error.message);
    }
    setItems(items.filter((_, j) => j !== i));
  };

  const saveAll = async () => {
    setSaving(true);
    for (const it of items) {
      const payload = {
        question_uk: it.question_uk,
        question_en: it.question_en,
        answer_uk: it.answer_uk,
        answer_en: it.answer_en,
        sort_order: it.sort_order,
        updated_at: new Date().toISOString(),
      };
      if (it.id) {
        const { error } = await supabase.from("faq_items").update(payload).eq("id", it.id);
        if (error) { alert(error.message); setSaving(false); return; }
      } else {
        const { error } = await supabase.from("faq_items").insert(payload);
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
              <TextField label="Питання (UA)" value={it.question_uk} onChange={(v) => update(i, { question_uk: v })} />
              <TextField label="Question (EN)" value={it.question_en} onChange={(v) => update(i, { question_en: v })} />
              <TextField label="Відповідь (UA)" multiline value={it.answer_uk} onChange={(v) => update(i, { answer_uk: v })} />
              <TextField label="Answer (EN)" multiline value={it.answer_en} onChange={(v) => update(i, { answer_en: v })} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={add} className="glass rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> Додати питання
        </button>
        <button onClick={saveAll} disabled={saving} className="btn-electric rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2 disabled:opacity-60">
          <Save className="h-4 w-4" /> {saving ? "Збереження…" : "Зберегти все"}
        </button>
      </div>
    </div>
  );
}
