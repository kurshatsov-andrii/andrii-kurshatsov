import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/useAuth";

export function FileUpload({
  bucket,
  accept,
  label,
  currentUrl,
  onUploaded,
  folder = "",
}: {
  bucket: string;
  accept: string;
  label: string;
  currentUrl?: string | null;
  onUploaded: (url: string) => void;
  folder?: string;
}) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    if (!user) return;
    setError(null);
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${folder ? folder + "/" : ""}${user.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
        upsert: false,
        contentType: file.type,
      });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onUploaded(data.publicUrl);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs text-muted-foreground block">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept={accept}
          disabled={uploading}
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          className="text-xs file:mr-3 file:rounded-full file:border-0 file:bg-foreground file:text-background file:px-4 file:py-2 file:text-xs file:cursor-pointer"
        />
        {uploading && <span className="text-xs text-muted-foreground">Завантаження…</span>}
      </div>
      {currentUrl && (
        <div className="text-xs text-muted-foreground truncate">
          <a href={currentUrl} target="_blank" rel="noreferrer" className="text-electric hover:underline">
            {currentUrl.split("/").pop()}
          </a>
        </div>
      )}
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  multiline,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full rounded-xl bg-input/50 border border-border px-3 py-2 text-sm outline-none focus:border-electric resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl bg-input/50 border border-border px-3 py-2 text-sm outline-none focus:border-electric"
        />
      )}
    </label>
  );
}
