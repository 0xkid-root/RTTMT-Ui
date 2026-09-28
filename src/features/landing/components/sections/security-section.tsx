import { ShieldCheck } from 'lucide-react';

const SECURITY_FEATURES = [
  'Role-based access',
  'Audit trails',
  'Secure operations',
  'Investigation history'
];

export function SecuritySection() {
  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 max-w-5xl flex flex-col md:flex-row items-center gap-12 justify-between">
        <div className="flex-1 space-y-6">
          <h2 className="text-sm font-semibold text-primary tracking-widest uppercase">Security</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            Built for Sensitive <br className="hidden sm:block" /> Financial Operations
          </h3>
        </div>

        <div className="flex-1 w-full bg-card border border-border rounded-xl p-8 shadow-sm">
          <ul className="space-y-4">
            {SECURITY_FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-foreground font-medium">
                <ShieldCheck className="w-5 h-5 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
