"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const cinematicEase = [0.16, 1, 0.3, 1] as const;
const verbs = ['Monitor', 'Detect', 'Decide', 'Respond'];

type CtaSectionProps = {
  /** Link for the button. Falls back to a plain button if omitted. */
  demoHref?: string;
  onDemoClick?: () => void;
};

export function CtaSection({ demoHref, onDemoClick }: CtaSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const isReduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);

  // Walk through the four verbs while the section is on screen
  useEffect(() => {
    if (!inView || isReduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % verbs.length), 1400);
    return () => clearInterval(id);
  }, [inView, isReduced]);

  const buttonClass =
    'group relative h-10 px-5 rounded-lg bg-white text-[#101010] font-semibold text-[13px] ' +
    'inline-flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-white/5 ' +
    'transition-[background-color,box-shadow,transform] duration-300 hover:bg-white/90 hover:shadow-white/10 ' +
    'active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background border border-white/10';

  const buttonInner = (
    <>
      {/* Light sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/20 opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100"
      />
      <span className="relative">Request Demo</span>
      <ArrowRight className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );

  return (
    <section ref={ref} className="py-32 bg-background relative overflow-hidden">
      {/* Grid, same language as the pipeline section, faded at the edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-60 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />

      {/* Breathing glow */}
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"
        animate={isReduced ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={isReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={isReduced ? { duration: 0 } : { duration: 0.9, ease: cinematicEase }}
        className="mx-auto w-full max-w-3xl px-5 sm:px-8 lg:px-10 text-center relative z-10"
      >
        {/* Status chip that echoes the pipeline story */}
        <div className="inline-flex items-center gap-2 border border-border bg-background/80 px-3 py-1.5 mb-8 font-mono text-[10px] tracking-widest uppercase text-text-muted">
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full bg-success ${isReduced ? '' : 'animate-pulse'}`}
          />
          <span>READY FOR REAL-TIME RISK</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight text-balance">
          Turn Every Transaction Into Actionable Risk Intelligence.
        </h2>

        {/* Verbs light up in sequence */}
        <p className="text-xl mb-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1" aria-label="Monitor. Detect. Decide. Respond.">
          {verbs.map((verb, i) => {
            const isOn = isReduced || active === i;
            return (
              <span
                key={verb}
                aria-hidden="true"
                className={`relative pb-1 transition-colors duration-500 ${isOn ? 'text-foreground' : 'text-text-muted'
                  }`}
              >
                {verb}.
                {!isReduced && active === i && (
                  <motion.span
                    layoutId="cta-verb-underline"
                    className="absolute left-0 right-0 bottom-0 h-px bg-primary"
                    transition={{ duration: 0.5, ease: cinematicEase }}
                  />
                )}
              </span>
            );
          })}
        </p>

        {demoHref ? (
          <a href={demoHref} className={buttonClass}>
            {buttonInner}
          </a>
        ) : (
          <button type="button" onClick={onDemoClick} className={buttonClass}>
            {buttonInner}
          </button>
        )}
      </motion.div>
    </section>
  );
}