'use client';

import React from 'react';
import { useLenis } from '@/shared/hooks/useLenis';
import FloatingNav from '@/shared/components/FloatingNav';
import Footer from '@/shared/components/Footer';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize 60fps Lenis smooth scroll
  useLenis();

  return (
    <div className="relative min-h-screen flex flex-col bg-[#070B19]">
      <FloatingNav />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
