import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;

    const payload = {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Number(durationMs.toFixed(2)),
      requestId: req.headers["x-request-id"],
    };

    if (res.statusCode >= 500) {
      logger.error(payload, "HTTP request completed");
      return;
    }

    if (res.statusCode >= 400) {
      logger.warn(payload, "HTTP request completed");
      return;
    }

    logger.info(payload, "HTTP request completed");
  });

  next();
};
