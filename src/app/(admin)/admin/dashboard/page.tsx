import React from 'react';
import Link from 'next/link';
import { getProfileConfig } from '@/features/profile/use-cases/getProfileConfig';
import { getExperiences } from '@/features/experience/use-cases/getExperiences';
import { getEducations } from '@/features/education/use-cases/getEducations';
import { getProjects } from '@/features/projects/use-cases/getProjects';
import { getTestimonials } from '@/features/testimonials/use-cases/getTestimonials';
import GlassCard from '@/shared/components/GlassCard';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  FolderKanban, 
  Quote, 
  MessageSquare, 
  ArrowUpRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const metadata = { title: 'Dashboard Overview | CMS' };

export default async function AdminDashboardPage() {
  const profile = await getProfileConfig();
  const experiences = await getExperiences();
  const educations = await getEducations();
  const projects = await getProjects();
  const testimonials = await getTestimonials();

  const STATS = [
    { label: 'Work Experiences', count: experiences.length, href: '/admin/experience', icon: Briefcase, color: 'text-[#00F0FF]' },
    { label: 'Education Milestones', count: educations.length, href: '/admin/education', icon: GraduationCap, color: 'text-[#0066FF]' },
    { label: 'Case Studies', count: projects.length, href: '/admin/projects', icon: FolderKanban, color: 'text-purple-400' },
    { label: 'Published Testimonials', count: testimonials.length, href: '/admin/testimonials', icon: Quote, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-5">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/20 text-[#00F0FF] text-xs font-mono mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authenticated Admin Session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome Back, <span className="text-gradient-cyan">{profile.fullName}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage and edit dynamic content across your portfolio website in real time.</p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
        >
          <span>Live Site Preview</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={i} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <Link href={stat.href} className="text-xs font-mono text-slate-400 hover:text-white">Manage ↗</Link>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.count}</div>
                <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Quick Action Matrix */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white">Quick CMS Management</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <Link href="/admin/profile" className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#0066FF] transition-all space-y-1.5">
            <User className="w-5 h-5 text-[#00F0FF]" />
            <h4 className="text-sm font-bold text-white">Edit Bio & Resume</h4>
            <p className="text-xs text-slate-400 leading-snug">Update headline, contact info, and upload PDF resume.</p>
          </Link>

          <Link href="/admin/projects" className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#0066FF] transition-all space-y-1.5">
            <FolderKanban className="w-5 h-5 text-purple-400" />
            <h4 className="text-sm font-bold text-white">Manage Case Studies</h4>
            <p className="text-xs text-slate-400 leading-snug">Add or edit deep-dive project case study articles.</p>
          </Link>

          <Link href="/admin/messages" className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#0066FF] transition-all space-y-1.5">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">Inquiries Inbox</h4>
            <p className="text-xs text-slate-400 leading-snug">Read and tag contact form submissions from prospective clients.</p>
          </Link>
        </div>
      </div>

    </div>
  );
}
