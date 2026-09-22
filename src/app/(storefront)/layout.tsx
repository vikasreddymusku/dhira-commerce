import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnnouncementBar } from "@/components/storefront/announcement-bar";
import { db } from "@/server/db";

export const revalidate = 60;

/**
 * Storefront route-group layout. Wraps every public-facing page with the
 * shared announcement bar / header / footer shell.
 */
export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcement = await db.siteSetting.findUnique({ where: { key: "announcement_bar" } });
  const announcementValue = announcement?.value as { text?: string } | string | null;
  const announcementText =
    typeof announcementValue === "string" ? announcementValue : announcementValue?.text ?? null;

  return (
    <div className="flex min-h-screen flex-col bg-cream-50 text-cocoa-800">
      <AnnouncementBar text={announcementText} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
