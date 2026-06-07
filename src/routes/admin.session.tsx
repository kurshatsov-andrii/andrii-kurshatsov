import { createFileRoute } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";
import {
  buildAdminSession,
  readTokensFromUrl,
  sessionCookieHeader,
} from "@/lib/adminSession";

function sessionErrorHtml(message: string): string {
  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="utf-8" />
  <title>Помилка входу</title>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; min-height: 100vh; align-items: center; justify-content: center; margin: 0; background: #f5f5f4; color: #444; }
    .box { text-align: center; max-width: 480px; padding: 2rem; }
    .err { color: #b91c1c; line-height: 1.5; word-break: break-word; }
    a { color: #2563eb; }
  </style>
</head>
<body>
  <div class="box">
    <p class="err">${message}</p>
    <p style="margin-top:1.5rem"><a href="/admin/sign-in">Спробувати знову</a></p>
  </div>
</body>
</html>`;
}

export const Route = createFileRoute("/admin/session")({
  server: {
    handlers: {
      GET: async () => {
        const request = getRequest();
        const url = new URL(request.url);
        const tokens = readTokensFromUrl(url);

        if (!tokens.accessToken || !tokens.refreshToken) {
          return new Response(sessionErrorHtml("Токени авторизації не знайдено"), {
            status: 400,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }

        try {
          const session = buildAdminSession(
            tokens.accessToken,
            tokens.refreshToken,
          );
          return new Response(null, {
            status: 302,
            headers: {
              Location: "/admin",
              "Set-Cookie": sessionCookieHeader(session),
              "Cache-Control": "no-store",
            },
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Невалідні токени";
          return new Response(sessionErrorHtml(message), {
            status: 400,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }
      },
    },
  },
});
