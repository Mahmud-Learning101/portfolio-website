'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart, ShieldCheck, Zap, ArrowUpRight, Award, Layers } from 'lucide-react';
import Link from 'next/link';
import GlassCard from '@/shared/components/GlassCard';
import { IProject } from '../domain/project.schema';

interface BentoGridProps {
  projects?: IProject[];
  certifications?: string[];
}

export default function BentoGrid({ projects = [], certifications = [] }: BentoGridProps) {
  const p1 = projects[0];
  const p2 = projects[1];
  const p3 = projects[2];

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#070B19] relative z-10 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#00F0FF] text-xs font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>Strategic Core & Value Drivers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Architecting Growth Across <span className="text-gradient-cyan">Strategy & Operations</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Bridging analytical modeling, team leadership, brand storytelling, and technology-assisted workflows to deliver durable enterprise value.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Large Feature (Span 2 cols) */}
          <GlassCard className="md:col-span-2 flex flex-col justify-between p-8 min-h-[320px]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/20 text-[#00F0FF] flex items-center justify-center border border-[#0066FF]/40">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#00F0FF]">
                {p1?.category || 'AI Operations & Global Recruitment'}
              </span>
              <h3 className="text-2xl font-bold text-white">
                {p1?.title || 'Multi-Country Workforce & Retention Architecture'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                {p1?.summary || 'Scaled global appointment setters and demo specialists at Iozera AI, building streamlined onboarding systems, KPI tracking, and retention analytics monitoring 30, 60, and 90-day milestones.'}
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between border-t border-white/10">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>{p1?.metrics?.[0]?.value ? `${p1.metrics[0].value} ${p1.metrics[0].label}` : '+40% Candidate Throughput'}</span>
                <span>•</span>
                <span>AI Workflows</span>
              </div>
              <Link href={`/projects/${p1?.slug || 'ai-workforce-orchestration'}`} className="text-xs font-medium text-[#00F0FF] hover:underline flex items-center gap-1">
                <span>View Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </GlassCard>

          {/* Card 2: Financial Market Analytics */}
          <GlassCard className="flex flex-col justify-between p-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <PieChart className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                {p2?.category || 'Financial Intelligence'}
              </span>
              <h3 className="text-xl font-bold text-white">
                {p2?.title || 'Macroeconomic & Asset Forecasting'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {p2?.summary || 'Real-time market forecasting and dynamic econometric modeling at Afnan Global Ltd., raising portfolio return rates by 20%.'}
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between border-t border-white/10 text-xs font-mono text-slate-400">
              <span>{p2?.metrics?.[0]?.value ? `${p2.metrics[0].value} ${p2.metrics[0].label}` : '+35% Forecasting Efficiency'}</span>
              <Link href={`/projects/${p2?.slug || 'macroeconomic-forecasting-engine'}`} className="text-[#00F0FF] hover:underline">Read ↗</Link>
            </div>
          </GlassCard>

          {/* Card 3: BPO Operations */}
          <GlassCard className="flex flex-col justify-between p-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
                {p3?.category || 'Operations Management'}
              </span>
              <h3 className="text-xl font-bold text-white">
                {p3?.title || 'Process Optimization & SOP Design'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {p3?.summary || 'Oversaw operations across 5 departments at Trackstone BPO, reducing process bottlenecks by 30% and boosting productivity by 25%.'}
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between border-t border-white/10 text-xs font-mono text-slate-400">
              <span>{p3?.metrics?.[0]?.value ? `${p3.metrics[0].value} ${p3.metrics[0].label}` : '-30% Bottlenecks'}</span>
              <Link href={`/projects/${p3?.slug || 'bpo-process-optimization'}`} className="text-[#00F0FF] hover:underline">Read ↗</Link>
            </div>
          </GlassCard>

          {/* Card 4: Honors & Leadership (Span 2 cols) */}
          <GlassCard className="md:col-span-2 flex flex-col justify-between p-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/20 text-[#00F0FF] flex items-center justify-center border border-[#00F0FF]/40">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#00F0FF]">Recognitions & Certifications</span>
              <h3 className="text-2xl font-bold text-white">National Innovation & Debating Honors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {(certifications.length > 0 ? certifications.slice(0, 4) : [
                  'Best Speaker — NUJS International Debate, Kolkata',
                  'Winner — "Voice of Business" (DU FBS)',
                  'Finalist — National Innovation Challenge 2019',
                  'Certified — Google & HubSpot Digital Marketer'
                ]).map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-semibold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

        </div>
      </div>
    </section>
  );
}
