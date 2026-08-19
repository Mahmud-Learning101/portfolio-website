import { z } from 'zod';

export const ExperienceSchema = z.object({
  role: z.string().min(2, 'Role title is required'),
  company: z.string().min(2, 'Company name is required'),
  companyUrl: z.string().url().or(z.literal('')).optional().default(''),
  location: z.string().optional().default(''),
  employmentType: z.enum(['Full-Time', 'Part-Time', 'Contract', 'Freelance']).default('Full-Time'),
  startDate: z.string().min(4, 'Start date is required'),
  endDate: z.string().optional().default(''),
  isCurrent: z.boolean().default(false),
  summaryPoints: z.array(z.string()).min(1, 'At least one summary bullet point is required'),
  techStack: z.array(z.string()).default([]),
  orderIndex: z.number().default(0),
  featured: z.boolean().default(false),
});

export type ExperienceInput = z.infer<typeof ExperienceSchema>;

export interface IExperience {
  _id?: string;
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Freelance';
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  summaryPoints: string[];
  techStack: string[];
  orderIndex: number;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
