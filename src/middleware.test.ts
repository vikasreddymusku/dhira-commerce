// @vitest-environment node
import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";
import { createAdminSessionToken, ADMIN_SESSION_COOKIE_NAME } from "@/lib/auth/session";

/**
 * Verifies the /admin access boundary: unauthenticated requests are sent to
 * the login page (with a return path), authenticated requests pass through,
 * and the login route itself stays reachable.
 */
function requestTo(path: string, token?: string) {
  const request = new NextRequest(new URL(`http://localhost:3000${path}`));
  if (token) {
    request.cookies.set(ADMIN_SESSION_COOKIE_NAME, token);
  }
  return request;
}

describe("admin middleware", () => {
  it("redirects an unauthenticated /admin request to the login page", async () => {
    const response = await middleware(requestTo("/admin"));

    expect(response.status).toBe(307);
    const location = new URL(response.headers.get("location") as string);
    expect(location.pathname).toBe("/admin/login");
    expect(location.searchParams.get("from")).toBe("/admin");
  });

  it("allows /admin through with a valid session cookie", async () => {
    const token = await createAdminSessionToken({
      adminId: "test-admin",
      email: "test@dhira.local",
      role: "ADMIN",
    });

    const response = await middleware(requestTo("/admin", token));
    expect(response.headers.get("location")).toBeNull();
  });

  it("allows the login route without a session", async () => {
    const response = await middleware(requestTo("/admin/login"));
    expect(response.headers.get("location")).toBeNull();
  });

  it("rejects a tampered session cookie", async () => {
    const response = await middleware(requestTo("/admin", "not-a-real-jwt"));
    expect(response.status).toBe(307);
  });
});