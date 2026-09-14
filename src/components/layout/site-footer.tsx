import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FOOTER_COLUMNS, filterRenderedNav } from "@/config/navigation";

/**
 * Foundational storefront footer shell (Phase 1).
 *
 * Column/link structure lives in `src/config/navigation.ts`. Only links whose
 * destination page exists today are rendered; later-phase links stay defined
 * in the registry and appear automatically once their pages ship. Footer
 * content will ultimately be sourced from the database (SiteSetting / Policy
 * / Faq models) rather than hardcoded here.
 */
export function SiteFooter() {
  const columns = FOOTER_COLUMNS.map((column) => ({
    ...column,
    items: filterRenderedNav(column.items),
  })).filter((column) => column.items.length > 0);

  return (
    <footer className="mt-24 border-t border-cocoa-100/60 bg-cocoa-900 text-cream-100">
      <Container className="grid gap-12 py-16 md:grid-cols-4">
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
              {column.items.map((link) => (
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
