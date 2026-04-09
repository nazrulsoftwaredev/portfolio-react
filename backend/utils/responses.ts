import type { Response } from "express";

type SuccessPayload<T> = {
  status: "success";
  data: T;
  message?: string;
  meta?: Record<string, unknown>;
};

type ErrorPayload = {
  status: "error";
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message?: string,
  meta?: Record<string, unknown>,
) => {
  const payload: SuccessPayload<T> = {
    status: "success",
    data,
    ...(message ? { message } : {}),
    ...(meta ? { meta } : {}),
  };

  return res.status(statusCode).json(payload);
};

export const sendError = (
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  details?: unknown,
) => {
  const payload: ErrorPayload = {
    status: "error",
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };

  return res.status(statusCode).json(payload);
};
