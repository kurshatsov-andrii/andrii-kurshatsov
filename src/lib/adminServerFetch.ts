import { readSessionFromCookie } from "./adminSession";
import { ALLOWED_ADMIN_TABLES, REQUEST_TIMEOUT_MS } from "./adminConstants";

let devDispatcher: import("undici").Agent | undefined;

async function getDevFetchInit(): Promise<{ dispatcher?: import("undici").Agent }> {
  if (process.env.NODE_ENV === "production") return {};
  if (!devDispatcher) {
    const { Agent } = await import("undici");
    devDispatcher = new Agent({ connect: { rejectUnauthorized: false } });
  }
  return { dispatcher: devDispatcher };
}

export { ALLOWED_ADMIN_TABLES, REQUEST_TIMEOUT_MS };

export function getSupabaseServerEnv(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function sanitizeAdminQuery(query: string): string {
  const trimmed = query.trim();
  if (!trimmed || trimmed.includes(";")) throw new Error("Invalid query");
  return trimmed.slice(0, 512);
}

export function readAccessTokenFromRequest(
  cookieHeader: string | null | undefined,
  authorizationHeader: string | null | undefined,
): string | null {
  if (authorizationHeader?.startsWith("Bearer ")) {
    const token = authorizationHeader.slice(7).trim();
    if (token) return token;
  }
  return readSessionFromCookie(cookieHeader)?.access_token ?? null;
}

export async function serverAdminRestGet<T>(
  accessToken: string,
  table: string,
  query: string,
): Promise<{ data: T | null; error: string | null }> {
  const config = getSupabaseServerEnv();
  if (!config) return { data: null, error: "Missing Supabase config" };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${config.url}/rest/v1/${table}?${query}`, {
      signal: controller.signal,
      ...(await getDevFetchInit()),
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const body = await res.text();
      return { data: null, error: body || `HTTP ${res.status}` };
    }

    const text = await res.text();
    if (!text) return { data: null, error: null };
    return { data: JSON.parse(text) as T, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchAdminTable(
  accessToken: string | null,
  table: string,
  query: string,
): Promise<{ data: unknown[]; error: string | null }> {
  if (!accessToken) return { data: [], error: "Unauthorized" };
  if (!ALLOWED_ADMIN_TABLES.has(table)) return { data: [], error: "Invalid table" };

  const result = await serverAdminRestGet<unknown[]>(accessToken, table, query);
  return { data: result.data ?? [], error: result.error };
}
