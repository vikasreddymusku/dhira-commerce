// @vitest-environment node
import "dotenv/config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { POST } from "./route";
import { ADMIN_SESSION_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/auth/session";

/**
 * Route-level coverage for POST /api/admin/auth/login.
 *
 * Skips itself when the development database or seeded DEV_ADMIN_* account
 * are unavailable, so CI without a database stays green.
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

function loginRequest(body: unknown) {
  return new Request("http://localhost:3000/api/admin/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/admin/auth/login", () => {
  it("returns 400 for a malformed payload", async () => {
    const response = await POST(loginRequest({ email: "not-an-email" }));
    expect(response.status).toBe(400);
  });

  it("returns a safe 401 for invalid credentials", async () => {
    if (!databaseAvailable || !email) {
      console.warn("Skipping: development database or DEV_ADMIN_EMAIL unavailable.");
      return;
    }

    const response = await POST(loginRequest({ email, password: "wrong-password" }));
    const payload = (await response.json()) as { error: string };

    expect(response.status).toBe(401);
    expect(payload.error).toBe("Invalid credentials");
    expect(response.headers.get("set-cookie")).toBeNull();
  });

  it("sets a secure httpOnly session cookie for valid credentials", async () => {
    if (!databaseAvailable || !email || !password) {
      console.warn("Skipping: development database or DEV_ADMIN_* credentials unavailable.");
      return;
    }

    const response = await POST(loginRequest({ email, password }));
    expect(response.status).toBe(200);

    const setCookie = response.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain(`${ADMIN_SESSION_COOKIE_NAME}=`);
    expect(setCookie.toLowerCase()).toContain("httponly");
    expect(setCookie.toLowerCase()).toContain("samesite=lax");

    const token = response.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
    expect(token).toBeTruthy();
    expect(await verifyAdminSessionToken(token as string)).not.toBeNull();
  });
});