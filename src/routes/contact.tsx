import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/sections";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Andrii Kurshatsov" },
      { name: "description", content: "Write to Andrii Kurshatsov via Telegram, Instagram, or the contact form." },
      { property: "og:title", content: "Contact — Andrii Kurshatsov" },
      { property: "og:description", content: "Reach out via Telegram, Instagram, or the contact form." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <div className="pt-32">
      <Contact />
    </div>
  );
}
