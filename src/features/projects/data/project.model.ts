import mongoose, { Schema, Model } from 'mongoose';
import { IProject } from '../domain/project.schema';

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, default: 'Strategy & Operations' },
    tagline: { type: String, required: true },
    summary: { type: String, required: true },
    challenge: { type: String, default: '' },
    solution: { type: String, default: '' },
    outcome: { type: String, default: '' },
    architectureDetails: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    galleryImages: [{ type: String }],
    tags: [{ type: String }],
    metrics: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    demoUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    featuredOrder: { type: Number, default: 0 },
    orderIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProjectSchema.index({ isFeatured: 1, featuredOrder: 1 });
ProjectSchema.index({ orderIndex: 1 });

export const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
