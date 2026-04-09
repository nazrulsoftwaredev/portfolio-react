import mongoose, { Schema } from "mongoose";

export type PortfolioProjectStatus = "Draft" | "Published";

export interface PortfolioProjectDocument {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  tags?: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  status: PortfolioProjectStatus;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioProjectSchema = new Schema<PortfolioProjectDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    imageUrl: { type: String, required: true },
    liveUrl: { type: String },
    repoUrl: { type: String },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
      index: true,
    },
    featured: { type: Boolean, default: false, index: true },
    sortOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

// Allow ordering by featured and sortOrder
portfolioProjectSchema.index({ featured: -1, sortOrder: 1 });

export const PortfolioProjectModel =
  mongoose.models.PortfolioProject ||
  mongoose.model<PortfolioProjectDocument>(
    "PortfolioProject",
    portfolioProjectSchema,
    "portfolio_projects",
  );
