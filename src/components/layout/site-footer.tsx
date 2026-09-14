import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FOOTER_COLUMNS, liveNavItems } from "@/config/navigation";

/**
 * Foundational storefront footer shell.
 *
 * Columns/links are defined centrally in src/config/navigation.ts. Only
 * destinations whose routes actually exist are rendered, so the Phase 1 shell
 * never exposes a link that 404s. Planned columns stay in the data structure
 * and appear automatically once their routes are implemented.
 */
export function SiteFooter() {
  const columns = FOOTER_COLUMNS.map((column) => ({
    title: column.title,
    links: liveNavItems(column.links),
  })).filter((column) => column.links.length > 0);

  return (
    <footer className="mt-24 border-t border-cocoa-100/60 bg-cocoa-900 text-cream-100">
      <Container
        className={
          columns.length > 0
            ? "grid gap-12 py-16 md:grid-cols-4"
            : "grid gap-12 py-16"
        }
      >
        <div>
          <p className="font-display text-xl text-cream-50">Dhira Industries</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200/80">
            Single-origin cocoa and couverture chocolate, sourced with care and
            crafted for those who value provenance.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-200">
              {column.title}
            </p>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-200/80 transition-colors hover:text-cream-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-cream-100/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream-200/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Dhira Industries. All rights reserved.</p>
          <p>Since 2010</p>
        </Container>
      </div>
    </footer>
  );
}
