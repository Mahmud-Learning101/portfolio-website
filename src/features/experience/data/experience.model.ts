import mongoose, { Schema, Model } from 'mongoose';
import { IExperience } from '../domain/experience.schema';

const ExperienceSchema = new Schema<IExperience>(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    companyUrl: { type: String, default: '' },
    location: { type: String, default: '' },
    employmentType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Contract', 'Freelance'],
      default: 'Full-Time',
    },
    startDate: { type: String, required: true },
    endDate: { type: String, default: '' },
    isCurrent: { type: Boolean, default: false },
    summaryPoints: [{ type: String, required: true }],
    techStack: [{ type: String }],
    orderIndex: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ExperienceSchema.index({ orderIndex: 1, startDate: -1 });

export const ExperienceModel: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
