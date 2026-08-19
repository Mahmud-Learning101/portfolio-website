import { connectToDatabase } from '@/shared/lib/db';
import { ProfileModel } from '../data/profile.model';
import { IProfileConfig } from '../domain/profile.schema';

const DEFAULT_PROFILE: IProfileConfig = {
  fullName: 'S. M. Mahmud Bin Murad',
  title: 'Marketing & Content Strategist | Project Manager | Business Solutions Consultant',
  bioShort: 'Curiosity-driven strategist bringing together analytical thinking, creativity, and a people-first mindset to scale businesses, optimize operations, and deliver measurable outcomes.',
  bioLong: 'Every business has a story. And I enjoy shaping the chapters that matter. Curiosity has driven my career: understanding how businesses grow, how teams thrive, and what turns good ideas into lasting results. From strategy and operations to marketing, project leadership, and customer success, each role has broadened my perspective and strengthened my ability to connect people, optimize processes, and solve complex challenges with clarity.',
  heroBadges: ['AI Strategy & Operations', 'BPO & Project Leadership', 'Growth Marketing & SEO', 'Financial Modeling & Forecasting'],
  resumePdfUrl: '/assets/SM_Mahmud_Bin_Murad_Resume.pdf',
  avatarUrl: '/assets/mahmud-avatar.png',
  emails: ['smmahmudbinmurad@gmail.com', 'anim.mahmud@gmail.com'],
  phones: ['+8801755087633', '+8801632611855'],
  location: 'Sector 11, Uttara Model Town, Dhaka - 1230, Bangladesh',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  openToWork: true,
  featuredStats: [
    { label: 'Candidate Throughput', value: '+40%', helper: 'Global recruitment operations at Iozera AI' },
    { label: 'Content Engagement', value: '3.2x', helper: '200+ marketing and research deliverables' },
    { label: 'Turnaround Time', value: '-50%', helper: 'Streamlined protocols at Silver Edge IT' },
    { label: 'Forecasting Efficiency', value: '+35%', helper: 'Macroeconomic modeling at Afnan Global' },
  ],
  softSkills: [
    'Strategic Marketing & Campaign Management', 'Brand Messaging & Storytelling',
    'Stakeholder Engagement', 'Cross-Functional Team Leadership',
    'Project & Operations Management', 'Client Communication & Relationship Management',
    'Creative Thinking & Problem Solving', 'Content Strategy & Tone Adaptation',
    'Market Research & Business Insight', 'Vendor & Customer Management'
  ],
  techSkills: [
    'Digital Analytics & Consumer Insight Tools', 'SEO Optimization & Keyword Targeting',
    'CRM & Martech Platforms (HubSpot, Salesforce)', 'Copywriting Tools & AI Writing Assistants',
    'Financial Modeling & Reporting (Excel, Google Sheets)', 'Business Intelligence Tools (Power BI, Tableau)',
    'SQL & Data Querying', 'Amazon Listing & eCommerce CMS',
    'Performance Dashboards & SOP Design', 'Content Audit Tools & Engagement Metrics'
  ],
  certificationsAndAwards: [
    'Certified Digital Marketer – Google, HubSpot',
    'Prompt Engineering for AI Strategy – OpenAI Tools & Platforms',
    'Social Business & SDG Strategy – YY Ventures (Supported by UNDP)',
    'Finalist – National Innovation Challenge 2019',
    'Finalist – Admaker 2018 | Hashtag Marketing 2017',
    'Best Speaker – NUJS International Debate, Kolkata',
    'Winner – “Voice of Business” (DU FBS)'
  ],
  spotlightSubtitle: 'Executive Spotlight & Strategic Vision',
  spotlightTitle: 'Driving Growth, AI Workflows & Operational Excellence',
  spotlightBio: 'A forward-thinking strategist bringing together analytical rigor, creative storytelling, and AI-enabled process optimization. With a proven track record across cross-border team leadership, marketing execution, and financial modeling, I help businesses turn ambitious goals into measurable impact.',
  spotlightHighlights: [
    '10+ Years Strategic & Operational Leadership',
    'AI & Automation Workflow Integration',
    'Data-Driven Marketing & Martech Stack Optimization',
    'Global BPO & High-Throughput Team Management'
  ]
};

export async function getProfileConfig(): Promise<IProfileConfig> {
  try {
    await connectToDatabase();
    const profile = await ProfileModel.findOne().lean();
    if (!profile) return DEFAULT_PROFILE;
    return JSON.parse(JSON.stringify(profile));
  } catch (error) {
    console.warn('⚠️ DB Offline/Fallback used for ProfileConfig:', error);
    return DEFAULT_PROFILE;
  }
}
