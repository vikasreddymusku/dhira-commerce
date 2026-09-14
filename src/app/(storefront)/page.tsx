import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

/**
 * Placeholder landing page - Phase 1 provides only the foundational
 * storefront shell (header/footer/typography/tokens). The full homepage
 * experience (hero, featured products, story sections, etc.) is
 * intentionally deferred to a later phase and will be database-driven via
 * the HomepageSection model rather than hardcoded here.
 *
 * The only call to action below links to a page that genuinely exists in
 * Phase 1. Catalogue CTAs are added together with the /shop pages, never
 * before, so no control leads to a 404.
 */
export default function HomePage() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold-500">
        Single-Origin &middot; Est. 2010
      </p>
      <h1 className="max-w-2xl font-display text-4xl text-cocoa-900 sm:text-5xl">
        Dhira Industries
      </h1>
      <p className="max-w-xl text-base text-cocoa-600">
        The Dhira storefront foundation is live. Our full catalogue and story
        are being crafted with the same care as our chocolate.
      </p>
      <Link href="/admin/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
        Admin Sign In
      </Link>
    </Container>
  );
}
