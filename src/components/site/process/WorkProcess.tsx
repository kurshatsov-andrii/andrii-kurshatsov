import { useRef } from "react";
import {
  Handshake, Search, Compass, Sparkles, Rocket, TrendingUp,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePageSection } from "@/lib/usePageData";
import type { ProcessStep } from "./types";
import { ProcessTimeline } from "./ProcessTimeline";
import { ProcessCta } from "./ProcessCta";
import { fadeUp } from "./motion";

const STEP_ICONS = [Handshake, Search, Compass, Sparkles, Rocket, TrendingUp];

export function WorkProcess() {
  const { t } = useI18n();
  const intro = usePageSection("process", "intro");
  const stepsData = usePageSection("process", "steps");
  const ctaData = usePageSection("process", "cta");
  const quick = usePageSection("contact", "quick");
  const gi = (k: string, fb: string) => (intro[k]?.trim() ? intro[k] : fb);
  const gs = (k: string, fb: string) => (stepsData[k]?.trim() ? stepsData[k] : fb);
  const gc = (k: string, fb: string) => (ctaData[k]?.trim() ? ctaData[k] : fb);
  const gq = (k: string, fb: string) => (quick[k]?.trim() ? quick[k] : fb);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  const steps: ProcessStep[] = STEP_ICONS.map((icon, i) => {
    const n = i + 1;
    const num = String(n).padStart(2, "0");
    return {
      num,
      icon,
      title: gs(`s${n}_title`, t(`process.step.${n}.title`)),
      description: gs(`s${n}_desc`, t(`process.step.${n}.desc`)),
    };
  });

  return (
    <section id="process" className="section-pad relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full bg-electric/8 blur-[140px]"
      />

      <div className="container-px relative z-10 mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
          }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            {gi("kicker", t("process.kicker"))}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tighter text-gradient"
          >
            {gi("title", t("process.title"))}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {gi("subtitle", t("process.subtitle"))}
          </motion.p>
        </motion.div>

        <ProcessTimeline steps={steps} />

        <ProcessCta
          title={gc("cta_title", t("process.cta.title"))}
          description={gc("cta_body", t("process.cta.body"))}
          primaryLabel={gc("cta_primary", t("process.cta.primary"))}
          telegramLabel={gc("cta_telegram", t("process.cta.telegram"))}
          telegramUrl={gq("telegram_url", "https://t.me/")}
        />
      </div>
    </section>
  );
}
