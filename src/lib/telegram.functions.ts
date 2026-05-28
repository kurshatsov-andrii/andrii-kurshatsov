import { createServerFn } from "@tanstack/react-start";

type Payload = {
  type: "brief" | "contact";
  fields: Record<string, string>;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatMessage(data: Payload): string {
  const title = data.type === "brief" ? "📝 Новий бриф" : "✉️ Нове повідомлення";
  const lines = [`<b>${title}</b>`, ""];
  for (const [k, v] of Object.entries(data.fields)) {
    if (!v) continue;
    lines.push(`<b>${escapeHtml(k)}:</b> ${escapeHtml(String(v))}`);
  }
  return lines.join("\n");
}

export const sendTelegram = createServerFn({ method: "POST" })
  .inputValidator((data: Payload) => {
    if (!data || (data.type !== "brief" && data.type !== "contact")) {
      throw new Error("Invalid type");
    }
    if (!data.fields || typeof data.fields !== "object") {
      throw new Error("Invalid fields");
    }
    const fields: Record<string, string> = {};
    for (const [k, v] of Object.entries(data.fields)) {
      const key = String(k).slice(0, 64);
      const val = String(v ?? "").slice(0, 2000);
      fields[key] = val;
    }
    return { type: data.type, fields };
  })
  .handler(async ({ data }) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      throw new Error("Telegram is not configured");
    }
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatMessage(data),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("Telegram send failed:", res.status, body);
      throw new Error("Failed to send message");
    }
    return { ok: true };
  });
