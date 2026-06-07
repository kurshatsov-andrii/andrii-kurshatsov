import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { adminRestDelete, adminRestPatch, adminRestPost, ensureSupabaseAuth } from "@/lib/adminSupabase";
import { AdminLoadError, useAdminTable } from "@/lib/useAdminTable";
import { PORTFOLIO_CATEGORIES, detectPlatform, type PortfolioRow } from "@/lib/portfolio";
import { FileUpload, TextField } from "@/components/admin/Fields";
import { Plus, Trash2, Save, Pencil, X } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: AdminPortfolio });

const emptyItem = (): Omit<PortfolioRow, "id"> => ({
  category: "songs",
  title_uk: "",
  title_en: "",
  description_uk: "",
  description_en: "",
  cover_url: null,
  video_url: null,
  video_platform: null,
  audio_url: null,
  external_url: null,
  tags: [],
  sort_order: 0,
});

function AdminPortfolio() {
  const { data: items, loading, error, reload } = useAdminTable<PortfolioRow>(
    "portfolio_items",
    "select=*&order=category.asc,sort_order.asc",
  );
  const [editing, setEditing] = useState<(Omit<PortfolioRow, "id"> & { id?: string }) | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const save = async () => {
    if (!editing) return;
    await ensureSupabaseAuth();
    const payload = { ...editing };
    if (payload.video_url && !payload.video_platform) {
      payload.video_platform = detectPlatform(payload.video_url);
    }
    if (payload.id) {
      const { id, ...rest } = payload;
      const { error } = await adminRestPatch(`portfolio_items?id=eq.${encodeURIComponent(id)}`, rest);
      if (error) return alert(error.message);
    } else {
      const { id: _ignored, ...rest } = payload;
      const { error } = await adminRestPost("portfolio_items", rest);
      if (error) return alert(error.message);
    }
    setEditing(null);
    reload();
  };

  const remove = async (id: string) => {
    if (!confirm("Видалити цю роботу?")) return;
    await ensureSupabaseAuth();
    const { error } = await adminRestDelete(`portfolio_items?id=eq.${encodeURIComponent(id)}`);
    if (error) return alert(error.message);
    reload();
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm ${filter === "all" ? "bg-foreground text-background" : "glass"}`}
          >
            Всі
          </button>
          {PORTFOLIO_CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`px-4 py-2 rounded-full text-sm ${filter === c.key ? "bg-foreground text-background" : "glass"}`}
            >
              {c.labelUk}
            </button>
          ))}
        </div>
        <button
          onClick={() => setEditing(emptyItem())}
          className="btn-electric rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Нова робота
        </button>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Завантаження…</div>
      ) : error ? (
        <AdminLoadError message={error} onRetry={() => void reload()} />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="glass rounded-2xl overflow-hidden">
              {item.cover_url && (
                <img src={item.cover_url} alt={item.title_uk} className="w-full aspect-video object-cover" />
              )}
              <div className="p-4 space-y-2">
                <div className="text-xs text-electric uppercase tracking-wider">
                  {PORTFOLIO_CATEGORIES.find((c) => c.key === item.category)?.labelUk}
                </div>
                <h3 className="font-display text-lg leading-tight">{item.title_uk || item.title_en}</h3>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setEditing(item)}
                    className="rounded-full px-3 py-1.5 text-xs glass inline-flex items-center gap-1.5"
                  >
                    <Pencil className="h-3 w-3" /> Редаг.
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="rounded-full px-3 py-1.5 text-xs text-destructive border border-destructive/30 inline-flex items-center gap-1.5"
                  >
                    <Trash2 className="h-3 w-3" /> Видал.
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-muted-foreground col-span-full text-center py-12">Поки немає робіт.</div>
          )}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center overflow-y-auto p-4">
          <div className="bg-background border border-border rounded-2xl max-w-2xl w-full my-8 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">{editing.id ? "Редагувати роботу" : "Нова робота"}</h2>
              <button onClick={() => setEditing(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs text-muted-foreground">Категорія</span>
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value as PortfolioRow["category"] })}
                className="w-full rounded-xl bg-input/50 border border-border px-3 py-2 text-sm"
              >
                {PORTFOLIO_CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.labelUk}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid md:grid-cols-2 gap-3">
              <TextField label="Назва (UA)" value={editing.title_uk} onChange={(v) => setEditing({ ...editing, title_uk: v })} />
              <TextField label="Title (EN)" value={editing.title_en} onChange={(v) => setEditing({ ...editing, title_en: v })} />
            </div>
            <TextField label="Опис (UA)" multiline value={editing.description_uk ?? ""} onChange={(v) => setEditing({ ...editing, description_uk: v })} />
            <TextField label="Description (EN)" multiline value={editing.description_en ?? ""} onChange={(v) => setEditing({ ...editing, description_en: v })} />

            <FileUpload
              bucket="portfolio"
              accept="image/*"
              label="Обкладинка"
              currentUrl={editing.cover_url}
              onUploaded={(url) => setEditing({ ...editing, cover_url: url })}
              folder="covers"
            />
            <TextField label="…або вставте URL обкладинки" value={editing.cover_url ?? ""} onChange={(v) => setEditing({ ...editing, cover_url: v || null })} />

            <FileUpload
              bucket="portfolio"
              accept="audio/*"
              label="Аудіо файл (для пісень)"
              currentUrl={editing.audio_url}
              onUploaded={(url) => setEditing({ ...editing, audio_url: url })}
              folder="audio"
            />

            <TextField
              label="URL відео (YouTube / Instagram / TikTok)"
              value={editing.video_url ?? ""}
              onChange={(v) =>
                setEditing({ ...editing, video_url: v || null, video_platform: detectPlatform(v) })
              }
              placeholder="https://youtu.be/…"
            />

            <TextField
              label="Зовнішнє посилання (Web / GitHub)"
              value={editing.external_url ?? ""}
              onChange={(v) => setEditing({ ...editing, external_url: v || null })}
            />

            <TextField
              label="Теги (через кому)"
              value={editing.tags.join(", ")}
              onChange={(v) => setEditing({ ...editing, tags: v.split(",").map((t) => t.trim()).filter(Boolean) })}
            />

            <TextField
              label="Порядок сортування"
              type="number"
              value={String(editing.sort_order)}
              onChange={(v) => setEditing({ ...editing, sort_order: parseInt(v) || 0 })}
            />

            <div className="flex gap-2 pt-2">
              <button onClick={save} className="btn-electric rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2">
                <Save className="h-4 w-4" /> Зберегти
              </button>
              <button onClick={() => setEditing(null)} className="glass rounded-full px-5 py-2.5 text-sm">
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
