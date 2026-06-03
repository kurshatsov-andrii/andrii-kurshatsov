import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/components/site/sections";
import { useSeo } from "@/lib/seo";
import { getSeoForPage } from "@/lib/seo.functions";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  loader: () => getSeoForPage({ data: { page: "faq" } }),
  head: ({ loaderData }) => {
    const title = loaderData?.title || "FAQ — Andrii Kurshatsov";
    const description = loaderData?.description || "Common questions about engagements, scope, and process.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: "https://andrii-kurshatsov.lovable.app/faq" }],
    };
  },
});

function FaqPage() {
  useSeo("faq");
  return (
    <div className="pt-32">
      <FAQ />
    </div>
  );
}
