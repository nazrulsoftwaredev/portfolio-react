import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { sendError, sendSuccess } from "../utils/responses.js";
import { createInvoice, deleteInvoice, getInvoiceById, getInvoices, updateInvoice, } from "../services/invoiceService.js";
const router = Router();
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);
const idParamSchema = z.object({
    id: objectIdSchema,
});
const listQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().max(100).default(20),
    clientId: objectIdSchema.optional(),
    status: z.string().optional(),
});
const invoiceInputSchema = z.object({
    clientId: objectIdSchema,
    projectId: objectIdSchema.optional(),
    code: z.string().min(1),
    amount: z.coerce.number().min(0),
    currency: z.string().default("USD"),
    status: z
        .enum(["Draft", "Sent", "Paid", "Overdue", "Cancelled"])
        .default("Draft"),
    issuedAt: z.coerce.date().optional(),
    dueAt: z.coerce.date().optional(),
    paidAt: z.coerce.date().optional(),
    notes: z.string().optional(),
});
const invoicePatchSchema = invoiceInputSchema.partial();
router.use(requireAuth);
router.get("/", async (req, res) => {
    try {
        const listQuery = listQuerySchema.parse(req.query);
        const { page, pageSize, clientId, status } = listQuery;
        const query = {};
        if (clientId)
            query.clientId = clientId;
        if (status)
            query.status = status;
        const skip = (page - 1) * pageSize;
        const { invoices, total } = await getInvoices(query, pageSize, skip);
        return sendSuccess(res, 200, invoices, "Invoices retrieved successfully", {
            page,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return sendError(res, 400, "VALIDATION_ERROR", "Invalid query parameters", error.issues);
        }
        return sendError(res, 500, "INTERNAL_ERROR", "Failed to get invoices");
    }
});
router.post("/", async (req, res) => {
    try {
        const data = invoiceInputSchema.parse(req.body);
        const invoice = await createInvoice(data);
        return sendSuccess(res, 201, invoice, "Invoice created successfully");
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return sendError(res, 400, "VALIDATION_ERROR", "Invalid request body", error.issues);
        }
        if (error.code === 11000) {
            return sendError(res, 409, "CONFLICT_ERROR", "Invoice code must be unique");
        }
        return sendError(res, 500, "INTERNAL_ERROR", "Failed to create invoice");
    }
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = idParamSchema.parse(req.params);
        const invoice = await getInvoiceById(id);
        if (!invoice)
            return sendError(res, 404, "NOT_FOUND", "Invoice not found");
        return sendSuccess(res, 200, invoice, "Invoice retrieved successfully");
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return sendError(res, 400, "VALIDATION_ERROR", "Invalid invoice ID", error.issues);
        }
        return sendError(res, 500, "INTERNAL_ERROR", "Failed to get invoice");
    }
});
router.patch("/:id", async (req, res) => {
    try {
        const { id } = idParamSchema.parse(req.params);
        const data = invoicePatchSchema.parse(req.body);
        const invoice = await updateInvoice(id, data);
        if (!invoice)
            return sendError(res, 404, "NOT_FOUND", "Invoice not found");
        return sendSuccess(res, 200, invoice, "Invoice updated successfully");
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return sendError(res, 400, "VALIDATION_ERROR", "Invalid request body", error.issues);
        }
        return sendError(res, 500, "INTERNAL_ERROR", "Failed to update invoice");
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = idParamSchema.parse(req.params);
        const invoice = await deleteInvoice(id);
        if (!invoice)
            return sendError(res, 404, "NOT_FOUND", "Invoice not found");
        return sendSuccess(res, 200, invoice, "Invoice deleted successfully");
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return sendError(res, 400, "VALIDATION_ERROR", "Invalid invoice ID", error.issues);
        }
        return sendError(res, 500, "INTERNAL_ERROR", "Failed to delete invoice");
    }
});
export default router;
