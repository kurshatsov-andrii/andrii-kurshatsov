import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ProcessStep } from "./types";
import { ProcessStepCard } from "./ProcessStepCard";
import { staggerContainer } from "./motion";

type Props = {
  steps: ProcessStep[];
};

export function ProcessTimeline({ steps }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="mt-16 lg:mt-20">
      {/* Desktop — horizontal connected timeline */}
      <div className="hidden xl:block">
        <div className="relative mb-10 px-4">
          <div className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-border/40" />
          <motion.div
            className="absolute left-4 top-1/2 h-0.5 -translate-y-1/2 origin-left bg-gradient-to-r from-electric via-electric-glow to-electric/40"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ right: "1rem", width: "calc(100% - 2rem)" }}
          />
          <div className="relative flex justify-between">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.3 + i * 0.08 }}
              >
                <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-electric shadow-[0_0_20px_var(--electric)] ring-4 ring-background" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="grid grid-cols-6 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step) => (
            <ProcessStepCard key={step.num} step={step} />
          ))}
        </motion.div>
      </div>

      {/* Tablet — adaptive grid */}
      <motion.div
        className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:hidden gap-5 lg:gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {steps.map((step) => (
          <ProcessStepCard key={step.num} step={step} />
        ))}
      </motion.div>

      {/* Mobile — vertical timeline */}
      <div className="md:hidden relative">
        <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border/40" />
        <motion.div
          className="absolute left-[11px] top-3 w-px origin-top bg-gradient-to-b from-electric via-electric-glow to-electric/30"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ bottom: "0.75rem", height: "calc(100% - 1.5rem)" }}
        />

        <motion.ol
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, i) => (
            <li key={step.num} className="relative pl-10">
              <motion.div
                className="absolute left-0 top-8 z-10 h-6 w-6 rounded-full bg-electric shadow-[0_0_16px_var(--electric)] ring-4 ring-background"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.25 + i * 0.1 }}
              />
              <ProcessStepCard step={step} />
            </li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
}
