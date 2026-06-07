import { useCallback, useEffect, useState } from "react";
import { adminLoadTable } from "@/lib/adminSupabase";

const LOAD_TIMEOUT_MS = 16_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Час очікування вичерпано")), ms),
    ),
  ]);
}

export function useAdminTable<T>(table: string, query: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await withTimeout(adminLoadTable<T>(table, query), LOAD_TIMEOUT_MS);
      if (result.error) {
        setError(result.error.message);
        setData([]);
      } else {
        setData(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [table, query]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, error, reload };
}

export function AdminLoadError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm space-y-3">
      <p className="text-destructive">Не вдалося завантажити дані: {message}</p>
      <button onClick={onRetry} className="glass rounded-full px-4 py-2 text-sm">
        Спробувати знову
      </button>
    </div>
  );
}
