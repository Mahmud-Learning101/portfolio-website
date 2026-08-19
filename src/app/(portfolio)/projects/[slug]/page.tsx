import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, getProjects } from '@/features/projects/use-cases/getProjects';
import GlassCard from '@/shared/components/GlassCard';
import { ArrowLeft, CheckCircle2, TrendingUp, Layers, Cpu, Award } from 'lucide-react';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Case Study Not Found' };
  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-[#00F0FF]" />
        <span>Back to Case Studies Hub</span>
      </Link>

      {/* Hero Title & Category */}
      <div className="space-y-4">
        <span className="px-3.5 py-1 text-xs font-mono font-medium rounded-full bg-[#0066FF]/20 text-[#00F0FF] border border-[#0066FF]/40">
          {project.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {project.title}
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Cover Image Banner */}
      {project.coverImage ? (
        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
        </div>
      ) : null}

      {/* Metrics Header */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.metrics.map((m, i) => (
            <GlassCard key={i} className="p-5 text-center">
              <div className="text-2xl font-black text-[#00F0FF]">{m.value}</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-mono">{m.label}</div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Deep-Dive Case Study Sections */}
      <div className="space-y-8">
        
        {/* Summary */}
        <GlassCard className="p-8 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#00F0FF]" />
            <span>Executive Summary</span>
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">{project.summary}</p>
        </GlassCard>

        {/* Challenge */}
        {project.challenge && (
          <GlassCard className="p-8 space-y-3 border-amber-500/20">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" />
              <span>Operational Challenge & Bottlenecks</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{project.challenge}</p>
          </GlassCard>
        )}

        {/* Solution */}
        {project.solution && (
          <GlassCard className="p-8 space-y-3 border-[#0066FF]/30">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#0066FF]" />
              <span>Strategic Solution & Architecture</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
          </GlassCard>
        )}

        {/* Outcome */}
        {project.outcome && (
          <GlassCard className="p-8 space-y-3 border-emerald-500/30">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Quantitative Outcomes & Business Value</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{project.outcome}</p>
          </GlassCard>
        )}

      </div>
    </div>
  );
}
