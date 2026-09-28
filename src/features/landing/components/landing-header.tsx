import Link from 'next/link';
import { Menu } from 'lucide-react';
import { MAIN_NAV } from '../data/landing-content';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#263248] bg-[#0B1020]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0B1020]/60 text-[#F8FAFC]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tighter">RTMT</span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]">
          {MAIN_NAV.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="transition-colors hover:text-[#F8FAFC]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-[#F8FAFC] text-[#94A3B8] transition-colors">
            Login
          </Link>
          <Link 
            href="/demo" 
            className="inline-flex h-9 items-center justify-center rounded-md bg-[#4F46C8] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#4F46C8]/90"
          >
            Request Demo
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="inline-flex items-center justify-center rounded-md p-2 text-[#94A3B8] hover:bg-[#172033] hover:text-[#F8FAFC] md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>
    </header>
  );
}
