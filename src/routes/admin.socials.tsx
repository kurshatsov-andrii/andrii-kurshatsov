import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { adminLoadTable } from "@/lib/adminSupabase";
import { TextField } from "@/components/admin/Fields";
import { Plus, Trash2, Save } from "lucide-react";

export const Route = createFileRoute("/admin/socials")({ component: AdminSocials });

type Social = { id?: string; platform: string; url: string; label: string | null; sort_order: number };

const PLATFORMS = ["telegram", "instagram", "tiktok", "youtube", "facebook", "twitter", "linkedin", "github", "viber", "email", "phone", "website"];

function AdminSocials() {
  const [items, setItems] = useState<Social[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await adminLoadTable<Social>("social_links", "select=*&order=sort_order.asc");
    if (error) console.error("[admin] socials load:", error);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const add = () =>
    setItems([...items, { platform: "telegram", url: "", label: "", sort_order: items.length }]);

  const update = (i: number, patch: Partial<Social>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    setItems(next);
  };

  const remove = async (i: number) => {
    const it = items[i];
    if (it.id) {
      const { error } = await supabase.from("social_links").delete().eq("id", it.id);
      if (error) return alert(error.message);
    }
    setItems(items.filter((_, j) => j !== i));
  };

  const saveAll = async () => {
    for (const it of items) {
      if (!it.url) continue;
      if (it.id) {
        const { id, ...rest } = it;
        const { error } = await supabase.from("social_links").update(rest).eq("id", id);
        if (error) return alert(error.message);
      } else {
        const { id: _i, ...rest } = it;
        const { error } = await supabase.from("social_links").insert(rest);
        if (error) return alert(error.message);
      }
    }
    alert("Збережено");
    load();
  };

  if (loading) return <div className="text-muted-foreground">Завантаження…</div>;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="glass rounded-2xl p-4 grid md:grid-cols-[160px_1fr_1fr_auto] gap-3 items-end">
            <label className="block space-y-1.5">
              <span className="text-xs text-muted-foreground">Платформа</span>
              <select
                value={it.platform}
                onChange={(e) => update(i, { platform: e.target.value })}
                className="w-full rounded-xl bg-input/50 border border-border px-3 py-2 text-sm text-foreground"
              >
                {PLATFORMS.map((p) => <option key={p} value={p} className="bg-background text-foreground">{p}</option>)}
              </select>

            </label>
            <TextField label="URL" value={it.url} onChange={(v) => update(i, { url: v })} placeholder="https://..." />
            <TextField label="Підпис (необов.)" value={it.label ?? ""} onChange={(v) => update(i, { label: v })} />
            <button onClick={() => remove(i)} className="rounded-full p-2 text-destructive border border-destructive/30 self-center">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={add} className="glass rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> Додати
        </button>
        <button onClick={saveAll} className="btn-electric rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2">
          <Save className="h-4 w-4" /> Зберегти все
        </button>
      </div>
    </div>
  );
}
