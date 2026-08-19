'use client';

import React from 'react';
import { IEducation } from '../domain/education.schema';
import { GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';
import GlassCard from '@/shared/components/GlassCard';

export default function EducationTimeline({ educations }: { educations: IEducation[] }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educations.map((item, index) => (
          <GlassCard key={item._id || index} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 text-[#00F0FF] flex items-center justify-center border border-[#0066FF]/40">
                <GraduationCap className="w-5 h-5" />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{item.startDate} – {item.endDate}</span>
                {item.gradeOrGpa && <span className="text-emerald-400 font-semibold">{item.gradeOrGpa}</span>}
              </div>

              <h3 className="text-lg font-bold text-white leading-tight">{item.degree}</h3>
              <p className="text-xs font-semibold text-[#00F0FF]">{item.institution}</p>
              
              {item.fieldOfStudy && (
                <p className="text-xs text-slate-300">Field: {item.fieldOfStudy}</p>
              )}
            </div>

            {item.achievements && item.achievements.length > 0 && (
              <div className="pt-3 border-t border-white/10 text-xs text-slate-400 space-y-1">
                {item.achievements.map((ach, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
