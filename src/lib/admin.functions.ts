import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import type { User } from "@supabase/supabase-js";
import {
  fetchAdminTable,
  readAccessTokenFromRequest,
  sanitizeAdminQuery,
} from "./adminServerFetch";
import { readSessionFromCookie } from "./adminSession";

export const getAdminSessionUser = createServerFn({ method: "GET" }).handler(
  async (): Promise<User | null> => {
    try {
      const request = getRequest();
      const session = readSessionFromCookie(request.headers.get("cookie"));
      return (session?.user as User) ?? null;
    } catch {
      return null;
    }
  },
);

export const adminFetchTable = createServerFn({ method: "GET" })
  .inputValidator((data: { table: string; query?: string }) => {
    if (!data?.table) throw new Error("Invalid table");
    return {
      table: data.table,
      query: sanitizeAdminQuery(data.query ?? "select=*"),
    };
  })
  .handler(async ({ data }): Promise<{ data: unknown[]; error: string | null }> => {
    try {
      const request = getRequest();
      const token = readAccessTokenFromRequest(
        request.headers.get("cookie"),
        request.headers.get("authorization"),
      );
      return fetchAdminTable(token, data.table, data.query);
    } catch (error) {
      return {
        data: [],
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });
