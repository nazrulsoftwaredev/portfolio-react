import mongoose, { Schema } from "mongoose";
const inquirySchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    message: { type: String, required: true },
    budgetRange: { type: String, trim: true },
    timelinePreference: { type: String, trim: true },
    source: { type: String, trim: true },
    status: {
        type: String,
        enum: ["New", "Reviewed", "Contacted", "Archived"],
        default: "New",
        index: true,
    },
    submittedAt: { type: Date, default: Date.now, index: true },
}, { timestamps: true });
export const InquiryModel = mongoose.models.Inquiry ||
    mongoose.model("Inquiry", inquirySchema, "inquiries");
