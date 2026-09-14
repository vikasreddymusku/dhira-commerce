import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Centralised, validated environment configuration.
 *
 * Import `env` anywhere in the app instead of reading `process.env`
 * directly. This guarantees required variables exist and are the
 * correct shape at build/boot time, and keeps secrets out of
 * client bundles (only NEXT_PUBLIC_* variables are exposed to the browser).
 */
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url().optional(),
    ADMIN_SESSION_SECRET: z.string().min(16),
    ADMIN_SESSION_COOKIE_NAME: z.string().default("dhira_admin_session"),

    // Development-only admin bootstrap (consumed by prisma/seed.ts).
    DEV_ADMIN_NAME: z.string().optional(),
    DEV_ADMIN_EMAIL: z.string().email().optional(),
    DEV_ADMIN_PASSWORD: z.string().min(8).optional(),

    CASHFREE_APP_ID: z.string().optional(),
    CASHFREE_SECRET_KEY: z.string().optional(),
    CASHFREE_ENV: z.enum(["TEST", "PROD"]).default("TEST"),
    CASHFREE_WEBHOOK_SECRET: z.string().optional(),

    SHIPROCKET_EMAIL: z.string().optional(),
    SHIPROCKET_PASSWORD: z.string().optional(),
    SHIPROCKET_API_BASE_URL: z.string().url().optional(),

    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.coerce.number().int().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    SMTP_FROM_EMAIL: z.string().email().optional(),

    STORAGE_BUCKET_NAME: z.string().optional(),
    STORAGE_ACCESS_KEY_ID: z.string().optional(),
    STORAGE_SECRET_ACCESS_KEY: z.string().optional(),
    STORAGE_REGION: z.string().optional(),
    STORAGE_ENDPOINT: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_SITE_NAME: z.string().default("Dhira Industries"),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
    ADMIN_SESSION_COOKIE_NAME: process.env.ADMIN_SESSION_COOKIE_NAME,
    DEV_ADMIN_NAME: process.env.DEV_ADMIN_NAME,
    DEV_ADMIN_EMAIL: process.env.DEV_ADMIN_EMAIL,
    DEV_ADMIN_PASSWORD: process.env.DEV_ADMIN_PASSWORD,
    CASHFREE_APP_ID: process.env.CASHFREE_APP_ID,
    CASHFREE_SECRET_KEY: process.env.CASHFREE_SECRET_KEY,
    CASHFREE_ENV: process.env.CASHFREE_ENV,
    CASHFREE_WEBHOOK_SECRET: process.env.CASHFREE_WEBHOOK_SECRET,
    SHIPROCKET_EMAIL: process.env.SHIPROCKET_EMAIL,
    SHIPROCKET_PASSWORD: process.env.SHIPROCKET_PASSWORD,
    SHIPROCKET_API_BASE_URL: process.env.SHIPROCKET_API_BASE_URL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
    STORAGE_BUCKET_NAME: process.env.STORAGE_BUCKET_NAME,
    STORAGE_ACCESS_KEY_ID: process.env.STORAGE_ACCESS_KEY_ID,
    STORAGE_SECRET_ACCESS_KEY: process.env.STORAGE_SECRET_ACCESS_KEY,
    STORAGE_REGION: process.env.STORAGE_REGION,
    STORAGE_ENDPOINT: process.env.STORAGE_ENDPOINT,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },
  emptyStringAsUndefined: true,
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
