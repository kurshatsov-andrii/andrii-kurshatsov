import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
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
    { to: "/testimonials", label: t("nav.clients") },
    { to: "/faq", label: t("nav.faq") },
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
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Send className="h-3.5 w-3.5" /> {t("nav.cta")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
