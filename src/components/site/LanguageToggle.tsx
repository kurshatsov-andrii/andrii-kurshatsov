import { useI18n, type Lang } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const opts: Lang[] = ["en", "ua"];
  return (
    <div className="glass relative inline-flex items-center rounded-full p-1 text-xs font-medium">
      <span
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: lang === "en" ? "translateX(0)" : "translateX(100%)" }}
      />
      {opts.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 px-3 py-1.5 rounded-full uppercase tracking-wider transition-colors duration-300 ${
            lang === l ? "text-background" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
