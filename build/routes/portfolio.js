import { Router } from "express";
import { z } from "zod";
import { sendError, sendSuccess } from "../utils/responses.js";
import { createInquiry, getPublishedPortfolioProjects, getTestimonials, } from "../services/portfolioService.js";
const router = Router();
const startProjectSchema = z
    .object({
    name: z.string().min(1),
    email: z.string().email(),
    projectDetails: z.string().min(1).optional(),
    message: z.string().min(1).optional(),
    company: z.string().optional().default(""),
    budget: z.string().min(1),
    timeline: z.string().min(1),
})
    .refine((value) => Boolean(value.projectDetails || value.message), {
    message: "Project details are required",
    path: ["projectDetails"],
});
const contactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    message: z.string().min(5),
});
router.post("/contact", async (req, res) => {
    try {
        const parsed = contactSchema.safeParse(req.body);
        if (!parsed.success) {
            return sendError(res, 400, "VALIDATION_ERROR", "Invalid contact form payload", parsed.error.flatten());
        }
        const inquiry = await createInquiry({
            name: parsed.data.name,
            email: parsed.data.email,
            message: parsed.data.message,
            source: "Contact Form",
        });
        return sendSuccess(res, 201, { id: inquiry._id }, "Contact message received");
    }
    catch (error) {
        return sendError(res, 500, "INTERNAL_ERROR", "Failed to submit contact message");
    }
});
router.post("/start-project", async (req, res) => {
    try {
        const parsed = startProjectSchema.safeParse(req.body);
        if (!parsed.success) {
            return sendError(res, 400, "VALIDATION_ERROR", "Invalid start project payload", parsed.error.flatten());
        }
        const inquiry = await createInquiry({
            name: parsed.data.name,
            email: parsed.data.email,
            message: parsed.data.projectDetails ?? parsed.data.message ?? "",
            budgetRange: parsed.data.budget,
            timelinePreference: parsed.data.timeline,
            source: "Start Project Form",
        });
        return sendSuccess(res, 201, { id: inquiry._id }, "Project submission received");
    }
    catch (error) {
        return sendError(res, 500, "INTERNAL_ERROR", "Failed to submit project inquiry");
    }
});
router.get("/projects", async (_req, res) => {
    try {
        const projects = await getPublishedPortfolioProjects();
        return sendSuccess(res, 200, projects, "Portfolio projects retrieved");
    }
    catch (err) {
        return sendError(res, 500, "INTERNAL_ERROR", "Failed to retrieve portfolio projects");
    }
});
router.get("/testimonials", async (_req, res) => {
    try {
        const testimonials = await getTestimonials();
        return sendSuccess(res, 200, testimonials, "Testimonials retrieved");
    }
    catch (err) {
        return sendError(res, 500, "INTERNAL_ERROR", "Failed to retrieve testimonials");
    }
});
export default router;
