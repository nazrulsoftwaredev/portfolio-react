import mongoose, { Schema } from "mongoose";

export type ActivityKind = "create" | "update" | "archive";

export interface ActivityDocument {
  _id: mongoose.Types.ObjectId;
  clientId?: mongoose.Types.ObjectId;
  entityType: "client";
  entityId: mongoose.Types.ObjectId;
  kind: ActivityKind;
  label: string;
  actorUserId: mongoose.Types.ObjectId;
  meta?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "Client", index: true },
    entityType: { type: String, enum: ["client"], required: true },
    entityId: { type: Schema.Types.ObjectId, required: true, index: true },
    kind: {
      type: String,
      enum: ["create", "update", "archive"],
      required: true,
    },
    label: { type: String, required: true, trim: true },
    actorUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

activitySchema.index({ createdAt: -1 });

export const ActivityModel =
  mongoose.models.Activity ||
  mongoose.model<ActivityDocument>("Activity", activitySchema, "activities");
