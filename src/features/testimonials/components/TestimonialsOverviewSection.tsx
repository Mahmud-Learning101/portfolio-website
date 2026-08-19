'use client';

import React from 'react';
import Link from 'next/link';
import GlassCard from '@/shared/components/GlassCard';
import { ITestimonial } from '../domain/testimonial.schema';
import { Quote, Star, Building2, ArrowRight } from 'lucide-react';

export default function TestimonialsOverviewSection({ testimonials }: { testimonials: ITestimonial[] }) {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#070B19] relative z-10 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
            <Quote className="w-3.5 h-3.5" />
            <span>Executive Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Client & Leadership <span className="text-gradient-cyan">Recommendations</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Direct feedback from portfolio directors, department heads, and project managers.
          </p>
        </div>

        {/* 2 Featured Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.slice(0, 2).map((item, index) => (
            <GlassCard key={item._id || index} className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <Quote className="w-7 h-7 text-[#00F0FF] opacity-60" />
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-slate-200 text-xs sm:text-sm italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {item.clientName.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{item.clientName}</div>
                  <div className="text-[11px] text-slate-400">{item.clientRole}</div>
                  <div className="text-[10px] font-mono text-[#00F0FF] flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3" />
                    <span>{item.company}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Bottom Link to Testimonials Page */}
        <div className="text-center pt-2">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-200 font-semibold text-xs transition-all hover:scale-105"
          >
            <span>Read All Executive Endorsements ({testimonials.length})</span>
            <ArrowRight className="w-4 h-4 text-[#00F0FF]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
