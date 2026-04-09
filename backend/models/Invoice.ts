import mongoose, { Schema } from "mongoose";

export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";

export interface InvoiceDocument {
  _id: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  code: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issuedAt?: Date;
  dueAt?: Date;
  paidAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const invoiceSchema = new Schema<InvoiceDocument>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      index: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    code: { type: String, required: true, unique: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "USD", trim: true },
    status: {
      type: String,
      enum: ["Draft", "Sent", "Paid", "Overdue", "Cancelled"],
      default: "Draft",
      index: true,
    },
    issuedAt: { type: Date },
    dueAt: { type: Date, index: true },
    paidAt: { type: Date },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

// Compound index for efficient querying
invoiceSchema.index({ clientId: 1, status: 1, dueAt: 1 });

export const InvoiceModel =
  mongoose.models.Invoice ||
  mongoose.model<InvoiceDocument>("Invoice", invoiceSchema, "invoices");
