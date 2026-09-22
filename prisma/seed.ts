/**
 * DEVELOPMENT SEED DATA ONLY.
 *
 * This file populates the local/dev PostgreSQL database with realistic
 * demo catalog data for the initial Dhira Industries product line.
 * It must NEVER be treated as production business data - real product,
 * pricing, and inventory data belongs in the Admin -> API -> Database
 * pipeline, not in source code.
 *
 * Run with: npm run db:seed
 */
import "dotenv/config";
import { PrismaClient, WeightUnit } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type VariantSeed = {
  label: string;
  skuSuffix: string;
  weightValue: number;
  weightUnit: WeightUnit;
  priceInPaise: number;
  compareAtPaise?: number;
  quantityOnHand: number;
};

type ProductSeed = {
  name: string;
  slug: string;
  skuBase: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  variants: VariantSeed[];
};

const CATEGORY_SEEDS = [
  {
    name: "Couverture Chocolate",
    slug: "couverture-chocolate",
    description: "Premium single-origin couverture chocolate for confectionery and bakery use.",
  },
  {
    name: "Cocoa Ingredients",
    slug: "cocoa-ingredients",
    description: "Raw and processed cocoa ingredients sourced from single-origin farms.",
  },
];

const COLLECTION_SEEDS = [
  {
    name: "Single-Origin Selects",
    slug: "single-origin-selects",
    description: "Our founding range - traceable, single-origin cocoa and chocolate.",
  },
];

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    name: "Dark Couverture 55%",
    slug: "dark-couverture-55",
    skuBase: "DHI-CV55",
    shortDescription: "A balanced 55% dark couverture with gentle bitterness and a smooth, glossy melt.",
    description:
      "Dhira's 55% Dark Couverture is crafted for confectioners who want approachable dark chocolate with a clean snap and smooth temper. Ideal for enrobing, moulding, and baking.",
    categorySlug: "couverture-chocolate",
    variants: [
      { label: "250g Block", skuSuffix: "250G", weightValue: 250, weightUnit: WeightUnit.G, priceInPaise: 39900, quantityOnHand: 120 },
      { label: "1kg Block", skuSuffix: "1KG", weightValue: 1, weightUnit: WeightUnit.KG, priceInPaise: 129900, compareAtPaise: 144900, quantityOnHand: 60 },
      { label: "5kg Slab", skuSuffix: "5KG", weightValue: 5, weightUnit: WeightUnit.KG, priceInPaise: 549900, quantityOnHand: 15 },
    ],
  },
  {
    name: "Dark Couverture 70%",
    slug: "dark-couverture-70",
    skuBase: "DHI-CV70",
    shortDescription: "An intense 70% dark couverture with deep cocoa notes and a firm, elegant snap.",
    description:
      "A confectioner's staple, Dhira's 70% Dark Couverture delivers pronounced cocoa depth with restrained bitterness, tempered for precise moulding and enrobing work.",
    categorySlug: "couverture-chocolate",
    variants: [
      { label: "250g Block", skuSuffix: "250G", weightValue: 250, weightUnit: WeightUnit.G, priceInPaise: 44900, quantityOnHand: 110 },
      { label: "1kg Block", skuSuffix: "1KG", weightValue: 1, weightUnit: WeightUnit.KG, priceInPaise: 149900, compareAtPaise: 164900, quantityOnHand: 55 },
      { label: "5kg Slab", skuSuffix: "5KG", weightValue: 5, weightUnit: WeightUnit.KG, priceInPaise: 629900, quantityOnHand: 12 },
    ],
  },
  {
    name: "Dark Couverture 90%",
    slug: "dark-couverture-90",
    skuBase: "DHI-CV90",
    shortDescription: "An intense 90% dark couverture for connoisseurs who prefer minimal sweetness.",
    description:
      "Dhira's 90% Dark Couverture is reserved for those who seek pure cocoa intensity. Low sugar, high cocoa solids, and a bold, lingering finish.",
    categorySlug: "couverture-chocolate",
    variants: [
      { label: "250g Block", skuSuffix: "250G", weightValue: 250, weightUnit: WeightUnit.G, priceInPaise: 49900, quantityOnHand: 90 },
      { label: "1kg Block", skuSuffix: "1KG", weightValue: 1, weightUnit: WeightUnit.KG, priceInPaise: 169900, quantityOnHand: 40 },
    ],
  },
  {
    name: "Cocoa Mass",
    slug: "cocoa-mass",
    skuBase: "DHI-MASS",
    shortDescription: "Unsweetened cocoa mass pressed from single-origin beans, rich and full-bodied.",
    description:
      "Our Cocoa Mass (cocoa liquor) is pure ground cocoa solids and cocoa butter with no additives - a foundational ingredient for chocolate makers and industrial confectionery.",
    categorySlug: "cocoa-ingredients",
    variants: [
      { label: "1kg Block", skuSuffix: "1KG", weightValue: 1, weightUnit: WeightUnit.KG, priceInPaise: 109900, quantityOnHand: 70 },
      { label: "5kg Block", skuSuffix: "5KG", weightValue: 5, weightUnit: WeightUnit.KG, priceInPaise: 499900, quantityOnHand: 20 },
      { label: "25kg Carton", skuSuffix: "25KG", weightValue: 25, weightUnit: WeightUnit.KG, priceInPaise: 2349900, quantityOnHand: 6 },
    ],
  },
  {
    name: "Cocoa Butter",
    slug: "cocoa-butter",
    skuBase: "DHI-BUTTER",
    shortDescription: "Naturally pressed, deodorised cocoa butter with a clean aroma and ivory colour.",
    description:
      "Dhira's Cocoa Butter is naturally pressed and gently deodorised, prized by chocolatiers and cosmetic formulators for its purity, stable shelf life, and neutral aroma.",
    categorySlug: "cocoa-ingredients",
    variants: [
      { label: "500g Pack", skuSuffix: "500G", weightValue: 500, weightUnit: WeightUnit.G, priceInPaise: 64900, quantityOnHand: 100 },
      { label: "1kg Block", skuSuffix: "1KG", weightValue: 1, weightUnit: WeightUnit.KG, priceInPaise: 119900, quantityOnHand: 65 },
      { label: "25kg Carton", skuSuffix: "25KG", weightValue: 25, weightUnit: WeightUnit.KG, priceInPaise: 2699900, quantityOnHand: 5 },
    ],
  },
  {
    name: "Natural Cocoa Powder",
    slug: "natural-cocoa-powder",
    skuBase: "DHI-POWDER",
    shortDescription: "Unsweetened natural cocoa powder with vivid colour and bold cocoa aroma.",
    description:
      "Our Natural (non-alkalised) Cocoa Powder retains the bright acidity and rich aroma of single-origin cocoa, perfect for baking, beverages, and premium confectionery.",
    categorySlug: "cocoa-ingredients",
    variants: [
      { label: "250g Pouch", skuSuffix: "250G", weightValue: 250, weightUnit: WeightUnit.G, priceInPaise: 34900, quantityOnHand: 150 },
      { label: "1kg Pouch", skuSuffix: "1KG", weightValue: 1, weightUnit: WeightUnit.KG, priceInPaise: 109900, quantityOnHand: 80 },
      { label: "5kg Bag", skuSuffix: "5KG", weightValue: 5, weightUnit: WeightUnit.KG, priceInPaise: 479900, quantityOnHand: 25 },
    ],
  },
  {
    name: "Cocoa Nibs",
    slug: "cocoa-nibs",
    skuBase: "DHI-NIBS",
    shortDescription: "Roasted, crushed cocoa nibs with a crunchy texture and intense chocolate flavour.",
    description:
      "Dhira's Cocoa Nibs are roasted and cracked from whole cocoa beans, offering a crunchy, nutty texture and pure cocoa flavour for baking, granolas, and garnishing.",
    categorySlug: "cocoa-ingredients",
    variants: [
      { label: "200g Pouch", skuSuffix: "200G", weightValue: 200, weightUnit: WeightUnit.G, priceInPaise: 29900, quantityOnHand: 140 },
      { label: "1kg Pouch", skuSuffix: "1KG", weightValue: 1, weightUnit: WeightUnit.KG, priceInPaise: 99900, quantityOnHand: 60 },
    ],
  },
  {
    name: "Cocoa Beans",
    slug: "cocoa-beans",
    skuBase: "DHI-BEANS",
    shortDescription: "Sun-dried, fermented single-origin cocoa beans ready for roasting or grinding.",
    description:
      "Our Cocoa Beans are carefully fermented and sun-dried at origin, offering chocolate makers full control over roast profile and flavour development.",
    categorySlug: "cocoa-ingredients",
    variants: [
      { label: "1kg Bag", skuSuffix: "1KG", weightValue: 1, weightUnit: WeightUnit.KG, priceInPaise: 79900, quantityOnHand: 90 },
      { label: "25kg Sack", skuSuffix: "25KG", weightValue: 25, weightUnit: WeightUnit.KG, priceInPaise: 1699900, quantityOnHand: 8 },
    ],
  },
];

const BCRYPT_ROUNDS = 12;

/**
 * Creates/updates the LOCAL DEVELOPMENT admin account from environment
 * variables. Refuses to run in production so demo credentials can never be
 * provisioned automatically in a live environment.
 */
async function seedDevelopmentAdmin() {
  if (process.env.NODE_ENV === "production") {
    console.log("Skipping development admin seed (NODE_ENV=production).");
    return;
  }

  const email = process.env.DEV_ADMIN_EMAIL;
  const password = process.env.DEV_ADMIN_PASSWORD;
  const name = process.env.DEV_ADMIN_NAME ?? "Dhira Dev Admin";

  if (!email || !password) {
    console.log(
      "Skipping development admin seed: set DEV_ADMIN_EMAIL and DEV_ADMIN_PASSWORD in .env to create a local admin account.",
    );
    return;
  }

  if (password.length < 8) {
    throw new Error("DEV_ADMIN_PASSWORD must be at least 8 characters long.");
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  await prisma.adminUser.upsert({
    where: { email },
    update: { name, passwordHash, role: "SUPER_ADMIN", isActive: true },
    create: { name, email, passwordHash, role: "SUPER_ADMIN", isActive: true },
  });

  console.log(`Development admin ready for ${email} (role: SUPER_ADMIN).`);
}

const HOMEPAGE_SECTION_SEEDS = [
  {
    key: "hero",
    title: "Rich. Pure. Single-Origin.",
    subtitle: "Cocoa and couverture chocolate, traced from a single Indian estate to your kitchen.",
    content: {
      body: "Dhira Industries crafts small-batch couverture and cocoa ingredients from beans we know by name - grown, fermented, and dried on one estate, then worked with restraint in our own facility.",
    },
  },
  {
    key: "story",
    title: "One Estate. One Story.",
    subtitle: "Single-origin, from soil to bar",
    content: {
      body: "Every batch begins on the same estate soil - not a blend of origins, but one farm's cocoa, followed from pod to finished couverture. We work in small volumes so flavour, not scale, stays the priority.",
    },
  },
  {
    key: "craft",
    title: "The Craft of Restraint",
    subtitle: "Cocoa, worked with patience",
    content: {
      body: "Fermentation, sun-drying, stone-grinding, conching - each stage is timed by feel, not formula. We add nothing to mask the bean; the character comes from the origin and the care.",
      items: [
        { label: "Fermentation", caption: "6-8 days, open-air boxes, turned by hand" },
        { label: "Drying", caption: "Sun-dried slowly for even moisture and flavour" },
        { label: "Conching", caption: "Long, slow conching for a clean, rounded melt" },
      ],
    },
  },
  {
    key: "b2b",
    title: "For Chocolatiers & Bakers",
    subtitle: "Wholesale & Professional Supply",
    content: {
      body: "We supply couverture, cocoa mass, butter, and powder in bulk formats to confectioners, bakeries, and cocoa manufacturers - with consistent origin, consistent temper, and direct traceability.",
    },
  },
  {
    key: "experiences",
    title: "Visit the Works",
    subtitle: "Factory tours & tasting sessions",
    content: {
      body: "Step inside our processing facility to see beans become couverture - from stone grinding to conching - and taste our range straight from the line.",
    },
  },
  {
    key: "social",
    title: "Life at Dhira",
    subtitle: "@dhiraindustries",
    content: { body: "Notes from the estate, the factory floor, and the tasting table." },
  },
  {
    key: "newsletter",
    title: "Stay Close to the Source",
    subtitle: "Journal & new releases",
    content: {
      body: "Occasional notes on harvests, new releases, and how we work. No spam - just cocoa.",
    },
  },
] as const;

const SITE_SETTING_SEEDS = [
  { key: "announcement_bar", value: { text: "Single-origin couverture, milled and conched in small batches - shipping across India." } },
  { key: "wholesale_email", value: { text: "wholesale@dhiraindustries.com" } },
];

const RECIPE_SEEDS = [
  {
    title: "Dark Couverture Ganache Tart",
    slug: "dark-couverture-ganache-tart",
    summary: "A silky 70% couverture ganache set in a cocoa-nib shortcrust shell.",
  },
  {
    title: "Single-Origin Hot Chocolate",
    slug: "single-origin-hot-chocolate",
    summary: "Slow-melted 55% couverture, whole milk, and a pinch of sea salt.",
  },
  {
    title: "Cocoa Nib Financiers",
    slug: "cocoa-nib-financiers",
    summary: "Brown-butter financiers finished with a scatter of roasted cocoa nibs.",
  },
];

const FEATURED_PRODUCT_SLUGS = ["dark-couverture-70", "dark-couverture-55", "cocoa-butter", "natural-cocoa-powder"];

async function main() {
  console.log("Seeding DEVELOPMENT data for Dhira Industries...");

  await seedDevelopmentAdmin();

  for (const category of CATEGORY_SEEDS) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, description: category.description },
      create: category,
    });
  }

  for (const collection of COLLECTION_SEEDS) {
    await prisma.collection.upsert({
      where: { slug: collection.slug },
      update: { name: collection.name, description: collection.description },
      create: collection,
    });
  }

  const singleOrigin = await prisma.collection.findUniqueOrThrow({
    where: { slug: "single-origin-selects" },
  });

  for (const productSeed of PRODUCT_SEEDS) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: productSeed.categorySlug },
    });

    const product = await prisma.product.upsert({
      where: { slug: productSeed.slug },
      update: {
        name: productSeed.name,
        shortDescription: productSeed.shortDescription,
        description: productSeed.description,
      },
      create: {
        name: productSeed.name,
        slug: productSeed.slug,
        shortDescription: productSeed.shortDescription,
        description: productSeed.description,
        isActive: true,
        categories: { create: [{ categoryId: category.id }] },
        collections: { create: [{ collectionId: singleOrigin.id }] },
      },
    });

    for (const [index, variant] of productSeed.variants.entries()) {
      const sku = `${productSeed.skuBase}-${variant.skuSuffix}`;
      const savedVariant = await prisma.productVariant.upsert({
        where: { sku },
        update: {
          label: variant.label,
          weightValue: variant.weightValue,
          weightUnit: variant.weightUnit,
          priceInPaise: variant.priceInPaise,
          compareAtPaise: variant.compareAtPaise,
        },
        create: {
          productId: product.id,
          sku,
          label: variant.label,
          weightValue: variant.weightValue,
          weightUnit: variant.weightUnit,
          priceInPaise: variant.priceInPaise,
          compareAtPaise: variant.compareAtPaise,
          isDefault: index === 0,
          sortOrder: index,
        },
      });

      const stockStatus = variant.quantityOnHand > 10 ? "IN_STOCK" : "LOW_STOCK";
      await prisma.inventoryItem.upsert({
        where: { variantId: savedVariant.id },
        update: { quantityOnHand: variant.quantityOnHand, stockStatus },
        create: { variantId: savedVariant.id, quantityOnHand: variant.quantityOnHand, stockStatus },
      });
    }
  }

  for (const slug of FEATURED_PRODUCT_SLUGS) {
    await prisma.product.updateMany({ where: { slug }, data: { isFeatured: true } });
  }

  for (const section of HOMEPAGE_SECTION_SEEDS) {
    await prisma.homepageSection.upsert({
      where: { key: section.key },
      update: {
        title: section.title,
        subtitle: section.subtitle,
        content: section.content,
        status: "PUBLISHED",
      },
      create: {
        key: section.key,
        title: section.title,
        subtitle: section.subtitle,
        content: section.content,
        status: "PUBLISHED",
      },
    });
  }

  for (const setting of SITE_SETTING_SEEDS) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  for (const recipe of RECIPE_SEEDS) {
    await prisma.recipe.upsert({
      where: { slug: recipe.slug },
      update: { title: recipe.title, summary: recipe.summary, status: "PUBLISHED", publishedAt: new Date() },
      create: { ...recipe, status: "PUBLISHED", publishedAt: new Date() },
    });
  }

  console.log(`Seeded ${PRODUCT_SEEDS.length} development products with variants and inventory.`);
  console.log(
    `Seeded ${HOMEPAGE_SECTION_SEEDS.length} homepage sections, ${SITE_SETTING_SEEDS.length} site settings, ${RECIPE_SEEDS.length} recipes.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
