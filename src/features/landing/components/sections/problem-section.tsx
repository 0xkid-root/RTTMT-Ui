export function ProblemSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 text-center max-w-3xl">
        <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">The Problem</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Financial Risk Moves Faster Than Manual Review
        </h3>
        <p className="text-lg text-text-secondary leading-relaxed">
          Transactions happen every second. Risk signals are scattered across systems. 
          Teams need one place to detect, investigate, and respond before the damage is done.
        </p>
      </div>
    </section>
  );
}
