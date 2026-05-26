import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Send } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#testimonials", label: "Clients" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container-px mx-auto max-w-7xl">
        <nav className={`glass flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${scrolled ? "shadow-soft" : ""}`}>
          <a href="#top" className="font-display font-semibold tracking-tight text-base">
            Andrii<span className="text-electric-gradient">.</span>
          </a>
          <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground transition-colors duration-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Send className="h-3.5 w-3.5" /> Let's talk
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
