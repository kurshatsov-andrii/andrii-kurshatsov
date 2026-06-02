import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/components/site/sections";
import { useSeo } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ — Andrii Kurshatsov" },
      { name: "description", content: "Answers to the most common questions about working with Andrii Kurshatsov." },
      { property: "og:title", content: "FAQ — Andrii Kurshatsov" },
      { property: "og:description", content: "Common questions about engagements, scope, and process." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
});

function FaqPage() {
  useSeo("faq");
  return (
    <div className="pt-32">
      <FAQ />
    </div>
  );
}
