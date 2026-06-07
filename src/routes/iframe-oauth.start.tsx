import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import { PORT80_CALLBACK } from "@/lib/adminSignIn";

const PRODUCTION_OAUTH_BROKER =
  "https://andrii-kurshatsov.lovable.app/~oauth/initiate";

const localDevAuth = createLovableAuth({
  oauthBrokerUrl: PRODUCTION_OAUTH_BROKER,
});

export const Route = createFileRoute("/iframe-oauth/start")({
  ssr: false,
  component: OAuthStartFrame,
});

function OAuthStartFrame() {
  const [status, setStatus] = useState("Готово до OAuth…");
  const busy = useRef(false);

  useEffect(() => {
    const inIframe = window.self !== window.top;

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "admin-oauth-start") return;
      void runOAuth(inIframe);
    };

    window.addEventListener("message", onMessage);

    if (inIframe) {
      window.parent.postMessage({ type: "admin-oauth-ready" }, window.location.origin);
    } else {
      void runOAuth(false);
    }

    return () => window.removeEventListener("message", onMessage);
  }, []);

  const runOAuth = async (inIframe: boolean) => {
    if (busy.current) return;
    busy.current = true;
    setStatus("Відкриваємо Google…");

    try {
      const result = await localDevAuth.signInWithOAuth("google", {
        redirect_uri: PORT80_CALLBACK,
      });

      if (result.redirected) {
        setStatus("Перенаправлення…");
        return;
      }

      if (result.error) {
        setStatus(result.error.message);
        if (inIframe) {
          window.parent.postMessage(
            { type: "admin-oauth-error", message: result.error.message },
            window.location.origin,
          );
        }
        busy.current = false;
        return;
      }

      const tokens = result.tokens;
      if (!tokens?.access_token || !tokens?.refresh_token) {
        const message = "Токени не отримано";
        setStatus(message);
        if (inIframe) {
          window.parent.postMessage(
            { type: "admin-oauth-error", message },
            window.location.origin,
          );
        }
        busy.current = false;
        return;
      }

      const next = new URL("/admin/session", window.location.origin);
      next.searchParams.set("access_token", tokens.access_token);
      next.searchParams.set("refresh_token", tokens.refresh_token);

      if (inIframe) {
        window.parent.postMessage(
          {
            type: "admin-oauth-tokens",
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
          },
          window.location.origin,
        );
      } else {
        window.location.replace(next.toString());
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(message);
      if (window.self !== window.top) {
        window.parent.postMessage(
          { type: "admin-oauth-error", message },
          window.location.origin,
        );
      }
      busy.current = false;
    }
  };

  return (
    <div style={{ fontFamily: "system-ui", padding: 24, textAlign: "center" }}>
      {status}
    </div>
  );
}
