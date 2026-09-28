import { ArrowDown } from 'lucide-react';

export function AlertSection() {
  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 text-center max-w-4xl flex flex-col items-center">
        <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Alert Management</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">
          From Alert to Investigation
        </h3>

        <div className="w-full max-w-2xl bg-card border border-border rounded-xl overflow-hidden shadow-2xl text-left mb-8">
          <div className="px-5 py-4 border-b border-border bg-surface">
            <span className="font-semibold text-foreground">Alert Queue</span>
          </div>
          <div className="divide-y divide-border">
            {[
              { level: 'HIGH', reason: 'Suspicious velocity', status: 'Open', color: 'text-danger bg-danger/10 border-danger/20' },
              { level: 'HIGH', reason: 'Unusual device', status: 'Assigned', color: 'text-danger bg-danger/10 border-danger/20' },
              { level: 'MED', reason: 'Geographic anomaly', status: 'Review', color: 'text-warning bg-warning/10 border-warning/20' },
              { level: 'LOW', reason: 'Amount threshold', status: 'Closed', color: 'text-success bg-success/10 border-success/20' },
            ].map((alert, i) => (
              <div key={i} className="p-4 flex items-center justify-between bg-background hover:bg-surface-elevated transition-colors">
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded border ${alert.color}`}>{alert.level}</span>
                  <span className="text-sm text-text-secondary">{alert.reason}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{alert.status}</span>
              </div>
            ))}
          </div>
        </div>

        <ArrowDown className="w-6 h-6 text-text-muted mb-4" />
        <div className="text-lg font-medium text-text-secondary mb-4">Investigation</div>
        <ArrowDown className="w-6 h-6 text-text-muted mb-4" />
        <div className="text-lg font-medium text-primary">Case</div>
      </div>
    </section>
  );
}
