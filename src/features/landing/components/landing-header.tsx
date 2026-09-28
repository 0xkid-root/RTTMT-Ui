import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Menu } from 'lucide-react';
import { MAIN_NAV } from '../data/landing-content';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#101010]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <Image
            src="/rttmt_logo-removebg-preview.png"
            alt="RTMT Logo"
            width={150}
            height={40}
            className="w-auto h-10 object-contain "
            priority
          />
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-white">
            RTTMT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                rounded-md px-4 py-2
                text-[13px] font-medium
                text-white/55
                transition-all duration-200
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/login"
            className="
              text-[13px] font-medium
              text-white/60
              transition-colors
              hover:text-white
            "
          >
            Login
          </Link>

          <Link
            href="/demo"
            className="
              group inline-flex h-10 items-center gap-2
              rounded-lg
              border border-white/10
              bg-white
              px-4
              text-[13px] font-semibold
              text-[#101010]
              transition-all duration-200
              hover:bg-white/90
            "
          >
            Request Demo

            <ArrowUpRight
              className="
                h-3.5 w-3.5
                transition-transform duration-200
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>

        {/* Mobile */}
        <button
          type="button"
          aria-label="Open navigation menu"
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg
            border border-white/10
            bg-white/[0.03]
            text-white/70
            transition
            hover:bg-white/[0.07]
            hover:text-white
            md:hidden
          "
        >
          <Menu className="h-[18px] w-[18px]" />
        </button>
      </div>
    </header>
  );
}
