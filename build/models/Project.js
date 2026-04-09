import mongoose, { Schema } from "mongoose";
const projectSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true,
        index: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    stage: {
        type: String,
        enum: ["Lead", "Active", "Completed", "Archived"],
        default: "Lead",
        index: true,
    },
    value: { type: Number, default: 0, min: 0 },
    startDate: { type: Date },
    targetDate: { type: Date },
    completedAt: { type: Date },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
export const ProjectModel = mongoose.models.Project ||
    mongoose.model("Project", projectSchema, "projects");
