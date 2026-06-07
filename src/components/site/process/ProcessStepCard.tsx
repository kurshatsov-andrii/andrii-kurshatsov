import { motion, useReducedMotion } from "framer-motion";
import type { ProcessStep } from "./types";
import { cardReveal } from "./motion";

type Props = {
  step: ProcessStep;
};

export function ProcessStepCard({ step: { num, title, description, icon: Icon } }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={cardReveal}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className="group relative h-full rounded-[24px] border border-white/10 bg-[var(--glass-bg)] p-6 backdrop-blur-2xl sm:p-8"
      style={{ boxShadow: "0 4px 24px -4px color-mix(in oklab, var(--foreground) 6%, transparent)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in oklab, var(--electric) 18%, transparent), transparent 70%)",
          boxShadow: "0 0 40px -8px color-mix(in oklab, var(--electric) 35%, transparent)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span
            className="font-display font-semibold leading-none tracking-tighter text-[clamp(2.25rem,4vw,3.25rem)] text-electric/25 transition-colors duration-500 group-hover:text-electric/50"
            aria-hidden
          >
            {num}
          </span>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-500 group-hover:border-electric/30 group-hover:bg-electric/10">
            <Icon className="h-5 w-5 text-electric/70 transition-colors duration-500 group-hover:text-electric" strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="mt-6 font-display text-xl font-semibold tracking-tight sm:text-[1.35rem]">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">{description}</p>
      </div>
    </motion.article>
  );
}
