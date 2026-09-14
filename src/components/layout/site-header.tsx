import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PRIMARY_NAV, UTILITY_NAV, filterRenderedNav } from "@/config/navigation";

/**
 * Foundational storefront header shell (Phase 1).
 *
 * Navigation items are defined in `src/config/navigation.ts`. Only items
 * whose destination page exists today are rendered as links; destinations
 * scheduled for later phases are preserved in that registry but are NOT
 * rendered here, so no visible control can land on a 404.
 *
 * The primary nav is intentionally single-item (Home) in Phase 1 and will
 * populate itself as later-phase pages are implemented.
 */
export function SiteHeader() {
  const navItems = filterRenderedNav(PRIMARY_NAV);
  const utilityItems = filterRenderedNav(UTILITY_NAV);

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

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
          data-nav-status={navItems.length === 0 ? "empty" : "active"}
        >
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

        <div className="flex items-center gap-4 text-sm font-medium text-cocoa-700">
          {utilityItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-cocoa-900">
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </header>
  );
}
