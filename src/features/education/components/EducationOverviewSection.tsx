'use client';

import React from 'react';
import Link from 'next/link';
import GlassCard from '@/shared/components/GlassCard';
import { IEducation } from '../domain/education.schema';
import { GraduationCap, Award, ArrowRight, BookOpen, Trophy } from 'lucide-react';

interface EducationOverviewProps {
  educations: IEducation[];
  certifications?: string[];
}

export default function EducationOverviewSection({ educations, certifications = [] }: EducationOverviewProps) {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#070B19] relative z-10 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academics & Debating Honors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Education & <span className="text-gradient-cyan">Academic Foundations</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Academic degrees, international debate titles, and certified digital marketing credentials.
          </p>
        </div>

        {/* 2 Grid Columns: Education Cards + Honors & Awards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {educations.map((item, idx) => (
                <GlassCard key={item._id || idx} className="p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40">
                      <GraduationCap className="w-4 h-4" />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{item.startDate} – {item.endDate}</span>
                      {item.gradeOrGpa && <span className="text-emerald-400 font-semibold">{item.gradeOrGpa}</span>}
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">{item.degree}</h3>
                    <p className="text-xs font-semibold text-[#00F0FF]">{item.institution}</p>
                  </div>

                  {item.achievements && item.achievements.length > 0 && (
                    <div className="pt-2.5 border-t border-white/10 text-[11px] text-slate-300 space-y-1">
                      {item.achievements.map((ach, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Award className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right Column: Key Honors & Certifications Highlight */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-6 space-y-5 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Recognitions & Honors</h3>
                </div>

                <div className="space-y-2.5">
                  {(certifications.length > 0 ? certifications.slice(0, 4) : [
                    'Certified Digital Marketer – Google, HubSpot',
                    'Best Speaker – NUJS International Debate, Kolkata',
                    'Winner – "Voice of Business" (DU FBS)',
                    'Finalist – National Innovation Challenge 2019'
                  ]).map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-semibold text-slate-200 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Full Education Page Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Explore complete ECA & details</span>
                <Link
                  href="/education"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00F0FF] hover:underline"
                >
                  <span>Explore Academics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
}
