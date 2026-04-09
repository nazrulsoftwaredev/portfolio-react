import mongoose, { Schema } from "mongoose";

export interface MessageDocument {
  _id: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  subject: string;
  preview?: string;
  body?: string;
  direction?: "inbound" | "outbound";
  unread: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<MessageDocument>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      index: true,
    },
    subject: { type: String, required: true, trim: true },
    preview: { type: String, trim: true },
    body: { type: String },
    direction: {
      type: String,
      enum: ["inbound", "outbound"],
      default: "inbound",
    },
    unread: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

// Compound index for querying client messages ordered by creation
messageSchema.index({ clientId: 1, createdAt: -1 });

export const MessageModel =
  mongoose.models.Message ||
  mongoose.model<MessageDocument>("Message", messageSchema, "messages");
