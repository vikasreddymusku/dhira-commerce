import { EditorialMedia } from "@/components/storefront/editorial-media";
import type { HomepageSectionContent } from "@/server/services/storefront/homepage.service";

/**
 * Single-origin storytelling - full-bleed image bleeding to the viewport
 * edge on one side, text column on the other. Deliberately asymmetric.
 */
export function StorySection({ content }: { content: HomepageSectionContent | null }) {
  if (!content) return null;

  return (
    <section className="bg-cream-50">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-2 flex items-center justify-center px-4 py-20 sm:px-6 lg:order-1 lg:px-16 lg:py-0">
          <div className="max-w-md">
            {content.subtitle && (
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="mt-4 font-display text-3xl text-cocoa-900 sm:text-4xl">
                {content.title}
              </h2>
            )}
            {content.body && (
              <p className="mt-6 text-base leading-relaxed text-cocoa-600">{content.body}</p>
            )}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <EditorialMedia
            tone="leaf"
            aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
            caption="The estate"
            className="lg:min-h-[560px]"
          />
        </div>
      </div>
    </section>
  );
}
