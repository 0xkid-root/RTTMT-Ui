'use client';

import { useEffect, useRef, useState } from 'react';
import { Activity, ShieldAlert, FileSearch, ArrowRight, Circle, Check } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type TxnStatus = 'HIGH' | 'MEDIUM' | 'LOW';

interface Transaction {
  id: string;
  amount: number;
  status: TxnStatus;
  gateway: string;
  signals: string[];
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const GATEWAYS = ['UPI', 'Card', 'NetBanking', 'Wallet'];

const SIGNALS: Record<TxnStatus, string[]> = {
  HIGH: [
    "Amount is 6x the account's 30-day average",
    'Device seen for the first time 2 minutes ago',
    'Three payment gateways used within 90 seconds',
    'Recipient added less than an hour ago',
    'Location differs from the last 10 logins',
  ],
  MEDIUM: [
    'Amount higher than usual for this merchant',
    'Login from a new city',
    'Two failed attempts before this payment',
  ],
  LOW: ['Matches usual spending pattern', 'Known device and recipient'],
};

const STYLE: Record<TxnStatus, { color: string; bg: string; border: string; bar: string }> = {
  HIGH: { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', bar: 'bg-danger' },
  MEDIUM: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', bar: 'bg-warning' },
  LOW: { color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', bar: 'bg-success' },
};

const SEED: Transaction[] = [
  { id: 'TXN-82931', amount: 84500, status: 'HIGH', gateway: 'UPI', signals: SIGNALS.HIGH.slice(0, 3) },
  { id: 'TXN-82930', amount: 12800, status: 'LOW', gateway: 'Card', signals: SIGNALS.LOW.slice(0, 1) },
  { id: 'TXN-82929', amount: 45200, status: 'MEDIUM', gateway: 'NetBanking', signals: SIGNALS.MEDIUM.slice(0, 2) },
  { id: 'TXN-82928', amount: 3200, status: 'LOW', gateway: 'UPI', signals: SIGNALS.LOW.slice(1, 2) },
  { id: 'TXN-82927', amount: 9600, status: 'LOW', gateway: 'Wallet', signals: SIGNALS.LOW.slice(0, 1) },
  { id: 'TXN-82926', amount: 27800, status: 'MEDIUM', gateway: 'Card', signals: SIGNALS.MEDIUM.slice(1, 3) },
];

const pick = <T,>(arr: T[], n: number): T[] => [...arr].sort(() => Math.random() - 0.5).slice(0, n);
const fmt = (n: number) => Math.round(n).toLocaleString('en-IN');

function makeTxn(num: number): Transaction {
  const r = Math.random();
  const status: TxnStatus = r < 0.28 ? 'HIGH' : r < 0.55 ? 'MEDIUM' : 'LOW';
  const base =
    status === 'HIGH' ? 40000 + Math.random() * 80000
      : status === 'MEDIUM' ? 15000 + Math.random() * 40000
        : 500 + Math.random() * 15000;
  return {
    id: `TXN-${num}`,
    amount: Math.round(base / 100) * 100,
    status,
    gateway: GATEWAYS[Math.floor(Math.random() * GATEWAYS.length)],
    signals: pick(SIGNALS[status], status === 'HIGH' ? 3 : status === 'MEDIUM' ? 2 : 1),
  };
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function useAnimatedNumber(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      from.current = target;
      // Use setTimeout to avoid calling setState synchronously in the effect
      const t = setTimeout(() => setValue(target), 0);
      return () => clearTimeout(t);
    }
    const startVal = from.current;
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = startVal + (target - startVal) * eased;
      from.current = v;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

function Sparkline({ data, className = '' }: { data: number[]; className?: string }) {
  const w = 120;
  const h = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`)
    .join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={className} aria-hidden="true">
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

const RADIUS = 70;
const CIRC = 2 * Math.PI * RADIUS;

export function HeroSection() {
  const [feed, setFeed] = useState<Transaction[]>(SEED);
  const [totals, setTotals] = useState({ total: 125842, high: 1248, cases: 627 });
  const [score, setScore] = useState(87);
  const [pinned, setPinned] = useState<string | null>(null);
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<number[]>(() =>
    Array.from({ length: 24 }, (_, i) => 50 + Math.sin(i / 2.2) * 14 + (i % 5) * 2)
  );

  const counter = useRef(82932);
  const paused = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 350);
    return () => clearTimeout(t);
  }, []);

  // Live stream of transactions
  useEffect(() => {
    const t = setInterval(() => {
      if (paused.current) return;
      const txn = makeTxn(counter.current++);
      setFeed((f) => [txn, ...f].slice(0, 6));
      setTotals((s) => ({
        ...s,
        total: s.total + 1 + Math.floor(Math.random() * 4),
        high: s.high + (txn.status === 'HIGH' ? 1 : 0),
      }));
      setScore((s) => {
        const d = txn.status === 'HIGH' ? 2 : txn.status === 'LOW' ? -1 : 0;
        return Math.max(68, Math.min(94, s + d + (Math.random() > 0.5 ? 1 : -1)));
      });
      setHistory((h) => [...h.slice(1), 40 + Math.random() * 40 + (txn.status === 'HIGH' ? 20 : 0)]);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  const selected =
    feed.find((t) => t.id === pinned) || feed.find((t) => t.status === 'HIGH') || feed[0];

  const openCase = (id: string) => {
    if (opened[id]) return;
    setOpened((o) => ({ ...o, [id]: true }));
    setTotals((s) => ({ ...s, cases: s.cases + 1 }));
  };

  const totalShown = useAnimatedNumber(totals.total, 500);
  const highShown = useAnimatedNumber(totals.high, 500);
  const casesShown = useAnimatedNumber(totals.cases, 500);
  const scoreShown = useAnimatedNumber(score, 700);

  const level =
    score >= 80
      ? { label: 'High Risk', text: 'text-danger' }
      : score >= 60
        ? { label: 'Elevated', text: 'text-warning' }
        : { label: 'Normal', text: 'text-success' };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const spotlightMask = 'radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), black, transparent 70%)';
  const gridMask = 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)';

  return (
    <section className="relative overflow-hidden flex flex-col items-center justify-start pt-20 pb-32 px-5 sm:px-8 lg:px-10 text-center">
      <style>{`
        @keyframes rtmt-rise {
          from { opacity: 0; transform: perspective(1400px) translateY(56px) rotateX(10deg) scale(.97); }
          to   { opacity: 1; transform: perspective(1400px) translateY(0) rotateX(0) scale(1); }
        }
        @keyframes rtmt-row {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rtmt-rise { animation: rtmt-rise 1.1s cubic-bezier(.16,1,.3,1) .15s both; }
        .rtmt-row  { animation: rtmt-row .45s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .rtmt-rise, .rtmt-row { animation: none; }
        }
      `}</style>

      {/* Background: glow + fading grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-160px] h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div
          className="absolute inset-0 text-border opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: gridMask,
            WebkitMaskImage: gridMask,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-sm font-medium text-text-secondary mb-8 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Real-time transaction intelligence
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-foreground">
          See risk before it becomes <br className="hidden sm:block" />
          <span className="text-text-secondary">a problem.</span>
        </h1>

        <p className="text-lg text-text-secondary max-w-2xl mb-10">
          Monitor every transaction, detect suspicious patterns, and give your risk team the context to investigate and act faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button className="group h-12 px-8 rounded-md bg-white text-[#101010] font-semibold shadow-lg shadow-white/5 hover:bg-white/90 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            Explore Platform
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="h-12 px-8 rounded-md bg-surface border border-white/10 text-foreground font-medium hover:bg-surface-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Request Demo
          </button>
        </div>

        {/* Hero Dashboard Preview */}
        <div
          onMouseMove={onMove}
          className="rtmt-rise group relative w-full max-w-6xl mx-auto rounded-xl border border-border bg-card shadow-2xl shadow-primary/10 overflow-hidden flex flex-col text-left"
        >
          {/* top edge highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
          {/* cursor spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 bg-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ maskImage: spotlightMask, WebkitMaskImage: spotlightMask }}
          />

          <div className="h-14 border-b border-border bg-surface px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">RTMT Command Center</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium bg-success/10 text-success px-2 py-1 rounded-full border border-success/20">
              <Circle className="w-2 h-2 fill-current animate-pulse" />
              Live
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 bg-background">
            <div className="flex-1 min-w-0 space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-surface border border-border rounded-lg p-5 overflow-hidden">
                  <div className="text-text-secondary text-sm mb-1 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Total Transactions
                  </div>
                  <div className="text-3xl font-bold text-foreground tabular-nums">{fmt(totalShown)}</div>
                  <Sparkline data={history} className="mt-3 h-8 w-full text-primary" />
                </div>
                <div className="bg-surface border border-border rounded-lg p-5 overflow-hidden">
                  <div className="text-text-secondary text-sm mb-1 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-danger" /> High Risk Alerts
                  </div>
                  <div className="text-3xl font-bold text-foreground tabular-nums">{fmt(highShown)}</div>
                  <Sparkline data={[...history].reverse()} className="mt-3 h-8 w-full text-danger" />
                </div>
                <div className="bg-surface border border-border rounded-lg p-5 hidden lg:block overflow-hidden">
                  <div className="text-text-secondary text-sm mb-1 flex items-center gap-2">
                    <FileSearch className="w-4 h-4 text-warning" /> Open Cases
                  </div>
                  <div className="text-3xl font-bold text-foreground tabular-nums">{fmt(casesShown)}</div>
                  <Sparkline data={history.map((v, i) => v + (i % 3) * 6)} className="mt-3 h-8 w-full text-warning" />
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Live Transaction Monitor</h3>
                  <span className="text-xs text-text-muted hidden sm:inline">Select a transaction to see why it was scored</span>
                </div>
                <div
                  className="divide-y divide-border"
                  onMouseEnter={() => (paused.current = true)}
                  onMouseLeave={() => (paused.current = false)}
                >
                  {feed.map((txn) => {
                    const s = STYLE[txn.status];
                    const isSel = selected.id === txn.id;
                    return (
                      <button
                        key={txn.id}
                        type="button"
                        aria-pressed={isSel}
                        onClick={() => setPinned(txn.id)}
                        className={`rtmt-row relative w-full px-5 py-3.5 flex items-center justify-between text-left transition-colors hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${isSel ? 'bg-surface-elevated' : ''
                          }`}
                      >
                        {isSel && <span className={`absolute left-0 top-0 h-full w-0.5 ${s.bar}`} />}
                        <div className="flex items-center gap-4 min-w-0">
                          <span className="font-mono text-sm text-text-secondary">{txn.id}</span>
                          <span className="font-medium text-foreground tabular-nums">₹{fmt(txn.amount)}</span>
                          <span className="hidden sm:inline text-xs text-text-muted">{txn.gateway}</span>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${s.bg} ${s.color} ${s.border}`}>
                          {txn.status}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 flex flex-col gap-4">
              <div className="bg-surface border border-border rounded-lg p-6 flex flex-col justify-center">
                <h3 className="text-text-secondary text-sm font-medium mb-5 text-center">Current Network Risk Score</h3>
                <div className="relative flex items-center justify-center mb-5">
                  <svg viewBox="0 0 160 160" className="w-40 h-40 transform -rotate-90">
                    <circle className="text-border" strokeWidth="12" stroke="currentColor" fill="transparent" r={RADIUS} cx="80" cy="80" />
                    <circle
                      className={level.text}
                      strokeWidth="12"
                      strokeDasharray={CIRC}
                      strokeDashoffset={mounted ? CIRC * (1 - score / 100) : CIRC}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r={RADIUS}
                      cx="80"
                      cy="80"
                      style={{
                        transition: 'stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1), color .5s',
                        filter: 'drop-shadow(0 0 8px currentColor)',
                      }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-bold text-foreground tabular-nums">{Math.round(scoreShown)}</span>
                    <span className={`text-xs font-medium uppercase tracking-wider mt-1 ${level.text}`}>{level.label}</span>
                  </div>
                </div>
                <p className="text-sm text-text-muted text-center">
                  System is detecting elevated anomaly patterns across multiple payment gateways.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm text-text-secondary">{selected.id}</span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STYLE[selected.status].bg} ${STYLE[selected.status].color} ${STYLE[selected.status].border}`}
                  >
                    {selected.status}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  {selected.status === 'LOW' ? 'Why this looks safe' : 'Why this was flagged'}
                </h4>
                <ul key={selected.id} className="space-y-2.5 mb-4">
                  {selected.signals.map((sig) => (
                    <li key={sig} className="rtmt-row flex items-start gap-2.5 text-sm text-text-secondary">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${STYLE[selected.status].bar}`} />
                      {sig}
                    </li>
                  ))}
                </ul>
                {selected.status !== 'LOW' && (
                  <button
                    type="button"
                    onClick={() => openCase(selected.id)}
                    disabled={!!opened[selected.id]}
                    className="w-full h-10 rounded-md bg-white text-[#101010] text-sm font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:bg-success/10 disabled:text-success disabled:border disabled:border-success/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    {opened[selected.id] ? (
                      <>
                        <Check className="w-4 h-4" /> Case opened
                      </>
                    ) : (
                      'Open case'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}