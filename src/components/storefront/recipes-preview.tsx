import { Container } from "@/components/ui/container";
import { EditorialMedia } from "@/components/storefront/editorial-media";
import type { RecipeCardData } from "@/server/services/storefront/homepage.service";

const TONES = ["cream", "gold", "cocoa"] as const;

export function RecipesPreview({ recipes }: { recipes: RecipeCardData[] }) {
  if (recipes.length === 0) return null;

  return (
    <section className="bg-cream-50 py-24 sm:py-32">
      <Container>
        <div className="mb-14 flex flex-col gap-3 sm:mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">
            From the Journal
          </span>
          <h2 className="font-display text-3xl text-cocoa-900 sm:text-4xl">
            Ways to Use Our Cocoa
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-3">
          {recipes.map((recipe, index) => (
            <article key={recipe.id} className="flex flex-col gap-4">
              <EditorialMedia
                tone={TONES[index % TONES.length]}
                aspect="aspect-[5/6]"
                caption={recipe.title}
              />
              <div>
                <h3 className="font-display text-lg text-cocoa-900">{recipe.title}</h3>
                {recipe.summary && (
                  <p className="mt-1 text-sm leading-relaxed text-cocoa-600">{recipe.summary}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
