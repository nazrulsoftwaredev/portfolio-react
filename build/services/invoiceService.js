import { InvoiceModel } from "../models/Invoice.js";
export const getInvoices = async (query, limit, skip) => {
    const [invoices, total] = await Promise.all([
        InvoiceModel.find(query).sort({ dueAt: 1 }).skip(skip).limit(limit),
        InvoiceModel.countDocuments(query),
    ]);
    return { invoices, total };
};
export const getInvoiceById = async (id) => {
    return await InvoiceModel.findById(id);
};
export const createInvoice = async (data) => {
    const invoice = new InvoiceModel(data);
    return await invoice.save();
};
export const updateInvoice = async (id, data) => {
    return await InvoiceModel.findByIdAndUpdate(id, data, { new: true });
};
export const deleteInvoice = async (id) => {
    return await InvoiceModel.findByIdAndDelete(id);
};
