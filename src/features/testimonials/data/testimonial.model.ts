import mongoose, { Schema, Model } from 'mongoose';
import { ITestimonial } from '../domain/testimonial.schema';

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    clientRole: { type: String, required: true },
    company: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    isPublished: { type: Boolean, default: true },
    orderIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TestimonialSchema.index({ isPublished: 1, orderIndex: 1 });

export const TestimonialModel: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
