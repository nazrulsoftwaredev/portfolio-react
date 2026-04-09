import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { sendError, sendSuccess } from "../utils/responses.js";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../services/projectService.js";

const router = Router();

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const idParamSchema = z.object({
  id: objectIdSchema,
});

const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  clientId: objectIdSchema.optional(),
  stage: z.string().optional(), // Lead, Active, Completed, Archived
});

const projectInputSchema = z.object({
  clientId: objectIdSchema,
  name: z.string().min(1),
  description: z.string().optional(),
  stage: z
    .enum(["Lead", "Active", "Completed", "Archived"])
    .optional()
    .default("Lead"),
  value: z.coerce.number().min(0).optional().default(0),
  startDate: z.coerce.date().optional(),
  targetDate: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional(),
});

const projectPatchSchema = projectInputSchema.partial();

router.use(requireAuth);

router.get("/", async (req, res) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const listQuery = listQuerySchema.parse(req.query);
    const { page, pageSize, clientId, stage } = listQuery;

    const query: any = {};
    if (clientId) query.clientId = clientId;
    if (stage) query.stage = stage;
    query.createdBy = authUserId;

    const skip = (page - 1) * pageSize;
    const { projects, total } = await getProjects(query, pageSize, skip);

    return sendSuccess(res, 200, projects, "Projects retrieved successfully", {
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
    return sendError(res, 500, "INTERNAL_ERROR", "Failed to get projects");
  }
});

router.post("/", async (req, res) => {
  try {
    const authUserId = req.authUser?.id;
    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const data = projectInputSchema.parse(req.body);
    const project = await createProject({
      ...data,
      createdBy: authUserId,
    } as any);
    return sendSuccess(res, 201, project, "Project created successfully");
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
    return sendError(res, 500, "INTERNAL_ERROR", "Failed to create project");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const project = await getProjectById(id);
    if (!project) return sendError(res, 404, "NOT_FOUND", "Project not found");
    return sendSuccess(res, 200, project, "Project retrieved successfully");
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid project ID",
        error.issues,
      );
    }
    return sendError(res, 500, "INTERNAL_ERROR", "Failed to get project");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const data = projectPatchSchema.parse(req.body);
    const project = await updateProject(id, data as any);
    if (!project) return sendError(res, 404, "NOT_FOUND", "Project not found");
    return sendSuccess(res, 200, project, "Project updated successfully");
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
    return sendError(res, 500, "INTERNAL_ERROR", "Failed to update project");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const project = await deleteProject(id);
    if (!project) return sendError(res, 404, "NOT_FOUND", "Project not found");
    return sendSuccess(
      res,
      200,
      project,
      "Project deleted (archived) successfully",
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid project ID",
        error.issues,
      );
    }
    return sendError(res, 500, "INTERNAL_ERROR", "Failed to delete project");
  }
});

export default router;
