import { Container } from "@/components/ui/container";
import type { HomepageSectionContent } from "@/server/services/storefront/homepage.service";

/**
 * Craftsmanship/education section - a numbered process list rather than
 * icon-in-a-box feature tiles (explicitly discouraged in the brief).
 */
export function CraftSection({ content }: { content: HomepageSectionContent | null }) {
  if (!content) return null;

  return (
    <section className="bg-cocoa-900 py-24 text-cream-50 sm:py-32">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          {content.subtitle && (
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-300">
              {content.subtitle}
            </span>
          )}
          {content.title && (
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">{content.title}</h2>
          )}
          {content.body && (
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream-200/75">
              {content.body}
            </p>
          )}
        </div>

        {content.items.length > 0 && (
          <ol className="flex flex-col divide-y divide-cream-100/10">
            {content.items.map((item, index) => (
              <li key={item.label ?? index} className="flex gap-6 py-6 first:pt-0 last:pb-0">
                <span className="font-display text-2xl text-gold-300/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-lg text-cream-50">{item.label}</p>
                  {item.caption && (
                    <p className="mt-1 text-sm text-cream-200/70">{item.caption}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </Container>
    </section>
  );
}
