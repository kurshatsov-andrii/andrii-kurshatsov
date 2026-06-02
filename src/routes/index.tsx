import { createFileRoute } from "@tanstack/react-router";
import {
  Hero, About, Services, Portfolio, Achievements,
  Testimonials, FAQ, Contact,
} from "@/components/site/sections";
import { useSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Andrii Kurshatsov — Brand & Product Strategist for Founders" },
      { name: "description", content: "Premium brand strategy, product design and launch partnerships for founders building category-defining companies." },
      { property: "og:title", content: "Andrii Kurshatsov — Brand & Product Strategist" },
      { property: "og:description", content: "Premium brand and product design for founders building category-defining companies." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "https://andrii-kurshatsov.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Andrii Kurshatsov",
          jobTitle: "Brand & Product Strategist",
          url: "https://andrii-kurshatsov.lovable.app/",
          sameAs: ["https://t.me/"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How do engagements typically start?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We begin with a 30-minute fit call, then a paid discovery sprint (1–2 weeks) to align on scope, success metrics and timeline.",
              },
            },
            {
              "@type": "Question",
              name: "Do you work solo or with a team?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Both. Brand and strategy work I lead personally; larger product engagements bring in a vetted studio team of 2–6 senior craftspeople.",
              },
            },
            {
              "@type": "Question",
              name: "What's your typical timeline?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Brand sprints: 4–6 weeks. Product MVPs: 8–14 weeks. Ongoing retainers start at 3 months.",
              },
            },
            {
              "@type": "Question",
              name: "Where are you based?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kyiv-based, working with founders across EU, UK and the Americas. Async-first with weekly syncs.",
              },
            },
            {
              "@type": "Question",
              name: "Do you take equity?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Selectively. For exceptional teams I'm open to a blended cash + equity arrangement.",
              },
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  useSeo("home");
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Achievements />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
