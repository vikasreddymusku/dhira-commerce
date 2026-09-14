import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ACCOUNT_NAV, PRIMARY_NAV, liveNavItems } from "@/config/navigation";

/**
 * Foundational storefront header shell.
 *
 * Only navigation items whose routes actually exist are rendered as links.
 * Planned destinations (see src/config/navigation.ts) stay in the data
 * structure but are hidden until their pages are implemented, so the Phase 1
 * shell can never lead a visitor to a 404.
 */
export function SiteHeader() {
  const navItems = liveNavItems(PRIMARY_NAV);
  const accountItems = liveNavItems(ACCOUNT_NAV);

  return (
    <header className="border-b border-cocoa-100/60 bg-cream-50/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/dhira-logo.png.jpeg"
            alt="Dhira Industries"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="font-display text-lg tracking-wide text-cocoa-800">
            Dhira Industries
          </span>
        </Link>

        {navItems.length > 0 && (
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium tracking-wide text-cocoa-700 transition-colors hover:text-cocoa-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {accountItems.length > 0 && (
          <div className="flex items-center gap-4 text-sm font-medium text-cocoa-700">
            {accountItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-cocoa-900">
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
