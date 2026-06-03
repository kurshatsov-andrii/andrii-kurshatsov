import { createFileRoute } from "@tanstack/react-router";
import { Portfolio, Achievements } from "@/components/site/sections";
import { useSeo } from "@/lib/seo";
import { getSeoForPage } from "@/lib/seo.functions";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  loader: () => getSeoForPage({ data: { page: "work" } }),
  head: ({ loaderData }) => {
    const title = loaderData?.title || "Work — Andrii Kurshatsov";
    const description = loaderData?.description || "Selected case studies and product launches.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: "https://andrii-kurshatsov.lovable.app/work" }],
    };
  },
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
