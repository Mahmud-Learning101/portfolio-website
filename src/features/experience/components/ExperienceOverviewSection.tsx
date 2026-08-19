'use client';

import React from 'react';
import Link from 'next/link';
import GlassCard from '@/shared/components/GlassCard';
import { IExperience } from '../domain/experience.schema';
import { Briefcase, Calendar, ArrowRight, Building2, TrendingUp, ShieldCheck, Layers } from 'lucide-react';

export default function ExperienceOverviewSection({ experiences }: { experiences: IExperience[] }) {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#070B19] relative z-10 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#00F0FF] text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History & Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Professional <span className="text-gradient-cyan">Work Experience</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Highlights from key executive roles across AI operations, asset forecasting, and BPO management.
          </p>
        </div>

        {/* 3 Featured Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.slice(0, 3).map((item, idx) => (
            <GlassCard key={item._id || idx} className="p-6 flex flex-col justify-between space-y-5 hover:border-white/20 transition-all">
              <div className="space-y-4">
                
                {/* Badge & Dates */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-medium rounded-full bg-[#0066FF]/20 text-[#00F0FF] border border-[#0066FF]/30">
                    {item.employmentType}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#00F0FF]" />
                    <span>{item.startDate} – {item.endDate || 'Present'}</span>
                  </span>
                </div>

                {/* Role & Company */}
                <div>
                  <h3 className="text-lg font-bold text-white leading-snug">{item.role}</h3>
                  <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{item.company}</span>
                    {item.location && <span className="text-slate-400">({item.location})</span>}
                  </div>
                </div>

                {/* Top Bullet Points Preview */}
                <div className="space-y-2 text-xs text-slate-300">
                  {item.summaryPoints.slice(0, 2).map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#00F0FF] font-bold mt-0.5">•</span>
                      <p className="leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {item.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-slate-300 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Bottom CTA to Full Timeline */}
        <div className="text-center pt-2">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-200 font-semibold text-xs transition-all hover:scale-105"
          >
            <span>View Full Experience Timeline ({experiences.length} Positions)</span>
            <ArrowRight className="w-4 h-4 text-[#00F0FF]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
