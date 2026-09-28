'use client';

import { useEffect, useState } from 'react';
import {
  Activity,
  ShieldAlert,
  ListTodo,
  FileSearch,
  Briefcase,
  Building2,
  type LucideIcon,
} from 'lucide-react';

const CAPABILITIES: { label: string; icon: LucideIcon }[] = [
  { label: 'Real-time monitoring', icon: Activity },
  { label: 'Risk detection', icon: ShieldAlert },
  { label: 'Alert management', icon: ListTodo },
  { label: 'Investigations', icon: FileSearch },
  { label: 'Case management', icon: Briefcase },
  { label: 'Merchant risk', icon: Building2 },
];

function CapabilityGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {CAPABILITIES.map(({ label, icon: Icon }) => (
        <li key={label} className="flex items-center">
          <div className="group flex cursor-default items-center gap-3 py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#292929] bg-[#171717] text-[#A3A3A3] transition-all duration-300 group-hover:border-[#6366F1]/40 group-hover:bg-[#6366F1]/10 group-hover:text-[#6366F1] group-hover:shadow-[0_0_18px_rgba(99,102,241,0.35)]">
              <Icon className="h-4 w-4" />
            </span>
            <span className="whitespace-nowrap text-sm font-medium text-[#737373] transition-colors duration-300 group-hover:text-[#F5F5F5]">
              {label}
            </span>
          </div>
          <span aria-hidden="true" className="mx-8 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#292929]" />
        </li>
      ))}
    </ul>
  );
}

export function TrustBar() {
  const [scanned, setScanned] = useState(125842);

  // Ticking counter so the bar feels alive
  useEffect(() => {
    const t = setInterval(() => setScanned((n) => n + 3 + Math.floor(Math.random() * 7)), 1200);
    return () => clearInterval(t);
  }, []);

  const fade = 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)';

  return (
    <div className="bg-[#101010]">
      <style>{`
        @keyframes tb-marquee { to { transform: translateX(-50%); } }
        @keyframes tb-sweep {
          from { transform: translateX(-100%); }
          to   { transform: translateX(400%); }
        }
        .tb-track { animation: tb-marquee 45s linear infinite; }
        .tb-track:hover { animation-play-state: paused; }
        .tb-sweep { animation: tb-sweep 7s cubic-bezier(.4,0,.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .tb-track, .tb-sweep { animation: none; }
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* scan line sweeping along the top border */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-5 top-0 h-px overflow-hidden sm:inset-x-8 lg:inset-x-10">
          <div className="tb-sweep h-px w-1/4 bg-gradient-to-r from-transparent via-[#6366F1] to-transparent" />
        </div>

        <div className="flex items-center border-y border-[#292929]">
          {/* Live status */}
          <div className="relative z-10 flex shrink-0 items-center gap-3 border-r border-[#292929] bg-[#101010] py-4 pr-5 sm:pr-7">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[#F5F5F5]">Live system</span>
              <span className="hidden text-xs tabular-nums text-[#737373] sm:block">
                {scanned.toLocaleString('en-IN')} transactions scanned
              </span>
            </div>
          </div>

          {/* Capability marquee (pauses on hover, scrolls by hand if motion is reduced) */}
          <div
            className="no-scrollbar min-w-0 flex-1 overflow-hidden motion-reduce:overflow-x-auto"
            style={{ maskImage: fade, WebkitMaskImage: fade }}
          >
            <div className="tb-track flex w-max items-center pl-8">
              <CapabilityGroup />
              <CapabilityGroup hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}