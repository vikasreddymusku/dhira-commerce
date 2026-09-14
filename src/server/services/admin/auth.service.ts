import bcrypt from "bcryptjs";
import { db } from "@/server/db";
import { createAdminSessionToken } from "@/lib/auth/session";

/**
 * Admin authentication service.
 *
 * This is the ONLY place that should query AdminUser records for login
 * purposes. Route handlers call into this service; they must never talk to
 * Prisma directly for admin-auth concerns. This keeps the
 * ADMIN -> service layer -> PostgreSQL data rule enforceable.
 */
export async function authenticateAdmin(email: string, password: string) {
  const admin = await db.adminUser.findUnique({ where: { email } });

  if (!admin || !admin.isActive) {
    return { ok: false as const, error: "Invalid credentials" };
  }

  const passwordMatches = await bcrypt.compare(password, admin.passwordHash);
  if (!passwordMatches) {
    return { ok: false as const, error: "Invalid credentials" };
  }

  await db.adminUser.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  });

  const token = await createAdminSessionToken({
    adminId: admin.id,
    email: admin.email,
    role: admin.role,
  });

  return { ok: true as const, token };
}
