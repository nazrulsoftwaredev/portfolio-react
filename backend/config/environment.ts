import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  MONGODB_DB_NAME: z.string().min(1).default("portfolio_react"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
  JWT_ACCESS_TTL: z.string().default("15m"),
  JWT_REFRESH_TTL: z.string().default("7d"),
  AUTH_COOKIE_NAME: z.string().default("pr_access"),
  REFRESH_COOKIE_NAME: z.string().default("pr_refresh"),
  BCRYPT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),
  ADMIN_EMAIL: z.string().email().default("admin@mdnazrul.com"),
  ADMIN_PASSWORD: z.string().min(8).default("admin12345"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "Invalid environment variables",
    parsed.error.flatten().fieldErrors,
  );
  process.exit(1);
}

if (
  parsed.data.NODE_ENV === "production" &&
  parsed.data.ADMIN_EMAIL.toLowerCase() === "admin@mdnazrul.com" &&
  parsed.data.ADMIN_PASSWORD === "admin12345"
) {
  console.error(
    "Unsafe production configuration: replace default ADMIN_EMAIL and ADMIN_PASSWORD.",
  );
  process.exit(1);
}

export const env = parsed.data;
