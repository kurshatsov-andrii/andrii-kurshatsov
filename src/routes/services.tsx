import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/site/sections";
import { useSeo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Andrii Kurshatsov" },
      { name: "description", content: "Brand strategy, product design, and launch partnerships for ambitious founders and teams." },
      { property: "og:title", content: "Services — Andrii Kurshatsov" },
      { property: "og:description", content: "Brand strategy, product design, and launch partnerships." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

function ServicesPage() {
  useSeo("services");
  return (
    <div className="pt-32">
      <Services />
    </div>
  );
}
