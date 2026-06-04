import { useEffect, useState } from "react";
import { Play, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { PORTFOLIO_CATEGORIES, type PortfolioCategoryKey, type PortfolioRow } from "@/lib/portfolio";
import { Reveal } from "./Reveal";
import { MediaModal } from "./MediaModal";

export function PortfolioCategorySection({ category }: { category: PortfolioCategoryKey }) {
  const { lang } = useI18n();
  const isUk = lang === "ua";
  const [items, setItems] = useState<PortfolioRow[]>([]);
  const [modalItem, setModalItem] = useState<PortfolioRow | null>(null);

  useEffect(() => {
    supabase
      .from("portfolio_items")
      .select("*")
      .eq("category", category)
      .order("sort_order")
      .then(({ data }) => setItems((data ?? []) as PortfolioRow[]));
  }, [category]);

  const meta = PORTFOLIO_CATEGORIES.find((c) => c.key === category)!;
  const label = isUk ? meta.labelUk : meta.labelEn;

  return (
    <section className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            {isUk ? "Портфоліо" : "Portfolio"}
          </div>
          <h1 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-2xl text-gradient">
            {label}
          </h1>
        </Reveal>

        <div className="mt-14">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-20 glass rounded-3xl">
              {isUk ? "Скоро тут зʼявляться роботи." : "Work coming soon."}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, i) => {
                const title = (isUk ? item.title_uk : item.title_en) || item.title_uk || item.title_en;
                const desc = (isUk ? item.description_uk : item.description_en) || "";
                const hasMedia = !!(item.video_url || item.audio_url);
                return (
                  <Reveal key={item.id} delay={i * 80}>
                    <article
                      onClick={() => {
                        if (hasMedia) setModalItem(item);
                        else if (item.external_url) window.open(item.external_url, "_blank");
                      }}
                      className="glass rounded-3xl overflow-hidden h-full flex flex-col hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 cursor-pointer"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                        {item.cover_url && (
                          <img
                            src={item.cover_url}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            loading="lazy"
                          />
                        )}
                        {item.video_platform && (
                          <span className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 text-xs text-white inline-flex items-center gap-1.5 capitalize">
                            <Video className="h-3 w-3" /> {item.video_platform}
                          </span>
                        )}
                        {item.audio_url && (
                          <button
                            aria-label="Play"
                            className="absolute bottom-4 left-4 h-12 w-12 rounded-full glass flex items-center justify-center text-white hover:scale-110 transition-transform"
                          >
                            <Play className="h-5 w-5 fill-current ml-0.5" />
                          </button>
                        )}
                      </div>
                      <div className="p-6 flex flex-col gap-3 flex-1">
                        <h2 className="font-display text-xl">{title}</h2>
                        {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {modalItem && <MediaModal item={modalItem} onClose={() => setModalItem(null)} />}
    </section>
  );
}
