import { PrismaClient } from "@prisma/client";

/**
 * Single, process-wide Prisma client instance.
 *
 * This is the ONLY sanctioned way for server-side code (Admin API routes,
 * storefront data-fetching, and background jobs) to talk to PostgreSQL.
 * Never instantiate PrismaClient elsewhere - it must flow through here so
 * that the ADMIN -> service layer -> PostgreSQL -> STOREFRONT data path
 * stays enforceable and observable.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
