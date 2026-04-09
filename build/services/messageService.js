import { MessageModel } from "../models/Message.js";
export const getMessages = async (query, limit, skip) => {
    const [messages, total] = await Promise.all([
        MessageModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
        MessageModel.countDocuments(query),
    ]);
    return { messages, total };
};
export const getMessageById = async (id) => {
    return await MessageModel.findById(id);
};
export const createMessage = async (data) => {
    const message = new MessageModel(data);
    return await message.save();
};
export const updateMessage = async (id, data) => {
    return await MessageModel.findByIdAndUpdate(id, data, { new: true });
};
