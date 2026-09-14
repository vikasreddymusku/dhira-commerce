import { Card } from "@/components/ui/card";

/**
 * Admin dashboard placeholder. Phase 1 establishes only the protected
 * shell/navigation architecture - dashboard widgets and admin CRUD screens
 * are built in later phases.
 */
export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-cocoa-900">Dashboard</h1>
      <p className="mt-1 text-sm text-cocoa-600">
        Welcome to the Dhira admin console foundation.
      </p>

      <Card className="mt-6">
        <p className="text-sm text-cocoa-600">
          Admin functionality (products, orders, content, settings) will be
          implemented in upcoming phases. This shell establishes the
          protected layout, navigation structure, and the
          Admin &rarr; API/service layer &rarr; PostgreSQL &rarr; Storefront
          data pathway used going forward.
        </p>
      </Card>
    </div>
  );
}
