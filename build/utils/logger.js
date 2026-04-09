import pino from "pino";
import { env } from "../config/environment.js";
export const logger = pino({
    level: env.LOG_LEVEL,
    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "res.headers['set-cookie']",
        ],
        remove: true,
    },
});
