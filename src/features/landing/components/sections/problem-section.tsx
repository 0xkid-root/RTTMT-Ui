'use client';

import { useEffect, useState } from 'react';
import {
  CreditCard,
  Store,
  Smartphone,
  MapPin,
  Activity,
  AlertTriangle,
  Clock
} from 'lucide-react';

const SOURCES = [
  { id: 'payment', label: 'PAYMENT', icon: CreditCard },
  { id: 'merchant', label: 'MERCHANT', icon: Store },
  { id: 'device', label: 'DEVICE', icon: Smartphone },
  { id: 'location', label: 'LOCATION', icon: MapPin },
];

const TOOLS = [
  { id: 'tool-a', label: 'TRANSACTION SYSTEM' },
  { id: 'tool-b', label: 'RISK ENGINE' },
  { id: 'tool-c', label: 'INVESTIGATION TOOLS' },
];

export function ProblemSection() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
      {/* Background Grid & Glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div
          className="absolute inset-0 text-border opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 80%)',
          }}
        />
      </div>

      <style>{`
        @keyframes flow-dash {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .animate-flow {
          stroke-dasharray: 4 40;
          animation: flow-dash 1.5s linear infinite;
        }
        .animate-flow-slow {
          stroke-dasharray: 4 60;
          animation: flow-dash 2.5s linear infinite;
        }
        .animate-flow-delay {
          stroke-dasharray: 4 50;
          animation: flow-dash 2s linear infinite;
          animation-delay: -1s;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-flow, .animate-flow-slow, .animate-flow-delay { animation: none; opacity: 0; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20 md:mb-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-sm font-medium text-text-secondary backdrop-blur uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            The Problem
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Financial Risk Moves Faster Than Manual Review
          </h3>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Transactions happen every second. Risk signals are spread across multiple systems,
            making it harder to see the full picture and respond in time.
          </p>
        </div>

        {/* Desktop Visualization */}
        <div className="hidden md:block relative mx-auto w-full max-w-5xl">

          {/* SVG Connectors Background */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg className="w-full h-full text-border" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fade-down" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              <g stroke="currentColor" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke">
                {/* To Center */}
                <path d="M 125 50 Q 500 150 500 250" />
                <path d="M 375 50 Q 500 150 500 250" />
                <path d="M 625 50 Q 500 150 500 250" />
                <path d="M 875 50 Q 500 150 500 250" />

                {/* Center to Tools */}
                <path d="M 500 250 Q 200 325 200 400" />
                <path d="M 500 250 L 500 400" />
                <path d="M 500 250 Q 800 325 800 400" />

                {/* Tools to Manual Review */}
                <path d="M 200 400 Q 500 475 500 550" />
                <path d="M 500 400 L 500 550" />
                <path d="M 800 400 Q 500 475 500 550" />
              </g>

              {/* Animated Signals */}
              {!reduceMotion && (
                <g stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke">
                  <path d="M 125 50 Q 500 150 500 250" className="animate-flow" />
                  <path d="M 875 50 Q 500 150 500 250" className="animate-flow-delay" />

                  <path d="M 500 250 Q 200 325 200 400" className="animate-flow-slow" />
                  <path d="M 500 250 Q 800 325 800 400" className="animate-flow" />

                  <path d="M 500 400 L 500 550" className="animate-flow-delay" />
                  <path d="M 200 400 Q 500 475 500 550" className="animate-flow" />
                </g>
              )}
            </svg>
          </div>

          {/* HTML Nodes */}
          <div className="relative z-10 flex flex-col h-[600px] justify-between">

            {/* ROW 1: Sources */}
            <div className="flex justify-between px-[6.25%]">
              {SOURCES.map((source) => (
                <div key={source.id} className="group flex flex-col items-center gap-2 bg-background p-2 cursor-default">
                  <div className="h-10 w-10 rounded-lg border border-border bg-surface flex items-center justify-center text-text-secondary transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]">
                    <source.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
                  </div>
                  <span className="text-[11px] font-semibold text-text-muted tracking-wider transition-colors duration-300 group-hover:text-primary">
                    {source.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ROW 2: Scattered Signals */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center bg-background p-4 cursor-default group">
                <div className="relative flex items-center justify-center w-56 h-16 rounded-xl border border-primary/30 bg-primary/5 shadow-[0_0_30px_rgba(99,102,241,0.1)] transition-all duration-300 group-hover:border-primary/60 group-hover:bg-primary/10 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]">
                  <div className="absolute -inset-1 border border-primary/10 rounded-xl animate-pulse" />
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm font-bold text-primary tracking-widest uppercase">
                      Scattered Risk Signals
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 3: Tools */}
            <div className="flex justify-between px-[10%]">
              {TOOLS.map((tool) => (
                <div key={tool.id} className="flex flex-col items-center bg-background p-3 cursor-default group">
                  <div className="px-5 py-2.5 rounded-md border border-border bg-[#121212] text-xs font-medium text-text-secondary transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    {tool.label}
                  </div>
                </div>
              ))}
            </div>

            {/* ROW 4: Manual Review */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center bg-background p-4 cursor-default group">
                <div className="flex flex-col items-center gap-3 w-64 p-5 rounded-xl border border-warning/30 bg-warning/5 shadow-[0_0_30px_rgba(245,158,11,0.05)] text-center transition-all duration-300 group-hover:border-warning/60 group-hover:bg-warning/10 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-[13px] font-bold text-warning tracking-widest uppercase">
                      Manual Review
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[11px] text-text-muted font-medium transition-colors duration-300 group-hover:text-warning/80">
                    <Clock className="h-3 w-3" />
                    <span>Fragmented systems • Delayed response</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Visualization (Vertical Stack) */}
        <div className="md:hidden flex flex-col items-center">

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {SOURCES.map((s) => (
              <div key={s.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-[10px] font-semibold tracking-wider text-text-secondary">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="w-px h-10 bg-border relative overflow-hidden">
            <div className="absolute inset-0 bg-primary opacity-50 animate-[flow-dash_2s_linear_infinite]" style={{ background: 'linear-gradient(180deg, transparent, #6366F1, transparent)' }} />
          </div>

          <div className="my-2 px-6 py-4 rounded-xl border border-primary/30 bg-primary/5 text-center">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Scattered Risk Signals</span>
          </div>

          <div className="w-px h-10 bg-border relative overflow-hidden">
            <div className="absolute inset-0 bg-primary opacity-50 animate-[flow-dash_2s_linear_infinite]" style={{ background: 'linear-gradient(180deg, transparent, #6366F1, transparent)' }} />
          </div>

          <div className="flex flex-col gap-2 my-2 w-full max-w-[240px]">
            {TOOLS.map((t) => (
              <div key={t.id} className="text-center py-2 border border-border rounded-md bg-[#121212] text-xs text-text-secondary">
                {t.label}
              </div>
            ))}
          </div>

          <div className="w-px h-10 bg-border relative overflow-hidden">
            <div className="absolute inset-0 bg-warning opacity-50 animate-[flow-dash_2s_linear_infinite]" style={{ background: 'linear-gradient(180deg, transparent, #F59E0B, transparent)' }} />
          </div>

          <div className="my-2 p-5 w-full max-w-[280px] rounded-xl border border-warning/30 bg-warning/5 text-center flex flex-col items-center gap-2">
            <span className="text-xs font-bold text-warning tracking-widest uppercase">Manual Review</span>
            <span className="text-[11px] text-text-muted flex items-center gap-1.5 text-center"><Clock className="w-3 h-3 shrink-0" /> Fragmented systems • Delayed response</span>
          </div>

        </div>

      </div>
    </section>
  );
}
