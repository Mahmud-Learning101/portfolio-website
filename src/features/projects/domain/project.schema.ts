import { z } from 'zod';

export const MetricSchema = z.object({
  label: z.string().min(1, 'Metric label is required'),
  value: z.string().min(1, 'Metric value is required'),
});

export const ProjectSchema = z.object({
  title: z.string().min(2, 'Project title is required'),
  slug: z.string().min(2, 'URL slug is required').regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  category: z.string().default('Strategy & Operations'),
  tagline: z.string().min(5, 'Tagline is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  challenge: z.string().optional().default(''),
  solution: z.string().optional().default(''),
  outcome: z.string().optional().default(''),
  architectureDetails: z.string().optional().default(''),
  coverImage: z.string().default(''),
  galleryImages: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  metrics: z.array(MetricSchema).default([]),
  demoUrl: z.string().default(''),
  githubUrl: z.string().default(''),
  isFeatured: z.boolean().default(false),
  featuredOrder: z.number().optional().default(0),
  orderIndex: z.number().default(0),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  summary: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  architectureDetails?: string;
  coverImage: string;
  galleryImages?: string[];
  tags: string[];
  metrics: { label: string; value: string }[];
  demoUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  featuredOrder?: number;
  orderIndex: number;
  createdAt?: Date;
  updatedAt?: Date;
}
