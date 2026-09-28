'use client';

import { useEffect, useState } from 'react';

const HERO_PHRASES = [
  { text: 'Risk Operations.', color: 'from-primary to-indigo-500' },
  { text: 'Fraud Operations.', color: 'from-danger to-rose-500' },
  { text: 'Compliance Teams.', color: 'from-success to-emerald-400' },
  { text: 'Risk Investigations.', color: 'from-warning to-amber-500' },
  { text: 'Financial Operations.', color: 'from-blue-400 to-indigo-400' },
  { text: 'Transaction Intelligence.', color: 'from-primary to-purple-500' },
];

export function AnimatedHeadline() {
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    // Avoid calling setReduce synchronously if we want to avoid cascading render lint warning
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduce(isReduced);
    if (isReduced) return;

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % HERO_PHRASES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-[1200px] text-foreground leading-[1.3] sm:leading-[1.15]">
      Transaction Monitoring, Built for
      <span className="inline-flex items-center mt-3 sm:mt-0 sm:ml-4 align-middle">
        <span className="inline-grid items-center">
          {HERO_PHRASES.map((phrase, i) => {
            const isActive = reduce ? i === 0 : index === i;
            return (
              <span
                key={phrase.text}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 flex items-center justify-between gap-4 sm:gap-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-3 pointer-events-none'
                } ${reduce && !isActive ? 'hidden' : ''}`}
              >
                <span className={`font-semibold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r ${phrase.color} drop-shadow-sm`}>
                  {phrase.text}
                </span>
              </span>
            );
          })}
        </span>
      </span>
    </h1>
  );
}
