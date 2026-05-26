import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import {
  Hero, About, Services, Portfolio, Achievements,
  Testimonials, FAQ, Contact, Footer, FloatingTelegram,
} from "@/components/site/sections";

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
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Andrii Kurshatsov",
        jobTitle: "Brand & Product Strategist",
        url: "/",
        sameAs: ["https://t.me/"],
      }),
    }],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Achievements />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingTelegram />
    </main>
  );
}
