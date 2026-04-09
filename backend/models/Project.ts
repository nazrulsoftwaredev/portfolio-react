import mongoose, { Schema } from "mongoose";

export type ProjectStage = "Lead" | "Active" | "Completed" | "Archived";

export interface ProjectDocument {
  _id: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  stage: ProjectStage;
  value: number;
  startDate?: Date;
  targetDate?: Date;
  completedAt?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<ProjectDocument>(
  {
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
  },
  { timestamps: true },
);

export const ProjectModel =
  mongoose.models.Project ||
  mongoose.model<ProjectDocument>("Project", projectSchema, "projects");
