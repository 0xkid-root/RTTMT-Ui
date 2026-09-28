import Link from 'next/link';
import { Menu } from 'lucide-react';
import { MAIN_NAV } from '../data/landing-content';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#292929] bg-[#101010]/80 backdrop-blur supports-[backdrop-filter]:bg-[#101010]/60 text-[#F5F5F5]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tighter">RTMT</span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A3A3A3]">
          {MAIN_NAV.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="transition-colors hover:text-[#F5F5F5]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-[#F5F5F5] text-[#A3A3A3] transition-colors">
            Login
          </Link>
          <Link 
            href="/demo" 
            className="inline-flex h-9 items-center justify-center rounded-md bg-[#6366F1] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#6366F1]/90"
          >
            Request Demo
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="inline-flex items-center justify-center rounded-md p-2 text-[#A3A3A3] hover:bg-[#1F1F1F] hover:text-[#F5F5F5] md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>
    </header>
  );
}
