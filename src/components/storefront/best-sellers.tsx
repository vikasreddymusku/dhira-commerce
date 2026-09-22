import { Container } from "@/components/ui/container";
import { EditorialMedia } from "@/components/storefront/editorial-media";
import { ProductPriceRange } from "@/components/storefront/product-price";
import type { ProductCardData } from "@/server/services/storefront/homepage.service";

const TONES = ["gold", "cocoa", "leaf", "cream", "cocoa"] as const;

/**
 * Best sellers - a horizontally scrolling shelf (native CSS scroll-snap,
 * no JS carousel dependency) so it reads distinctly from the Featured
 * section above, avoiding a repeated section structure.
 */
export function BestSellers({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-cream-100 py-24 sm:py-32">
      <Container className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            Most Loved
          </span>
          <h2 className="font-display text-3xl text-cocoa-900 sm:text-4xl">
            Reached for Again and Again
          </h2>
        </div>
      </Container>

      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
        {products.map((product, index) => (
          <article
            key={product.id}
            className="flex w-[240px] shrink-0 snap-start flex-col gap-4 sm:w-[280px]"
          >
            <EditorialMedia
              tone={TONES[index % TONES.length]}
              aspect="aspect-[3/4]"
              caption={product.name}
            />
            <div>
              <h3 className="font-display text-lg text-cocoa-900">{product.name}</h3>
              <p className="mt-1 text-sm font-medium text-cocoa-600">
                <ProductPriceRange
                  minPriceInPaise={product.minPriceInPaise}
                  maxPriceInPaise={product.maxPriceInPaise}
                />
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
