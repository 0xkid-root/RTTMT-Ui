import Link from 'next/link';
import { Menu } from 'lucide-react';
import { MAIN_NAV } from '../data/landing-content';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tighter">RTMT</span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          {MAIN_NAV.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-foreground text-text-secondary transition-colors">
            Login
          </Link>
          <Link 
            href="/demo" 
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Request Demo
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="inline-flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-surface-elevated hover:text-foreground md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>
    </header>
  );
}
