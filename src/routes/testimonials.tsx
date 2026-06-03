import { createFileRoute } from "@tanstack/react-router";
import { Testimonials } from "@/components/site/sections";
import { useSeo } from "@/lib/seo";
import { getSeoForPage } from "@/lib/seo.functions";

export const Route = createFileRoute("/testimonials")({
  component: TestimonialsPage,
  loader: () => getSeoForPage({ data: { page: "testimonials" } }),
  head: ({ loaderData }) => {
    const title = loaderData?.title || "Clients — Andrii Kurshatsov";
    const description = loaderData?.description || "Testimonials from founders and operators.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: "https://andrii-kurshatsov.lovable.app/testimonials" }],
    };
  },
});

function TestimonialsPage() {
  useSeo("testimonials");
  return (
    <div className="pt-32">
      <Testimonials />
    </div>
  );
}
