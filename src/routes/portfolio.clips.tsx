import { createFileRoute } from "@tanstack/react-router";
import { PortfolioCategorySection } from "@/components/site/PortfolioCategorySection";
import { useSeo } from "@/lib/seo";
import { getSeoForPage } from "@/lib/seo.functions";

export const Route = createFileRoute("/portfolio/clips")({
  component: PortfolioClipsPage,
  loader: () => getSeoForPage({ data: { page: "portfolio_clips" } }),
  head: ({ loaderData }) => {
    const title = loaderData?.title || "AI Clips — Andrii Kurshatsov Portfolio";
    const description = loaderData?.description || "AI music clips and short-form videos by Andrii Kurshatsov.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: "https://andrii-kurshatsov.lovable.app/portfolio/clips" }],
    };
  },
});

function PortfolioClipsPage() {
  useSeo("portfolio_clips");
  return (
    <div className="pt-32">
      <PortfolioCategorySection category="clips" />
    </div>
  );
}
