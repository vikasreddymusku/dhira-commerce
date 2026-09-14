import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Storefront route-group layout. Wraps every public-facing page with the
 * shared header/footer shell. Homepage content itself is intentionally
 * minimal in Phase 1 - see src/app/(storefront)/page.tsx.
 */
export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-cream-50 text-cocoa-800">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
