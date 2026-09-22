import { Container } from "@/components/ui/container";
import { EditorialMedia } from "@/components/storefront/editorial-media";
import type { CategoryCardData } from "@/server/services/storefront/homepage.service";

const TONES = ["cocoa", "gold", "leaf"] as const;

/**
 * Category discovery - an asymmetric editorial band rather than a uniform
 * 3-card grid. First category is given visual priority (larger plate).
 */
export function CategoryDiscovery({ categories }: { categories: CategoryCardData[] }) {
  if (categories.length === 0) return null;

  const [lead, ...rest] = categories;

  return (
    <section className="bg-cream-50 py-24 sm:py-32">
      <Container>
        <div className="mb-14 flex flex-col gap-3 sm:mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">
            Explore
          </span>
          <h2 className="font-display text-3xl text-cocoa-900 sm:text-4xl">
            What We Work With
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {lead && (
            <div className="relative col-span-1 flex flex-col gap-5 lg:col-span-2 lg:row-span-2">
              <EditorialMedia tone="cocoa" aspect="aspect-[16/10]" caption={lead.name} />
              <div>
                <h3 className="font-display text-2xl text-cocoa-900">{lead.name}</h3>
                {lead.description && (
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-cocoa-600">
                    {lead.description}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-8">
            {rest.slice(0, 2).map((category, index) => (
              <div key={category.id} className="flex flex-col gap-4">
                <EditorialMedia
                  tone={TONES[(index + 1) % TONES.length]}
                  aspect="aspect-[16/10]"
                  caption={category.name}
                />
                <div>
                  <h3 className="font-display text-lg text-cocoa-900">{category.name}</h3>
                  {category.description && (
                    <p className="mt-1 text-sm leading-relaxed text-cocoa-600">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
