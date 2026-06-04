import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/about", label: t("nav.about") },
    { to: "/services", label: t("nav.services") },
    { to: "/work", label: t("nav.work") },
    { to: "/portfolio/songs", label: t("work.cat.songs") },
    { to: "/portfolio/ads", label: t("work.cat.ads") },
    { to: "/portfolio/clips", label: t("work.cat.clips") },
    { to: "/testimonials", label: t("nav.clients") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="container-px mx-auto max-w-7xl">
        <nav className={`glass flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${scrolled ? "shadow-soft" : ""}`}>
          <Link to="/" className="font-display font-semibold tracking-tight text-base">
            Andrii<span className="text-electric-gradient">.</span>
          </Link>
          <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="hover:text-foreground transition-colors duration-300"
                  activeProps={{ className: "text-foreground" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {mobileOpen && (
          <div className="md:hidden mt-2 glass rounded-2xl px-5 py-4 animate-fade-in">
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1 hover:text-foreground transition-colors duration-300"
                    activeProps={{ className: "text-foreground" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
