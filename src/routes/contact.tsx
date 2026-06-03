import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/sections";
import { useSeo } from "@/lib/seo";
import { getSeoForPage } from "@/lib/seo.functions";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  loader: () => getSeoForPage({ data: { page: "contact" } }),
  head: ({ loaderData }) => {
    const title = loaderData?.title || "Contact — Andrii Kurshatsov";
    const description = loaderData?.description || "Write to Andrii Kurshatsov via Telegram, Instagram, or the contact form.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: "https://andrii-kurshatsov.lovable.app/contact" }],
    };
  },
});

function ContactPage() {
  useSeo("contact");
  return (
    <div className="pt-32">
      <Contact />
    </div>
  );
}
