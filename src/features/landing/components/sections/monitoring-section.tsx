export function MonitoringSection() {
  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 max-w-5xl flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-sm font-semibold text-primary tracking-widest uppercase">Live Monitoring</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            See Every Transaction <br className="hidden sm:block" /> in Real Time
          </h3>
          <p className="text-lg text-text-secondary">
            Watch transactions as they hit the network. Instantly identify anomalies and track volume spikes.
          </p>
        </div>

        <div className="flex-1 w-full bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
          <div className="px-5 py-4 border-b border-border bg-surface flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary tracking-widest uppercase">Live Transaction Stream</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
          </div>
          <div className="divide-y divide-border font-mono text-sm">
            {[
              { id: 'TXN-82931', amount: '₹84,500', status: 'HIGH', color: 'text-danger' },
              { id: 'TXN-82930', amount: '₹12,800', status: 'CLEAR', color: 'text-success' },
              { id: 'TXN-82929', amount: '₹45,200', status: 'REVIEW', color: 'text-warning' },
              { id: 'TXN-82928', amount: '₹18,900', status: 'CLEAR', color: 'text-success' },
            ].map((txn) => (
              <div key={txn.id} className="p-4 flex items-center justify-between bg-background">
                <span className="text-text-muted">{txn.id}</span>
                <span className="text-foreground">{txn.amount}</span>
                <span className={`font-semibold ${txn.color}`}>{txn.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
