import { InvoiceModel, InvoiceDocument } from "../models/Invoice.js";

export const getInvoices = async (query: any, limit: number, skip: number) => {
  const [invoices, total] = await Promise.all([
    InvoiceModel.find(query).sort({ dueAt: 1 }).skip(skip).limit(limit),
    InvoiceModel.countDocuments(query),
  ]);
  return { invoices, total };
};

export const getInvoiceById = async (id: string) => {
  return await InvoiceModel.findById(id);
};

export const createInvoice = async (data: Partial<InvoiceDocument>) => {
  const invoice = new InvoiceModel(data);
  return await invoice.save();
};

export const updateInvoice = async (
  id: string,
  data: Partial<InvoiceDocument>,
) => {
  return await InvoiceModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteInvoice = async (id: string) => {
  return await InvoiceModel.findByIdAndDelete(id);
};
