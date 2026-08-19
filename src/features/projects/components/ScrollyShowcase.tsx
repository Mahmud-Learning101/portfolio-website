'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ArrowUpRight,
  TrendingUp,
  Award
} from 'lucide-react';
import Link from 'next/link';
import { IProject } from '../domain/project.schema';

interface ScrollyShowcaseProps {
  project?: IProject;
}

export default function ScrollyShowcase({ project }: ScrollyShowcaseProps) {
  // Mouse spotlight coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const title = project?.title || 'Global AI Workforce & Recruitment Orchestration';
  const tagline = project?.tagline || 'Scaling cross-border recruitment and AI-assisted performance workflows by 40%';
  const category = project?.category || 'AI Operations & Leadership';
  const metrics = project?.metrics || [
    { label: 'Candidate Throughput', value: '+40%' },
    { label: 'Milestone Tracking', value: '30/60/90 Days' },
    { label: 'Team Coverage', value: 'Multi-Country' },
  ];
  const tags = project?.tags || ['AI Strategy', 'Operations Leadership', 'KPI Systems', 'Global Scaling'];
  const slug = project?.slug || 'ai-workforce-orchestration';

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#070B19] text-white relative z-10 overflow-hidden border-t border-white/5">
      {/* Ambient background depth lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#0066FF]/20 to-[#00F0FF]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <Sparkles className="w-4 h-4 text-[#00F0FF] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">
              Featured Flagship Showcase
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Flagship Case Study <span className="text-gradient-cyan">Showcase</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Deep dive into cross-border recruitment scaling, AI workflows, and milestone performance systems.
          </p>
        </div>

        {/* 3D Perspective Stage */}
        <div 
          className="relative w-full max-w-5xl mx-auto [perspective:1400px]"
          onMouseMove={handleMouseMove}
        >
          {/* Orbiting Badge 1 (Left) */}
          <div className="absolute top-6 -left-12 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-2xl z-30 pointer-events-none">
            <div className="p-2 rounded-xl bg-[#0066FF]/20 text-[#00F0FF]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono uppercase">Candidate Throughput</div>
              <div className="text-sm font-bold text-white">+40% Efficiency</div>
            </div>
          </div>

          {/* Orbiting Badge 2 (Right) */}
          <div className="absolute bottom-6 -right-12 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-2xl z-30 pointer-events-none">
            <div className="p-2 rounded-xl bg-[#00F0FF]/20 text-[#00F0FF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono uppercase">Retention Milestones</div>
              <div className="text-sm font-bold text-white">30, 60, 90-Day Analytics</div>
            </div>
          </div>

          {/* Central 3D Frosted Glass Showcase Card */}
          <div className="group relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300">
            {/* Interactive Spotlight Radial Gradient */}
            <div 
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 102, 255, 0.18), transparent 70%)`,
              }}
            />

            {/* Inner Content Grid */}
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
              
              {/* Left Column: Details */}
              <div className="w-full md:w-3/5 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-[#0066FF]/20 text-[#00F0FF] border border-[#0066FF]/40">
                    {category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {tagline}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:border-[#0066FF]/60 hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4 pt-3">
                  <Link
                    href={`/projects/${slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-medium text-sm shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all hover:scale-[1.02]"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Key Metric Tiles */}
              <div className="w-full md:w-2/5 grid grid-cols-1 gap-3.5">
                {metrics.map((metric, i) => (
                  <div 
                    key={i}
                    className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{metric.label}</div>
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00F0FF] mt-1">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#0066FF]/40 transition-all">
              <Layers className="w-5 h-5 text-[#00F0FF] mb-2" />
              <h4 className="text-sm font-semibold text-white">AI-Assisted Workflows</h4>
              <p className="text-xs text-slate-400 mt-1">Automated candidate qualification scripts & retention analytics.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#0066FF]/40 transition-all">
              <Cpu className="w-5 h-5 text-[#0066FF] mb-2" />
              <h4 className="text-sm font-semibold text-white">SOP Standardization</h4>
              <p className="text-xs text-slate-400 mt-1">Eliminating process bottlenecks across distributed global teams.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#0066FF]/40 transition-all">
              <Award className="w-5 h-5 text-emerald-400 mb-2" />
              <h4 className="text-sm font-semibold text-white">Measurable Impact</h4>
              <p className="text-xs text-slate-400 mt-1">+40% throughput increase & consistent demo completions.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
