import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema({
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
}, { timestamps: true });
// Compound index for querying client messages ordered by creation
messageSchema.index({ clientId: 1, createdAt: -1 });
export const MessageModel = mongoose.models.Message ||
    mongoose.model("Message", messageSchema, "messages");
