"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  AnimatePresence,
  useReducedMotion,
  useMotionValueEvent,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';

/* -------------------------------------------------------------
   CONSTANTS
------------------------------------------------------------- */
const STAGE = { MONITOR: 0, DETECT: 1, RISK: 2, ALERT: 3, INVESTIGATE: 4 } as const;

const stages = [
  { id: 'monitor', title: 'Monitor', description: 'See every transaction as it happens.', num: '01' },
  { id: 'detect', title: 'Detect', description: 'Identify risk signals.', num: '02' },
  { id: 'risk', title: 'Risk Intelligence', description: 'Correlate signals.', num: '03' },
  { id: 'alert', title: 'Alert', description: 'Prioritize activity.', num: '04' },
  { id: 'investigate', title: 'Investigate', description: 'Understand and act.', num: '05' },
];

const cinematicEase = [0.16, 1, 0.3, 1] as const;

// Shared transition helper: collapses to instant when reduced motion is on
const tr = (isReduced: boolean, duration = 0.8, extra: object = {}) =>
  isReduced ? { duration: 0 } : { duration, ease: cinematicEase, ...extra };

const stageFromProgress = (v: number) => Math.min(4, Math.max(0, Math.floor(v * 5)));

/* -------------------------------------------------------------
   MAIN SECTION
------------------------------------------------------------- */
export function HowRtmtWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const isReducedRaw = useReducedMotion();
  const isReduced = isReducedRaw ?? false;
  const [activeStage, setActiveStage] = useState<number>(STAGE.MONITOR);

  // Live updates while scrolling
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActiveStage(stageFromProgress(v)));

  // Sync on mount (refresh mid-section, anchor jumps)
  useEffect(() => {
    setActiveStage(stageFromProgress(scrollYProgress.get()));
  }, [scrollYProgress]);

  // Click a stage -> scroll to the middle of that stage
  const goTo = useCallback(
    (i: number) => {
      const el = containerRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const scrollable = el.offsetHeight - window.innerHeight;
      const top = sectionTop + ((i + 0.5) / 5) * scrollable;
      window.scrollTo({ top, behavior: isReduced ? 'auto' : 'smooth' });
    },
    [isReduced]
  );

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col md:flex-row overflow-hidden pt-16 md:pt-0">
        {/* LEFT: story + navigation */}
        <div className="w-full md:w-[35%] lg:w-[30%] p-6 md:p-12 lg:p-20 flex flex-col justify-center h-auto md:h-full z-20 bg-background/95 backdrop-blur-md md:backdrop-blur-none border-b border-border md:border-b-0 md:border-r">
          <div className="mb-12 md:mb-16">
            <span className="text-text-muted font-mono text-[10px] tracking-widest uppercase mb-4 block">
              HOW RTMT WORKS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-foreground tracking-tight leading-tight">
              From Transaction to Action
            </h2>
            <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
              Follow a transaction through monitoring, risk detection, alerting, and investigation — all within one
              operational workflow.
            </p>
          </div>

          {/* Desktop stage list */}
          <nav aria-label="Pipeline stages" className="hidden md:flex flex-col gap-8 relative pl-4">
            {/* Rail track + scroll-driven fill */}
            <div className="absolute left-0 top-2 bottom-4 w-[1px] bg-border z-0" />
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute left-0 top-2 bottom-4 w-[1px] bg-primary origin-top z-0"
            />

            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              const isPast = idx < activeStage;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-current={isActive ? 'step' : undefined}
                  className="relative z-10 flex items-start gap-6 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <div className="absolute -left-[4.5px] top-1.5 w-[8px] h-[8px] bg-background flex items-center justify-center">
                    <div
                      className={`w-[1px] h-[8px] transition-colors duration-500 ${isActive ? 'bg-primary' : isPast ? 'bg-text-secondary' : 'bg-transparent'
                        }`}
                    />
                  </div>

                  <div
                    className={`transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-60'
                      }`}
                  >
                    <h3 className="text-sm font-medium flex items-center gap-4">
                      <span className={`font-mono text-xs ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                        {stage.num}
                      </span>
                      <span
                        className={`uppercase tracking-wider ${isActive ? 'text-foreground' : 'text-text-secondary'}`}
                      >
                        {stage.title}
                      </span>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={tr(isReduced, 0.5)}
                          className="text-text-secondary mt-2 text-sm leading-relaxed max-w-[240px] overflow-hidden"
                        >
                          {stage.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Mobile stage indicator */}
          <div className="md:hidden mt-2" aria-live="polite">
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-primary text-xs">{stages[activeStage].num}</span>
              <h3 className="text-foreground font-medium uppercase tracking-wider text-sm">
                {stages[activeStage].title}
              </h3>
            </div>
            <p className="text-text-secondary text-sm">{stages[activeStage].description}</p>
            <div className="mt-3 h-[2px] w-full bg-border overflow-hidden">
              <motion.div style={{ scaleX: scrollYProgress }} className="h-full bg-primary origin-left" />
            </div>
          </div>
        </div>

        {/* RIGHT: pipeline */}
        <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden bg-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 pointer-events-none" />

          <div className="w-full h-full relative flex items-center justify-center max-w-[1000px]">
            {/* Top label */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 font-mono text-[10px] text-text-muted uppercase tracking-widest border border-border px-3 py-1.5 bg-background z-20">
              {activeStage === STAGE.MONITOR ? (
                <span className="flex items-center gap-2">
                  <span
                    className={`inline-block w-1.5 h-1.5 bg-success rounded-full ${isReduced ? '' : 'animate-pulse'}`}
                  />
                  LIVE TRANSACTION FLOW
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full" />
                  PIPELINE / TXN-82931
                </span>
              )}
            </div>

            {/* Scale down on small screens so the Investigate stage never clips */}
            <div className="w-full origin-center scale-[0.72] sm:scale-[0.85] md:scale-100">
              <ContinuousPipeline activeStage={activeStage} isReduced={isReduced} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------
   PIPELINE
------------------------------------------------------------- */
function ContinuousPipeline({ activeStage, isReduced }: { activeStage: number; isReduced: boolean }) {
  const txnY = [0, 0, -40, -80, -140][activeStage] ?? 0;
  const isHot = activeStage >= STAGE.ALERT;

  const feed = [
    { id: 'TXN-82928', amt: '₹18,900', st: 'CLEAR', top: -120, op: 'opacity-30' },
    { id: 'TXN-82929', amt: '₹45,200', st: 'REVIEW', top: -70, op: 'opacity-40' },
    { id: 'TXN-82930', amt: '₹12,800', st: 'CLEAR', top: -20, op: 'opacity-30' },
    { id: 'TXN-82932', amt: '₹9,100', st: 'CLEAR', top: 80, op: 'opacity-40' },
  ];

  return (
    <div className="w-full h-[600px] relative flex items-center justify-center">
      {/* STAGE 01 - MONITOR: live feed + scan sweep */}
      <AnimatePresence>
        {activeStage === STAGE.MONITOR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={tr(isReduced, 0.6)}
            className="absolute inset-0 flex flex-col justify-center items-center font-mono text-xs w-full pointer-events-none"
          >
            {feed.map((row, i) => (
              <motion.div
                key={row.id}
                initial={isReduced ? false : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={tr(isReduced, 0.6, { delay: isReduced ? 0 : i * 0.08 })}
                className={`w-full max-w-md absolute top-1/2 flex flex-col ${row.op}`}
                style={{ transform: `translateY(${row.top}px)` }}
              >
                <div className="flex justify-between w-full pb-2 border-b border-border">
                  <span>{row.id}</span>
                  <span>{row.amt}</span>
                  <span className={row.st === 'REVIEW' ? 'text-warning' : ''}>{row.st}</span>
                </div>
              </motion.div>
            ))}

            {/* Scan sweep */}
            {!isReduced && (
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 w-full max-w-md h-px bg-primary/60 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                animate={{ y: [-130, 110, -130] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 04 - ALERT: background queue */}
      <AnimatePresence>
        {activeStage === STAGE.ALERT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={tr(isReduced, 0.6)}
            className="absolute top-1/2 translate-y-[60px] w-full max-w-md flex flex-col gap-3 font-mono text-[10px] text-text-secondary pointer-events-none"
          >
            <div className="flex gap-4 w-full justify-between border-b border-border/50 pb-2">
              <span className="text-warning">MEDIUM</span>
              <span>Geographic anomaly</span>
            </div>
            <div className="flex gap-4 w-full justify-between border-b border-border/50 pb-2">
              <span>LOW</span>
              <span>Amount threshold</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE TRANSACTION (no `layout` prop: y is driven manually) */}
      <motion.div
        animate={{ y: txnY }}
        transition={tr(isReduced)}
        className="relative z-30 flex flex-col items-center justify-center w-full max-w-md"
      >
        <motion.div
          animate={
            isHot && !isReduced
              ? {
                boxShadow: [
                  '0 0 0 0 rgba(239,68,68,0)',
                  '0 0 24px 0 rgba(239,68,68,0.25)',
                  '0 0 0 0 rgba(239,68,68,0)',
                ],
              }
              : { boxShadow: '0 0 0 0 rgba(239,68,68,0)' }
          }
          transition={isHot && !isReduced ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
          className={`relative w-full flex flex-col bg-background border px-4 py-3 transition-colors duration-700 ${activeStage === STAGE.MONITOR ? 'border-primary' : isHot ? 'border-danger/50' : 'border-border'
            }`}
        >
          <div
            className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-700 ${activeStage === STAGE.MONITOR ? 'bg-primary' : isHot ? 'bg-danger' : 'bg-border'
              }`}
          />

          <AnimatePresence>
            {isHot && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="text-[10px] font-mono text-danger flex items-center gap-2 uppercase overflow-hidden"
              >
                <span
                  className={`inline-block w-1.5 h-1.5 bg-danger rounded-full ${isReduced ? '' : 'animate-pulse'}`}
                />
                HIGH-RISK EVENT
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center font-mono text-sm">
            <span className={activeStage === STAGE.MONITOR ? 'text-foreground' : 'text-text-secondary'}>
              TXN-82931
            </span>
            <span className={activeStage === STAGE.MONITOR ? 'text-foreground' : 'text-text-secondary'}>
              ₹84,500
            </span>
            <AnimatePresence>
              {activeStage === STAGE.MONITOR && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-primary text-[10px] uppercase tracking-wider absolute right-4 -top-6"
                >
                  Evaluating
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {activeStage === STAGE.MONITOR && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-primary/30"
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* STAGES 02 + 03: SIGNAL NETWORK */}
        <AnimatePresence>
          {(activeStage === STAGE.DETECT || activeStage === STAGE.RISK) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={tr(isReduced, 0.5)}
              className="absolute inset-0 flex items-center justify-center z-[-1]"
            >
              <SignalNetwork activeStage={activeStage} isReduced={isReduced} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* STAGE 03: RISK INTELLIGENCE CORE */}
        <AnimatePresence>
          {activeStage === STAGE.RISK && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={tr(isReduced, 0.6, { delay: isReduced ? 0 : 0.35 })}
              className="absolute top-[80px] flex flex-col items-center z-20 border border-danger/30 bg-background px-8 py-4 w-[240px]"
            >
              <div className="absolute -top-[30px] w-[1px] h-[30px] bg-border" />
              <div className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-3">
                Risk Intelligence
              </div>
              <RiskGauge value={87} isReduced={isReduced} />
              <div className="text-[10px] font-mono text-danger flex items-center gap-1.5 uppercase tracking-widest mt-2">
                High Risk
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STAGE 04: ALERT */}
        <AnimatePresence>
          {activeStage === STAGE.ALERT && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={tr(isReduced, 0.6)}
              className="absolute top-full mt-4 w-full border border-danger/20 bg-background px-4 py-3 z-20"
            >
              <div className="text-xs font-mono text-foreground mb-1 uppercase tracking-wider">
                Suspicious velocity
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary mt-3 pt-2 border-t border-border/50">
                <span>ALERT CREATED</span>
                <motion.span
                  animate={isReduced ? undefined : { opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="border border-danger/30 text-danger px-1.5 py-0.5"
                >
                  OPEN
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STAGE 05: INVESTIGATION */}
        <AnimatePresence>
          {activeStage === STAGE.INVESTIGATE && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={tr(isReduced, 0.7)}
              className="absolute top-full mt-6 w-full z-20"
            >
              <div className="text-[10px] font-mono text-text-secondary mb-2 uppercase tracking-widest border-b border-border pb-2">
                CASE-10231
              </div>

              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1 flex flex-col gap-1 border-l border-border pl-3">
                  <span className="text-[10px] font-mono text-text-muted mb-1">RISK SCORE</span>
                  <span className="text-lg font-mono text-danger leading-none">87 HIGH</span>
                </div>

                <div className="flex-1 flex flex-col gap-1 border-l border-border pl-3">
                  <span className="text-[10px] font-mono text-text-muted mb-1">SIGNALS</span>
                  <div className="text-[10px] font-mono text-foreground flex flex-col gap-1">
                    <span className="text-danger">DEVICE</span>
                    <span className="text-danger">VELOCITY</span>
                    <span className="text-text-secondary">LOCATION</span>
                    <span className="text-text-secondary">BEHAVIOR</span>
                  </div>
                </div>
              </div>

              <InvestigationTimeline isReduced={isReduced} />

              <div className="mt-8 border-t border-border pt-4 flex justify-between items-center">
                <div className="text-[10px] font-mono text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="inline-block w-1 h-1 bg-primary rounded-full" />
                  INVESTIGATION READY
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------
   RISK GAUGE: ring fills to 87% while the number counts up
------------------------------------------------------------- */
function RiskGauge({ value, isReduced }: { value: number; isReduced: boolean }) {
  const mv = useMotionValue(isReduced ? value : 0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (isReduced) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 1.4, delay: 0.4, ease: cinematicEase });
    return () => controls.stop();
  }, [value, mv, isReduced]);

  return (
    <div className="relative w-[96px] h-[96px] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-border)" strokeWidth="2" />
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="currentColor"
          className="text-danger"
          strokeWidth="2"
          strokeLinecap="butt"
          initial={{ pathLength: isReduced ? value / 100 : 0 }}
          animate={{ pathLength: value / 100 }}
          transition={tr(isReduced, 1.4, { delay: 0.4 })}
        />
      </svg>
      <motion.span className="text-4xl font-mono text-foreground font-light tabular-nums" aria-label={`Risk score ${value}`}>
        {rounded}
      </motion.span>
    </div>
  );
}

/* -------------------------------------------------------------
   INVESTIGATION TIMELINE: writes itself line by line
------------------------------------------------------------- */
function InvestigationTimeline({ isReduced }: { isReduced: boolean }) {
  const rows = [
    { text: 'Transaction detected', cls: 'text-text-secondary', dot: 'bg-background border border-text-secondary' },
    { text: 'Risk signals generated', cls: 'text-text-secondary', dot: 'bg-background border border-text-secondary' },
    { text: 'High-priority alert created', cls: 'text-danger', dot: 'bg-danger' },
    { text: 'Investigation opened', cls: 'text-primary', dot: 'bg-primary' },
  ];

  return (
    <div className="border-l border-border pl-3">
      <div className="text-[10px] font-mono text-text-muted mb-4 uppercase tracking-widest">Timeline</div>
      <div className="space-y-4 font-mono text-[10px]">
        {rows.map((r, i) => {
          const isLast = i === rows.length - 1;
          return (
            <motion.div
              key={r.text}
              initial={isReduced ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={tr(isReduced, 0.5, { delay: isReduced ? 0 : 0.35 + i * 0.15 })}
              className={`relative flex items-center gap-3 ${r.cls}`}
            >
              <motion.span
                className={`inline-block w-1.5 h-1.5 rounded-full ${r.dot}`}
                animate={isLast && !isReduced ? { scale: [1, 2, 1] } : undefined}
                transition={isLast ? { duration: 0.8, delay: 0.35 + i * 0.15 + 0.3 } : undefined}
              />
              {r.text}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   SIGNAL NETWORK
   DETECT: signals spread out, particles travel into the transaction.
   RISK:   signals converge and shrink into the score card.
------------------------------------------------------------- */
function SignalNetwork({ activeStage, isReduced }: { activeStage: number; isReduced: boolean }) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const handleResize = () => setScale(window.innerWidth < 768 ? 0.6 : 1);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isRisk = activeStage === STAGE.RISK;

  const baseSignals = [
    { label: 'DEVICE', x: -160, y: -90, d: 0.1 },
    { label: 'LOCATION', x: -220, y: 0, d: 0.2 },
    { label: 'AMOUNT', x: 180, y: -70, d: 0.15 },
    { label: 'VELOCITY', x: -140, y: 100, d: 0.25 },
    { label: 'BEHAVIOR', x: 200, y: 60, d: 0.3 },
    { label: 'NETWORK', x: 80, y: 120, d: 0.35 },
  ];

  const signals = baseSignals.map((s) => ({
    ...s,
    targetX: isRisk ? s.x * 0.2 : s.x * scale,
    targetY: isRisk ? 60 : s.y * scale,
  }));

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
      <svg className="absolute w-[800px] h-[800px] overflow-visible pointer-events-none" style={{ zIndex: 0 }}>
        {signals.map((sig) => (
          <motion.line
            key={`line-${sig.label}`}
            x1="400"
            y1="400"
            x2={400 + sig.targetX}
            y2={400 + sig.targetY}
            stroke="var(--color-border)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: isRisk ? 0.4 : 1,
              x2: 400 + sig.targetX,
              y2: 400 + sig.targetY,
            }}
            transition={{
              pathLength: tr(isReduced, 0.8, { delay: isReduced ? 0 : sig.d }),
              opacity: tr(isReduced, 0.8),
              x2: tr(isReduced, 0.8),
              y2: tr(isReduced, 0.8),
            }}
          />
        ))}

        {/* Particles travelling from each signal into the transaction */}
        {activeStage === STAGE.DETECT &&
          !isReduced &&
          signals.map((sig) => (
            <motion.circle
              key={`p-${sig.label}`}
              r="2.5"
              fill="var(--color-primary)"
              initial={{ cx: 400 + sig.targetX, cy: 400 + sig.targetY, opacity: 0 }}
              animate={{ cx: 400, cy: 400, opacity: [0, 1, 0] }}
              transition={{
                duration: 1.6,
                delay: sig.d + 1,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: 'easeInOut',
              }}
            />
          ))}
      </svg>

      {/* Labels: fade + shrink into the score card on RISK */}
      {signals.map((sig) => (
        <motion.div
          key={`label-${sig.label}`}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: isRisk ? 0 : 1,
            scale: isRisk ? 0.5 : 1,
            x: sig.targetX,
            y: sig.targetY,
          }}
          transition={{
            opacity: {
              delay: isRisk || isReduced ? 0 : sig.d + 0.3,
              duration: isReduced ? 0 : isRisk ? 0.7 : 0.4,
            },
            scale: tr(isReduced, 0.8),
            x: tr(isReduced, 0.8),
            y: tr(isReduced, 0.8),
          }}
          className="absolute z-10"
        >
          <div className="bg-background border border-border px-2 py-0.5 text-[10px] font-mono text-text-secondary whitespace-nowrap -translate-x-1/2 -translate-y-1/2">
            {sig.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}