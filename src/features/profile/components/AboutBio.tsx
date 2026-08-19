'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import GlassCard from '@/shared/components/GlassCard';
import { IProfileConfig } from '../domain/profile.schema';
import { CheckCircle2, Award, BookOpen, Download, UserCheck } from 'lucide-react';

export default function AboutBio({ profile }: { profile: IProfileConfig }) {
  const [activeSkillTab, setActiveSkillTab] = useState<'soft' | 'tech'>('soft');

  return (
    <div className="space-y-16">

      {/* Top Split: Photo/Details + Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left Column: Card Profile */}
        <div className="lg:col-span-5">
          <GlassCard className="p-8 space-y-6 text-center lg:text-left">
            <div className="relative w-28 h-28 mx-auto lg:mx-0 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00F0FF] p-1 shadow-[0_0_30px_rgba(0,102,255,0.4)] overflow-hidden">
              {profile.avatarUrl ? (
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.fullName || 'Client Avatar'}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-[#070B19] flex items-center justify-center text-white font-black text-3xl">
                  MM
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">{profile.fullName}</h2>
              <p className="text-xs font-mono text-[#00F0FF] mt-1">{profile.title}</p>
            </div>

            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Location:</span>
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-semibold">Available for Projects</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={profile.resumePdfUrl}
                download
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-semibold text-xs shadow-md hover:scale-[1.02] transition-transform"
              >
                <Download className="w-4 h-4" />
                <span>Download Curriculum Vitae (PDF)</span>
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Narrative Story */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00F0FF]">Background & Story</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Shaping Strategic Outcomes Through <span className="text-gradient-cyan">Analytical Curiosity</span>
            </h2>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {profile.bioLong}
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#00F0FF]" />
                <span>People-First Leadership</span>
              </h4>
              <p className="text-xs text-slate-400">Coaching multi-country teams and optimizing human potential.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Data-Driven Clarity</span>
              </h4>
              <p className="text-xs text-slate-400">Building financial models and performance dashboards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categorized Skills Matrix */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">Competencies & Skills Matrix</h3>
            <p className="text-xs text-slate-400 mt-1">Core strategic soft skills and technical martech competencies.</p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setActiveSkillTab('soft')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeSkillTab === 'soft' ? 'bg-[#0066FF] text-white' : 'text-slate-400 hover:text-white'
                }`}
            >
              Soft Skills & Strategy
            </button>
            <button
              onClick={() => setActiveSkillTab('tech')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeSkillTab === 'tech' ? 'bg-[#0066FF] text-white' : 'text-slate-400 hover:text-white'
                }`}
            >
              Technical & Martech Tools
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {(activeSkillTab === 'soft' ? profile.softSkills : profile.techSkills).map((skill, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 hover:border-white/20 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
              <span className="text-xs font-medium text-slate-200">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & ECA */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="text-2xl font-bold text-white">Certifications & Honors</h3>
          <p className="text-xs text-slate-400 mt-1">Professional credentials, debate titles, and national challenge awards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.certificationsAndAwards.map((item, i) => (
            <GlassCard key={i} className="p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF] flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-200">{item}</span>
            </GlassCard>
          ))}
        </div>
      </div>

    </div>
  );
}
