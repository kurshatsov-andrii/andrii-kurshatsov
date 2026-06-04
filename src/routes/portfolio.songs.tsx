import { createFileRoute } from "@tanstack/react-router";
import { PortfolioCategorySection } from "@/components/site/PortfolioCategorySection";
import { useSeo } from "@/lib/seo";
import { getSeoForPage } from "@/lib/seo.functions";

export const Route = createFileRoute("/portfolio/songs")({
  component: PortfolioSongsPage,
  loader: () => getSeoForPage({ data: { page: "portfolio_songs" } }),
  head: ({ loaderData }) => {
    const title = loaderData?.title || "AI Songs — Andrii Kurshatsov Portfolio";
    const description = loaderData?.description || "AI-generated songs and brand tracks by Andrii Kurshatsov.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: "https://andrii-kurshatsov.lovable.app/portfolio/songs" }],
    };
  },
});

function PortfolioSongsPage() {
  useSeo("portfolio_songs");
  return (
    <div className="pt-32">
      <PortfolioCategorySection category="songs" />
    </div>
  );
}
