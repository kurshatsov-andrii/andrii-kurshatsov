import { createFileRoute } from "@tanstack/react-router";
import { Testimonials } from "@/components/site/sections";
import { useSeo } from "@/lib/seo";

export const Route = createFileRoute("/testimonials")({
  component: TestimonialsPage,
  head: () => ({
    meta: [
      { title: "Clients — Andrii Kurshatsov" },
      { name: "description", content: "What founders and operators say about working with Andrii Kurshatsov." },
      { property: "og:title", content: "Clients — Andrii Kurshatsov" },
      { property: "og:description", content: "Testimonials from founders and operators." },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
});

function TestimonialsPage() {
  useSeo("testimonials");
  return (
    <div className="pt-32">
      <Testimonials />
    </div>
  );
}
