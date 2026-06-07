import { supabase } from "@/integrations/supabase/client";
import {
  ADMIN_LOCAL_STORAGE_KEY,
  readAdminSession,
  readSessionFromCookie,
  SUPABASE_STORAGE_KEY,
  type AdminSessionPayload,
} from "./adminSession";
import { REQUEST_TIMEOUT_MS } from "./adminConstants";

const AUTH_SYNC_TIMEOUT_MS = 3_000;

declare global {
  interface Window {
    __ADMIN_SESSION__?: AdminSessionPayload;
  }
}

type RestResult<T> = { data: T | null; error: Error | null };

function getSupabaseConfig(): { url: string; key: string } | null {
  const url = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function syncAdminSessionToSupabaseStorage(): AdminSessionPayload | null {
  const session = readAdminSession();
  if (!session || typeof window === "undefined") return session;

  const json = JSON.stringify(session);
  localStorage.setItem(ADMIN_LOCAL_STORAGE_KEY, json);
  try {
    localStorage.setItem(SUPABASE_STORAGE_KEY, json);
  } catch {
    // ignore quota errors
  }
  return session;
}

export function getAdminAccessToken(): string | null {
  if (typeof window !== "undefined") {
    const inline = window.__ADMIN_SESSION__;
    if (inline?.access_token) return inline.access_token;

    const fromCookie = readSessionFromCookie(document.cookie);
    if (fromCookie?.access_token) return fromCookie.access_token;
  }
  return syncAdminSessionToSupabaseStorage()?.access_token ?? null;
}
export async function ensureSupabaseAuth(): Promise<string | null> {
  const session = syncAdminSessionToSupabaseStorage();
  if (!session) return null;

  try {
    await Promise.race([
      supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("auth sync timeout")), AUTH_SYNC_TIMEOUT_MS),
      ),
    ]);
  } catch {
    // Local dev may fail Supabase network calls — token still works for REST.
  }

  return session.access_token;
}

async function adminRestFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<RestResult<T>> {
  const token = getAdminAccessToken();
  const config = getSupabaseConfig();

  if (!token || !config) {
    return { data: null, error: new Error("Missing admin auth or Supabase config") };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${config.url}/rest/v1/${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ...(init.headers ?? {}),
      },
    });

    if (!res.ok) {
      const body = await res.text();
      return { data: null, error: new Error(body || `HTTP ${res.status}`) };
    }

    if (res.status === 204) {
      return { data: null, error: null };
    }

    const text = await res.text();
    if (!text) return { data: null, error: null };
    return { data: JSON.parse(text) as T, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function adminRestGet<T>(path: string): Promise<RestResult<T>> {
  return adminRestFetch<T>(path);
}

export async function adminRestPost<T>(path: string, body: unknown): Promise<RestResult<T>> {
  return adminRestFetch<T>(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });
}

export async function adminRestPatch<T>(path: string, body: unknown): Promise<RestResult<T>> {
  return adminRestFetch<T>(path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });
}

export async function adminRestDelete(path: string): Promise<RestResult<null>> {
  return adminRestFetch<null>(path, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  });
}

export async function adminLoadTable<T>(
  table: string,
  query = "select=*",
): Promise<{ data: T[]; error: Error | null }> {
  const token = getAdminAccessToken();
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const params = new URLSearchParams({ table, query });
    const headers: Record<string, string> = { Accept: "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`/api/admin/table?${params.toString()}`, {
      credentials: "include",
      signal: controller.signal,
      headers,
    });

    const body = (await res.json()) as { data?: T[]; error?: string | null };
    if (body.error) {
      return { data: [], error: new Error(body.error) };
    }
    return { data: (body.data ?? []) as T[], error: null };
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error : new Error(String(error)),
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}