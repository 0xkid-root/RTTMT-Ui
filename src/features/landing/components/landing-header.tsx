"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { MAIN_NAV } from '../data/landing-content';

const cinematicEase = [0.16, 1, 0.3, 1] as const;

type NavItem = { label: string; href: string };
const NAV = MAIN_NAV as ReadonlyArray<NavItem>;

const hashId = (href: string) => (href.includes('#') ? href.split('#')[1] : null);

export function LandingHeader() {
  const pathname = usePathname();
  const isReduced = useReducedMotion() ?? false;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Scroll state + progress line
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 8));
  useEffect(() => setScrolled(scrollY.get() > 8), [scrollY]);

  // Highlight the nav item whose section is on screen (for #anchor links)
  useEffect(() => {
    const ids = NAV.map((n) => hashId(n.href)).filter(Boolean) as string[];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    els.forEach((el) => observer.observe(el));

    const onTop = () => window.scrollY < 200 && setActiveId(null);
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, [pathname]);

  const isActive = (item: NavItem) => {
    const id = hashId(item.href);
    if (id) return activeId === id;
    return item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  };

  // Close on route change, lock body scroll, close on Escape
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101010]';

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${scrolled || menuOpen
        ? 'border-white/[0.09] bg-[#101010]/95 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
        : 'border-white/[0.06] bg-[#101010]/70'
        }`}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-10 transition-[height] duration-300 ${scrolled ? 'h-[60px]' : 'h-[72px]'
          }`}
      >
        {/* Logo */}
        <Link href="/" aria-label="RTMT home" className={`group flex items-center gap-3 rounded-md ${focusRing}`}>
          <Image
            src="/rttmt_logo-removebg-preview.png"
            alt=""
            width={150}
            height={40}
            className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${scrolled ? 'h-8' : 'h-10'
              }`}
            priority
          />
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-white">RTTMT</span>
        </Link>

        {/* Desktop navigation with a hover pill that glides between items */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                onMouseEnter={() => setHovered(item.label)}
                onFocus={() => setHovered(item.label)}
                onBlur={() => setHovered(null)}
                className={`relative rounded-md px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${focusRing} ${active || hovered === item.label ? 'text-white' : 'text-white/55'
                  }`}
              >
                {hovered === item.label && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 -z-10 rounded-md bg-white/[0.06]"
                    transition={isReduced ? { duration: 0 } : { duration: 0.35, ease: cinematicEase }}
                  />
                )}
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active-line"
                    className="absolute left-4 right-4 -bottom-[1px] h-px bg-white"
                    transition={isReduced ? { duration: 0 } : { duration: 0.4, ease: cinematicEase }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="#"
            className={`rounded-md text-[13px] font-medium text-white/60 transition-colors hover:text-white ${focusRing}`}
          >
            Login
          </Link>

          <Link
            href="#"
            className={`group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-white px-4 text-[13px] font-semibold text-[#101010] transition-all duration-200 hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.18)] active:scale-[0.97] ${focusRing}`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-black/10 opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100"
            />
            <span className="relative">Request Call</span>
            <ArrowUpRight className="relative h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/70 transition hover:bg-white/[0.07] hover:text-white md:hidden ${focusRing}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? 'x' : 'menu'}
              initial={isReduced ? false : { opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={isReduced ? undefined : { opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={isReduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={isReduced ? undefined : { opacity: 0, height: 0 }}
            transition={isReduced ? { duration: 0 } : { duration: 0.4, ease: cinematicEase }}
            className="overflow-hidden border-t border-white/[0.06] md:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto flex max-w-[1400px] flex-col px-5 sm:px-8 pb-6 pt-3">
              {NAV.map((item, i) => {
                const active = isActive(item);
                return (
                  <motion.div
                    key={item.label}
                    initial={isReduced ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: cinematicEase, delay: isReduced ? 0 : 0.08 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center justify-between border-b border-white/[0.06] py-4 text-[17px] font-medium transition-colors ${focusRing} ${active ? 'text-white' : 'text-white/60 hover:text-white'
                        }`}
                    >
                      {item.label}
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={isReduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: cinematicEase, delay: isReduced ? 0 : 0.12 + NAV.length * 0.05 }}
                className="mt-6 flex flex-col gap-3"
              >
                <Link
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white text-[14px] font-semibold text-[#101010] active:scale-[0.98] ${focusRing}`}
                >
                  Request Call
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className={`inline-flex h-12 items-center justify-center rounded-lg border border-white/10 text-[14px] font-medium text-white/70 hover:text-white ${focusRing}`}
                >
                  Login
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress line */}
      {!isReduced && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute -bottom-px left-0 h-px w-full origin-left bg-gradient-to-r from-white/0 via-white/70 to-white"
        />
      )}
    </header>
  );
}