import { ArrowDown, ArrowDownLeft, ArrowDownRight } from 'lucide-react';

export function IntegrationSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 text-center max-w-4xl flex flex-col items-center">
        <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Integration</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">
          Connect Your Transaction Ecosystem
        </h3>

        <div className="flex flex-col items-center gap-6 w-full max-w-lg">
          <div className="bg-surface border border-border px-8 py-4 rounded-xl font-medium text-foreground w-full shadow-sm">
            Payment Gateway
          </div>
          <ArrowDown className="w-5 h-5 text-text-muted" />
          <div className="bg-surface border border-border px-8 py-4 rounded-xl font-medium text-foreground w-full shadow-sm">
            Transaction Systems
          </div>
          <ArrowDown className="w-5 h-5 text-text-muted" />
          <div className="bg-primary px-8 py-6 rounded-xl font-bold text-primary-foreground text-xl w-full shadow-lg shadow-primary/20">
            RTMT
          </div>
          
          <div className="flex w-full justify-between px-8 relative mt-2 text-text-muted">
            <ArrowDownLeft className="w-6 h-6" />
            <ArrowDown className="w-6 h-6" />
            <ArrowDownRight className="w-6 h-6" />
          </div>

          <div className="flex w-full justify-between gap-4 mt-2">
            <div className="flex-1 bg-surface border border-border p-3 rounded-lg text-sm text-foreground">Alerts</div>
            <div className="flex-1 bg-surface border border-border p-3 rounded-lg text-sm text-foreground">Risk</div>
            <div className="flex-1 bg-surface border border-border p-3 rounded-lg text-sm text-foreground">Cases</div>
          </div>

          <ArrowDown className="w-5 h-5 text-text-muted my-2" />
          
          <div className="bg-surface-elevated border border-border px-8 py-4 rounded-xl font-medium text-foreground w-full shadow-sm">
            Operations Team
          </div>
        </div>
      </div>
    </section>
  );
}
