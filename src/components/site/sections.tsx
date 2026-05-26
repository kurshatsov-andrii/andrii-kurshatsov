import { useState } from "react";
import {
  ArrowUpRight, Sparkles, LineChart, Rocket, Layers, Compass, Send,
  Mail, ChevronDown, Star, Check, MessageCircle, Github, Linkedin, Twitter,
} from "lucide-react";
import portrait from "@/assets/andrii-portrait.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";

/* -------------------- HERO -------------------- */
export function Hero() {
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
              Available for Q1 2026 partnerships
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-8 font-display font-semibold tracking-tighter text-[clamp(2.75rem,7vw,6rem)] leading-[0.95]">
              Building <span className="text-electric-gradient">premium brands</span><br />
              that scale beyond noise.
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              I'm <strong className="text-foreground font-medium">Andrii Kurshatsov</strong> — strategist & product designer partnering with founders to launch digital products that feel inevitable.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="btn-electric hover:btn-electric-hover inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="https://t.me/" target="_blank" rel="noreferrer"
                 className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium hover:scale-[1.02] transition-transform">
                <Send className="h-4 w-4" /> Telegram
              </a>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-16 flex items-center gap-8 text-sm text-muted-foreground">
              <div><span className="text-foreground font-semibold text-2xl font-display">120+</span><div className="text-xs mt-1">Projects shipped</div></div>
              <div className="h-10 w-px bg-border" />
              <div><span className="text-foreground font-semibold text-2xl font-display">9</span><div className="text-xs mt-1">Years of craft</div></div>
              <div className="h-10 w-px bg-border" />
              <div><span className="text-foreground font-semibold text-2xl font-display">14</span><div className="text-xs mt-1">Industries</div></div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} className="relative hidden lg:block">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass shadow-elegant">
            <img src={portrait} alt="Andrii Kurshatsov portrait" className="w-full h-full object-cover" width={1024} height={1280} fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Currently</div>
              <div className="text-sm font-medium mt-1">Designing the next wave of consumer fintech</div>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 animate-[float_6s_ease-in-out_infinite]">
            <Sparkles className="h-5 w-5 text-electric" />
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted-foreground">
        <span>Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-electric to-transparent" />
      </div>
    </section>
  );
}

/* -------------------- ABOUT -------------------- */
const timeline = [
  { year: "2017", title: "Started independent practice", desc: "First studio retainer with a Berlin SaaS." },
  { year: "2020", title: "Led design at Series-B fintech", desc: "Scaled product surface from 4 to 38 modules." },
  { year: "2023", title: "Founded studio of 6", desc: "Partnered with founders across EU, UK, US." },
  { year: "2026", title: "Strategic advisor", desc: "Helping 12+ teams ship category-defining work." },
];

export function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-20">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">About</div>
          <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] text-gradient">
            Nine years of obsession with the details that make products feel premium.
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
            I work at the intersection of strategy, brand and product. My belief is simple — clarity converts. Every pixel, motion, and word has a job.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
            {["Brand strategy", "Product design", "Design systems", "Motion & 3D"].map((t) => (
              <div key={t} className="glass rounded-2xl px-4 py-3 text-sm flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-electric" /> {t}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-electric via-border to-transparent" />
          <ul className="space-y-10">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 120} as="li" className="relative pl-10">
                <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-electric shadow-[0_0_20px_var(--electric)]" />
                <div className="text-xs text-electric font-mono">{t.year}</div>
                <div className="font-display text-xl mt-1">{t.title}</div>
                <div className="text-muted-foreground mt-1">{t.desc}</div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------- SERVICES -------------------- */
const services = [
  { icon: Compass, title: "Brand Strategy", desc: "Positioning, narrative and identity systems for founders ready to be unmistakable.", price: "from €8k" },
  { icon: Layers, title: "Product Design", desc: "End-to-end product surfaces — research, UX, UI and design systems that engineers love.", price: "from €12k" },
  { icon: Rocket, title: "Launch & Web", desc: "Premium marketing sites with motion, copy, and conversion architecture built in.", price: "from €6k" },
  { icon: LineChart, title: "Growth Advisory", desc: "Fractional design leadership for funded teams scaling 0 → 1 → 10.", price: "monthly retainer" },
];

export function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Services</div>
          <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-3xl text-gradient">
            Senior craft, applied to the problems that actually move the needle.
          </h2>
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
                  <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-electric transition-colors">
                    Discuss scope <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- PORTFOLIO -------------------- */
const projects = [
  { tag: "Fintech", title: "Northwind Capital", desc: "Private wealth platform — brand, app, motion.", span: "md:col-span-2 md:row-span-2", grad: "from-blue-600/30 to-indigo-900/30" },
  { tag: "SaaS", title: "Lumen Labs", desc: "AI workflow editor for ops teams.", span: "", grad: "from-electric/30 to-cyan-500/20" },
  { tag: "Consumer", title: "Halo Audio", desc: "DTC headphones — full launch.", span: "", grad: "from-purple-500/20 to-pink-500/10" },
  { tag: "Web3", title: "Strato Protocol", desc: "Identity layer & marketing OS.", span: "md:col-span-2", grad: "from-sky-500/20 to-blue-800/30" },
];

export function Portfolio() {
  return (
    <section id="work" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-8 mb-14">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Selected Work</div>
            <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-3xl text-gradient">
              A few partners. Many quiet wins.
            </h2>
          </Reveal>
          <Reveal delay={200} className="hidden md:block">
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
              Full archive <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 md:auto-rows-[260px] gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className={p.span}>
              <a href="#" className={`group relative block h-full min-h-[260px] rounded-3xl overflow-hidden glass hover:shadow-elegant transition-all duration-700 hover:-translate-y-1`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${p.grad}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/0.15),transparent_60%)]" />
                <div className="absolute inset-0 p-7 flex flex-col justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-white/70 font-mono">{p.tag}</span>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-white">{p.title}</h3>
                    <p className="text-white/70 mt-2 text-sm">{p.desc}</p>
                  </div>
                </div>
                <div className="absolute top-5 right-5 h-10 w-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-500">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- ACHIEVEMENTS -------------------- */
const stats = [
  { value: 120, suffix: "+", label: "Products shipped" },
  { value: 38, suffix: "M€", label: "Client revenue influenced" },
  { value: 9, suffix: "", label: "Years in practice" },
  { value: 98, suffix: "%", label: "Repeat partnerships" },
];

export function Achievements() {
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
const quotes = [
  { name: "Elena Marchetti", role: "CEO, Northwind Capital", text: "Andrii reframed our entire positioning in three weeks. We closed our Series A with the deck he helped us build." },
  { name: "James Okafor", role: "Founder, Lumen Labs", text: "The most strategic designer I've ever worked with. Ships at the bar of a top product studio, communicates like a founder." },
  { name: "Sofia Hartmann", role: "CMO, Halo Audio", text: "Our launch quarter beat plan by 220%. The brand world Andrii built carried the entire campaign." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-pad relative">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Words from partners</div>
          <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-3xl text-gradient">
            Quiet conviction. Loud results.
          </h2>
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
const faqs = [
  { q: "How do engagements typically start?", a: "We begin with a 30-minute fit call, then a paid discovery sprint (1–2 weeks) to align on scope, success metrics and timeline." },
  { q: "Do you work solo or with a team?", a: "Both. Brand and strategy work I lead personally; larger product engagements bring in a vetted studio team of 2–6 senior craftspeople." },
  { q: "What's your typical timeline?", a: "Brand sprints: 4–6 weeks. Product MVPs: 8–14 weeks. Ongoing retainers start at 3 months." },
  { q: "Where are you based?", a: "Kyiv-based, working with founders across EU, UK and the Americas. Async-first with weekly syncs." },
  { q: "Do you take equity?", a: "Selectively. For exceptional teams I'm open to a blended cash + equity arrangement." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-pad relative">
      <div className="container-px mx-auto max-w-4xl">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 text-center">FAQ</div>
          <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-center text-gradient">
            Common questions, honest answers.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className="glass rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="font-display text-lg">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180 text-electric" : ""}`} />
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
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
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const next = () => setStep((s) => Math.min(2, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <div className="glass rounded-[2rem] p-8 md:p-16 grid lg:grid-cols-[1fr_1.2fr] gap-12 relative overflow-hidden">
            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-electric/20 blur-[140px]" />

            <div className="relative">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Contact</div>
              <h2 className="font-display font-semibold tracking-tighter text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-gradient">
                Tell me about your next move.
              </h2>
              <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
                Project inquiries, partnerships, or just a hello — I personally read every message.
              </p>

              <div className="mt-10 space-y-3">
                <a href="mailto:hi@andrii.studio" className="glass rounded-2xl px-5 py-4 flex items-center gap-3 hover:scale-[1.02] transition-transform">
                  <Mail className="h-4 w-4 text-electric" />
                  <span className="text-sm">hi@andrii.studio</span>
                </a>
                <a href="https://t.me/" target="_blank" rel="noreferrer" className="glass rounded-2xl px-5 py-4 flex items-center gap-3 hover:scale-[1.02] transition-transform">
                  <Send className="h-4 w-4 text-electric" />
                  <span className="text-sm">@andrii_kurshatsov</span>
                </a>
              </div>
            </div>

            <div className="relative">
              {sent ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-[blur-in_0.8s_ease-out]">
                  <div className="h-16 w-16 rounded-full bg-electric/10 flex items-center justify-center mb-6">
                    <Check className="h-7 w-7 text-electric" />
                  </div>
                  <h3 className="font-display text-2xl">Message received.</h3>
                  <p className="text-muted-foreground mt-3 max-w-sm">I'll get back to you within 24 hours — usually faster.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-electric" : "bg-border"}`} />
                    ))}
                    <span className="ml-3">{step + 1} / 3</span>
                  </div>

                  {step === 0 && (
                    <div className="space-y-5 animate-[fade-up_0.5s_ease-out]">
                      <Field label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                      <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    </div>
                  )}
                  {step === 1 && (
                    <div className="space-y-5 animate-[fade-up_0.5s_ease-out]">
                      <Field label="Company or project" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-5 animate-[fade-up_0.5s_ease-out]">
                      <Field label="Tell me about it" multiline value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
                    </div>
                  )}

                  {/* honeypot */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

                  <div className="flex items-center justify-between pt-2">
                    <button type="button" onClick={back} disabled={step === 0}
                            className="text-sm text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors">
                      Back
                    </button>
                    {step < 2 ? (
                      <button type="button" onClick={next}
                              className="btn-electric hover:btn-electric-hover rounded-full px-7 py-3 text-sm font-medium inline-flex items-center gap-2">
                        Continue <ArrowUpRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button type="submit"
                              className="btn-electric hover:btn-electric-hover rounded-full px-7 py-3 text-sm font-medium inline-flex items-center gap-2">
                        Send message <Send className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </form>
              )}
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
        <textarea
          rows={5}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl bg-input/50 border border-border pt-7 pb-3 px-4 text-sm outline-none focus:border-electric transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl bg-input/50 border border-border pt-7 pb-3 px-4 text-sm outline-none focus:border-electric transition-colors"
        />
      )}
    </label>
  );
}

/* -------------------- FOOTER -------------------- */
export function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="container-px mx-auto max-w-7xl flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display font-semibold">Andrii<span className="text-electric-gradient">.</span></span>
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} — All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5 text-muted-foreground">
          <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors"><Twitter className="h-4 w-4" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-foreground transition-colors"><Linkedin className="h-4 w-4" /></a>
          <a href="#" aria-label="GitHub" className="hover:text-foreground transition-colors"><Github className="h-4 w-4" /></a>
          <a href="https://t.me/" target="_blank" rel="noreferrer" aria-label="Telegram" className="hover:text-foreground transition-colors"><Send className="h-4 w-4" /></a>
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-3">
          <button className="hover:text-foreground transition-colors">EN</button>
          <span>/</span>
          <button className="hover:text-foreground transition-colors">UA</button>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- FLOATING TELEGRAM -------------------- */
export function FloatingTelegram() {
  return (
    <a
      href="https://t.me/"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on Telegram"
      className="fixed bottom-6 right-6 z-40 btn-electric hover:btn-electric-hover h-14 w-14 rounded-full flex items-center justify-center shadow-elegant"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full animate-ping bg-electric/30" />
    </a>
  );
}
