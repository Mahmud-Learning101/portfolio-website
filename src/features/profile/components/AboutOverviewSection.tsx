'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import GlassCard from '@/shared/components/GlassCard';
import { IProfileConfig } from '../domain/profile.schema';
import { 
  UserCheck, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Award,
  Sparkles
} from 'lucide-react';

export default function AboutOverviewSection({ profile }: { profile: IProfileConfig }) {
  const [activeTab, setActiveTab] = useState<'soft' | 'tech'>('soft');

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#070B19] relative z-10 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#00F0FF] text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <span>About & Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Connecting Strategy, AI Operations & <span className="text-gradient-cyan">Human Potential</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            A strategic mindset focused on building cross-border teams, optimizing business processes, and leveraging data-driven clarity.
          </p>
        </div>

        {/* 2-Column Split: Bio Story & Pillars + Competencies */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative Snippet & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#00F0FF]">Background & Story</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">• Available for Global Leadership</span>
              </div>
              
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {profile.bioLong}
              </p>

              {/* Leadership Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#00F0FF]" />
                    <span>People-First Leadership</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">Coaching multi-country teams and optimizing human potential.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Data-Driven Clarity</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">Building financial models and performance dashboards.</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Skills Matrix */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-6 sm:p-8 space-y-5 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white">Skills Matrix</h3>
                  
                  {/* Skill Toggle Pills */}
                  <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                    <button
                      onClick={() => setActiveTab('soft')}
                      className={`px-3 py-1 rounded text-[11px] font-semibold transition-colors ${
                        activeTab === 'soft' ? 'bg-[#0066FF] text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Strategy
                    </button>
                    <button
                      onClick={() => setActiveTab('tech')}
                      className={`px-3 py-1 rounded text-[11px] font-semibold transition-colors ${
                        activeTab === 'tech' ? 'bg-[#0066FF] text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Technical
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(activeTab === 'soft' ? profile.softSkills : profile.techSkills).map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2 hover:border-white/20 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                      <span className="text-xs font-medium text-slate-200">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Full About Page Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Want to inspect bio & certifications?</span>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00F0FF] hover:underline"
                >
                  <span>Read Full Bio</span>
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
