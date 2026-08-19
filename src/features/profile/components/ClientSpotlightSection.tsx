'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/shared/components/GlassCard';
import { IProfileConfig } from '../domain/profile.schema';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  Briefcase,
  UserCheck
} from 'lucide-react';

export default function ClientSpotlightSection({ profile }: { profile: IProfileConfig }) {
  const subtitle = profile.spotlightSubtitle || 'Executive Spotlight';
  const title = profile.spotlightTitle || 'Driving Growth, AI Workflows & Operational Excellence';
  const bio = profile.spotlightBio || profile.bioShort || 'A forward-thinking strategist bringing together analytical rigor, creative storytelling, and AI-enabled process optimization.';
  const highlights = (profile.spotlightHighlights && profile.spotlightHighlights.length > 0)
    ? profile.spotlightHighlights
    : [
        '10+ Years Strategic & Operational Leadership',
        'AI & Automation Workflow Integration',
        'Data-Driven Marketing & Martech Optimization',
        'Global Team Management & Performance'
      ];

  const imageSrc = profile.avatarUrl || '/assets/client-portrait.jpg';

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-[#070B19] relative z-10 overflow-hidden border-t border-white/5">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#0066FF]/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#00F0FF]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT HALF: Text Narrative & Highlights */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#00F0FF] text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{subtitle}</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              {title.includes('&') ? (
                <>
                  {title.split('&')[0]} & <span className="text-gradient-cyan">{title.split('&').slice(1).join('&')}</span>
                </>
              ) : (
                title
              )}
            </h2>

            {/* Main Bio Text */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              {bio}
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all flex items-start gap-3 group"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#00F0FF] transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(0,102,255,0.4)] transition-all hover:scale-105"
              >
                <span>Read Full Background</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-5.5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-200 font-semibold text-xs sm:text-sm transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Get In Touch</span>
              </Link>
            </div>

          </div>

          {/* RIGHT HALF: Client Picture with Frame & Stat Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Decorative Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#0066FF]/30 to-[#00F0FF]/30 rounded-3xl blur-2xl opacity-60 -z-10 group-hover:opacity-80 transition-opacity" />

            <div className="relative w-full max-w-md lg:max-w-none group">
              
              {/* Outer Glass Card Frame */}
              <GlassCard className="p-3 sm:p-4 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden bg-gradient-to-b from-white/[0.08] to-white/[0.02]">
                
                {/* Image Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={profile.fullName || 'Client Portrait'}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay at bottom of image for badge legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B19] via-transparent to-transparent opacity-80" />
                </div>

                {/* Floating Top-Right Badge */}
                <div className="absolute top-6 right-6 px-3.5 py-2 rounded-xl bg-[#070B19]/80 backdrop-blur-md border border-white/15 shadow-xl flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white leading-none">Verified Leader</div>
                    <div className="text-[9px] text-slate-400 font-mono mt-0.5">Strategy & Ops</div>
                  </div>
                </div>

                {/* Floating Bottom-Left Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-3 rounded-2xl bg-[#070B19]/85 backdrop-blur-md border border-white/15 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] flex items-center justify-center text-white font-bold text-sm shadow-md">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{profile.fullName || 'S. M. Mahmud Bin Murad'}</h4>
                      <p className="text-[10px] text-slate-400 font-mono truncate max-w-[180px]">
                        {profile.title || 'Marketing & Content Strategist'}
                      </p>
                    </div>
                  </div>

                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                </div>

              </GlassCard>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
