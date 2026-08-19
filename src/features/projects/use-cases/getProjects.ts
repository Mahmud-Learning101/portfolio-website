import { connectToDatabase } from '@/shared/lib/db';
import { ProjectModel } from '../data/project.model';
import { IProject } from '../domain/project.schema';

const DEFAULT_PROJECTS: IProject[] = [
  {
    title: 'Global AI Workforce & Recruitment Orchestration',
    slug: 'ai-workforce-orchestration',
    category: 'AI Operations & Leadership',
    tagline: 'Scaling cross-border recruitment and AI-assisted performance workflows by 40%',
    summary: 'Engineered standardized hiring funnels and AI-assisted qualification workflows for Iozera AI, boosting candidate throughput by 40% across multi-country operations.',
    challenge: 'Managing distributed appointment setters and demo specialists across different time zones caused pipeline bottlenecks, inconsistent qualification standards, and high 30-day attrition.',
    solution: 'Designed end-to-end recruitment SOPs, AI-driven script coaching, and milestone-based retention dashboards monitoring 30, 60, and 90-day progress metrics.',
    outcome: 'Increased qualified candidate throughput by 40%, cut onboarding lag, and established predictable demo completion rates across the sales organization.',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
    tags: ['AI Strategy', 'Operations Leadership', 'KPI Systems', 'Global Scaling'],
    metrics: [
      { label: 'Candidate Throughput', value: '+40%' },
      { label: 'Milestone Tracking', value: '30/60/90 Days' },
      { label: 'Team Coverage', value: 'Multi-Country' }
    ],
    isFeatured: true,
    featuredOrder: 0,
    orderIndex: 0
  },
  {
    title: 'Dynamic Macroeconomic & Asset Forecasting Engine',
    slug: 'macroeconomic-forecasting-engine',
    category: 'Financial Analytics',
    tagline: 'Real-time market intelligence models boosting portfolio return rates by 20%',
    summary: 'Built quantitative forecasting models integrating macroeconomic trends and sector data at Afnan Global Ltd., elevating trading decisions and executive briefings.',
    challenge: 'Volatile market conditions and fragmented data inputs resulted in lagging indicators for strategic asset allocation.',
    solution: 'Structured real-time econometric models linking cross-asset trends, interest rate dynamics, and sector performance indicators into unified weekly executive briefs.',
    outcome: 'Enhanced forecasting efficiency by 35% and raised portfolio return rates by 20% over consecutive quarters.',
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop',
    tags: ['Financial Modeling', 'Market Intelligence', 'Asset Allocation', 'Predictive Analysis'],
    metrics: [
      { label: 'Portfolio Returns', value: '+20%' },
      { label: 'Forecasting Efficiency', value: '+35%' },
      { label: 'Executive Briefs', value: 'Weekly cadence' }
    ],
    isFeatured: true,
    featuredOrder: 1,
    orderIndex: 1
  },
  {
    title: 'Cross-Department BPO Process Optimization & SOPs',
    slug: 'bpo-process-optimization',
    category: 'Operations Management',
    tagline: 'Streamlining 5 business units and reducing operational bottlenecks by 30%',
    summary: 'Redesigned organizational workflows and performance tracking dashboards across 5 departments at Trackstone International BPO, lifting productivity by 25%.',
    challenge: 'Siloed departmental handoffs and lack of standardized operating procedures caused substantial operational friction and slowed client resolution times.',
    solution: 'Introduced lean SOPs, centralized performance KPI boards in Power BI, and upgraded customer onboarding retention workflows.',
    outcome: 'Decreased process bottlenecks by 30%, elevated team productivity by 25%, and boosted customer lifetime value by 20%.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    tags: ['BPO Management', 'SOP Architecture', 'Process Automation', 'Power BI'],
    metrics: [
      { label: 'Bottlenecks Reduced', value: '-30%' },
      { label: 'Productivity Lift', value: '+25%' },
      { label: 'Customer LTV', value: '+20%' }
    ],
    isFeatured: true,
    featuredOrder: 2,
    orderIndex: 2
  }
];

export async function getProjects(): Promise<IProject[]> {
  try {
    await connectToDatabase();
    const items = await ProjectModel.find().sort({ orderIndex: 1 }).lean();
    if (!items || items.length === 0) return DEFAULT_PROJECTS;
    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.warn('⚠️ DB Offline/Fallback used for Projects:', error);
    return DEFAULT_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<IProject | null> {
  try {
    await connectToDatabase();
    const item = await ProjectModel.findOne({ slug }).lean();
    if (item) return JSON.parse(JSON.stringify(item));
    const fallback = DEFAULT_PROJECTS.find((p) => p.slug === slug);
    return fallback || null;
  } catch (error) {
    console.warn(`⚠️ DB Offline/Fallback used for Project slug [${slug}]:`, error);
    return DEFAULT_PROJECTS.find((p) => p.slug === slug) || null;
  }
}
