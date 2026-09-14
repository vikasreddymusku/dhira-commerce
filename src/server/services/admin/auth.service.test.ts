// @vitest-environment node
import "dotenv/config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { authenticateAdmin } from "./auth.service";
import { verifyAdminSessionToken } from "@/lib/auth/session";

/**
 * Integration coverage for the admin login path.
 *
 * Requires the local development database (docker compose up -d) and the
 * seeded development admin (npm run db:seed, using DEV_ADMIN_* from .env).
 * Skips itself when either is unavailable so the unit suite stays green in
 * environments without a database.
 */
const email = process.env.DEV_ADMIN_EMAIL?.trim();
const password = process.env.DEV_ADMIN_PASSWORD;

let databaseAvailable = false;

beforeAll(async () => {
  try {
    await db.$queryRaw`SELECT 1`;
    databaseAvailable = true;
  } catch {
    databaseAvailable = false;
  }
});

afterAll(async () => {
  await db.$disconnect();
});

describe("authenticateAdmin", () => {
  it("rejects an unknown email with a safe error", async () => {
    if (!databaseAvailable) {
      console.warn("Skipping: development database unavailable.");
      return;
    }

    const result = await authenticateAdmin("nobody@dhira.invalid", "whatever-password");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Invalid credentials");
    }
  });

  it("rejects a valid email with a wrong password", async () => {
    if (!databaseAvailable || !email) {
      console.warn("Skipping: development database or DEV_ADMIN_EMAIL unavailable.");
      return;
    }

    const result = await authenticateAdmin(email, "definitely-not-the-password");
    expect(result.ok).toBe(false);
  });

  it("issues a verifiable admin session token for seeded credentials", async () => {
    if (!databaseAvailable || !email || !password) {
      console.warn("Skipping: development database or DEV_ADMIN_* credentials unavailable.");
      return;
    }

    const result = await authenticateAdmin(email, password);
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const session = await verifyAdminSessionToken(result.token);
    expect(session).not.toBeNull();
    expect(session?.email).toBe(email);
    expect(session?.role).toBe("SUPER_ADMIN");
  });
});