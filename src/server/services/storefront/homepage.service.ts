import { db } from "@/server/db";

/**
 * Read-only data access for the public homepage.
 *
 * This is the ONLY place storefront homepage components may reach for
 * database-backed content. It reuses the Phase 1 Prisma models/singleton
 * as-is (no schema or migration changes) and returns plain view-model
 * objects so presentational components never depend on ORM types.
 */

export type HomepageSectionContent = {
  title: string | null;
  subtitle: string | null;
  body: string | null;
  items: Array<{ label?: string; caption?: string; value?: string }>;
};

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  minPriceInPaise: number;
  maxPriceInPaise: number;
  weightLabel: string | null;
};

export type CategoryCardData = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
};

export type RecipeCardData = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
};

async function getHomepageSection(key: string): Promise<HomepageSectionContent | null> {
  const section = await db.homepageSection.findUnique({ where: { key } });
  if (!section || section.status !== "PUBLISHED") return null;

  const content = section.content as { body?: string; items?: HomepageSectionContent["items"] } | null;

  return {
    title: section.title ?? null,
    subtitle: section.subtitle ?? null,
    body: content?.body ?? null,
    items: content?.items ?? [],
  };
}

async function getSiteSetting(key: string): Promise<string | null> {
  const setting = await db.siteSetting.findUnique({ where: { key } });
  if (!setting) return null;
  const value = setting.value as { text?: string } | string | null;
  if (typeof value === "string") return value;
  return value?.text ?? null;
}

function toProductCard(product: {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  variants: { priceInPaise: number; weightValue: unknown; weightUnit: string }[];
}): ProductCardData {
  const prices = product.variants.map((v) => v.priceInPaise);
  const defaultVariant = product.variants[0];
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    shortDescription: product.shortDescription,
    minPriceInPaise: prices.length ? Math.min(...prices) : 0,
    maxPriceInPaise: prices.length ? Math.max(...prices) : 0,
    weightLabel: defaultVariant
      ? `${Number(defaultVariant.weightValue)}${defaultVariant.weightUnit.toLowerCase()}`
      : null,
  };
}

export async function getFeaturedProducts(limit = 4): Promise<ProductCardData[]> {
  const products = await db.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: { variants: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
    take: limit,
  });
  return products.map(toProductCard);
}

export async function getBestSellingProducts(limit = 5): Promise<ProductCardData[]> {
  const products = await db.product.findMany({
    where: { isActive: true, isFeatured: false },
    include: { variants: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
    take: limit,
  });
  return products.map(toProductCard);
}

export async function getStorefrontCategories(limit = 6): Promise<CategoryCardData[]> {
  const categories = await db.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: limit,
  });
  return categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description,
  }));
}

export async function getPublishedRecipes(limit = 3): Promise<RecipeCardData[]> {
  const recipes = await db.recipe.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
  return recipes.map((r) => ({ id: r.id, slug: r.slug, title: r.title, summary: r.summary }));
}

export async function getHomepageData() {
  const [
    announcement,
    hero,
    story,
    craft,
    b2b,
    experiences,
    social,
    newsletter,
    wholesaleEmail,
    featuredProducts,
    bestSellers,
    categories,
    recipes,
  ] = await Promise.all([
    getSiteSetting("announcement_bar"),
    getHomepageSection("hero"),
    getHomepageSection("story"),
    getHomepageSection("craft"),
    getHomepageSection("b2b"),
    getHomepageSection("experiences"),
    getHomepageSection("social"),
    getHomepageSection("newsletter"),
    getSiteSetting("wholesale_email"),
    getFeaturedProducts(),
    getBestSellingProducts(),
    getStorefrontCategories(),
    getPublishedRecipes(),
  ]);

  return {
    announcement,
    hero,
    story,
    craft,
    b2b,
    experiences,
    social,
    newsletter,
    wholesaleEmail,
    featuredProducts,
    bestSellers,
    categories,
    recipes,
  };
}
