import { ArrowUpRight, Send } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "./motion";

type Props = {
  title: string;
  description: string;
  primaryLabel: string;
  telegramLabel: string;
  telegramUrl: string;
};

export function ProcessCta({ title, description, primaryLabel, telegramLabel, telegramUrl }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="mt-20 lg:mt-28"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
      }}
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[var(--glass-bg)] p-8 backdrop-blur-2xl sm:p-12 lg:p-14"
        style={{ boxShadow: "0 8px 40px -12px color-mix(in oklab, var(--electric) 20%, transparent)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-electric/10 blur-[80px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-electric/5 blur-[60px]"
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h3 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tighter leading-[1.1] text-gradient">
            {title}
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed">{description}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="btn-electric hover:btn-electric-hover inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium"
            >
              {primaryLabel} <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-4 text-sm font-medium transition-transform duration-300 hover:scale-[1.02]"
            >
              <Send className="h-4 w-4" /> {telegramLabel}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
