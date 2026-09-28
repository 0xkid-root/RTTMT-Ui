import { ArrowRight, ArrowDown } from 'lucide-react';

export function RiskSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 max-w-5xl flex flex-col lg:flex-row-reverse items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-sm font-semibold text-primary tracking-widest uppercase">Risk Intelligence</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            Turn Signals Into <br className="hidden sm:block" /> Decisions
          </h3>
          <p className="text-lg text-text-secondary">
            Automatically correlate multiple risk vectors—amount, device, location, and velocity—into a single actionable score.
          </p>
        </div>

        <div className="flex-1 w-full bg-card border border-border rounded-xl p-8 shadow-2xl flex flex-col sm:flex-row items-center gap-6 justify-center">
          
          <div className="flex flex-col gap-4 text-center w-full sm:w-auto">
            <span className="text-sm text-text-secondary font-medium">Transaction</span>
            <div className="bg-surface border border-border rounded-lg p-4 text-sm text-foreground flex flex-col gap-2 shadow-sm">
              <span className="bg-background px-2 py-1 rounded border border-border">Amount</span>
              <span className="bg-background px-2 py-1 rounded border border-border">Device</span>
              <span className="bg-background px-2 py-1 rounded border border-border">Location</span>
            </div>
          </div>

          <div className="text-border hidden sm:block"><ArrowRight /></div>
          <div className="text-border sm:hidden"><ArrowDown /></div>

          <div className="flex flex-col gap-4 text-center w-full sm:w-auto">
            <span className="text-sm text-text-secondary font-medium">Risk Signals</span>
            <div className="bg-surface border border-border rounded-lg p-4 text-sm text-foreground flex flex-col gap-2 shadow-sm">
              <span className="bg-background px-2 py-1 rounded border border-border">Velocity</span>
              <span className="bg-background px-2 py-1 rounded border border-border">Pattern</span>
              <span className="bg-background px-2 py-1 rounded border border-border">Network</span>
            </div>
          </div>

          <div className="text-border hidden sm:block"><ArrowRight /></div>
          <div className="text-border sm:hidden"><ArrowDown /></div>

          <div className="flex flex-col gap-4 text-center w-full sm:w-auto">
            <span className="text-sm text-text-secondary font-medium">Risk Score</span>
            <div className="bg-surface border border-danger/30 rounded-lg p-6 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.1)]">
              <span className="text-3xl font-bold text-foreground mb-1">87</span>
              <span className="text-xs font-bold text-danger bg-danger/10 px-2 py-1 rounded-full uppercase">High</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
