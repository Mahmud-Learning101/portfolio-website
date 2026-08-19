import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// Load .env.local variables if not already in process.env
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envConfig = fs.readFileSync(envLocalPath, 'utf-8');
  envConfig.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...values] = trimmed.split('=');
      const val = values.join('=').trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  });
}

import { ProfileModel } from '../src/features/profile/data/profile.model';
import { ExperienceModel } from '../src/features/experience/data/experience.model';
import { EducationModel } from '../src/features/education/data/education.model';
import { ProjectModel } from '../src/features/projects/data/project.model';
import { TestimonialModel } from '../src/features/testimonials/data/testimonial.model';
import { AdminUserModel } from '../src/features/auth/data/admin-user.model';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://smmahmudbinmurad_db_user:7RSvxSuanZBbBxmT@portfoliowebsite.jezrh2j.mongodb.net/portfolio_db?retryWrites=true&w=majority';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'smmahmudbinmurad@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Test@12345';

async function seedDatabase() {
  console.log(`🌱 Connecting to MongoDB Atlas URI: ${MONGODB_URI.replace(/:([^@]+)@/, ':****@')} ...`);
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Successfully connected to MongoDB Atlas!');

  // 1. Seed Root Admin User
  console.log('🔐 Seeding Admin Account...');
  const existingAdmin = await AdminUserModel.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

  if (existingAdmin) {
    existingAdmin.passwordHash = passwordHash;
    await existingAdmin.save();
    console.log(`Updated existing admin user: ${ADMIN_EMAIL}`);
  } else {
    await AdminUserModel.create({
      email: ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      role: 'superadmin',
    });
    console.log(`Created root admin user: ${ADMIN_EMAIL}`);
  }

  // 2. Seed Profile & Bio Data
  console.log('👤 Seeding Profile Configuration (S. M. Mahmud Bin Murad)...');
  await ProfileModel.deleteMany({});
  await ProfileModel.create({
    fullName: 'S. M. Mahmud Bin Murad',
    title: 'Marketing & Content Strategist | Project Manager | Business Solutions Consultant',
    bioShort:
      'Curiosity-driven strategist bringing together analytical thinking, creativity, and a people-first mindset to scale businesses, optimize operations, and deliver measurable outcomes.',
    bioLong:
      'Every business has a story. And I enjoy shaping the chapters that matter. Curiosity has driven my career: understanding how businesses grow, how teams thrive, and what turns good ideas into lasting results. From strategy and operations to marketing, project leadership, and customer success, each role has broadened my perspective and strengthened my ability to connect people, optimize processes, and solve complex challenges with clarity. I bring together analytical thinking, creativity, and a people-first mindset to build meaningful relationships, deliver measurable outcomes, and create value that endures.',
    heroBadges: [
      'AI Strategy & Operations',
      'BPO & Project Leadership',
      'Growth Marketing & SEO',
      'Financial Modeling & Forecasting',
    ],
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
      'Strategic Marketing & Campaign Management',
      'Brand Messaging & Storytelling',
      'Stakeholder Engagement',
      'Cross-Functional Team Leadership',
      'Project & Operations Management',
      'Client Communication & Relationship Management',
      'Creative Thinking & Problem Solving',
      'Content Strategy & Tone Adaptation',
      'Market Research & Business Insight',
      'Vendor & Customer Management',
    ],
    techSkills: [
      'Digital Analytics & Consumer Insight Tools',
      'SEO Optimization & Keyword Targeting',
      'CRM & Martech Platforms (HubSpot, Salesforce)',
      'Copywriting Tools & AI Writing Assistants',
      'Financial Modeling & Reporting (Excel, Google Sheets)',
      'Business Intelligence Tools (Power BI, Tableau)',
      'SQL & Data Querying',
      'Amazon Listing & eCommerce CMS',
      'Performance Dashboards & SOP Design',
      'Content Audit Tools & Engagement Metrics',
    ],
    certificationsAndAwards: [
      'Certified Digital Marketer – Google, HubSpot',
      'Prompt Engineering for AI Strategy – OpenAI Tools & Platforms',
      'Social Business & SDG Strategy – YY Ventures (Supported by UNDP)',
      'Finalist – National Innovation Challenge 2019',
      'Finalist – Admaker 2018 | Hashtag Marketing 2017',
      'Best Speaker – NUJS International Debate, Kolkata',
      'Winner – “Voice of Business” (DU FBS)',
    ],
  });

  // 3. Seed Professional Work Experience
  console.log('💼 Seeding Professional Work Experiences...');
  await ExperienceModel.deleteMany({});
  await ExperienceModel.insertMany([
    {
      role: 'International Manager & Project Team Leader',
      company: 'Iozera AI - Kriss AI',
      companyUrl: 'https://iozera.ai',
      location: 'Remote / Global',
      employmentType: 'Full-Time',
      startDate: 'Oct 2025',
      endDate: 'June 2026',
      isCurrent: false,
      summaryPoints: [
        'Lead global recruitment and performance operations, scaling teams of appointment setters and demo specialists while improving qualified candidate throughput by about 40 percent.',
        'Built streamlined systems for onboarding, KPI tracking, and retention analytics, enabling accurate monitoring at 30, 60, 90-day and long-term milestones.',
        'Manage and coach a multi-country team on communication strategy, appointment quality, and AI-assisted workflows, increasing demo completions and consistency.',
        'Collaborate with leadership and cross-functional units to align recruitment processes, reporting, and operational execution across large-scale hiring initiatives.',
      ],
      techStack: ['AI Workflows', 'KPI Dashboards', 'Cross-Functional Leadership', 'Recruitment Automation'],
      orderIndex: 0,
      featured: true,
    },
    {
      role: 'Financial Market Analyst',
      company: 'Afnan Global Ltd.',
      companyUrl: '',
      location: 'Dhaka',
      employmentType: 'Full-Time',
      startDate: 'Jul 2024',
      endDate: 'Feb 2025',
      isCurrent: false,
      summaryPoints: [
        'Delivered real-time market intelligence and financial forecasts, improving trading decisions and raising portfolio return rates by 20%.',
        'Built dynamic models integrating macroeconomic trends and sector data; accuracy improved forecasting efficiency by 35%.',
        'Advised executive leadership on strategic asset allocation through weekly briefings.',
      ],
      techStack: ['Financial Modeling', 'Macroeconomic Forecasting', 'Asset Allocation', 'Excel / Sheets'],
      orderIndex: 1,
      featured: true,
    },
    {
      role: 'Operations & Strategy Manager',
      company: 'Trackstone International BPO Ltd.',
      companyUrl: '',
      location: 'Dhaka',
      employmentType: 'Full-Time',
      startDate: 'Jun 2024',
      endDate: 'Dec 2024',
      isCurrent: false,
      summaryPoints: [
        'Oversaw daily operations across 5 departments and launched new SOPs, reducing process bottlenecks by 30%.',
        'Developed performance dashboards that increased accountability and productivity by 25%.',
        'Strengthened client onboarding and retention workflows, increasing customer lifetime value by 20%.',
      ],
      techStack: ['SOP Design', 'BPO Management', 'Performance Dashboards', 'Retention Analytics'],
      orderIndex: 2,
      featured: false,
    },
    {
      role: 'Client Relationship Manager',
      company: 'Silver Edge IT Ltd.',
      companyUrl: '',
      location: 'Dhaka',
      employmentType: 'Full-Time',
      startDate: 'Feb 2024',
      endDate: 'Jun 2024',
      isCurrent: false,
      summaryPoints: [
        'Streamlined maintenance and property issue protocols, cutting turnaround time by 50%.',
        'Designed communication systems that improved customer satisfaction ratings by 40%.',
        'Re-engineered vendor feedback processes, enhancing reliability and reducing downtime.',
      ],
      techStack: ['CRM Platforms', 'Vendor Management', 'Customer Success', 'Process Optimization'],
      orderIndex: 3,
      featured: false,
    },
    {
      role: 'Freelance Content Strategist & Research Consultant',
      company: 'Self-employed',
      companyUrl: '',
      location: 'Global',
      employmentType: 'Contract',
      startDate: 'Apr 2020',
      endDate: 'Dec 2023',
      isCurrent: false,
      summaryPoints: [
        'Produced 200+ marketing and research pieces (articles, social content, academic reports) with an average engagement increase of 3.2x.',
        'Applied SEO and digital tools to optimize visibility, resulting in a 45% rise in organic discovery for clients.',
        'Guided brand messaging for startups and academic teams, improving project clarity and audience alignment.',
      ],
      techStack: ['SEO Strategy', 'Content Architecture', 'Brand Messaging', 'Research Analytics'],
      orderIndex: 4,
      featured: true,
    },
    {
      role: 'Business Analyst',
      company: 'M Bin M Group of Industrials',
      companyUrl: '',
      location: 'Dhaka',
      employmentType: 'Full-Time',
      startDate: 'Jan 2019',
      endDate: 'Mar 2020',
      isCurrent: false,
      summaryPoints: [
        'Analyzed operations and finances across 4 business units, implementing cost-saving strategies that cut expenses by ~20%.',
        'Led reporting on competitor analysis and market expansion opportunities, supporting new revenue initiatives.',
        'Developed financial summaries and performance dashboards for executive decision-making.',
      ],
      techStack: ['Operations Analysis', 'Financial Modeling', 'Cost Reduction', 'Executive Dashboards'],
      orderIndex: 5,
      featured: false,
    },
    {
      role: 'Business Development Executive',
      company: 'Activist Communications Ltd.',
      companyUrl: '',
      location: 'Dhaka',
      employmentType: 'Full-Time',
      startDate: 'Feb 2018',
      endDate: 'Nov 2018',
      isCurrent: false,
      summaryPoints: [
        'Supported marketing strategy for BATB and Pathao; helped increase brand engagement and campaign reach by 22%.',
        'Conducted audience segmentation and trend analysis, leading to more targeted campaigns and improved messaging alignment.',
        'Collaborated on creative campaign messaging and QA audits for client deliverables.',
      ],
      techStack: ['Campaign Strategy', 'Audience Segmentation', 'QA Audits', 'Brand Strategy'],
      orderIndex: 6,
      featured: false,
    },
    {
      role: 'Content Creator',
      company: 'Fraktal Creatives Ltd.',
      companyUrl: '',
      location: 'Dhaka',
      employmentType: 'Full-Time',
      startDate: 'Mar 2017',
      endDate: 'Jan 2018',
      isCurrent: false,
      summaryPoints: [
        'Created Amazon product listings and literary content with a focus on SEO and audience tone.',
        'Applied analytics tools and content audits to refine resonance and increase user engagement.',
      ],
      techStack: ['Amazon Listing', 'eCommerce SEO', 'Content Audits', 'Copywriting'],
      orderIndex: 7,
      featured: false,
    },
  ]);

  // 4. Seed Education History
  console.log('🎓 Seeding Education History...');
  await EducationModel.deleteMany({});
  await EducationModel.insertMany([
    {
      degree: 'BBA (Major in Marketing)',
      institution: 'North South University',
      institutionUrl: 'http://www.northsouth.edu',
      fieldOfStudy: 'Marketing & Business Strategy',
      startDate: '2016',
      endDate: '2019',
      gradeOrGpa: '',
      achievements: ['Specialized in Strategic Marketing and Consumer Behavior'],
      orderIndex: 0,
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Rajuk Uttara Model College',
      institutionUrl: 'https://rajukcollege.edu.bd',
      fieldOfStudy: 'Science / Business',
      startDate: '2014',
      endDate: '2015',
      gradeOrGpa: 'GPA 5.00',
      achievements: ['Perfect GPA 5.00', 'Active Debater & Cultural Participant'],
      orderIndex: 1,
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Rajuk Uttara Model College',
      institutionUrl: 'https://rajukcollege.edu.bd',
      fieldOfStudy: 'General',
      startDate: '2012',
      endDate: '2013',
      gradeOrGpa: 'GPA 5.00',
      achievements: ['Perfect GPA 5.00'],
      orderIndex: 2,
    },
  ]);

  // 5. Seed Flagship Case Studies / Projects
  console.log('🚀 Seeding Case Studies & Projects...');
  await ProjectModel.deleteMany({});
  await ProjectModel.insertMany([
    {
      title: 'Global AI Workforce & Recruitment Orchestration',
      slug: 'ai-workforce-orchestration',
      category: 'AI Operations & Leadership',
      tagline: 'Scaling cross-border recruitment and AI-assisted performance workflows by 40%',
      summary:
        'Engineered standardized hiring funnels and AI-assisted qualification workflows for Iozera AI, boosting candidate throughput by 40% across multi-country operations.',
      challenge:
        'Managing distributed appointment setters and demo specialists across different time zones caused pipeline bottlenecks, inconsistent qualification standards, and high 30-day attrition.',
      solution:
        'Designed end-to-end recruitment SOPs, AI-driven script coaching, and milestone-based retention dashboards monitoring 30, 60, and 90-day progress metrics.',
      outcome:
        'Increased qualified candidate throughput by 40%, cut onboarding lag, and established predictable demo completion rates across the sales organization.',
      coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
      tags: ['AI Strategy', 'Operations Leadership', 'KPI Systems', 'Global Scaling'],
      metrics: [
        { label: 'Candidate Throughput', value: '+40%' },
        { label: 'Milestone Tracking', value: '30/60/90 Days' },
        { label: 'Team Coverage', value: 'Multi-Country' },
      ],
      isFeatured: true,
      featuredOrder: 0,
      orderIndex: 0,
    },
    {
      title: 'Dynamic Macroeconomic & Asset Forecasting Engine',
      slug: 'macroeconomic-forecasting-engine',
      category: 'Financial Analytics',
      tagline: 'Real-time market intelligence models boosting portfolio return rates by 20%',
      summary:
        'Built quantitative forecasting models integrating macroeconomic trends and sector data at Afnan Global Ltd., elevating trading decisions and executive briefings.',
      challenge:
        'Volatile market conditions and fragmented data inputs resulted in lagging indicators for strategic asset allocation.',
      solution:
        'Structured real-time econometric models linking cross-asset trends, interest rate dynamics, and sector performance indicators into unified weekly executive briefs.',
      outcome:
        'Enhanced forecasting efficiency by 35% and raised portfolio return rates by 20% over consecutive quarters.',
      coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop',
      tags: ['Financial Modeling', 'Market Intelligence', 'Asset Allocation', 'Predictive Analysis'],
      metrics: [
        { label: 'Portfolio Returns', value: '+20%' },
        { label: 'Forecasting Efficiency', value: '+35%' },
        { label: 'Executive Briefs', value: 'Weekly cadence' },
      ],
      isFeatured: true,
      featuredOrder: 1,
      orderIndex: 1,
    },
    {
      title: 'Cross-Department BPO Process Optimization & SOPs',
      slug: 'bpo-process-optimization',
      category: 'Operations Management',
      tagline: 'Streamlining 5 business units and reducing operational bottlenecks by 30%',
      summary:
        'Redesigned organizational workflows and performance tracking dashboards across 5 departments at Trackstone International BPO, lifting productivity by 25%.',
      challenge:
        'Siloed departmental handoffs and lack of standardized operating procedures caused substantial operational friction and slowed client resolution times.',
      solution:
        'Introduced lean SOPs, centralized performance KPI boards in Power BI, and upgraded customer onboarding retention workflows.',
      outcome:
        'Decreased process bottlenecks by 30%, elevated team productivity by 25%, and boosted customer lifetime value by 20%.',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      tags: ['BPO Management', 'SOP Architecture', 'Process Automation', 'Power BI'],
      metrics: [
        { label: 'Bottlenecks Reduced', value: '-30%' },
        { label: 'Productivity Lift', value: '+25%' },
        { label: 'Customer LTV', value: '+20%' },
      ],
      isFeatured: true,
      featuredOrder: 2,
      orderIndex: 2,
    },
  ]);

  // 6. Seed Testimonials
  console.log('💬 Seeding Testimonials...');
  await TestimonialModel.deleteMany({});
  await TestimonialModel.insertMany([
    {
      clientName: 'Munir Mohammed',
      clientRole: 'Portfolio Manager at JP Morgan | CEO at Afnan Global',
      company: 'JP Morgan / Afnan Global',
      quote:
        'Mahmud combines exceptional analytical rigor with keen market instincts. His macroeconomic models and forecasting accuracy consistently delivered a 20% uplift in our portfolio returns.',
      rating: 5,
      isPublished: true,
      orderIndex: 0,
    },
    {
      clientName: 'Sheikh Mahdee Rakin',
      clientRole: 'Manager, Brand & Communication',
      company: 'Prime Bank PLC',
      quote:
        'An outstanding strategist who excels at turning complex operational challenges into clear, actionable roadmaps. His storytelling and people-first approach make him a tremendous asset to any team.',
      rating: 5,
      isPublished: true,
      orderIndex: 1,
    },
  ]);

  console.log('🎉 Database seeding completed successfully on MongoDB Atlas!');
  await mongoose.disconnect();
}

seedDatabase().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
