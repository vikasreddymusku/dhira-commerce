import { SignJWT, jwtVerify } from "jose";

/**
 * Admin session token helpers (JWT, HS256).
 *
 * Kept edge-runtime compatible (uses `jose`, not `jsonwebtoken`) so the same
 * verification logic can run inside `middleware.ts` to gate /admin routes.
 */

export type AdminSessionPayload = {
  adminId: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
};

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export async function createAdminSessionToken(payload: AdminSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifyAdminSessionToken(
  token: string,
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      typeof payload.adminId === "string" &&
      typeof payload.email === "string" &&
      typeof payload.role === "string"
    ) {
      return payload as unknown as AdminSessionPayload;
    }
    return null;
  } catch {
    return null;
  }
}

export const ADMIN_SESSION_COOKIE_NAME =
  process.env.ADMIN_SESSION_COOKIE_NAME || "dhira_admin_session";

export const ADMIN_SESSION_MAX_AGE = SESSION_TTL_SECONDS;
