import { describe, expect, it } from "vitest";
import {
  FOOTER_COLUMNS,
  LIVE_ROUTES,
  PRIMARY_NAV,
  UTILITY_NAV,
  filterRenderedNav,
  type NavItem,
} from "@/config/navigation";

const allItems: NavItem[] = [
  ...PRIMARY_NAV,
  ...UTILITY_NAV,
  ...FOOTER_COLUMNS.flatMap((column) => column.items),
];

describe("navigation registry", () => {
  it("only marks destinations that exist as ready", () => {
    const readyItems = allItems.filter((item) => item.status === "ready");

    expect(readyItems.length).toBeGreaterThan(0);
    for (const item of readyItems) {
      expect(LIVE_ROUTES).toContain(item.href);
    }
  });

  it("preserves later-phase destinations without exposing them as ready", () => {
    const plannedHrefs = allItems
      .filter((item) => item.status === "planned")
      .map((item) => item.href);

    // The intended information architecture is retained for enablement later.
    expect(plannedHrefs).toContain("/shop");
    expect(plannedHrefs).toContain("/our-story");
    expect(plannedHrefs).toContain("/journal");
    expect(plannedHrefs).toContain("/wholesale");
    expect(plannedHrefs).toContain("/account");
  });

  it("never renders a link to a route that does not exist", () => {
    const rendered = [
      ...filterRenderedNav(PRIMARY_NAV),
      ...filterRenderedNav(UTILITY_NAV),
      ...FOOTER_COLUMNS.flatMap((column) => filterRenderedNav(column.items)),
    ];

    for (const item of rendered) {
      expect(LIVE_ROUTES).toContain(item.href);
    }
  });

  it("keeps internal links relative and unique per column", () => {
    for (const item of allItems) {
      expect(item.href.startsWith("/")).toBe(true);
    }
  });
});