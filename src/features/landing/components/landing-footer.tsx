import Link from 'next/link';
import { FOOTER_GROUPS } from '../data/landing-content';

export function LandingFooter() {
  return (
    <footer className="border-t border-[#292929] bg-[#101010] text-[#A3A3A3] py-12">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold tracking-tighter text-[#F5F5F5]">RTMT</span>
            </Link>
            <p className="text-sm max-w-xs">
              Real-time transaction monitoring and risk intelligence for modern financial operations.
            </p>
          </div>
          
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-[#F5F5F5] mb-4 text-sm">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm hover:text-[#F5F5F5] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-[#292929] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} RTMT Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-[#F5F5F5]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#F5F5F5]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
