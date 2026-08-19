'use client';

import React from 'react';
import Link from 'next/link';
import GlassCard from '@/shared/components/GlassCard';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  FolderKanban, 
  Quote, 
  Mail, 
  ArrowUpRight, 
  Compass 
} from 'lucide-react';

interface PageOverviewItem {
  title: string;
  tagline: string;
  description: string;
  href: string;
  icon: React.ElementType;
  badge: string;
  badgeColor: string;
  accentColor: string;
  highlights: string[];
}

const PAGES_OVERVIEW: PageOverviewItem[] = [
  {
    title: 'About & Core Philosophy',
    tagline: 'Bio, Leadership & Competencies',
    description: 'Strategic marketing mindset, cross-border AI operations leadership, and process optimization methodologies.',
    href: '/about',
    icon: User,
    badge: 'BIO & COMPETENCIES',
    badgeColor: 'bg-[#0066FF]/20 text-[#00F0FF] border-[#0066FF]/40',
    accentColor: 'text-[#00F0FF]',
    highlights: ['AI Strategy', 'Market Analysis', 'Operations'],
  },
  {
    title: 'Professional Experience',
    tagline: 'Career Timeline & Leadership',
    description: 'Executive milestones across Iozera AI, Afnan Global Ltd., Trackstone BPO, and strategic advisory roles.',
    href: '/experience',
    icon: Briefcase,
    badge: 'CAREER TIMELINE',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    accentColor: 'text-emerald-400',
    highlights: ['Iozera AI', 'Afnan Global', 'Trackstone BPO'],
  },
  {
    title: 'Education & Honors',
    tagline: 'Academics, Debating & Awards',
    description: 'BBA in Marketing from North South University, National Innovation finalist, and International debate awards.',
    href: '/education',
    icon: GraduationCap,
    badge: 'ACADEMICS & ECA',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    accentColor: 'text-purple-400',
    highlights: ['North South Univ.', 'Best Speaker', 'Finalist'],
  },
  {
    title: 'Case Studies Hub',
    tagline: 'In-Depth Strategic Breakdowns',
    description: 'Architectural analysis covering AI workforce orchestration, asset forecasting engines, and BPO SOP designs.',
    href: '/projects',
    icon: FolderKanban,
    badge: 'CASE STUDIES',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    accentColor: 'text-cyan-400',
    highlights: ['AI Systems', 'Econometrics', 'BPO SOPs'],
  },
  {
    title: 'Executive Endorsements',
    tagline: 'Testimonials & Recommendations',
    description: 'Peer reviews and executive endorsements from portfolio directors, project leads, and department heads.',
    href: '/testimonials',
    icon: Quote,
    badge: 'ENDORSEMENTS',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    accentColor: 'text-amber-400',
    highlights: ['Portfolio Leads', 'Comm Directors', '100% Rec.'],
  },
  {
    title: 'Direct Reach & Contact',
    tagline: 'Consultation & Inquiries',
    description: 'Reach out directly via official business email, direct phone lines, or the embedded consultation inbox.',
    href: '/contact',
    icon: Mail,
    badge: 'GET IN TOUCH',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    accentColor: 'text-rose-400',
    highlights: ['Fast Response', 'Global Reach', 'Advisory'],
  },
];

export default function PageOverviewGrid() {
  return (
    <section className="py-10 sm:py-12 bg-[#070B19] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#00F0FF] text-xs font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span>Website Navigation Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Explore Portfolio <span className="text-gradient-cyan">Destinations</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            A quick overview of each specialized page across the website. Jump directly to any section to review qualifications, case studies, or endorsements.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PAGES_OVERVIEW.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassCard 
                key={idx} 
                className="group p-6 flex flex-col justify-between hover:border-white/25 transition-all duration-300"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 ${item.accentColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs font-medium text-slate-400 mt-0.5">{item.tagline}</div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.highlights.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-slate-400 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href={item.href} 
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#00F0FF] hover:text-white transition-colors ml-2 shrink-0"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
