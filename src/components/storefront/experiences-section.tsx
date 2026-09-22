import { EditorialMedia } from "@/components/storefront/editorial-media";
import { Container } from "@/components/ui/container";
import type { HomepageSectionContent } from "@/server/services/storefront/homepage.service";

/**
 * Experiences/factory storytelling - full-bleed image with overlaid text,
 * visually distinct from the split-column StorySection above.
 */
export function ExperiencesSection({ content }: { content: HomepageSectionContent | null }) {
  if (!content) return null;

  return (
    <section className="relative">
      <EditorialMedia tone="cream" aspect="aspect-[16/9] sm:aspect-[21/9]" caption="Inside the works" />
      <div className="absolute inset-0 flex items-center bg-gradient-to-r from-cocoa-950/70 via-cocoa-950/20 to-transparent">
        <Container>
          <div className="max-w-md">
            {content.subtitle && (
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-300">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="mt-4 font-display text-3xl text-cream-50 sm:text-4xl">
                {content.title}
              </h2>
            )}
            {content.body && (
              <p className="mt-5 text-sm leading-relaxed text-cream-100/85">{content.body}</p>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
