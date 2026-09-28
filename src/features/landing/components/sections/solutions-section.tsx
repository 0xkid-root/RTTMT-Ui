import { CheckCircle2 } from 'lucide-react';

const SOLUTIONS = [
  'Fraud Operations',
  'Risk Management',
  'Financial Operations',
  'Compliance Teams'
];

export function SolutionsSection() {
  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 text-center max-w-4xl">
        <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Solutions</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">
          Built for Financial Risk Operations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
          {SOLUTIONS.map((solution) => (
            <div key={solution} className="flex items-center gap-3 bg-background border border-border p-6 rounded-xl shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
              <span className="text-lg font-medium text-foreground">{solution}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
