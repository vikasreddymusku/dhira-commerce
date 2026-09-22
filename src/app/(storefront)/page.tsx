import { getHomepageData } from "@/server/services/storefront/homepage.service";
import { Hero } from "@/components/storefront/hero";
import { CategoryDiscovery } from "@/components/storefront/category-discovery";
import { FeaturedProducts } from "@/components/storefront/featured-products";
import { BestSellers } from "@/components/storefront/best-sellers";
import { StorySection } from "@/components/storefront/story-section";
import { CraftSection } from "@/components/storefront/craft-section";
import { RecipesPreview } from "@/components/storefront/recipes-preview";
import { B2BSection } from "@/components/storefront/b2b-section";
import { ExperiencesSection } from "@/components/storefront/experiences-section";
import { SocialSection } from "@/components/storefront/social-section";
import { NewsletterSection } from "@/components/storefront/newsletter-section";

// Revalidate periodically so Admin-driven content changes (HomepageSection,
// SiteSetting, Product.isFeatured, Recipe, Category) reach the storefront
// without requiring a full redeploy.
export const revalidate = 60;

/**
 * Dhira Industries homepage.
 *
 * All copy/imagery-captions/product data is fetched from the database via
 * src/server/services/storefront/homepage.service.ts (HomepageSection,
 * SiteSetting, Product/ProductVariant, Category, Recipe models from Phase 1)
 * - nothing here hardcodes business content. Sections render nothing when
 * their backing content is absent, so an unpublished section never shows a
 * broken placeholder.
 */
export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <>
      <Hero content={data.hero} />
      <CategoryDiscovery categories={data.categories} />
      <FeaturedProducts products={data.featuredProducts} />
      <StorySection content={data.story} />
      <CraftSection content={data.craft} />
      <BestSellers products={data.bestSellers} />
      <ExperiencesSection content={data.experiences} />
      <RecipesPreview recipes={data.recipes} />
      <B2BSection content={data.b2b} contactEmail={data.wholesaleEmail} />
      <SocialSection content={data.social} />
      <NewsletterSection content={data.newsletter} />
    </>
  );
}

