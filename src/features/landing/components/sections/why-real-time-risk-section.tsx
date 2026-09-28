'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

/* -------------------------------------------------------------------------- */
/* Data */
/* -------------------------------------------------------------------------- */

const row1 = [
  {
    title: 'Too Late',
    description: 'Fraud detected after the money is already gone.',
    image: '/rtmt/risk/too-late.jpg',
  },
  {
    title: 'Blind Spots',
    description: 'Millions of transactions. No real-time visibility.',
    image: '/rtmt/risk/blind-spots.jpg',
  },
  {
    title: 'Alert Overload',
    description: 'Too many alerts. Too little context.',
    image: '/rtmt/risk/alert-overload.jpg',
  },
  {
    title: 'Manual Investigation',
    description: 'Analysts spend hours connecting the dots.',
    image: '/rtmt/risk/manual-investigation.jpg',
  }
];

const row2 = [
  {
    title: 'Hidden Patterns',
    description: 'Suspicious behavior can hide across transactions.',
    image: '/rtmt/risk/hidden-patterns.jpg',
  },
  {
    title: 'Slow Decisions',
    description: 'Delayed detection means delayed action.',
    image: '/rtmt/risk/slow-decisions.jpg',
  },
  {
    title: 'Fragmented Risk',
    description: 'Transaction, merchant and customer signals live apart.',
    image: '/rtmt/risk/fragmented-risk.jpg',
  },
  {
    title: 'Noisy Rules',
    description: "Static rules alone can't explain every risk signal.",
    image: '/rtmt/risk/noisy-rules.jpg',
  }
];

/* -------------------------------------------------------------------------- */
/* Component */
/* -------------------------------------------------------------------------- */

// We duplicate the array 4 times to ensure it covers enough width to loop seamlessly.
// Animating from 0% to -25% will shift exactly one full array length.
const ROW_1_ITEMS = [...row1, ...row1, ...row1, ...row1];
const ROW_2_ITEMS = [...row2, ...row2, ...row2, ...row2];

export function WhyRealTimeRiskSection() {
  const isReduced = useReducedMotion() ?? false;

  const getAnimation = (direction: 'left' | 'right') => {
    if (isReduced) return {};
    
    // If hovering, pause the animation. Otherwise, run infinitely.
    const xParams = direction === 'left' ? ['0%', '-25%'] : ['-25%', '0%'];
    
    return {
      x: xParams,
      transition: {
        repeat: Infinity,
        ease: 'linear' as const,
        duration: 45,
      }
    };
  };

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden flex flex-col items-center">
      {/* Background elements */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 text-center mb-16">
        <div className="inline-flex items-center gap-2 border border-border bg-surface/50 px-3 py-1.5 mb-6 font-mono text-[10px] tracking-widest uppercase text-text-muted backdrop-blur-sm">
          <span>WHY REAL-TIME RISK MONITORING MATTERS</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight text-balance">
          Fraud doesn&apos;t wait for a report.<br />
          <span className="text-text-secondary">Risk changes with every transaction.</span>
        </h2>
      </div>

      {/* Marquee Container with Edge Masking */}
      <div 
        className="w-full relative z-10 flex flex-col gap-6"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        {/* Row 1 - Moves Right to Left */}
        <div className="w-full overflow-hidden">
          <motion.div 
            className="flex gap-6 w-max"
            animate={getAnimation('left')}
            style={{}}
          >
            {ROW_1_ITEMS.map((item, i) => (
              <RiskCard key={i} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moves Left to Right */}
        <div className="w-full overflow-hidden">
          <motion.div 
            className="flex gap-6 w-max"
            animate={getAnimation('right')}
          >
            {ROW_2_ITEMS.map((item, i) => (
              <RiskCard key={i} item={item} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 w-full text-center mt-20 px-5">
        <p className="text-lg sm:text-xl font-medium text-foreground tracking-tight">
          See risk while it is happening — <span className="text-text-secondary">not after it becomes a problem.</span>
        </p>
      </div>
    </section>
  );
}

function RiskCard({ item }: { item: { title: string; description: string; image: string } }) {
  return (
    <div className="w-[300px] sm:w-[340px] p-5 sm:p-6 rounded-xl border border-border bg-surface/40 backdrop-blur-sm flex flex-col gap-5 group hover:-translate-y-1 hover:border-white/10 hover:bg-surface/80 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-black/20">
      <div className="h-[88px] rounded-lg border border-white/[0.03] bg-background/50 flex items-center justify-center overflow-hidden relative">
        <Image src={item.image} alt="" fill className="object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div>
        <h4 className="text-base font-semibold text-foreground mb-1.5">{item.title}</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}
