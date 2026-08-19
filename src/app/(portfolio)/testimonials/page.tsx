import React from 'react';
import { getTestimonials } from '@/features/testimonials/use-cases/getTestimonials';
import TestimonialsCarousel from '@/features/testimonials/components/TestimonialsCarousel';

export const metadata = {
  title: 'Client Recommendations & Endorsements | S. M. Mahmud Bin Murad',
  description: 'Testimonials and executive endorsements for S. M. Mahmud Bin Murad from portfolio managers and communication directors.',
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Executive <span className="text-gradient-cyan">Recommendations</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Endorsements from executives, portfolio managers, and communication leaders.
        </p>
      </div>

      <TestimonialsCarousel testimonials={testimonials} />
    </div>
  );
}
