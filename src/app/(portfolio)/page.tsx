import React from 'react';
import Link from 'next/link';
import { getProfileConfig } from '@/features/profile/use-cases/getProfileConfig';
import { getExperiences } from '@/features/experience/use-cases/getExperiences';
import { getEducations } from '@/features/education/use-cases/getEducations';
import { getProjects } from '@/features/projects/use-cases/getProjects';
import { getTestimonials } from '@/features/testimonials/use-cases/getTestimonials';

import ClientSpotlightSection from '@/features/profile/components/ClientSpotlightSection';
import AboutOverviewSection from '@/features/profile/components/AboutOverviewSection';
import ExperienceOverviewSection from '@/features/experience/components/ExperienceOverviewSection';
import BentoGrid from '@/features/projects/components/BentoGrid';
import EducationOverviewSection from '@/features/education/components/EducationOverviewSection';
import TestimonialsOverviewSection from '@/features/testimonials/components/TestimonialsOverviewSection';
import ContactOverviewSection from '@/features/contact/components/ContactOverviewSection';

import GlassCard from '@/shared/components/GlassCard';
import { ArrowRight, Download } from 'lucide-react';

export default async function HomePage() {
  const profile = await getProfileConfig();
  const experiences = await getExperiences();
  const educations = await getEducations();
  const projects = await getProjects();
  const testimonials = await getTestimonials();

  return (
    <div className="relative min-h-screen bg-[#070B19] overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Open for Global Consulting & Leadership Roles</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl">
          Shaping Chapters That Matter In <span className="text-gradient-cyan">Marketing, AI & Operations</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          {profile.bioShort}
        </p>

        {/* Hero Pills / Badges */}
        {profile.heroBadges && profile.heroBadges.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            {profile.heroBadges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#00F0FF] text-xs font-mono"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Hero CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0066FF] text-white font-semibold text-sm shadow-[0_0_30px_rgba(0,102,255,0.5)] transition-all hover:scale-105"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={profile.resumePdfUrl}
            download
            className="inline-flex items-center gap-2.5 px-5.5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-200 font-semibold text-sm transition-all hover:scale-105"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Featured Stats Bar */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full max-w-5xl">
          {profile.featuredStats.map((stat, idx) => (
            <GlassCard key={idx} className="p-4 text-center flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00F0FF]">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-white mt-0.5">{stat.label}</div>
              {stat.helper && <div className="text-[11px] text-slate-400 mt-0.5">{stat.helper}</div>}
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 2. CLIENT SPOTLIGHT SECTION (Client picture on right, bio text on left) */}
      <ClientSpotlightSection profile={profile} />

      {/* 3. ABOUT & COMPETENCIES SECTION (/about preview) */}
      <AboutOverviewSection profile={profile} />

      {/* 3. WORK EXPERIENCE TIMELINE SECTION (/experience preview) */}
      <ExperienceOverviewSection experiences={experiences} />

      {/* 4. CASE STUDIES & PROJECTS SECTION (/projects preview) */}
      <BentoGrid projects={projects} certifications={profile.certificationsAndAwards} />

      {/* 5. EDUCATION & HONORS SECTION (/education preview) */}
      <EducationOverviewSection educations={educations} certifications={profile.certificationsAndAwards} />

      {/* 6. EXECUTIVE TESTIMONIALS SECTION (/testimonials preview) */}
      <TestimonialsOverviewSection testimonials={testimonials} />

      {/* 7. DIRECT REACH & CONSULTATION SECTION (/contact preview) */}
      <ContactOverviewSection profile={profile} />

    </div>
  );
}
