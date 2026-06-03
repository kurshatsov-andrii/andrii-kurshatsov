import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/site/sections";
import { useSeo } from "@/lib/seo";
import { getSeoForPage } from "@/lib/seo.functions";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  loader: () => getSeoForPage({ data: { page: "services" } }),
  head: ({ loaderData }) => {
    const title = loaderData?.title || "Services — Andrii Kurshatsov";
    const description = loaderData?.description || "Brand strategy, product design, and launch partnerships.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: "https://andrii-kurshatsov.lovable.app/services" }],
    };
  },
});

function ServicesPage() {
  useSeo("services");
  return (
    <div className="pt-32">
      <Services />
    </div>
  );
}
