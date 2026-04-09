import { MessageModel, MessageDocument } from "../models/Message.js";

export const getMessages = async (query: any, limit: number, skip: number) => {
  const [messages, total] = await Promise.all([
    MessageModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    MessageModel.countDocuments(query),
  ]);
  return { messages, total };
};

export const getMessageById = async (id: string) => {
  return await MessageModel.findById(id);
};

export const createMessage = async (data: Partial<MessageDocument>) => {
  const message = new MessageModel(data);
  return await message.save();
};

export const updateMessage = async (
  id: string,
  data: Partial<MessageDocument>,
) => {
  return await MessageModel.findByIdAndUpdate(id, data, { new: true });
};
