'use client';

import { useEffect, useState } from 'react';

const HERO_PHRASES = [
  { text: 'Risk Operations.', color: 'text-primary', bg: 'bg-primary' },
  { text: 'Fraud Operations.', color: 'text-danger', bg: 'bg-danger' },
  { text: 'Compliance Teams.', color: 'text-success', bg: 'bg-success' },
  { text: 'Risk Investigations.', color: 'text-warning', bg: 'bg-warning' },
  { text: 'Financial Operations.', color: 'text-blue', bg: 'bg-blue' },
  { text: 'Transaction Intelligence.', color: 'text-primary', bg: 'bg-primary' },
];

export function AnimatedHeadline() {
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
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
                <span className={`font-semibold whitespace-nowrap ${phrase.color}`}>
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
