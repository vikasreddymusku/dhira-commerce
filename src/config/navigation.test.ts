import { describe, expect, it } from "vitest";
import {
  ACCOUNT_NAV,
  FOOTER_COLUMNS,
  PRIMARY_NAV,
  liveNavItems,
  type NavItem,
} from "./navigation";

describe("navigation config", () => {
  it("keeps planned destinations in the data structure for later phases", () => {
    const planned = [...PRIMARY_NAV, ...ACCOUNT_NAV].filter((i) => i.status === "planned");
    expect(planned.length).toBeGreaterThan(0);
  });

  it("excludes planned items and includes live items", () => {
    const items: NavItem[] = [
      { label: "Planned", href: "/planned", status: "planned" },
      { label: "Live", href: "/live", status: "live" },
    ];

    expect(liveNavItems(items)).toEqual([{ label: "Live", href: "/live", status: "live" }]);
  });

  it("only ever returns items explicitly marked live", () => {
    const allConfigured = [
      ...PRIMARY_NAV,
      ...ACCOUNT_NAV,
      ...FOOTER_COLUMNS.flatMap((column) => column.links),
    ];
    const rendered = liveNavItems(allConfigured);

    expect(rendered.every((item) => item.status === "live")).toBe(true);
  });
});