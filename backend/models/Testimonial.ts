import mongoose, { Schema } from "mongoose";

export interface TestimonialDocument {
  _id: mongoose.Types.ObjectId;
  clientName: string;
  clientRole?: string;
  company?: string;
  quote: string;
  avatarUrl?: string;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<TestimonialDocument>(
  {
    clientName: { type: String, required: true, trim: true },
    clientRole: { type: String, trim: true },
    company: { type: String, trim: true },
    quote: { type: String, required: true },
    avatarUrl: { type: String },
    featured: { type: Boolean, default: false, index: true },
    sortOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

export const TestimonialModel =
  mongoose.models.Testimonial ||
  mongoose.model<TestimonialDocument>(
    "Testimonial",
    testimonialSchema,
    "testimonials",
  );
