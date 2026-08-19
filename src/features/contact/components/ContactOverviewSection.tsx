import React from 'react';
import Link from 'next/link';
import GlassCard from '@/shared/components/GlassCard';
import GlassContactForm from './GlassContactForm';
import { IProfileConfig } from '@/features/profile/domain/profile.schema';
import { Mail, Phone, MapPin, ArrowRight, MessageSquare, Clock, Globe } from 'lucide-react';

export default function ContactOverviewSection({ profile }: { profile: IProfileConfig }) {
  const primaryEmail = profile?.emails?.[0] || 'smmahmudbinmurad@gmail.com';
  const secondaryEmail = profile?.emails?.[1] || 'anim.mahmud@gmail.com';
  const primaryPhone = profile?.phones?.[0] || '+8801755087633';
  const secondaryPhone = profile?.phones?.[1] || '+8801632611855';
  const location = profile?.location || 'Sector 11, Uttara Model Town, Dhaka - 1230, Bangladesh';

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#070B19] relative z-10 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Reach & Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Shape <span className="text-gradient-cyan">Your Next Chapter?</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Whether you need fractional AI leadership, process optimization, or strategic advisory, reach out directly.
          </p>
        </div>

        {/* 2 Grid Columns: Direct Reach Cards + Embedded Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Reach Cards */}
          <div className="lg:col-span-4 space-y-4">
            <GlassCard className="p-5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#0066FF]/20 text-[#00F0FF] flex items-center justify-center border border-[#0066FF]/40 mb-2">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Direct Business Email</div>
              <a href={`mailto:${primaryEmail}`} className="text-xs font-bold text-white hover:text-[#00F0FF] transition-colors block">
                {primaryEmail}
              </a>
              {secondaryEmail && (
                <a href={`mailto:${secondaryEmail}`} className="text-[11px] text-slate-300 hover:text-[#00F0FF] transition-colors block">
                  {secondaryEmail}
                </a>
              )}
            </GlassCard>

            <GlassCard className="p-5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 mb-2">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Phone Reach</div>
              <a href={`tel:${primaryPhone.replace(/\s+/g, '')}`} className="text-xs font-bold text-white hover:text-emerald-400 transition-colors block">
                {primaryPhone}
              </a>
              {secondaryPhone && (
                <a href={`tel:${secondaryPhone.replace(/\s+/g, '')}`} className="text-[11px] text-slate-300 hover:text-emerald-400 transition-colors block">
                  {secondaryPhone}
                </a>
              )}
            </GlassCard>

            <GlassCard className="p-5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40 mb-2">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Office Location</div>
              <div className="text-xs font-bold text-white">{location}</div>
            </GlassCard>
          </div>

          {/* Right Column: Embedded Contact Form */}
          <div className="lg:col-span-8">
            <GlassContactForm />
          </div>

        </div>

      </div>
    </section>
  );
}
