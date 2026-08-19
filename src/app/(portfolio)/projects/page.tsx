import React from 'react';
import { getProjects } from '@/features/projects/use-cases/getProjects';
import ProjectCard from '@/features/projects/components/ProjectCard';

export const metadata = {
  title: 'Case Studies Hub | S. M. Mahmud Bin Murad',
  description: 'Deep-dive strategic case studies in AI operations, quantitative market forecasting, and BPO process optimization by S. M. Mahmud Bin Murad.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Strategic <span className="text-gradient-cyan">Case Studies Hub</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          In-depth architectural breakdowns of AI workforce orchestration, financial modeling, and process optimization initiatives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project._id || project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
