import { connectToDatabase } from '@/shared/lib/db';
import { ExperienceModel } from '../data/experience.model';
import { IExperience } from '../domain/experience.schema';

const DEFAULT_EXPERIENCES: IExperience[] = [
  {
    role: 'International Manager & Project Team Leader',
    company: 'Iozera AI - Kriss AI',
    location: 'Remote / Global',
    employmentType: 'Full-Time',
    startDate: 'Oct 2025',
    endDate: 'June 2026',
    isCurrent: false,
    summaryPoints: [
      'Lead global recruitment and performance operations, scaling teams of appointment setters and demo specialists while improving qualified candidate throughput by about 40 percent.',
      'Built streamlined systems for onboarding, KPI tracking, and retention analytics, enabling accurate monitoring at 30, 60, 90-day and long-term milestones.',
      'Manage and coach a multi-country team on communication strategy, appointment quality, and AI-assisted workflows, increasing demo completions and consistency.',
      'Collaborate with leadership and cross-functional units to align recruitment processes, reporting, and operational execution across large-scale hiring initiatives.'
    ],
    techStack: ['AI Workflows', 'KPI Dashboards', 'Cross-Functional Leadership', 'Recruitment Automation'],
    orderIndex: 0,
    featured: true
  },
  {
    role: 'Financial Market Analyst',
    company: 'Afnan Global Ltd.',
    location: 'Dhaka',
    employmentType: 'Full-Time',
    startDate: 'Jul 2024',
    endDate: 'Feb 2025',
    isCurrent: false,
    summaryPoints: [
      'Delivered real-time market intelligence and financial forecasts, improving trading decisions and raising portfolio return rates by 20%.',
      'Built dynamic models integrating macroeconomic trends and sector data; accuracy improved forecasting efficiency by 35%.',
      'Advised executive leadership on strategic asset allocation through weekly briefings.'
    ],
    techStack: ['Financial Modeling', 'Macroeconomic Forecasting', 'Asset Allocation', 'Excel / Sheets'],
    orderIndex: 1,
    featured: true
  },
  {
    role: 'Operations & Strategy Manager',
    company: 'Trackstone International BPO Ltd.',
    location: 'Dhaka',
    employmentType: 'Full-Time',
    startDate: 'Jun 2024',
    endDate: 'Dec 2024',
    isCurrent: false,
    summaryPoints: [
      'Oversaw daily operations across 5 departments and launched new SOPs, reducing process bottlenecks by 30%.',
      'Developed performance dashboards that increased accountability and productivity by 25%.',
      'Strengthened client onboarding and retention workflows, increasing customer lifetime value by 20%.'
    ],
    techStack: ['SOP Design', 'BPO Management', 'Performance Dashboards', 'Retention Analytics'],
    orderIndex: 2,
    featured: false
  },
  {
    role: 'Client Relationship Manager',
    company: 'Silver Edge IT Ltd.',
    location: 'Dhaka',
    employmentType: 'Full-Time',
    startDate: 'Feb 2024',
    endDate: 'Jun 2024',
    isCurrent: false,
    summaryPoints: [
      'Streamlined maintenance and property issue protocols, cutting turnaround time by 50%.',
      'Designed communication systems that improved customer satisfaction ratings by 40%.',
      'Re-engineered vendor feedback processes, enhancing reliability and reducing downtime.'
    ],
    techStack: ['CRM Platforms', 'Vendor Management', 'Customer Success', 'Process Optimization'],
    orderIndex: 3,
    featured: false
  },
  {
    role: 'Freelance Content Strategist & Research Consultant',
    company: 'Self-employed',
    location: 'Global',
    employmentType: 'Contract',
    startDate: 'Apr 2020',
    endDate: 'Dec 2023',
    isCurrent: false,
    summaryPoints: [
      'Produced 200+ marketing and research pieces (articles, social content, academic reports) with an average engagement increase of 3.2x.',
      'Applied SEO and digital tools to optimize visibility, resulting in a 45% rise in organic discovery for clients.',
      'Guided brand messaging for startups and academic teams, improving project clarity and audience alignment.'
    ],
    techStack: ['SEO Strategy', 'Content Architecture', 'Brand Messaging', 'Research Analytics'],
    orderIndex: 4,
    featured: true
  },
  {
    role: 'Business Analyst',
    company: 'M Bin M Group of Industrials',
    location: 'Dhaka',
    employmentType: 'Full-Time',
    startDate: 'Jan 2019',
    endDate: 'Mar 2020',
    isCurrent: false,
    summaryPoints: [
      'Analyzed operations and finances across 4 business units, implementing cost-saving strategies that cut expenses by ~20%.',
      'Led reporting on competitor analysis and market expansion opportunities, supporting new revenue initiatives.',
      'Developed financial summaries and performance dashboards for executive decision-making.'
    ],
    techStack: ['Operations Analysis', 'Financial Modeling', 'Cost Reduction', 'Executive Dashboards'],
    orderIndex: 5,
    featured: false
  },
  {
    role: 'Business Development Executive',
    company: 'Activist Communications Ltd.',
    location: 'Dhaka',
    employmentType: 'Full-Time',
    startDate: 'Feb 2018',
    endDate: 'Nov 2018',
    isCurrent: false,
    summaryPoints: [
      'Supported marketing strategy for BATB and Pathao; helped increase brand engagement and campaign reach by 22%.',
      'Conducted audience segmentation and trend analysis, leading to more targeted campaigns and improved messaging alignment.',
      'Collaborated on creative campaign messaging and QA audits for client deliverables.'
    ],
    techStack: ['Campaign Strategy', 'Audience Segmentation', 'QA Audits', 'Brand Strategy'],
    orderIndex: 6,
    featured: false
  },
  {
    role: 'Content Creator',
    company: 'Fraktal Creatives Ltd.',
    location: 'Dhaka',
    employmentType: 'Full-Time',
    startDate: 'Mar 2017',
    endDate: 'Jan 2018',
    isCurrent: false,
    summaryPoints: [
      'Created Amazon product listings and literary content with a focus on SEO and audience tone.',
      'Applied analytics tools and content audits to refine resonance and increase user engagement.'
    ],
    techStack: ['Amazon Listing', 'eCommerce SEO', 'Content Audits', 'Copywriting'],
    orderIndex: 7,
    featured: false
  }
];

export async function getExperiences(): Promise<IExperience[]> {
  try {
    await connectToDatabase();
    const items = await ExperienceModel.find().sort({ orderIndex: 1 }).lean();
    if (!items || items.length === 0) return DEFAULT_EXPERIENCES;
    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.warn('⚠️ DB Offline/Fallback used for Experiences:', error);
    return DEFAULT_EXPERIENCES;
  }
}
