import Link from 'next/link';
import { FOOTER_GROUPS } from '../data/landing-content';

export function LandingFooter() {
  return (
    <footer className="border-t border-[#263248] bg-[#0B1020] text-[#94A3B8] py-12">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold tracking-tighter text-[#F8FAFC]">RTMT</span>
            </Link>
            <p className="text-sm max-w-xs">
              Real-time transaction monitoring and risk intelligence for modern financial operations.
            </p>
          </div>
          
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-[#F8FAFC] mb-4 text-sm">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm hover:text-[#F8FAFC] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-[#263248] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} RTMT Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#F8FAFC]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#F8FAFC]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
