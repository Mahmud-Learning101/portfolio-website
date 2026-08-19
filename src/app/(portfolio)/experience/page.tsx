import React from 'react';
import { getExperiences } from '@/features/experience/use-cases/getExperiences';
import ExperienceTimeline from '@/features/experience/components/ExperienceTimeline';

export const metadata = {
  title: 'Work Experience Timeline | S. M. Mahmud Bin Murad',
  description: 'Career milestones and leadership history of S. M. Mahmud Bin Murad - AI Operations, Financial Analytics, BPO Management & Growth Strategy.',
};

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Professional <span className="text-gradient-cyan">Experience Timeline</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Click any career milestone card to expand detailed achievements, metrics, and technology workflows.
        </p>
      </div>

      <ExperienceTimeline experiences={experiences} />
    </div>
  );
}
