import { createFileRoute } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";
import {
  ALLOWED_ADMIN_TABLES,
  fetchAdminTable,
  readAccessTokenFromRequest,
  sanitizeAdminQuery,
} from "@/lib/adminServerFetch";

export const Route = createFileRoute("/api/admin/table")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const request = getRequest();
          const url = new URL(request.url);
          const table = url.searchParams.get("table") ?? "";
          const query = sanitizeAdminQuery(url.searchParams.get("query") ?? "select=*");

          if (!ALLOWED_ADMIN_TABLES.has(table)) {
            return Response.json({ data: [], error: "Invalid table" }, { status: 400 });
          }

          const token = readAccessTokenFromRequest(
            request.headers.get("cookie"),
            request.headers.get("authorization"),
          );

          const result = await fetchAdminTable(token, table, query);
          const status = result.error === "Unauthorized" ? 401 : result.error ? 502 : 200;
          return Response.json(result, { status, headers: { "Cache-Control": "no-store" } });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          return Response.json({ data: [], error: message }, { status: 500 });
        }
      },
    },
  },
});
