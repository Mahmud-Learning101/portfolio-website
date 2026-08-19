import mongoose, { Schema, Model } from 'mongoose';
import { IEducation } from '../domain/education.schema';

const EducationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    institutionUrl: { type: String, default: '' },
    fieldOfStudy: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: '' },
    gradeOrGpa: { type: String, default: '' },
    achievements: [{ type: String }],
    orderIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

EducationSchema.index({ orderIndex: 1, startDate: -1 });

export const EducationModel: Model<IEducation> =
  mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);
