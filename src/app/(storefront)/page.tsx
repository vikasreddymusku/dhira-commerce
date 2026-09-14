import { Container } from "@/components/ui/container";

/**
 * Placeholder landing page - Phase 1 provides only the foundational
 * storefront shell (header/footer/typography/tokens). The full homepage
 * experience (hero, featured products, story sections, etc.) is
 * intentionally deferred to a later phase and will be database-driven via
 * the HomepageSection model rather than hardcoded here.
 *
 * No call-to-action button is rendered yet, because no catalogue route
 * exists - a visible CTA that leads nowhere would violate the Phase 1 rule
 * against controls that appear functional.
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
    </Container>
  );
}

