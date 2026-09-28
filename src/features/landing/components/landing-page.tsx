import { LandingHeader } from './landing-header';
import { LandingFooter } from './landing-footer';
import { Activity, ShieldAlert, FileSearch, ArrowRight, Circle } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 font-sans">
      <LandingHeader />
      
      <main className="flex-1 flex flex-col items-center justify-start pt-20 pb-32 px-4 sm:px-8 text-center">
        {/* Hero Copy */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 max-w-4xl text-foreground">
          Real-Time Transaction Monitoring <br className="hidden sm:block" />
          <span className="text-text-secondary">& Risk Intelligence</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mb-10">
          Detect suspicious activity, investigate alerts, and manage risk from one powerful operations platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button className="h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            Explore Platform <ArrowRight className="w-4 h-4" />
          </button>
          <button className="h-12 px-8 rounded-md bg-surface border border-border text-foreground font-medium hover:bg-surface-elevated transition-colors">
            Request Demo
          </button>
        </div>

        {/* Hero Dashboard Preview */}
        <div className="w-full max-w-6xl mx-auto rounded-xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col text-left">
          {/* Dashboard Header */}
          <div className="h-14 border-b border-border bg-surface px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">RTMT Command Center</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium bg-success/10 text-success px-2 py-1 rounded-full border border-success/20">
              <Circle className="w-2 h-2 fill-current" />
              Live
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 bg-background">
            {/* Left Column */}
            <div className="flex-1 space-y-8">
              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-surface border border-border rounded-lg p-5">
                  <div className="text-text-secondary text-sm mb-1 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Total Transactions
                  </div>
                  <div className="text-3xl font-bold text-foreground">125,842</div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-5">
                  <div className="text-text-secondary text-sm mb-1 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-danger" /> High Risk Alerts
                  </div>
                  <div className="text-3xl font-bold text-foreground">1,248</div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-5 hidden lg:block">
                  <div className="text-text-secondary text-sm mb-1 flex items-center gap-2">
                    <FileSearch className="w-4 h-4 text-warning" /> Open Cases
                  </div>
                  <div className="text-3xl font-bold text-foreground">627</div>
                </div>
              </div>

              {/* Transaction Monitor */}
              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Live Transaction Monitor</h3>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { id: 'TXN-82931', amount: '₹84,500', status: 'HIGH', color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20' },
                    { id: 'TXN-82930', amount: '₹12,800', status: 'LOW', color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
                    { id: 'TXN-82929', amount: '₹45,200', status: 'MEDIUM', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
                  ].map((txn) => (
                    <div key={txn.id} className="px-5 py-4 flex items-center justify-between hover:bg-surface-elevated transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm text-text-secondary">{txn.id}</span>
                        <span className="font-medium text-foreground">{txn.amount}</span>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${txn.bg} ${txn.color} ${txn.border}`}>
                        {txn.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column / Risk Score */}
            <div className="w-full md:w-80 bg-surface border border-border rounded-lg p-6 flex flex-col justify-center">
              <h3 className="text-text-secondary text-sm font-medium mb-6 text-center">Current Network Risk Score</h3>
              <div className="relative flex items-center justify-center mb-6">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle className="text-border" strokeWidth="12" stroke="currentColor" fill="transparent" r="70" cx="80" cy="80" />
                  <circle className="text-danger" strokeWidth="12" strokeDasharray="440" strokeDashoffset="57" strokeLinecap="round" stroke="currentColor" fill="transparent" r="70" cx="80" cy="80" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-bold text-foreground">87</span>
                  <span className="text-xs text-danger font-medium uppercase tracking-wider mt-1">High Risk</span>
                </div>
              </div>
              <p className="text-sm text-text-muted text-center">
                System is detecting elevated anomaly patterns across multiple payment gateways.
              </p>
            </div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
