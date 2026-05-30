import { useEffect, useState } from "react";
import {
  ArrowUpRight, Sparkles, LineChart, Rocket, Layers, Compass, Send,
  Mail, ChevronDown, Star, Check, MessageCircle, Github, Linkedin, Twitter,
  Phone, Instagram, Music, Play, Globe, Youtube, Video,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import portrait from "@/assets/andrii-portrait.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";
import { useI18n } from "@/lib/i18n";
import { sendTelegram } from "@/lib/telegram.functions";
import { supabase } from "@/integrations/supabase/client";
import { PORTFOLIO_CATEGORIES, type PortfolioRow } from "@/lib/portfolio";
import { MediaModal } from "./MediaModal";

function useAboutPhoto() {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    supabase.from("site_assets").select("url").eq("key", "about_photo").maybeSingle()
      .then(({ data }) => setUrl(data?.url ?? null));
  }, []);
  return url;
}

function useSocialLinks() {
  const [items, setItems] = useState<{ platform: string; url: string; label: string | null }[]>([]);
  useEffect(() => {
    supabase.from("social_links").select("platform,url,label").order("sort_order")
      .then(({ data }) => setItems((data ?? []) as any));
  }, []);
  return items;
}

const SOCIAL_ICONS: Record<string, React.ComponentType<any>> = {
  telegram: Send, instagram: Instagram, tiktok: Music, youtube: Youtube,
  facebook: Globe, twitter: Twitter, linkedin: Linkedin, github: Github,
  viber: Phone, email: Mail, phone: Phone, website: Globe,
};

/* -------------------- HERO -------------------- */
export function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-60 dark:opacity-90" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-electric/20 blur-[140px] animate-[float_8s_ease-in-out_infinite]" />
      </div>

      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-[1.4fr_1fr] gap-16 items-center">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
              {t("hero.badge")}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-8 font-display font-semibold tracking-tighter text-[clamp(2.75rem,7vw,6rem)] leading-[0.95]">
              {t("hero.title.1")} <span className="text-electric-gradient">{t("hero.title.2")}</span><br />
              {t("hero.title.3")}
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">{t("hero.intro")}</p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="/contact" className="btn-electric hover:btn-electric-hover inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium">
                {t("hero.cta.primary")} <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="https://t.me/" target="_blank" rel="noreferrer"
                 className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium hover:scale-[1.02] transition-transform">
                <Send className="h-4 w-4" /> {t("hero.cta.telegram")}
              </a>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-16 flex items-center gap-8 text-sm text-muted-foreground">
              <div><span className="text-foreground font-semibold text-2xl font-display">120+</span><div className="text-xs mt-1">{t("hero.stats.projects")}</div></div>
              <div className="h-10 w-px bg-border" />
              <div><span className="text-foreground font-semibold text-2xl font-display">9</span><div className="text-xs mt-1">{t("hero.stats.years")}</div></div>
              <div className="h-10 w-px bg-border" />
              <div><span className="text-foreground font-semibold text-2xl font-display">14</span><div className="text-xs mt-1">{t("hero.stats.industries")}</div></div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} className="relative hidden lg:block">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass shadow-elegant">
            <img src={portrait} alt="Andrii Kurshatsov portrait" className="w-full h-full object-cover" width={1024} height={1280} fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">{t("hero.currently")}</div>
              <div className="text-sm font-medium mt-1">{t("hero.currently.text")}</div>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 animate-[float_6s_ease-in-out_infinite]">
            <Sparkles className="h-5 w-5 text-electric" />
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted-foreground">
        <span>{t("hero.scroll")}</span>
        <div className="h-10 w-px bg-gradient-to-b from-electric to-transparent" />
      </div>
    </section>
  );
}

/* -------------------- ABOUT -------------------- */
export function About() {
  const { t } = useI18n();
  const timeline = [
    { year: "2017", title: t("about.tl.1.title"), desc: t("about.tl.1.desc") },
    { year: "2020", title: t("about.tl.2.title"), desc: t("about.tl.2.desc") },
    { year: "2023", title: t("about.tl.3.title"), desc: t("about.tl.3.desc") },
    { year: "2026", title: t("about.tl.4.title"), desc: t("about.tl.4.desc") },
  ];
  const skills = [t("about.skill.1"), t("about.skill.2"), t("about.skill.3"), t("about.skill.4")];

  return (
    <section id="about" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-20">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{t("about.kicker")}</div>
          <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] text-gradient">{t("about.title")}</h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">{t("about.body")}</p>
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
            {skills.map((s) => (
              <div key={s} className="glass rounded-2xl px-4 py-3 text-sm flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-electric" /> {s}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-electric via-border to-transparent" />
          <ul className="space-y-10">
            {timeline.map((tl, i) => (
              <Reveal key={tl.year} delay={i * 120} as="li" className="relative pl-10">
                <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-electric shadow-[0_0_20px_var(--electric)]" />
                <div className="text-xs text-electric font-mono">{tl.year}</div>
                <div className="font-display text-xl mt-1">{tl.title}</div>
                <div className="text-muted-foreground mt-1">{tl.desc}</div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------- SERVICES -------------------- */
export function Services() {
  const { t } = useI18n();
  const services = [
    { icon: Compass, title: t("services.1.title"), desc: t("services.1.desc"), price: t("services.1.price") },
    { icon: Layers, title: t("services.2.title"), desc: t("services.2.desc"), price: t("services.2.price") },
    { icon: Rocket, title: t("services.3.title"), desc: t("services.3.desc"), price: t("services.3.price") },
    { icon: LineChart, title: t("services.4.title"), desc: t("services.4.desc"), price: t("services.4.price") },
  ];
  return (
    <section id="services" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{t("services.kicker")}</div>
          <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-3xl text-gradient">{t("services.title")}</h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="group glass rounded-3xl p-8 h-full hover:-translate-y-1 transition-all duration-500 hover:shadow-elegant relative overflow-hidden">
                <div className="absolute inset-0 bg-[var(--gradient-radial)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center">
                      <s.icon className="h-5 w-5 text-electric" />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{s.price}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                  <a href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-electric transition-colors">
                    {t("services.cta")} <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <BriefForm />
        </div>
      </div>
    </section>
  );
}

/* -------------------- BRIEF FORM -------------------- */
export function BriefForm() {
  const { t } = useI18n();
  const serviceOptions = [
    t("brief.svc.1"), t("brief.svc.2"), t("brief.svc.3"), t("brief.svc.4"),
  ];
  const channels = [
    { key: "telegram", label: "Telegram" },
    { key: "viber", label: "Viber" },
    { key: "phone", label: t("brief.channel.phone") },
  ];
  const [service, setService] = useState(serviceOptions[0]);
  const [channel, setChannel] = useState("telegram");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const send = useServerFn(sendTelegram);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      await send({
        data: {
          type: "brief",
          fields: {
            "Послуга": service,
            "Опис": desc,
            "Імʼя": name,
            "Канал звʼязку": channel,
            "Контакт": contact,
          },
        },
      });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setDesc(""); setName(""); setContact("");
    } catch (err) {
      console.error(err);
      setError("Не вдалося надіслати. Спробуйте ще раз.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Reveal>
      <form onSubmit={onSubmit} className="glass rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-5">{t("brief.kicker")}</div>
        <h3 className="font-display font-semibold tracking-tighter text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] max-w-2xl">
          {t("brief.title")}
        </h3>

        <div className="mt-10">
          <div className="text-sm text-muted-foreground mb-3">{t("brief.service")}</div>
          <div className="flex flex-wrap gap-2.5">
            {serviceOptions.map((s) => {
              const active = service === s;
              return (
                <button type="button" key={s} onClick={() => setService(s)}
                  className={`rounded-full px-5 py-2.5 text-sm transition-all border ${active ? "bg-foreground text-background border-foreground" : "glass border-border hover:border-foreground/40"}`}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <label className="text-sm text-muted-foreground mb-3 block">{t("brief.desc")}</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={5}
            placeholder={t("brief.desc.placeholder")}
            className="w-full rounded-2xl glass border border-border bg-transparent px-5 py-4 text-base placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-electric/40 resize-none" />
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-muted-foreground mb-3 block">{t("brief.name")}</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="w-full h-12 rounded-2xl glass border border-border bg-transparent px-5 text-base focus:outline-none focus:ring-2 focus:ring-electric/40" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-3">{t("brief.channel")}</div>
            <div className="flex flex-wrap gap-2.5">
              {channels.map((c) => {
                const active = channel === c.key;
                return (
                  <button type="button" key={c.key} onClick={() => setChannel(c.key)}
                    className={`rounded-full px-5 py-2.5 text-sm transition-all border ${active ? "bg-foreground text-background border-foreground" : "glass border-border hover:border-foreground/40"}`}>
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <label className="text-sm text-muted-foreground mb-3 block">{t("brief.contact")}</label>
          <input value={contact} onChange={(e) => setContact(e.target.value)}
            placeholder={channel === "phone" ? "+380…" : "@username"} required
            className="w-full h-12 rounded-2xl glass border border-border bg-transparent px-5 text-base placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-electric/40" />
        </div>

        <div className="mt-10 flex items-center gap-4 flex-wrap">
          <button type="submit" disabled={sending} className="btn-electric hover:btn-electric-hover inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium disabled:opacity-60">
            <Sparkles className="h-4 w-4" /> {sending ? "…" : t("brief.submit")}
          </button>
          {sent && (
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-electric" /> {t("brief.sent")}
            </span>
          )}
          {error && <span className="text-sm text-destructive">{error}</span>}
        </div>
      </form>
    </Reveal>
  );
}

/* -------------------- PORTFOLIO -------------------- */
type PortfolioItem = {
  title: string;
  desc: string;
  image: string;
  badge?: string;
  brand?: string;
  tags?: string[];
  links?: { web?: string; github?: string };
};

type PortfolioCategory = {
  key: string;
  label: string;
  variant: "song" | "ad" | "clip" | "code";
  items: PortfolioItem[];
};

export function Portfolio() {
  const { t } = useI18n();
  const categories: PortfolioCategory[] = [
    {
      key: "songs",
      label: t("work.cat.songs"),
      variant: "song",
      items: [
        {
          title: "Біжи як вовк",
          desc: "Біжи як вовк — це мотиваційне віршоване повідомлення про марафон у місті Валки. Текст закликає до перемоги, наполегливості та внутрішньої сили, порівнюючи учасників до вовка — сильного й швидкого.",
          image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80",
          badge: "Rock Run",
          tags: ["rock", "music", "motivation"],
        },
        {
          title: "Біжи. Реєструйся. Перемагай!",
          desc: "Fartlek Events — це платформа для реєстрації на забіги та змагання по Україні. Вона пропонує простий доступ до маршруту через QR-квитки, швидкі результати та підтримку на кожному етапі.",
          image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&q=80",
          badge: "Rock Run",
          tags: ["rock", "music", "motivation"],
        },
        {
          title: "Крок за кроком",
          desc: "Ця пісня пропонує мотиваційний підхід до досягнення цілей — крок за кроком. Вона описує внутрішню боротьбу, рішучість іти вперед, незважаючи на труднощі.",
          image: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=1200&q=80",
          badge: "Rock Run",
          tags: ["rock", "music", "motivation"],
        },
      ],
    },
    {
      key: "ads",
      label: t("work.cat.ads"),
      variant: "ad",
      items: [
        {
          title: "SiS Beta Fuel + Electrolytes",
          desc: "SiS Beta Fuel + Electrolytes — точна енергія без провалу. Для тих, хто не зупиняється. Залишайся невпинним.",
          image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
          badge: "YouTube",
          brand: "SiS",
        },
        {
          title: "Fartlek Events",
          desc: "Fartlek Events — платформа реєстрації на забіги, трейли та змагання по всій Україні.",
          image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
          brand: "Fartlek Events",
        },
        {
          title: "Nike. Just do it.",
          desc: "Разом сильніші, ніж поодинці. Гонка — це не тільки про перемогу. Це про ритм, боротьбу і тих, хто біжить поруч.",
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80",
          brand: "Nike",
        },
      ],
    },
    {
      key: "clips",
      label: t("work.cat.clips"),
      variant: "clip",
      items: [
        {
          title: "Стукіт серця Незламного Ха",
          desc: "Стукіт серця Незламного Ха, Наче шлях, де надія жива, Ритм тримає дороги й вітри, Поки місто живе всупереч тьмі.",
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
          brand: "Гурт Фартлек",
        },
        {
          title: "Біг вранці",
          desc: "Місто ще спить, вулиці німі, Тихо кружляє вітер в тиші. Кроки лунають в ранковій млі, Я оживаю в своєму тілі.",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
          brand: "Гурт Фартлек",
        },
        {
          title: "Біг вночі",
          desc: "Тиша лягла на спини будинків, Місто заснуло, зникають картинки. Серце в грудях — як двигун, Я вдягаю кросівки, я вже в бігу.",
          image: "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=1200&q=80",
          brand: "Гурт Фартлек",
        },
      ],
    },
    {
      key: "code",
      label: t("work.cat.code"),
      variant: "code",
      items: [
        {
          title: "Fartlek Events",
          desc: "Fartlek Events — платформа реєстрації на забіги, трейли та змагання по всій Україні. QR-стартові пакети, миттєві результати, зручні протоколи.",
          image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
          tags: ["React", "Supabase", "Tailwind", "Lovable"],
          links: { web: "#", github: "#" },
        },
        {
          title: "Kurshatsov.AI",
          desc: "Куршацов Андрій — створює AI-контент нового покоління: пісні, відео, рекламу, цифрові продукти та інтерактивні вебпроєкти.",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
          tags: ["React", "Supabase", "Tailwind", "Lovable"],
          links: { web: "#", github: "#" },
        },
        {
          title: "Дашборд спортивних подій України",
          desc: "Сучасна платформа для пошуку забігів, трейлів, велоподій, змагань з плавання, триатлону та мультиспортивних подій по всій Україні.",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
          tags: ["Supabase", "Tailwind", "Next JS", "Cursor"],
          links: { web: "#", github: "#" },
        },
      ],
    },
  ];

  const [active, setActive] = useState(categories[0].key);
  const current = categories.find((c) => c.key === active) ?? categories[0];

  return (
    <section id="work" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{t("work.kicker")}</div>
            <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-2xl text-gradient">
              {t("work.title")}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">{t("work.subtitle")}</p>
          </Reveal>

          <Reveal delay={150}>
            <div className="glass rounded-full p-1.5 inline-flex flex-wrap gap-1">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                    active === c.key
                      ? "bg-foreground text-background shadow-elegant"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {current.items.map((item, i) => (
            <Reveal key={`${current.key}-${item.title}`} delay={i * 100}>
              <article className="glass rounded-3xl overflow-hidden h-full flex flex-col hover:shadow-elegant hover:-translate-y-1 transition-all duration-500">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  {item.badge && (
                    <span className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 text-xs text-white inline-flex items-center gap-1.5">
                      {current.variant === "song" ? <Music className="h-3 w-3" /> : null}
                      {item.badge}
                    </span>
                  )}
                  {current.variant === "song" && (
                    <button
                      aria-label="Play"
                      className="absolute bottom-4 left-4 h-12 w-12 rounded-full glass flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </button>
                  )}
                </div>

                <div className="p-6 flex flex-col gap-3 flex-1">
                  {item.brand && (
                    <div className="text-xs text-muted-foreground">{item.brand}</div>
                  )}
                  <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-electric/15 text-electric"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.links && (
                    <div className="flex items-center gap-5 pt-3 mt-auto text-sm">
                      {item.links.web && (
                        <a href={item.links.web} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                          <Globe className="h-4 w-4" /> Web
                        </a>
                      )}
                      {item.links.github && (
                        <a href={item.links.github} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                          <Github className="h-4 w-4" /> GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* -------------------- ACHIEVEMENTS -------------------- */
export function Achievements() {
  const { t } = useI18n();
  const stats = [
    { value: 120, suffix: "+", label: t("stats.1") },
    { value: 38, suffix: "M€", label: t("stats.2") },
    { value: 9, suffix: "", label: t("stats.3") },
    { value: 98, suffix: "%", label: t("stats.4") },
  ];
  return (
    <section className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="glass rounded-[2rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-electric/20 blur-[120px]" />
            <div className="grid md:grid-cols-4 gap-10 relative">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 100}>
                  <div className="font-display font-semibold tracking-tighter text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-electric-gradient">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- TESTIMONIALS -------------------- */
export function Testimonials() {
  const { t } = useI18n();
  const quotes = [
    { name: "Elena Marchetti", role: "CEO, Northwind Capital", text: t("tst.1") },
    { name: "James Okafor", role: "Founder, Lumen Labs", text: t("tst.2") },
    { name: "Sofia Hartmann", role: "CMO, Halo Audio", text: t("tst.3") },
  ];
  return (
    <section id="testimonials" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{t("tst.kicker")}</div>
          <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-3xl text-gradient">{t("tst.title")}</h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 120}>
              <figure className="glass rounded-3xl p-8 h-full flex flex-col">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-electric text-electric" />
                  ))}
                </div>
                <blockquote className="mt-6 text-lg leading-relaxed text-foreground/90">"{q.text}"</blockquote>
                <figcaption className="mt-8 flex items-center gap-3 pt-6 border-t">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-electric to-blue-700 flex items-center justify-center text-white text-sm font-medium">
                    {q.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{q.name}</div>
                    <div className="text-xs text-muted-foreground">{q.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */
export function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: t("faq.1.q"), a: t("faq.1.a") },
    { q: t("faq.2.q"), a: t("faq.2.a") },
    { q: t("faq.3.q"), a: t("faq.3.a") },
    { q: t("faq.4.q"), a: t("faq.4.a") },
    { q: t("faq.5.q"), a: t("faq.5.a") },
  ];
  return (
    <section id="faq" className="section-pad relative">
      <div className="container-px mx-auto max-w-4xl">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 text-center">{t("faq.kicker")}</div>
          <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-center text-gradient">{t("faq.title")}</h2>
        </Reveal>

        <div className="mt-14 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className="glass rounded-2xl overflow-hidden">
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left">
                    <span className="font-display text-lg">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180 text-electric" : ""}`} />
                  </button>
                  <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- CONTACT -------------------- */
export function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const send = useServerFn(sendTelegram);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      await send({
        data: {
          type: "contact",
          fields: {
            "Імʼя": form.name,
            "Email": form.email,
            "Повідомлення": form.message,
          },
        },
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Не вдалося надіслати. Спробуйте ще раз.");
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { name: "Telegram", href: "https://t.me/", Icon: Send },
    { name: "Viber", href: "viber://chat", Icon: Phone },
    { name: "Instagram", href: "https://instagram.com/", Icon: Instagram },
    { name: "LinkedIn", href: "https://linkedin.com/", Icon: Linkedin },
    { name: "GitHub", href: "https://github.com/", Icon: Github },
    { name: "TikTok", href: "https://tiktok.com/", Icon: Music },
  ];

  return (
    <section id="contact" className="section-pad relative">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 relative">
            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-electric/10 blur-[140px] pointer-events-none" />

            {/* LEFT: form */}
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{t("contact.kicker")}</div>
              <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-gradient">{t("contact.title")}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t("contact.body")}</p>

              {sent ? (
                <div className="mt-10 glass rounded-2xl p-8 flex flex-col items-center text-center animate-[blur-in_0.8s_ease-out]">
                  <div className="h-14 w-14 rounded-full bg-electric/10 flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-electric" />
                  </div>
                  <h3 className="font-display text-xl">{t("contact.success.title")}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{t("contact.success.body")}</p>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-10 space-y-5">
                  <Field label={t("contact.form.name")} value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label={t("contact.form.email")} type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <Field label={t("contact.form.message")} multiline value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
                  <div className="pt-2 flex items-center gap-4 flex-wrap">
                    <button type="submit" disabled={sending} className="btn-electric hover:btn-electric-hover rounded-full px-7 py-3 text-sm font-medium inline-flex items-center gap-2 disabled:opacity-60">
                      <Sparkles className="h-4 w-4" /> {sending ? "…" : t("contact.send")}
                    </button>
                    {error && <span className="text-sm text-destructive">{error}</span>}
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT: socials */}
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{t("contact.socials")}</div>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass rounded-2xl px-5 py-5 flex items-center gap-3 hover:scale-[1.02] hover:border-electric/40 transition-all group"
                  >
                    <Icon className="h-5 w-5 text-electric group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{name}</span>
                  </a>
                ))}
              </div>

              <div className="mt-3 glass rounded-2xl px-5 py-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MessageCircle className="h-4 w-4 text-electric" />
                  <span>{t("contact.quick")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a href="https://t.me/" target="_blank" rel="noreferrer"
                     className="rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity">
                    Telegram
                  </a>
                  <a href="https://instagram.com/" target="_blank" rel="noreferrer"
                     className="rounded-full border border-border px-5 py-2 text-sm font-medium hover:border-electric/60 hover:text-foreground transition-colors">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;
  return (
    <label className="block relative">
      <span className={`absolute left-4 transition-all duration-300 pointer-events-none ${
        float ? "top-2 text-[10px] uppercase tracking-wider text-electric" : "top-5 text-sm text-muted-foreground"
      }`}>{label}</span>
      {multiline ? (
        <textarea rows={5} value={value} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl bg-input/50 border border-border pt-7 pb-3 px-4 text-sm outline-none focus:border-electric transition-colors resize-none" />
      ) : (
        <input type={type} value={value} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl bg-input/50 border border-border pt-7 pb-3 px-4 text-sm outline-none focus:border-electric transition-colors" />
      )}
    </label>
  );
}

/* -------------------- FOOTER -------------------- */
export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="container-px mx-auto max-w-7xl flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display font-semibold">Andrii<span className="text-electric-gradient">.</span></span>
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} — {t("footer.rights")}</span>
        </div>
        <div className="flex items-center gap-5 text-muted-foreground">
          <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors"><Twitter className="h-4 w-4" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-foreground transition-colors"><Linkedin className="h-4 w-4" /></a>
          <a href="#" aria-label="GitHub" className="hover:text-foreground transition-colors"><Github className="h-4 w-4" /></a>
          <a href="https://t.me/" target="_blank" rel="noreferrer" aria-label="Telegram" className="hover:text-foreground transition-colors"><Send className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- FLOATING TELEGRAM -------------------- */
export function FloatingTelegram() {
  return (
    <a href="https://t.me/" target="_blank" rel="noreferrer" aria-label="Chat on Telegram"
       className="fixed bottom-6 right-6 z-40 btn-electric hover:btn-electric-hover h-14 w-14 rounded-full flex items-center justify-center shadow-elegant">
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full animate-ping bg-electric/30" />
    </a>
  );
}
