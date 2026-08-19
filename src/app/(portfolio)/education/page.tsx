import React from 'react';
import { getEducations } from '@/features/education/use-cases/getEducations';
import EducationTimeline from '@/features/education/components/EducationTimeline';

export const metadata = {
  title: 'Education & Academic History | S. M. Mahmud Bin Murad',
  description: 'Academic background of S. M. Mahmud Bin Murad - BBA in Marketing from North South University & Rajuk Uttara Model College.',
};

export default async function EducationPage() {
  const educations = await getEducations();

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Education & <span className="text-gradient-cyan">Academic History</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Academic foundation in Marketing, Business Strategy, and Science.
        </p>
      </div>

      <EducationTimeline educations={educations} />
    </div>
  );
}
