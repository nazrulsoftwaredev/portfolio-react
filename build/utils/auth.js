import jwt from "jsonwebtoken";
import { env } from "../config/environment.js";
const baseCookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
};
export const signAccessToken = (payload) => {
    const options = {
        expiresIn: env.JWT_ACCESS_TTL,
    };
    return jwt.sign({ ...payload, type: "access" }, env.JWT_ACCESS_SECRET, options);
};
export const signRefreshToken = (payload) => {
    const options = {
        expiresIn: env.JWT_REFRESH_TTL,
    };
    return jwt.sign({ ...payload, type: "refresh" }, env.JWT_REFRESH_SECRET, options);
};
export const verifyAccessToken = (token) => jwt.verify(token, env.JWT_ACCESS_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, env.JWT_REFRESH_SECRET);
export const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie(env.AUTH_COOKIE_NAME, accessToken, baseCookieOptions);
    res.cookie(env.REFRESH_COOKIE_NAME, refreshToken, baseCookieOptions);
};
export const clearAuthCookies = (res) => {
    res.clearCookie(env.AUTH_COOKIE_NAME, baseCookieOptions);
    res.clearCookie(env.REFRESH_COOKIE_NAME, baseCookieOptions);
};
