import { Activity, ShieldAlert, ListTodo, Briefcase, Building2, BarChart3 } from 'lucide-react';

const MODULES = [
  { title: 'Live Monitor', icon: Activity, desc: 'Watch transactions flow in real-time.' },
  { title: 'Risk Signals', icon: ShieldAlert, desc: 'Instant pattern and anomaly detection.' },
  { title: 'Alert Queue', icon: ListTodo, desc: 'Triage and assign flagged activity.' },
  { title: 'Cases', icon: Briefcase, desc: 'Deep dive into complex investigations.' },
  { title: 'Merchant Risk', icon: Building2, desc: 'Monitor entity-level risk profiles.' },
  { title: 'Analytics', icon: BarChart3, desc: 'Measure operations and risk trends.' },
];

export function ProductSection() {
  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 text-center max-w-5xl">
        <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Product / Platform</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-16">
          One Command Center for Risk
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <div key={mod.title} className="bg-background border border-border p-6 rounded-xl text-left hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-border mb-4 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{mod.title}</h4>
                <p className="text-text-secondary text-sm">{mod.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
