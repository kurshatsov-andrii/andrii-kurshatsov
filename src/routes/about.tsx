import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/sections";
import { useSeo } from "@/lib/seo";
import { getSeoForPage } from "@/lib/seo.functions";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  loader: () => getSeoForPage({ data: { page: "about" } }),
  head: ({ loaderData }) => {
    const title = loaderData?.title || "About — Andrii Kurshatsov";
    const description = loaderData?.description || "Strategist and product designer for founders building premium digital products.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: "https://andrii-kurshatsov.lovable.app/about" }],
    };
  },
});

function AboutPage() {
  useSeo("about");
  return (
    <div className="pt-32">
      <About />
    </div>
  );
}
