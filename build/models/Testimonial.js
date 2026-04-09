import mongoose, { Schema } from "mongoose";
const testimonialSchema = new Schema({
    clientName: { type: String, required: true, trim: true },
    clientRole: { type: String, trim: true },
    company: { type: String, trim: true },
    quote: { type: String, required: true },
    avatarUrl: { type: String },
    featured: { type: Boolean, default: false, index: true },
    sortOrder: { type: Number, default: 0, index: true },
}, { timestamps: true });
export const TestimonialModel = mongoose.models.Testimonial ||
    mongoose.model("Testimonial", testimonialSchema, "testimonials");
