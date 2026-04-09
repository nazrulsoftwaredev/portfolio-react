import type { NextFunction, Request, Response } from "express";
import { env } from "../config/environment.js";
import { sendError } from "../utils/responses.js";

type ApiError = Error & {
  statusCode?: number;
  code?: string;
  details?: unknown;
};

export const notFoundHandler = (req: Request, res: Response) => {
  return sendError(
    res,
    404,
    "NOT_FOUND",
    `Route not found: ${req.method} ${req.originalUrl}`,
  );
};

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode ?? 500;
  const code = err.code ?? "INTERNAL_SERVER_ERROR";

  return sendError(
    res,
    statusCode,
    code,
    statusCode >= 500 && env.NODE_ENV === "production"
      ? "Something went wrong"
      : err.message,
    statusCode >= 500 && env.NODE_ENV === "production"
      ? undefined
      : err.details,
  );
};
