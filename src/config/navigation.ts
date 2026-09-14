/**
 * Storefront navigation definitions.
 *
 * This is the intended navigation data structure for the whole storefront.
 * Every item carries an explicit `status`:
 *
 *   - "live"    -> the route exists and is safe to render as a link.
 *   - "planned" -> the destination belongs to a later phase and the page does
 *                  NOT exist yet. Items in this state are intentionally not
 *                  rendered as navigable links, so users can never hit an
 *                  accidental 404 from the Phase 1 shell.
 *
 * To enable a planned item once its page is implemented, change its status to
 * "live" - no other change is required in the header/footer components.
 */

export type NavLinkStatus = "live" | "planned";

export interface NavItem {
  label: string;
  href: string;
  status: NavLinkStatus;
  /** Optional grouping used by the footer to render columns. */
  group?: string;
}

export const PRIMARY_NAV: NavItem[] = [
  { label: "Shop", href: "/shop", status: "planned" },
  { label: "Our Story", href: "/our-story", status: "planned" },
  { label: "Recipes", href: "/recipes", status: "planned" },
  { label: "Journal", href: "/journal", status: "planned" },
  { label: "Wholesale", href: "/wholesale", status: "planned" },
];

export const ACCOUNT_NAV: NavItem[] = [
  { label: "Account", href: "/account", status: "planned" },
  { label: "Cart", href: "/cart", status: "planned" },
];

export const FOOTER_COLUMNS: { title: string; links: NavItem[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Couverture Chocolate", href: "/shop/couverture-chocolate", status: "planned" },
      { label: "Cocoa Ingredients", href: "/shop/cocoa-ingredients", status: "planned" },
      { label: "Wholesale Enquiries", href: "/wholesale", status: "planned" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/our-story", status: "planned" },
      { label: "Journal", href: "/journal", status: "planned" },
      { label: "FAQs", href: "/faqs", status: "planned" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping Policy", href: "/policies/shipping", status: "planned" },
      { label: "Returns & Refunds", href: "/policies/returns", status: "planned" },
      { label: "Contact Us", href: "/contact", status: "planned" },
    ],
  },
];

/** Only these items may be rendered as clickable links in the Phase 1 shell. */
export function liveNavItems(items: NavItem[]): NavItem[] {
  return items.filter((item) => item.status === "live");
}
