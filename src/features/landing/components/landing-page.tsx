import { LandingHeader } from './landing-header';
import { LandingFooter } from './landing-footer';
import { HeroSection } from './sections/hero-section';
import { TrustBar } from './sections/trust-bar';
import { ProblemSection } from './sections/problem-section';
import { ProductSection } from './sections/product-section';
import { HowRtmtWorksSection } from './sections/how-rtmt-works-section';


import { CtaSection } from './sections/cta-section';
import { WhyRealTimeRiskSection } from './sections/why-real-time-risk-section';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 font-sans">
      <LandingHeader />

      <main className="flex-1 flex flex-col">
        <HeroSection />
        <TrustBar />
        <ProblemSection />
        <ProductSection />
        <HowRtmtWorksSection />
        <WhyRealTimeRiskSection />

        <CtaSection />
      </main>

      <LandingFooter />
    </div>
  );
}
