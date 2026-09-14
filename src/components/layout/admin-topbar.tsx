"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 * Foundational admin top navigation shell. Displays only structural
 * elements (title area + sign-out) in Phase 1.
 */
export function AdminTopbar() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-cocoa-100 bg-cream-50 px-6">
      <p className="text-sm font-medium text-cocoa-700">Admin Console</p>
      <Button variant="outline" size="sm" onClick={handleSignOut}>
        Sign Out
      </Button>
    </header>
  );
}
