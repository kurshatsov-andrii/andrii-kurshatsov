import { createFileRoute } from "@tanstack/react-router";
import { Portfolio, Achievements } from "@/components/site/sections";
import { useSeo } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Work — Andrii Kurshatsov" },
      { name: "description", content: "Selected case studies and product launches by Andrii Kurshatsov." },
      { property: "og:title", content: "Work — Andrii Kurshatsov" },
      { property: "og:description", content: "Selected case studies and product launches." },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
});

function WorkPage() {
  useSeo("work");
  return (
    <div className="pt-32">
      <Portfolio />
      <Achievements />
    </div>
  );
}
