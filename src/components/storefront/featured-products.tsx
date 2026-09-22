import { Container } from "@/components/ui/container";
import { EditorialMedia } from "@/components/storefront/editorial-media";
import { ProductPriceRange } from "@/components/storefront/product-price";
import type { ProductCardData } from "@/server/services/storefront/homepage.service";

const TONES = ["cocoa", "gold", "leaf", "cream"] as const;

/**
 * Featured products - an editorial "shelf" rather than a uniform card grid.
 * Alternating vertical rhythm (media/copy order flips) breaks the repeated
 * card pattern the spec explicitly warns against.
 */
export function FeaturedProducts({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-cocoa-950 py-24 sm:py-32">
      <Container>
        <div className="mb-14 flex flex-col gap-3 text-cream-50 sm:mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-300">
            Featured
          </span>
          <h2 className="font-display text-3xl sm:text-4xl">The Current Selection</h2>
        </div>

        <div className="flex flex-col gap-16 sm:gap-24">
          {products.map((product, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={product.id}
                className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <EditorialMedia
                  tone={TONES[index % TONES.length]}
                  aspect="aspect-[4/3]"
                  caption={product.name}
                />
                <div className="max-w-md">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-300">
                    {product.weightLabel ?? "Single-Origin"}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-cream-50 sm:text-3xl">
                    {product.name}
                  </h3>
                  {product.shortDescription && (
                    <p className="mt-4 text-sm leading-relaxed text-cream-200/75">
                      {product.shortDescription}
                    </p>
                  )}
                  <p className="mt-6 text-sm font-medium text-cream-100">
                    <ProductPriceRange
                      minPriceInPaise={product.minPriceInPaise}
                      maxPriceInPaise={product.maxPriceInPaise}
                    />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
