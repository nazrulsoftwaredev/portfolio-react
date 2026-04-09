import mongoose, { Schema } from "mongoose";

export type ClientStatus = "Active" | "On Hold" | "Inactive";

export interface ClientDocument {
  _id: mongoose.Types.ObjectId;
  name: string;
  industry: string;
  status: ClientStatus;
  value: number;
  growth: number;
  avatar: string;
  email: string;
  phone: string;
  website: string;
  ownerUserId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const clientSchema = new Schema<ClientDocument>(
  {
    name: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Active", "On Hold", "Inactive"],
      default: "Active",
    },
    value: { type: Number, default: 0, min: 0 },
    growth: { type: Number, default: 0 },
    avatar: { type: String, default: "" },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    website: { type: String, default: "" },
    ownerUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

clientSchema.index({ status: 1, createdAt: -1 });
clientSchema.index({ name: 1 });
clientSchema.index({ email: 1 });

export const ClientModel =
  mongoose.models.Client ||
  mongoose.model<ClientDocument>("Client", clientSchema, "clients");
