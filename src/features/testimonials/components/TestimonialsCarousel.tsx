'use client';

import React from 'react';
import { ITestimonial } from '../domain/testimonial.schema';
import GlassCard from '@/shared/components/GlassCard';
import { Quote, Star, Building2 } from 'lucide-react';

export default function TestimonialsCarousel({ testimonials }: { testimonials: ITestimonial[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {testimonials.map((item, index) => (
        <GlassCard key={item._id || index} className="p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <Quote className="w-8 h-8 text-[#00F0FF] opacity-60" />
            
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed">
              "{item.quote}"
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            {item.avatarUrl ? (
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.avatarUrl} alt={item.clientName} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] flex items-center justify-center text-white font-bold text-sm shrink-0">
                {item.clientName.charAt(0)}
              </div>
            )}
            <div>
              <div className="text-sm font-bold text-white">{item.clientName}</div>
              <div className="text-xs text-slate-400">{item.clientRole}</div>
              <div className="text-[11px] font-mono text-[#00F0FF] flex items-center gap-1 mt-0.5">
                <Building2 className="w-3 h-3" />
                <span>{item.company}</span>
              </div>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
