import { Router } from "express";
import { isDatabaseReady } from "../config/database.js";
import { sendError, sendSuccess } from "../utils/responses.js";

const router = Router();

router.get("/health", (_req, res) => {
  return sendSuccess(res, 200, {
    service: "portfolio-react-api",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

router.get("/readiness", (_req, res) => {
  const databaseReady = isDatabaseReady();

  if (!databaseReady) {
    return sendError(
      res,
      503,
      "SERVICE_UNAVAILABLE",
      "Database is not connected",
      {
        databaseReady,
      },
    );
  }

  return sendSuccess(res, 200, {
    service: "portfolio-react-api",
    status: "ready",
    checks: {
      databaseReady,
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
