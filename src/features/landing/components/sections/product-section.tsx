'use client';

import { useEffect, useState } from 'react';
import {
  Activity,
  ShieldAlert,
  ListTodo,
  Briefcase,
  Building2,
  BarChart3,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

type Tone = 'danger' | 'warning' | 'success';

const TONE: Record<Tone, { bg: string; soft: string; text: string; border: string }> = {
  danger: { bg: 'bg-danger', soft: 'bg-danger/10', text: 'text-danger', border: 'border-danger/20' },
  warning: { bg: 'bg-warning', soft: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' },
  success: { bg: 'bg-success', soft: 'bg-success/10', text: 'text-success', border: 'border-success/20' },
};

const STEP_MS = 3000;

/* ------------------------------------------------------------------ */
/* Mini previews (one per module)                                      */
/* ------------------------------------------------------------------ */

function LiveMonitorPreview({ active }: { active: boolean }) {
  const rows: { id: string; amt: string; tone: Tone }[] = [
    { id: 'TXN-82931', amt: '₹84,500', tone: 'danger' },
    { id: 'TXN-82930', amt: '₹12,800', tone: 'success' },
    { id: 'TXN-82929', amt: '₹45,200', tone: 'warning' },
  ];
  return (
    <div className="space-y-1.5">
      {rows.map((r, i) => (
        <div
          key={r.id}
          className={`flex items-center justify-between rounded-md px-2 py-1.5 text-xs transition-colors duration-500 ${active && i === 0 ? 'bg-primary/10' : ''
            }`}
        >
          <span className="flex items-center gap-2 font-mono text-[#A3A3A3]">
            <span className={`h-1.5 w-1.5 rounded-full ${TONE[r.tone].bg} ${active && i === 0 ? 'animate-pulse' : ''}`} />
            {r.id}
          </span>
          <span className="tabular-nums text-[#F5F5F5]">{r.amt}</span>
        </div>
      ))}
    </div>
  );
}

function RiskSignalsPreview({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 80" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <polyline
        points="0,50 20,46 40,52 60,44 80,48 100,16 110,64 120,42 140,46 160,40 180,44 200,42"
        fill="none"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="100" cy="16" r="4" className="fill-danger" />
      {active && (
        <circle cx="100" cy="16" r="4" className="fill-danger">
          <animate attributeName="r" values="4;16" dur="1.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="1.4s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

function AlertQueuePreview({ active }: { active: boolean }) {
  const alerts: { p: string; label: string; tone: Tone }[] = [
    { p: 'P1', label: 'Card testing burst', tone: 'danger' },
    { p: 'P2', label: 'Unusual payout', tone: 'warning' },
    { p: 'P3', label: 'Velocity check', tone: 'success' },
  ];
  return (
    <div className="space-y-1.5">
      {alerts.map((a, i) => (
        <div
          key={a.p}
          className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-xs transition-colors duration-500 ${active && i === 0 ? 'bg-primary/10' : ''
            }`}
        >
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${TONE[a.tone].soft} ${TONE[a.tone].text} ${TONE[a.tone].border}`}>
            {a.p}
          </span>
          <span className="text-[#A3A3A3]">{a.label}</span>
        </div>
      ))}
    </div>
  );
}

function CasesPreview({ active }: { active: boolean }) {
  const steps = [
    { label: 'Assigned to analyst', done: true },
    { label: 'Evidence attached', done: true },
    { label: 'Analyst review', done: false },
  ];
  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between text-xs">
        <span className="font-mono text-[#A3A3A3]">CASE-0627</span>
        <span className="text-warning">In review</span>
      </div>
      <ul className="mb-3 space-y-1.5">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-xs text-[#A3A3A3]">
            <span
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${s.done ? 'border-primary/40 bg-primary/20 text-primary' : 'border-[#292929]'
                }`}
            >
              {s.done && <Check className="h-2.5 w-2.5" />}
            </span>
            {s.label}
          </li>
        ))}
      </ul>
      <div className="h-1 overflow-hidden rounded-full bg-[#292929]">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-1000"
          style={{ width: active ? '66%' : '40%' }}
        />
      </div>
    </div>
  );
}

function MerchantRiskPreview({ active }: { active: boolean }) {
  const merchants: { name: string; score: number; tone: Tone }[] = [
    { name: 'Northwind Retail', score: 82, tone: 'danger' },
    { name: 'Kite Travels', score: 54, tone: 'warning' },
    { name: 'Basil Foods', score: 21, tone: 'success' },
  ];
  return (
    <div className="space-y-2.5">
      {merchants.map((m) => (
        <div key={m.name}>
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-[#A3A3A3]">{m.name}</span>
            <span className={`tabular-nums ${TONE[m.tone].text}`}>{m.score}</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-[#292929]">
            <div
              className={`h-full rounded-full transition-[width] duration-1000 ${TONE[m.tone].bg}`}
              style={{ width: `${active ? m.score : m.score * 0.6}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function AnalyticsPreview({ active }: { active: boolean }) {
  const bars = [38, 52, 44, 66, 58, 74, 62, 88];
  return (
    <div className="flex h-full items-end gap-1.5">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm transition-[height] duration-700 ${i > 4 ? 'bg-primary' : 'bg-primary/30'}`}
          style={{ height: `${active ? h : h * 0.7}%`, transitionDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modules                                                             */
/* ------------------------------------------------------------------ */

type Dir = 'right' | 'left' | 'down' | null;

const MODULES: {
  id: string;
  title: string;
  icon: LucideIcon;
  desc: string;
  place: string; // desktop grid position (snake: 1-2-3 across, 4-5-6 back)
  dir: Dir; // desktop connector direction to the next module
  Preview: React.ComponentType<{ active: boolean }>;
}[] = [
    { id: '01', title: 'Live Monitor', icon: Activity, desc: 'Watch transactions as they happen.', place: 'lg:col-start-1 lg:row-start-1', dir: 'right', Preview: LiveMonitorPreview },
    { id: '02', title: 'Risk Signals', icon: ShieldAlert, desc: 'Detect patterns, anomalies, and behavioral signals.', place: 'lg:col-start-2 lg:row-start-1', dir: 'right', Preview: RiskSignalsPreview },
    { id: '03', title: 'Alert Queue', icon: ListTodo, desc: 'Triage and prioritize flagged activity.', place: 'lg:col-start-3 lg:row-start-1', dir: 'down', Preview: AlertQueuePreview },
    { id: '04', title: 'Cases', icon: Briefcase, desc: 'Investigate suspicious activity with full context.', place: 'lg:col-start-3 lg:row-start-2', dir: 'left', Preview: CasesPreview },
    { id: '05', title: 'Merchant Risk', icon: Building2, desc: 'Monitor risk across merchants and entities.', place: 'lg:col-start-2 lg:row-start-2', dir: 'left', Preview: MerchantRiskPreview },
    { id: '06', title: 'Analytics', icon: BarChart3, desc: 'Track risk trends and operational performance.', place: 'lg:col-start-1 lg:row-start-2', dir: null, Preview: AnalyticsPreview },
  ];

/* ------------------------------------------------------------------ */
/* Connector: lives inside each card, so it always lines up            */
/* ------------------------------------------------------------------ */

type LineState = 'idle' | 'run' | 'done';

function Line({
  dir,
  className,
  state,
  dur,
  reduce,
}: {
  dir: 'right' | 'left' | 'down';
  className: string;
  state: LineState;
  dur: number;
  reduce: boolean;
}) {
  const vertical = dir === 'down';
  const running = state === 'run' && !reduce;
  const axis = vertical ? 'scaleY' : 'scaleX';
  const origin = dir === 'left' ? 'right' : vertical ? 'top' : 'left';

  return (
    <div aria-hidden="true" className={`absolute pointer-events-none ${className}`}>
      <div className={`absolute inset-0 border-dashed border-[#292929] ${vertical ? 'border-l-2' : 'border-t-2'}`} />
      <motion.div
        key={running ? 'run' : state}
        className={`absolute inset-0 ${state === 'done' ? 'bg-primary/40' : 'bg-primary'}`}
        style={{ transformOrigin: origin }}
        initial={running ? { [axis]: 0 } : false}
        animate={{ [axis]: state === 'idle' ? 0 : 1 }}
        transition={{ duration: running ? dur : 0, ease: 'linear' }}
      />
      {running && (
        <motion.span
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(99,102,241,1)]"
          style={vertical ? { left: '50%' } : { top: '50%' }}
          initial={vertical ? { top: '0%' } : { left: dir === 'left' ? '100%' : '0%' }}
          animate={vertical ? { top: '100%' } : { left: dir === 'left' ? '0%' : '100%' }}
          transition={{ duration: dur, ease: 'linear' }}
        />
      )}
    </div>
  );
}

const DESKTOP_LINE: Record<'right' | 'left' | 'down', string> = {
  right: 'hidden lg:block left-full top-1/2 -translate-y-1/2 h-0.5 w-16',
  left: 'hidden lg:block right-full top-1/2 -translate-y-1/2 h-0.5 w-16',
  down: 'hidden lg:block top-full left-1/2 -translate-x-1/2 w-0.5 h-16',
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function ProductSection() {
  const reduce = !!useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setActiveIndex((p) => (p + 1) % MODULES.length), STEP_MS);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const dur = reduce ? 0 : STEP_MS / 1000 - 0.4;
  const gridMask = 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 80%)';

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="relative py-24 sm:py-32 bg-surface border-y border-border overflow-hidden">
      {/* Background: glow + fading grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div
          className="absolute inset-0 text-border opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: gridMask,
            WebkitMaskImage: gridMask,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-sm font-medium text-text-secondary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Product platform
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            One command center <br className="hidden sm:block" />
            <span className="text-text-secondary">for transaction risk.</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Monitor transactions, detect risk signals, manage alerts, and investigate suspicious activity from one operational workspace.
          </p>
        </div>

        {/* Workflow */}
        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-16"
          variants={container}
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {MODULES.map((mod, index) => {
            const Icon = mod.icon;
            const isActive = index === activeIndex;
            const lineState: LineState = index < activeIndex ? 'done' : isActive ? 'run' : 'idle';
            const Preview = mod.Preview;

            return (
              <motion.div
                key={mod.id}
                variants={item}
                tabIndex={0}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setPaused(true);
                }}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => {
                  setActiveIndex(index);
                  setPaused(true);
                }}
                onBlur={() => setPaused(false)}
                className={`relative rounded-2xl border bg-[#0A0A0A] p-5 outline-none transition-[border-color,box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-primary sm:p-6 ${mod.place} ${isActive
                    ? 'border-primary/50 shadow-[0_0_60px_-12px_rgba(99,102,241,0.45)]'
                    : 'border-[#292929]'
                  }`}
              >
                {/* top edge highlight */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                />

                {/* Header row */}
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-500 ${isActive
                        ? 'border-primary/30 bg-primary/10 text-primary'
                        : 'border-[#292929] bg-[#171717] text-[#A3A3A3]'
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-[#737373]">{mod.id}</span>
                    <span
                      className={`h-2 w-2 rounded-full transition-colors duration-500 ${isActive ? 'bg-primary shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'bg-[#292929]'
                        }`}
                    />
                  </div>
                </div>

                {/* Live preview */}
                <div className="mb-5 h-28 overflow-hidden rounded-lg border border-[#292929]/70 bg-[#171717]/60 p-3">
                  <Preview active={isActive} />
                </div>

                {/* Copy */}
                <h3
                  className={`mb-1.5 text-lg font-semibold transition-colors duration-500 ${isActive ? 'text-[#F5F5F5]' : 'text-[#A3A3A3]'
                    }`}
                >
                  {mod.title}
                </h3>
                <p className="max-w-[260px] text-sm leading-relaxed text-[#737373]">{mod.desc}</p>

                {/* Connectors to the next module */}
                {index < MODULES.length - 1 && (
                  <>
                    <Line
                      dir="down"
                      className="lg:hidden top-full left-1/2 -translate-x-1/2 w-0.5 h-10"
                      state={lineState}
                      dur={dur}
                      reduce={reduce}
                    />
                    {mod.dir && (
                      <Line
                        dir={mod.dir}
                        className={DESKTOP_LINE[mod.dir]}
                        state={lineState}
                        dur={dur}
                        reduce={reduce}
                      />
                    )}
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* <p className="mt-14 text-center text-sm text-[#737373]">Hover or focus a module to pause the flow.</p> */}
      </div>
    </section>
  );
}