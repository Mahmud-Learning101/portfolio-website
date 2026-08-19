import mongoose, { Schema, Model } from 'mongoose';
import { IProfileConfig } from '../domain/profile.schema';

const ProfileConfigSchema = new Schema<IProfileConfig>(
  {
    fullName: { type: String, required: true },
    title: { type: String, required: true },
    bioShort: { type: String, required: true },
    bioLong: { type: String, required: true },
    heroBadges: [{ type: String }],
    resumePdfUrl: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    emails: [{ type: String }],
    phones: [{ type: String }],
    location: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    openToWork: { type: Boolean, default: true },
    featuredStats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
        helper: { type: String },
      },
    ],
    softSkills: [{ type: String }],
    techSkills: [{ type: String }],
    certificationsAndAwards: [{ type: String }],
    spotlightTitle: { type: String, default: '' },
    spotlightSubtitle: { type: String, default: '' },
    spotlightBio: { type: String, default: '' },
    spotlightHighlights: [{ type: String }],
  },
  { timestamps: true }
);

export const ProfileModel: Model<IProfileConfig> =
  mongoose.models.ProfileConfig || mongoose.model<IProfileConfig>('ProfileConfig', ProfileConfigSchema);
