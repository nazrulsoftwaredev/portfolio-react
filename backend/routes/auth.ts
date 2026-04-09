import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { env } from "../config/environment.js";
import { requireAuth } from "../middleware/auth.js";
import { UserModel } from "../models/User.js";
import {
  ensureBootstrapAdmin,
  markLoginSuccess,
  validateAdminCredentials,
} from "../services/authService.js";
import {
  clearAuthCookies,
  setAuthCookies,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/auth.js";
import { sendError, sendSuccess } from "../utils/responses.js";

const router = Router();

type SecuritySettings = {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeoutMinutes: number;
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const profileSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
});

const securitySchema = z
  .object({
    twoFactorEnabled: z.coerce.boolean().optional(),
    two_factor_enabled: z.coerce.boolean().optional(),
    loginNotifications: z.coerce.boolean().optional(),
    login_notifications: z.coerce.boolean().optional(),
    sessionTimeoutMinutes: z.coerce.number().int().positive().optional(),
    session_timeout_minutes: z.coerce.number().int().positive().optional(),
  })
  .partial();

const defaultSecuritySettings: SecuritySettings = {
  twoFactorEnabled: false,
  loginNotifications: true,
  sessionTimeoutMinutes: 60,
};

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

const toSecurityPayload = (settings: SecuritySettings) => ({
  twoFactorEnabled: settings.twoFactorEnabled,
  two_factor_enabled: settings.twoFactorEnabled,
  loginNotifications: settings.loginNotifications,
  login_notifications: settings.loginNotifications,
  sessionTimeoutMinutes: settings.sessionTimeoutMinutes,
  session_timeout_minutes: settings.sessionTimeoutMinutes,
});

const resolveLoginCredentials = (req: {
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}) => {
  const body =
    req.body && typeof req.body === "object"
      ? (req.body as Record<string, unknown>)
      : {};
  const basicAuth = parseBasicAuth(
    Array.isArray(req.headers.authorization)
      ? req.headers.authorization[0]
      : req.headers.authorization,
  );

  return {
    email:
      typeof body.email === "string" ? body.email : (basicAuth?.email ?? ""),
    password:
      typeof body.password === "string"
        ? body.password
        : (basicAuth?.password ?? ""),
  };
};

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    error: {
      code: "RATE_LIMITED",
      message: "Too many attempts. Please try again later.",
    },
  },
});

const toSafeUser = (user: {
  _id: { toString(): string };
  email: string;
  name: string;
  role: "admin";
}) => ({
  id: user._id.toString(),
  email: user.email,
  name: user.name,
  role: user.role,
});

router.post("/login", authLimiter, async (req, res, next) => {
  try {
    await ensureBootstrapAdmin();

    const parsed = loginSchema.safeParse(resolveLoginCredentials(req));
    if (!parsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid login payload",
        parsed.error.flatten(),
      );
    }

    const user = await validateAdminCredentials(
      parsed.data.email,
      parsed.data.password,
    );

    if (!user) {
      return sendError(
        res,
        401,
        "INVALID_CREDENTIALS",
        "Invalid email or password",
      );
    }

    const tokenPayload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);
    setAuthCookies(res, accessToken, refreshToken);

    await markLoginSuccess(user._id.toString());

    return sendSuccess(
      res,
      200,
      {
        token: "cookie-session",
        user: toSafeUser(user),
        expiresAt: Date.now() + 15 * 60 * 1000,
      },
      "Login successful",
    );
  } catch (error) {
    return next(error);
  }
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies?.[env.REFRESH_COOKIE_NAME] as
    | string
    | undefined;

  if (!refreshToken) {
    return sendError(res, 401, "UNAUTHORIZED", "Refresh token missing");
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    if (payload.type !== "refresh") {
      return sendError(res, 401, "UNAUTHORIZED", "Invalid refresh token");
    }

    const accessToken = signAccessToken({
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    });

    const newRefreshToken = signRefreshToken({
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    });

    setAuthCookies(res, accessToken, newRefreshToken);

    return sendSuccess(res, 200, {
      token: "cookie-session",
      expiresAt: Date.now() + 15 * 60 * 1000,
    });
  } catch {
    return sendError(
      res,
      401,
      "UNAUTHORIZED",
      "Invalid or expired refresh session",
    );
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;

    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const user = await UserModel.findById(authUserId);
    if (!user || !user.isActive) {
      return sendError(res, 401, "UNAUTHORIZED", "Session is not valid");
    }

    return sendSuccess(res, 200, toSafeUser(user));
  } catch (error) {
    return next(error);
  }
});

router.get("/profile", requireAuth, async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;

    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const user = await UserModel.findById(authUserId);
    if (!user || !user.isActive) {
      return sendError(res, 401, "UNAUTHORIZED", "Session is not valid");
    }

    return sendSuccess(res, 200, toSafeUser(user));
  } catch (error) {
    return next(error);
  }
});

const updateProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authUserId = req.authUser?.id;

    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const parsed = profileSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid profile payload",
        parsed.error.flatten(),
      );
    }

    const user = await UserModel.findById(authUserId);
    if (!user || !user.isActive) {
      return sendError(res, 401, "UNAUTHORIZED", "Session is not valid");
    }

    if (parsed.data.email) {
      const emailInUse = await UserModel.findOne({
        email: parsed.data.email.toLowerCase(),
        _id: { $ne: authUserId },
      });

      if (emailInUse) {
        return sendError(
          res,
          409,
          "CONFLICT",
          "Email address is already in use",
        );
      }

      user.email = parsed.data.email.toLowerCase();
    }

    if (parsed.data.name) {
      user.name = parsed.data.name.trim();
    }

    await user.save();

    return sendSuccess(res, 200, toSafeUser(user), "Profile updated");
  } catch (error) {
    return next(error);
  }
};

router.put("/profile", requireAuth, updateProfileHandler);
router.patch("/profile", requireAuth, updateProfileHandler);

router.get("/security", requireAuth, async (req, res, next) => {
  try {
    const authUserId = req.authUser?.id;

    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const user = await UserModel.findById(authUserId);
    if (!user || !user.isActive) {
      return sendError(res, 401, "UNAUTHORIZED", "Session is not valid");
    }

    return sendSuccess(
      res,
      200,
      toSecurityPayload({
        twoFactorEnabled:
          typeof user.twoFactorEnabled === "boolean"
            ? user.twoFactorEnabled
            : defaultSecuritySettings.twoFactorEnabled,
        loginNotifications:
          typeof user.loginNotifications === "boolean"
            ? user.loginNotifications
            : defaultSecuritySettings.loginNotifications,
        sessionTimeoutMinutes:
          typeof user.sessionTimeoutMinutes === "number"
            ? user.sessionTimeoutMinutes
            : defaultSecuritySettings.sessionTimeoutMinutes,
      }),
    );
  } catch (error) {
    return next(error);
  }
});

const updateSecurityHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authUserId = req.authUser?.id;

    if (!authUserId) {
      return sendError(res, 401, "UNAUTHORIZED", "Authentication required");
    }

    const parsed = securitySchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid security payload",
        parsed.error.flatten(),
      );
    }

    const user = await UserModel.findById(authUserId);
    if (!user || !user.isActive) {
      return sendError(res, 401, "UNAUTHORIZED", "Session is not valid");
    }

    const current: SecuritySettings = {
      twoFactorEnabled:
        typeof user.twoFactorEnabled === "boolean"
          ? user.twoFactorEnabled
          : defaultSecuritySettings.twoFactorEnabled,
      loginNotifications:
        typeof user.loginNotifications === "boolean"
          ? user.loginNotifications
          : defaultSecuritySettings.loginNotifications,
      sessionTimeoutMinutes:
        typeof user.sessionTimeoutMinutes === "number"
          ? user.sessionTimeoutMinutes
          : defaultSecuritySettings.sessionTimeoutMinutes,
    };

    const nextSettings: SecuritySettings = {
      twoFactorEnabled:
        parsed.data.twoFactorEnabled ??
        parsed.data.two_factor_enabled ??
        current.twoFactorEnabled,
      loginNotifications:
        parsed.data.loginNotifications ??
        parsed.data.login_notifications ??
        current.loginNotifications,
      sessionTimeoutMinutes:
        parsed.data.sessionTimeoutMinutes ??
        parsed.data.session_timeout_minutes ??
        current.sessionTimeoutMinutes,
    };

    user.twoFactorEnabled = nextSettings.twoFactorEnabled;
    user.loginNotifications = nextSettings.loginNotifications;
    user.sessionTimeoutMinutes = nextSettings.sessionTimeoutMinutes;
    await user.save();

    return sendSuccess(
      res,
      200,
      toSecurityPayload(nextSettings),
      "Security settings updated",
    );
  } catch (error) {
    return next(error);
  }
};

router.put("/security", requireAuth, updateSecurityHandler);
router.patch("/security", requireAuth, updateSecurityHandler);

router.post("/logout", (_req, res) => {
  clearAuthCookies(res);
  return sendSuccess(res, 200, { ok: true }, "Logout successful");
});

export default router;
