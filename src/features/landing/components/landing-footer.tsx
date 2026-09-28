import Link from 'next/link';
import { FOOTER_GROUPS } from '../data/landing-content';

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background text-text-secondary">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        {/* Main Footer */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center mb-5"
              aria-label="RTMT Home"
            >
              <span className="text-2xl font-bold tracking-[-0.04em] text-foreground">
                RTMT
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-text-secondary">
              Real-time transaction monitoring and risk intelligence for
              modern financial operations.
            </p>

            <Link
              href="#contact"
              className="mt-6 inline-flex items-center text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Request a Demo
              <span className="ml-1.5">→</span>
            </Link>
          </div>

          {/* Footer Groups */}
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                {group.title}
              </h3>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-border pt-7">
          <div className="flex flex-col gap-5 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} RTMT. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="#privacy"
                className="transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>

              <Link
                href="#terms"
                className="transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>

              <Link
                href="#security"
                className="transition-colors hover:text-foreground"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
