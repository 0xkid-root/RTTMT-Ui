import { ArrowDown } from 'lucide-react';

export function WorkflowSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 text-center max-w-4xl">
        <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">How RTMT Works</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-16">
          From Transaction → Decision
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
          
          <div className="flex-1 flex flex-col items-center">
            <span className="text-4xl font-bold text-border mb-4">01</span>
            <h4 className="text-xl font-semibold text-foreground mb-4">Monitor</h4>
            <ArrowDown className="w-5 h-5 text-text-muted mb-4 md:hidden" />
            <div className="bg-surface border border-border rounded-lg p-4 w-full text-text-secondary">
              Transactions
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <span className="text-4xl font-bold text-border mb-4">02</span>
            <h4 className="text-xl font-semibold text-foreground mb-4">Detect</h4>
            <ArrowDown className="w-5 h-5 text-text-muted mb-4 md:hidden" />
            <div className="bg-surface border border-border rounded-lg p-4 w-full text-text-secondary">
              Risk Signals
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <span className="text-4xl font-bold text-border mb-4">03</span>
            <h4 className="text-xl font-semibold text-foreground mb-4">Investigate</h4>
            <div className="bg-surface border border-border rounded-lg p-4 w-full text-text-secondary">
              Alerts/Cases
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
