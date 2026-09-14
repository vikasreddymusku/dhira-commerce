import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // Test-only values. These are never real secrets; real values live in
    // the gitignored `.env`. Prisma-dependent tests skip themselves when the
    // local development database is unavailable.
    env: {
      NODE_ENV: "test",
      DATABASE_URL:
        process.env.DATABASE_URL ??
        "postgresql://dhira:dhira_dev_password@localhost:5432/dhira_commerce?schema=public",
      ADMIN_SESSION_SECRET: "test-only-admin-session-secret-value",
      ADMIN_SESSION_COOKIE_NAME: "dhira_admin_session",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
