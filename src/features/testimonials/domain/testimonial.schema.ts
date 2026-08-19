import { z } from 'zod';

export const TestimonialSchema = z.object({
  clientName: z.string().min(2, 'Client name is required'),
  clientRole: z.string().min(2, 'Client role / title is required'),
  company: z.string().min(2, 'Company is required'),
  avatarUrl: z.string().optional().default(''),
  quote: z.string().min(10, 'Quote must be at least 10 characters long'),
  rating: z.number().min(1).max(5).default(5),
  isPublished: z.boolean().default(true),
  orderIndex: z.number().default(0),
});

export type TestimonialInput = z.infer<typeof TestimonialSchema>;

export interface ITestimonial {
  _id?: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatarUrl?: string;
  quote: string;
  rating: number;
  isPublished: boolean;
  orderIndex: number;
  createdAt?: Date;
  updatedAt?: Date;
}
