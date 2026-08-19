import { z } from 'zod';

export const EducationSchema = z.object({
  degree: z.string().min(2, 'Degree title is required'),
  institution: z.string().min(2, 'Institution name is required'),
  institutionUrl: z.string().url().or(z.literal('')).optional().default(''),
  fieldOfStudy: z.string().optional().default(''),
  startDate: z.string().min(4, 'Start date is required'),
  endDate: z.string().optional().default(''),
  gradeOrGpa: z.string().optional().default(''),
  achievements: z.array(z.string()).default([]),
  orderIndex: z.number().default(0),
});

export type EducationInput = z.infer<typeof EducationSchema>;

export interface IEducation extends EducationInput {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
