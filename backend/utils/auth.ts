import jwt, { type SignOptions } from "jsonwebtoken";
import type { Response } from "express";
import { env } from "../config/environment.js";

type AuthTokenPayload = {
  sub: string;
  role: "admin";
  email: string;
  type: "access" | "refresh";
};

const baseCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const signAccessToken = (payload: Omit<AuthTokenPayload, "type">) => {
  const options: SignOptions = {
    expiresIn: env.JWT_ACCESS_TTL as SignOptions["expiresIn"],
  };
  return jwt.sign(
    { ...payload, type: "access" },
    env.JWT_ACCESS_SECRET,
    options,
  );
};

export const signRefreshToken = (payload: Omit<AuthTokenPayload, "type">) => {
  const options: SignOptions = {
    expiresIn: env.JWT_REFRESH_TTL as SignOptions["expiresIn"],
  };
  return jwt.sign(
    { ...payload, type: "refresh" },
    env.JWT_REFRESH_SECRET,
    options,
  );
};

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthTokenPayload;

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.JWT_REFRESH_SECRET) as AuthTokenPayload;

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie(env.AUTH_COOKIE_NAME, accessToken, baseCookieOptions);
  res.cookie(env.REFRESH_COOKIE_NAME, refreshToken, baseCookieOptions);
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie(env.AUTH_COOKIE_NAME, baseCookieOptions);
  res.clearCookie(env.REFRESH_COOKIE_NAME, baseCookieOptions);
};
