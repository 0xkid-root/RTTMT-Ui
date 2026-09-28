import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10 text-center relative z-10 max-w-3xl">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
          Turn Transaction Data Into Risk Intelligence.
        </h2>
        <p className="text-xl text-text-secondary mb-12">
          Monitor. Detect. Investigate. Act.
        </p>
        <button className="h-14 px-8 rounded-md bg-primary text-primary-foreground font-medium text-lg hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
          Request Demo <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
