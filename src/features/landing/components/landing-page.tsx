import { LandingHeader } from './landing-header';
import { LandingFooter } from './landing-footer';
import { HeroSection } from './sections/hero-section';
import { TrustBar } from './sections/trust-bar';
import { ProblemSection } from './sections/problem-section';
import { ProductSection } from './sections/product-section';
import { WorkflowSection } from './sections/workflow-section';
import { MonitoringSection } from './sections/monitoring-section';
import { RiskSection } from './sections/risk-section';
import { AlertSection } from './sections/alert-section';
import { CaseSection } from './sections/case-section';
import { SolutionsSection } from './sections/solutions-section';
import { IntegrationSection } from './sections/integration-section';
import { SecuritySection } from './sections/security-section';
import { CtaSection } from './sections/cta-section';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 font-sans">
      <LandingHeader />
      
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <TrustBar />
        <ProblemSection />
        <ProductSection />
        <WorkflowSection />
        <MonitoringSection />
        <RiskSection />
        <AlertSection />
        <CaseSection />
        <SolutionsSection />
        <IntegrationSection />
        <SecuritySection />
        <CtaSection />
      </main>

      <LandingFooter />
    </div>
  );
}
