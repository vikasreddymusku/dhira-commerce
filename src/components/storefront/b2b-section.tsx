import { Container } from "@/components/ui/container";
import type { HomepageSectionContent } from "@/server/services/storefront/homepage.service";

/**
 * B2B/professional band. Full-width banner treatment - deliberately
 * distinct from the surrounding sections so it reads as its own register
 * (trade audience) rather than another generic "feature block".
 */
export function B2BSection({
  content,
  contactEmail,
}: {
  content: HomepageSectionContent | null;
  contactEmail: string | null;
}) {
  if (!content) return null;

  return (
    <section className="border-y border-gold-300/30 bg-gold-100/40 py-20 sm:py-24">
      <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-lg">
          {content.subtitle && (
            <span className="text-xs font-semibold uppercase tracking-widest text-cocoa-500">
              {content.subtitle}
            </span>
          )}
          {content.title && (
            <h2 className="mt-4 font-display text-3xl text-cocoa-900 sm:text-4xl">
              {content.title}
            </h2>
          )}
          {content.body && (
            <p className="mt-5 text-base leading-relaxed text-cocoa-700">{content.body}</p>
          )}
        </div>

        {contactEmail && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-cocoa-500">
              Trade Enquiries
            </span>
            <span className="font-display text-xl text-cocoa-900">{contactEmail}</span>
          </div>
        )}
      </Container>
    </section>
  );
}
