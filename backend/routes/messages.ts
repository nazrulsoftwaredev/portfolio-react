import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { sendError, sendSuccess } from "../utils/responses.js";
import {
  createMessage,
  getMessageById,
  getMessages,
  updateMessage,
} from "../services/messageService.js";

const router = Router();

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const idParamSchema = z.object({
  id: objectIdSchema,
});

const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  clientId: objectIdSchema.optional(),
  unread: z.enum(["true", "false"]).optional(),
});

const messageInputSchema = z.object({
  clientId: objectIdSchema,
  subject: z.string().min(1),
  preview: z.string().optional(),
  body: z.string().optional(),
  direction: z.enum(["inbound", "outbound"]).default("inbound"),
  unread: z.boolean().default(true),
});

const messagePatchSchema = z.object({
  unread: z.boolean(),
});

router.use(requireAuth);

router.get("/", async (req, res) => {
  try {
    const listQuery = listQuerySchema.parse(req.query);
    const { page, pageSize, clientId, unread } = listQuery;

    const query: any = {};
    if (clientId) query.clientId = clientId;
    if (unread !== undefined) query.unread = unread === "true";

    const skip = (page - 1) * pageSize;
    const { messages, total } = await getMessages(query, pageSize, skip);

    return sendSuccess(res, 200, messages, "Messages retrieved successfully", {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid query parameters",
        error.issues,
      );
    }
    return sendError(res, 500, "INTERNAL_ERROR", "Failed to get messages");
  }
});

router.post("/", async (req, res) => {
  try {
    const data = messageInputSchema.parse(req.body);
    const message = await createMessage(data as any);
    return sendSuccess(res, 201, message, "Message created successfully");
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid request body",
        error.issues,
      );
    }
    return sendError(res, 500, "INTERNAL_ERROR", "Failed to create message");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const message = await getMessageById(id);
    if (!message) return sendError(res, 404, "NOT_FOUND", "Message not found");
    return sendSuccess(res, 200, message, "Message retrieved successfully");
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid message ID",
        error.issues,
      );
    }
    return sendError(res, 500, "INTERNAL_ERROR", "Failed to get message");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const data = messagePatchSchema.parse(req.body);
    const message = await updateMessage(id, data as any);
    if (!message) return sendError(res, 404, "NOT_FOUND", "Message not found");
    return sendSuccess(res, 200, message, "Message updated successfully");
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid request body",
        error.issues,
      );
    }
    return sendError(res, 500, "INTERNAL_ERROR", "Failed to update message");
  }
});

export default router;
