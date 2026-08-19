import { z } from 'zod';

export const StatItemSchema = z.object({
  label: z.string().min(1, 'Stat label is required'),
  value: z.string().min(1, 'Stat value is required'),
  helper: z.string().optional(),
});

export const ProfileConfigSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  title: z.string().min(2, 'Professional title is required'),
  bioShort: z.string().min(10, 'Short bio must be at least 10 characters'),
  bioLong: z.string().min(20, 'Full bio must be at least 20 characters'),
  heroBadges: z.array(z.string()).default([]),
  resumePdfUrl: z.string().default(''),
  avatarUrl: z.string().default(''),
  emails: z.array(z.string().email()).default([]),
  phones: z.array(z.string()).default([]),
  location: z.string().default(''),
  github: z.string().url().or(z.literal('')).default(''),
  linkedin: z.string().url().or(z.literal('')).default(''),
  twitter: z.string().url().or(z.literal('')).optional().default(''),
  openToWork: z.boolean().default(true),
  featuredStats: z.array(StatItemSchema).default([]),
  softSkills: z.array(z.string()).default([]),
  techSkills: z.array(z.string()).default([]),
  certificationsAndAwards: z.array(z.string()).default([]),
  spotlightTitle: z.string().optional().default(''),
  spotlightSubtitle: z.string().optional().default(''),
  spotlightBio: z.string().optional().default(''),
  spotlightHighlights: z.array(z.string()).optional().default([]),
});

export type ProfileConfigInput = z.infer<typeof ProfileConfigSchema>;

export interface IProfileConfig extends ProfileConfigInput {
  _id?: string;
  updatedAt?: Date;
}
