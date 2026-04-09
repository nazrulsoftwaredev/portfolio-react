import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { ActivityModel } from "../models/Activity.js";
import { InvoiceModel } from "../models/Invoice.js";
import { MessageModel } from "../models/Message.js";
import { ProjectModel } from "../models/Project.js";
import { logClientActivity } from "../services/activityService.js";
import {
  createClient,
  deleteClient,
  getClientById,
  listClients,
  updateClient,
} from "../services/clientService.js";
import { sendError, sendSuccess } from "../utils/responses.js";

const router = Router();

const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  q: z.string().optional(),
  search: z.string().optional(),
  status: z.string().default("All"),
  sort: z.string().default("value-desc"),
});

const clientInputSchema = z
  .object({
    name: z.string().min(1),
    industry: z.string().optional().default("General"),
    status: z.string().optional().default("Active"),
    value: z.coerce.number().min(0).optional().default(0),
    avatar: z.string().optional().default(""),
    email: z.string().email(),
    phone: z.string().optional().default(""),
    website: z.string().optional().default(""),
    address: z.string().optional(),
    notes: z.string().optional(),
  })
  .passthrough();

const clientPatchSchema = clientInputSchema.partial();

const messageReplySchema = z
  .object({
    body: z.string().min(1),
  })
  .passthrough();

const pageQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
});

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const normalizeClientStatus = (
  value: string | undefined,
): "Active" | "On Hold" | "Inactive" => {
  switch ((value ?? "Active").trim().toLowerCase()) {
    case "on hold":
      return "On Hold";
    case "inactive":
      return "Inactive";
    default:
      return "Active";
  }
};

const normalizeListStatus = (
  value: string | undefined,
): "All" | "Active" | "On Hold" | "Inactive" => {
  switch ((value ?? "All").trim().toLowerCase()) {
    case "active":
      return "Active";
    case "on hold":
      return "On Hold";
    case "inactive":
      return "Inactive";
    default:
      return "All";
  }
};

const normalizeListSort = (
  value: string | undefined,
): "name-asc" | "name-desc" | "value-desc" | "value-asc" => {
  switch ((value ?? "value-desc").trim().toLowerCase()) {
    case "name-asc":
    case "name":
      return "name-asc";
    case "name-desc":
    case "-name":
      return "name-desc";
    case "value-asc":
    case "value":
    case "+value":
      return "value-asc";
    default:
      return "value-desc";
  }
};

const normalizeListQuery = (value: z.infer<typeof listQuerySchema>) => ({
  page: value.page,
  pageSize: value.pageSize,
  q: value.q ?? value.search,
  status: normalizeListStatus(value.status),
  sort: normalizeListSort(value.sort),
});

const toPaged = <T>(items: T[], page: number, pageSize: number) => {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  };
};

const toPagedMeta = (page: number, pageSize: number, totalItems: number) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);

  return {
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  };
};

const toClientPayload = (client: {
  _id: { toString(): string };
  name: string;
  industry: string;
  status: "Active" | "On Hold" | "Inactive";
  value: number;
  growth: number;
  avatar: string;
  email: string;
  phone: string;
  website: string;
}) => ({
  id: client._id.toString(),
  name: client.name,
  industry: client.industry,
  status: client.status,
  value: client.value,
  growth: client.growth,
  avatar: client.avatar,
  email: client.email,
  phone: client.phone,
  website: client.website,
});

const toProjectPayload = (project: {
  _id: { toString(): string };
  clientId: { toString(): string };
  name: string;
  stage: string;
  value: number;
  updatedAt: Date;
}) => ({
  id: project._id.toString(),
  clientId: project.clientId.toString(),
  name: project.name,
  stage: project.stage,
  value: project.value,
  updatedAt: project.updatedAt.getTime(),
});

const toInvoicePayload = (invoice: {
  _id: { toString(): string };
  clientId: { toString(): string };
  code: string;
  amount: number;
  issuedAt?: Date;
  dueAt?: Date;
  status: string;
}) => ({
  id: invoice._id.toString(),
  clientId: invoice.clientId.toString(),
  code: invoice.code,
  amount: invoice.amount,
  issuedAt: invoice.issuedAt?.getTime() ?? Date.now(),
  dueAt: invoice.dueAt?.getTime() ?? Date.now(),
  status: invoice.status,
});

const toMessagePayload = (message: {
  _id: { toString(): string };
  clientId: { toString(): string };
  subject: string;
  preview?: string;
  unread: boolean;
  createdAt: Date;
}) => ({
  id: message._id.toString(),
  clientId: message.clientId.toString(),
  subject: message.subject,
  preview: message.preview ?? "",
  unread: message.unread,
  createdAt: message.createdAt.getTime(),
});

const createClientHandler = async (req: any, res: any, next: any) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const parsed = clientInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid client payload",
        parsed.error.flatten(),
      );
    }

    const client = await createClient(authUserId, {
      ...parsed.data,
      status: normalizeClientStatus(parsed.data.status),
      industry: parsed.data.industry?.trim() || "General",
      avatar: parsed.data.avatar?.trim() || "",
      phone: parsed.data.phone?.trim() || "",
      website: parsed.data.website?.trim() || "",
      email: parsed.data.email.trim(),
      name: parsed.data.name.trim(),
      value: Number.isFinite(parsed.data.value) ? parsed.data.value : 0,
    });

    await logClientActivity({
      clientId: client._id.toString(),
      actorUserId: authUserId,
      kind: "create",
      label: `Client created: ${client.name}`,
      meta: { status: client.status, value: client.value },
    });

    return sendSuccess(res, 201, toClientPayload(client), "Client created");
  } catch (error) {
    return next(error);
  }
};

const updateClientHandler = async (req: any, res: any, next: any) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const idParsed = idParamSchema.safeParse(req.params);
    if (!idParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid client id",
        idParsed.error.flatten(),
      );
    }

    const payloadParsed = clientPatchSchema.safeParse(req.body);
    if (!payloadParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid client payload",
        payloadParsed.error.flatten(),
      );
    }

    const payload = {
      ...payloadParsed.data,
      ...(typeof payloadParsed.data.name === "string"
        ? { name: payloadParsed.data.name.trim() }
        : {}),
      ...(typeof payloadParsed.data.email === "string"
        ? { email: payloadParsed.data.email.trim().toLowerCase() }
        : {}),
      ...(typeof payloadParsed.data.status === "string"
        ? { status: normalizeClientStatus(payloadParsed.data.status) }
        : {}),
      ...(typeof payloadParsed.data.industry === "string"
        ? { industry: payloadParsed.data.industry.trim() || "General" }
        : {}),
      ...(typeof payloadParsed.data.avatar === "string"
        ? { avatar: payloadParsed.data.avatar.trim() }
        : {}),
      ...(typeof payloadParsed.data.phone === "string"
        ? { phone: payloadParsed.data.phone.trim() }
        : {}),
      ...(typeof payloadParsed.data.website === "string"
        ? { website: payloadParsed.data.website.trim() }
        : {}),
    };

    const client = await updateClient(
      authUserId,
      idParsed.data.id,
      payload as Parameters<typeof updateClient>[2],
    );
    if (!client) {
      return sendError(res, 404, "NOT_FOUND", "Client not found");
    }

    await logClientActivity({
      clientId: client._id.toString(),
      actorUserId: authUserId,
      kind: "update",
      label: `Client updated: ${client.name}`,
      meta: { status: client.status, value: client.value },
    });

    return sendSuccess(res, 200, toClientPayload(client), "Client updated");
  } catch (error) {
    return next(error);
  }
};

router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const parsed = listQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid query parameters",
        parsed.error.flatten(),
      );
    }

    const query = normalizeListQuery(parsed.data);
    const result = await listClients({
      ownerUserId: authUserId,
      ...query,
    });

    const activeCount = result.items.filter(
      (item) => item.status === "Active",
    ).length;
    const totalValue = result.items.reduce((sum, item) => sum + item.value, 0);

    return sendSuccess(
      res,
      200,
      { items: result.items.map(toClientPayload) },
      undefined,
      {
        page: result.page,
        pageSize: result.pageSize,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
        hasNextPage: result.page < result.totalPages,
        hasPrevPage: result.page > 1,
        stats: {
          totalNodes: result.totalItems,
          activeCount,
          trustIndex: `${Math.min(99, 70 + activeCount)}%`,
          avgLtv: `$${Math.round(totalValue / Math.max(result.items.length, 1)).toLocaleString("en-US")}`,
          totalTrend: "+6.2%",
          activeTrend: "+2.0%",
        },
      },
    );
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const idParsed = idParamSchema.safeParse(req.params);
    if (!idParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid client id",
        idParsed.error.flatten(),
      );
    }

    const client = await getClientById(authUserId, idParsed.data.id);
    if (!client) {
      return sendError(res, 404, "NOT_FOUND", "Client not found");
    }

    return sendSuccess(res, 200, toClientPayload(client));
  } catch (error) {
    return next(error);
  }
});

router.get("/:id/projects", async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const idParsed = idParamSchema.safeParse(req.params);
    if (!idParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid client id",
        idParsed.error.flatten(),
      );
    }

    const pageParsed = pageQuerySchema.safeParse(req.query);
    if (!pageParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid pagination query",
        pageParsed.error.flatten(),
      );
    }

    const client = await getClientById(authUserId, idParsed.data.id);
    if (!client) {
      return sendError(res, 404, "NOT_FOUND", "Client not found");
    }

    const { page, pageSize } = pageParsed.data;
    const skip = (page - 1) * pageSize;
    const [projects, totalItems] = await Promise.all([
      ProjectModel.find({ clientId: client._id })
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(pageSize),
      ProjectModel.countDocuments({ clientId: client._id }),
    ]);

    return sendSuccess(
      res,
      200,
      { items: projects.map(toProjectPayload) },
      undefined,
      toPagedMeta(page, pageSize, totalItems),
    );
  } catch (error) {
    return next(error);
  }
});

router.get("/:id/invoices", async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const idParsed = idParamSchema.safeParse(req.params);
    if (!idParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid client id",
        idParsed.error.flatten(),
      );
    }

    const pageParsed = pageQuerySchema.safeParse(req.query);
    if (!pageParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid pagination query",
        pageParsed.error.flatten(),
      );
    }

    const client = await getClientById(authUserId, idParsed.data.id);
    if (!client) {
      return sendError(res, 404, "NOT_FOUND", "Client not found");
    }

    const { page, pageSize } = pageParsed.data;
    const skip = (page - 1) * pageSize;
    const [invoices, totalItems] = await Promise.all([
      InvoiceModel.find({ clientId: client._id })
        .sort({ dueAt: 1, updatedAt: -1 })
        .skip(skip)
        .limit(pageSize),
      InvoiceModel.countDocuments({ clientId: client._id }),
    ]);

    return sendSuccess(
      res,
      200,
      { items: invoices.map(toInvoicePayload) },
      undefined,
      toPagedMeta(page, pageSize, totalItems),
    );
  } catch (error) {
    return next(error);
  }
});

router.get("/:id/messages", async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const idParsed = idParamSchema.safeParse(req.params);
    if (!idParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid client id",
        idParsed.error.flatten(),
      );
    }

    const pageParsed = pageQuerySchema.safeParse(req.query);
    if (!pageParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid pagination query",
        pageParsed.error.flatten(),
      );
    }

    const client = await getClientById(authUserId, idParsed.data.id);
    if (!client) {
      return sendError(res, 404, "NOT_FOUND", "Client not found");
    }

    const { page, pageSize } = pageParsed.data;
    const skip = (page - 1) * pageSize;
    const [messages, totalItems] = await Promise.all([
      MessageModel.find({ clientId: client._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize),
      MessageModel.countDocuments({ clientId: client._id }),
    ]);

    return sendSuccess(
      res,
      200,
      { items: messages.map(toMessagePayload) },
      undefined,
      toPagedMeta(page, pageSize, totalItems),
    );
  } catch (error) {
    return next(error);
  }
});

router.get("/:id/activity", async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const idParsed = idParamSchema.safeParse(req.params);
    if (!idParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid client id",
        idParsed.error.flatten(),
      );
    }

    const pageParsed = pageQuerySchema.safeParse(req.query);
    if (!pageParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid pagination query",
        pageParsed.error.flatten(),
      );
    }

    const client = await getClientById(authUserId, idParsed.data.id);
    if (!client) {
      return sendError(res, 404, "NOT_FOUND", "Client not found");
    }

    const logs = await ActivityModel.find({
      clientId: client._id,
      actorUserId: req.authUser?.id,
    }).sort({ createdAt: -1 });

    const activity = logs.map((log) => ({
      id: log._id.toString(),
      clientId: client._id.toString(),
      kind: "status_change" as const,
      label: log.label,
      createdAt: log.createdAt.getTime(),
      meta: log.meta,
    }));

    const paged = toPaged(
      activity,
      pageParsed.data.page,
      pageParsed.data.pageSize,
    );

    return sendSuccess(res, 200, paged);
  } catch (error) {
    return next(error);
  }
});

router.post("/:id/messages/:messageId/reply", async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const idParsed = idParamSchema.safeParse(req.params);
    const messageId = objectIdSchema.safeParse(req.params.messageId);
    if (!idParsed.success || !messageId.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid message reply target",
        {
          ...(!idParsed.success ? idParsed.error.flatten() : {}),
          ...(!messageId.success ? messageId.error.flatten() : {}),
        },
      );
    }

    const payloadParsed = messageReplySchema.safeParse(req.body);
    if (!payloadParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid message reply payload",
        payloadParsed.error.flatten(),
      );
    }

    const client = await getClientById(authUserId, idParsed.data.id);
    if (!client) {
      return sendError(res, 404, "NOT_FOUND", "Client not found");
    }

    const parentMessage = await MessageModel.findOne({
      _id: messageId.data,
      clientId: client._id,
    });

    if (!parentMessage) {
      return sendError(res, 404, "NOT_FOUND", "Message thread not found");
    }

    const body = payloadParsed.data.body.trim();
    const preview = body.length > 160 ? `${body.slice(0, 157)}...` : body;
    const replyMessage = await MessageModel.create({
      clientId: client._id,
      subject: parentMessage.subject.startsWith("Re:")
        ? parentMessage.subject
        : `Re: ${parentMessage.subject}`,
      preview,
      body,
      direction: "outbound",
      unread: false,
    });

    const reply = {
      id: replyMessage._id.toString(),
      clientId: client._id.toString(),
      messageId: parentMessage._id.toString(),
      body,
      createdAt: replyMessage.createdAt.getTime(),
    };

    await logClientActivity({
      clientId: client._id.toString(),
      actorUserId: authUserId,
      kind: "update",
      label: `Reply sent for ${client.name}`,
      meta: { messageId: messageId.data, replyId: reply.id },
    });

    return sendSuccess(res, 201, reply, "Reply sent");
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  return createClientHandler(req, res, next);
});

router.put("/:id", async (req, res, next) => {
  return updateClientHandler(req, res, next);
});

router.patch("/:id", async (req, res, next) => {
  return updateClientHandler(req, res, next);
});

router.delete("/:id", async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const idParsed = idParamSchema.safeParse(req.params);
    if (!idParsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid client id",
        idParsed.error.flatten(),
      );
    }

    const client = await deleteClient(authUserId, idParsed.data.id);
    if (!client) {
      return sendError(res, 404, "NOT_FOUND", "Client not found");
    }

    await Promise.all([
      ProjectModel.deleteMany({ clientId: client._id }),
      InvoiceModel.deleteMany({ clientId: client._id }),
      MessageModel.deleteMany({ clientId: client._id }),
      ActivityModel.deleteMany({ clientId: client._id }),
    ]);

    return sendSuccess(
      res,
      200,
      { id: client._id.toString() },
      "Client permanently deleted",
    );
  } catch (error) {
    return next(error);
  }
});

export default router;
