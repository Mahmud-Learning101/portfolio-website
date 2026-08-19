'use client';

import React from 'react';
import Link from 'next/link';
import { IProject } from '../domain/project.schema';
import GlassCard from '@/shared/components/GlassCard';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export default function ProjectCard({ project }: { project: IProject }) {
  return (
    <GlassCard className="flex flex-col justify-between h-full space-y-6">
      <div className="space-y-4">
        {/* Category Pill */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-[#0066FF]/20 text-[#00F0FF] border border-[#0066FF]/40">
            {project.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors leading-tight">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics & Action Link */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        {project.metrics && project.metrics[0] ? (
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="font-bold text-white">{project.metrics[0].value}</span>
            <span>{project.metrics[0].label}</span>
          </div>
        ) : (
          <span className="text-xs font-mono text-slate-400">Strategy Case Study</span>
        )}

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#00F0FF] hover:underline"
        >
          <span>Read Case Study</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </GlassCard>
  );
}
