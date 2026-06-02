import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/sections";
import { useSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Andrii Kurshatsov" },
      { name: "description", content: "Andrii Kurshatsov — strategist and product designer partnering with founders to ship category-defining digital products." },
      { property: "og:title", content: "About — Andrii Kurshatsov" },
      { property: "og:description", content: "Strategist and product designer for founders building premium digital products." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  useSeo("about");
  return (
    <div className="pt-32">
      <About />
    </div>
  );
}
