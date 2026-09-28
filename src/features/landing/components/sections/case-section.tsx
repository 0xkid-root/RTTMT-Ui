import { Plus, ArrowDown } from 'lucide-react';

export function CaseSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 max-w-4xl flex flex-col items-center text-center">
        <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Case Management</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Investigate With Context
        </h3>
        <p className="text-lg text-text-secondary max-w-2xl mb-16">
          Bring every piece of data into a single case view to make fast, accurate risk decisions.
        </p>

        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <div className="w-full bg-surface border border-border p-4 rounded-lg text-foreground font-medium shadow-sm">
            Transaction Data
          </div>
          <Plus className="w-5 h-5 text-text-muted" />
          <div className="w-full bg-surface border border-border p-4 rounded-lg text-foreground font-medium shadow-sm">
            Risk Signals
          </div>
          <Plus className="w-5 h-5 text-text-muted" />
          <div className="w-full bg-surface border border-border p-4 rounded-lg text-foreground font-medium shadow-sm">
            Merchant History
          </div>
          <Plus className="w-5 h-5 text-text-muted" />
          <div className="w-full bg-surface border border-border p-4 rounded-lg text-foreground font-medium shadow-sm">
            Activity Timeline
          </div>
          
          <ArrowDown className="w-6 h-6 text-primary my-4" />
          
          <div className="w-full bg-primary text-primary-foreground p-4 rounded-lg font-bold shadow-lg shadow-primary/20">
            Final Action
          </div>
        </div>
      </div>
    </section>
  );
}
