import { createFileRoute } from "@tanstack/react-router";
import { PortfolioCategorySection } from "@/components/site/PortfolioCategorySection";
import { useSeo } from "@/lib/seo";
import { getSeoForPage } from "@/lib/seo.functions";

export const Route = createFileRoute("/portfolio/ads")({
  component: PortfolioAdsPage,
  loader: () => getSeoForPage({ data: { page: "portfolio_ads" } }),
  head: ({ loaderData }) => {
    const title = loaderData?.title || "AI Ads — Andrii Kurshatsov Portfolio";
    const description = loaderData?.description || "AI ad campaigns and creatives by Andrii Kurshatsov.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: "https://andrii-kurshatsov.lovable.app/portfolio/ads" }],
    };
  },
});

function PortfolioAdsPage() {
  useSeo("portfolio_ads");
  return (
    <div className="pt-32">
      <PortfolioCategorySection category="ads" />
    </div>
  );
}
