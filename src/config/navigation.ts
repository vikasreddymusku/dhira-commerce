/**
 * Storefront navigation registry.
 *
 * IMPORTANT (Phase 1 rule): no visible interactive control may lead to an
 * accidental 404. Every destination is therefore modelled with an explicit
 * `status`:
 *
 *  - "ready": a real page exists in the App Router today and MAY be rendered
 *    as a <Link>.
 *  - "planned": the destination belongs to a later phase and its page does
 *    not exist yet. Planned items are preserved here so the intended
 *    information architecture is not lost, but they MUST NOT be rendered as
 *    links until their page is implemented (see `filterRenderedNav`).
 *
 * When a later phase adds a page, flip that item's `status` to "ready" (and
 * add the route to `LIVE_ROUTES`) - no other change is required.
 */

export type NavStatus = "ready" | "planned";

export type NavItem = {
  label: string;
  href: string;
  status: NavStatus;
  /** Phase in which this destination is scheduled to be implemented. */
  phase?: number;
};

export type FooterColumn = {
  title: string;
  items: NavItem[];
};

export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/", status: "ready" },
  { label: "Shop", href: "/shop", status: "planned", phase: 2 },
  { label: "Our Story", href: "/our-story", status: "planned", phase: 4 },
  { label: "Recipes", href: "/recipes", status: "planned", phase: 3 },
  { label: "Journal", href: "/journal", status: "planned", phase: 4 },
  { label: "Wholesale", href: "/wholesale", status: "planned", phase: 3 },
];

/** Header right-hand utility actions. */
export const UTILITY_NAV: NavItem[] = [
  { label: "Account", href: "/account", status: "planned", phase: 3 },
  { label: "Cart", href: "/cart", status: "planned", phase: 3 },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Shop",
    items: [
      { label: "Couverture Chocolate", href: "/shop/couverture-chocolate", status: "planned", phase: 2 },
      { label: "Cocoa Ingredients", href: "/shop/cocoa-ingredients", status: "planned", phase: 2 },
      { label: "Wholesale Enquiries", href: "/wholesale", status: "planned", phase: 3 },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Our Story", href: "/our-story", status: "planned", phase: 4 },
      { label: "Journal", href: "/journal", status: "planned", phase: 4 },
      { label: "FAQs", href: "/faqs", status: "planned", phase: 3 },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Shipping Policy", href: "/policies/shipping", status: "planned", phase: 3 },
      { label: "Returns & Refunds", href: "/policies/returns", status: "planned", phase: 3 },
      { label: "Contact Us", href: "/contact", status: "planned", phase: 3 },
    ],
  },
];

/**
 * Routes that physically exist in the App Router as of Phase 1.
 * Keep in sync with the `src/app` tree.
 */
export const LIVE_ROUTES: readonly string[] = ["/", "/admin", "/admin/login"];

/**
 * Returns only navigation items whose destinations really exist today.
 * This is the single guard that prevents visible 404s: even if a `ready`
 * item is misconfigured, rendering is skipped unless the route is listed in
 * `LIVE_ROUTES`.
 */
export function filterRenderedNav(items: readonly NavItem[]): NavItem[] {
  return items.filter((item) => item.status === "ready" && LIVE_ROUTES.includes(item.href));
}