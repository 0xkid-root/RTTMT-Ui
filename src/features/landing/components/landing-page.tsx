import { LandingHeader } from './landing-header';
import { LandingFooter } from './landing-footer';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1020] text-[#F8FAFC] selection:bg-[#4F46C8]/30">
      <LandingHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 sm:p-24 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
          Next-Generation <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46C8] to-[#3B82F6]">
            Transaction Monitoring
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-[#94A3B8] max-w-2xl mb-8">
          Protect your platform with real-time risk intelligence, advanced case management, and automated fraud operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="h-12 px-8 rounded-md bg-[#4F46C8] text-white font-medium hover:bg-[#4F46C8]/90 transition-colors">
            Request Demo
          </button>
          <button className="h-12 px-8 rounded-md bg-[#172033] border border-[#263248] text-[#F8FAFC] font-medium hover:bg-[#263248] transition-colors">
            Explore Platform
          </button>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
