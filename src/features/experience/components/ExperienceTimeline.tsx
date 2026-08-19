'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IExperience } from '../domain/experience.schema';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Sparkles, Building2 } from 'lucide-react';
import GlassCard from '@/shared/components/GlassCard';

export default function ExperienceTimeline({ experiences }: { experiences: IExperience[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?._id || '0');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative max-w-4xl mx-auto space-y-8">
      {/* Central glowing vertical timeline bar */}
      <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#0066FF] via-[#00F0FF] to-slate-800 z-0 pointer-events-none" />

      {experiences.map((item, index) => {
        const itemKey = item._id || String(index);
        const isExpanded = expandedId === itemKey;
        const isEven = index % 2 === 0;

        return (
          <div key={itemKey} className="relative z-10 flex flex-col sm:flex-row items-center gap-6 group">
            
            {/* Timeline Node Dot */}
            <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#070B19] border-2 border-[#0066FF] flex items-center justify-center text-[#00F0FF] shadow-[0_0_15px_rgba(0,102,255,0.6)] group-hover:scale-110 transition-transform">
              <Briefcase className="w-3.5 h-3.5" />
            </div>

            {/* Card Content */}
            <div className={`w-full pl-12 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:ml-auto'}`}>
              <GlassCard className="p-6 cursor-pointer space-y-4" onClick={() => toggleExpand(itemKey)}>
                
                {/* Header */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full bg-[#0066FF]/20 text-[#00F0FF] border border-[#0066FF]/30">
                      {item.employmentType}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#00F0FF]" />
                      <span>{item.startDate} – {item.endDate || 'Present'}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-1">{item.role}</h3>
                  <div className="text-sm font-semibold text-slate-300 flex items-center gap-1.5 justify-start sm:justify-start">
                    <Building2 className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{item.company}</span>
                    {item.location && <span className="text-slate-400 text-xs">({item.location})</span>}
                  </div>
                </div>

                {/* Tech Badges Preview */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Expand Indicator */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#00F0FF] font-medium border-t border-white/10">
                  <span>{isExpanded ? 'Collapse Details' : 'Expand Achievements'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>

                {/* Expandable Bullet Points */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pt-3 space-y-2 text-xs text-slate-300 text-left border-t border-white/10"
                    >
                      {item.summaryPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-[#00F0FF] font-bold mt-0.5">•</span>
                          <p className="leading-relaxed">{point}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

              </GlassCard>
            </div>
          </div>
        );
      })}
    </div>
  );
}
