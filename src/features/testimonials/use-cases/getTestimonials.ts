import { connectToDatabase } from '@/shared/lib/db';
import { TestimonialModel } from '../data/testimonial.model';
import { ITestimonial } from '../domain/testimonial.schema';

const DEFAULT_TESTIMONIALS: ITestimonial[] = [
  {
    clientName: 'Munir Mohammed',
    clientRole: 'Portfolio Manager at JP Morgan | CEO at Afnan Global',
    company: 'JP Morgan / Afnan Global',
    quote: 'Mahmud combines exceptional analytical rigor with keen market instincts. His macroeconomic models and forecasting accuracy consistently delivered a 20% uplift in our portfolio returns.',
    rating: 5,
    isPublished: true,
    orderIndex: 0
  },
  {
    clientName: 'Sheikh Mahdee Rakin',
    clientRole: 'Manager, Brand & Communication',
    company: 'Prime Bank PLC',
    quote: 'An outstanding strategist who excels at turning complex operational challenges into clear, actionable roadmaps. His storytelling and people-first approach make him a tremendous asset to any team.',
    rating: 5,
    isPublished: true,
    orderIndex: 1
  }
];

export async function getTestimonials(): Promise<ITestimonial[]> {
  try {
    await connectToDatabase();
    const items = await TestimonialModel.find({ isPublished: true }).sort({ orderIndex: 1 }).lean();
    if (!items || items.length === 0) return DEFAULT_TESTIMONIALS;
    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.warn('⚠️ DB Offline/Fallback used for Testimonials:', error);
    return DEFAULT_TESTIMONIALS;
  }
}
