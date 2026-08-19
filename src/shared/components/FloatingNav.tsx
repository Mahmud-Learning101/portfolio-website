'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Send } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Education', href: '/education' },
  { label: 'Case Studies', href: '/projects' },
  { label: 'Testimonials', href: '/testimonials' },
];

export default function FloatingNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Sticky Centered Pill Navigation */}
      <header className="fixed top-6 sm:top-8 inset-x-0 z-[9999] flex justify-center px-4 sm:px-6 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 glass-pill rounded-full px-5 sm:px-8 py-3 max-w-6xl w-full border border-white/20 shadow-2xl backdrop-blur-xl"
        >
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] flex items-center justify-center text-white font-black text-sm shadow-[0_0_15px_rgba(0,102,255,0.5)] group-hover:shadow-[0_0_22px_rgba(0,240,255,0.7)] transition-all">
              MM
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white leading-tight group-hover:text-[#00F0FF] transition-colors">Mahmud Murad</div>
              <div className="text-xs text-slate-400 font-mono">Strategy & Operations</div>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border ${
                    isActive
                      ? 'text-white font-semibold border-white/20 bg-white/10 shadow-sm'
                      : 'text-slate-300 border-transparent hover:text-white hover:bg-white/10 hover:border-white/10 hover:scale-105 hover:shadow-md'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white text-sm font-semibold shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_28px_rgba(0,102,255,0.7)] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Let's Talk</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all hover:scale-105"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-28 z-40 md:hidden glass-surface rounded-2xl p-6 border border-white/15 shadow-2xl"
          >
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#0066FF]/20 text-[#00F0FF] border border-[#0066FF]/40 shadow-sm'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Sparkles className="w-4 h-4 text-[#00F0FF]" />}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

