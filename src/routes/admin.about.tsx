import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { adminLoadTable } from "@/lib/adminSupabase";
import { FileUpload } from "@/components/admin/Fields";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/about")({ component: AdminAbout });

function AdminAbout() {
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await adminLoadTable<{ key: string; url: string }>(
      "site_assets",
      "select=*&key=eq.about_photo&limit=1",
    );
    if (error) console.error("[admin] about load:", error);
    setPhotoUrl(data[0]?.url ?? "");
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (url: string) => {
    setPhotoUrl(url);
    const { error } = await supabase
      .from("site_assets")
      .upsert({ key: "about_photo", url, updated_at: new Date().toISOString() }, { onConflict: "key" });
    if (error) alert(error.message);
  };

  if (loading) return <div className="text-muted-foreground">Завантаження…</div>;

  return (
    <div className="max-w-xl space-y-6">
      <div className="glass rounded-2xl p-6 space-y-4">
        <h3 className="font-display text-lg">Фото профілю</h3>
        {photoUrl && (
          <img src={photoUrl} alt="Profile" className="rounded-2xl w-full max-w-sm aspect-[4/5] object-cover" />
        )}
        <FileUpload
          bucket="site"
          accept="image/*"
          label="Завантажити нове фото"
          currentUrl={photoUrl}
          onUploaded={save}
          folder="about"
        />
        <p className="text-xs text-muted-foreground">
          Це фото використовується на головній сторінці (Hero) та сторінці «Про мене».
        </p>
      </div>
    </div>
  );
}
