import React from 'react';
import { getProfileConfig } from '@/features/profile/use-cases/getProfileConfig';
import AboutBio from '@/features/profile/components/AboutBio';

export const metadata = {
  title: 'About & Core Competencies | S. M. Mahmud Bin Murad',
  description: 'Learn about S. M. Mahmud Bin Murad - Background, strategic marketing philosophy, AI operations leadership, and technical skills.',
};

export default async function AboutPage() {
  const profile = await getProfileConfig();

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          About & <span className="text-gradient-cyan">Core Philosophy</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Connecting people, optimizing processes, and building long-term business value.
        </p>
      </div>

      <AboutBio profile={profile} />
    </div>
  );
}
