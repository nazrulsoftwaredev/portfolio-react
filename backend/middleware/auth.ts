import type { NextFunction, Request, Response } from "express";
import { env } from "../config/environment.js";
import { validateAdminCredentials } from "../services/authService.js";
import { verifyAccessToken } from "../utils/auth.js";
import { sendError } from "../utils/responses.js";

const parseBasicAuth = (authorizationHeader?: string) => {
  if (!authorizationHeader?.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = Buffer.from(
      authorizationHeader.slice("Basic ".length),
      "base64",
    ).toString("utf8");
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) {
      return null;
    }

    const email = decoded.slice(0, separatorIndex).trim();
    const password = decoded.slice(separatorIndex + 1);

    if (!email || !password) {
      return null;
    }

    return { email, password };
  } catch {
    return null;
  }
};

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies?.[env.AUTH_COOKIE_NAME] as string | undefined;

  if (!accessToken) {
    const basicAuth = parseBasicAuth(req.headers.authorization);

    if (basicAuth) {
      const user = await validateAdminCredentials(
        basicAuth.email,
        basicAuth.password,
      );

      if (user) {
        req.authUser = {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };

        return next();
      }
    }

    return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
  }

  try {
    const payload = verifyAccessToken(accessToken);

    if (payload.type !== "access") {
      return sendError(res, 401, "UNAUTHORIZED", "Invalid access token");
    }

    req.authUser = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    return next();
  } catch {
    const basicAuth = parseBasicAuth(req.headers.authorization);

    if (basicAuth) {
      const user = await validateAdminCredentials(
        basicAuth.email,
        basicAuth.password,
      );

      if (user) {
        req.authUser = {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };

        return next();
      }
    }

    return sendError(res, 401, "UNAUTHORIZED", "Invalid or expired session");
  }
};
