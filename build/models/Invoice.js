import mongoose, { Schema } from "mongoose";
const invoiceSchema = new Schema({
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
}, { timestamps: true });
// Compound index for efficient querying
invoiceSchema.index({ clientId: 1, status: 1, dueAt: 1 });
export const InvoiceModel = mongoose.models.Invoice ||
    mongoose.model("Invoice", invoiceSchema, "invoices");
