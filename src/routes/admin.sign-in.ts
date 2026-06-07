import { createFileRoute } from "@tanstack/react-router";

const PRODUCTION_OAUTH_BROKER =
  "https://andrii-kurshatsov.lovable.app/~oauth/initiate";
const PORT80_CALLBACK = "http://127.0.0.1/iframe-oauth/callback";

function generateState(): string {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    return [...crypto.getRandomValues(new Uint8Array(16))]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const Route = createFileRoute("/admin/sign-in")({
  server: {
    handlers: {
      GET: async () => {
        const params = new URLSearchParams({
          provider: "google",
          redirect_uri: PORT80_CALLBACK,
          state: generateState(),
        });

        return new Response(null, {
          status: 302,
          headers: {
            Location: `${PRODUCTION_OAUTH_BROKER}?${params.toString()}`,
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
