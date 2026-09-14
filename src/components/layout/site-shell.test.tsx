import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { LIVE_ROUTES } from "@/config/navigation";

/**
 * Guards the Phase 1 "no visible control may 404" rule at the rendered-DOM
 * level: every anchor actually emitted by the storefront shell must point at
 * a route that exists today.
 */
function collectHrefs(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll("a[href]")).map(
    (anchor) => anchor.getAttribute("href") ?? "",
  );
}

describe("storefront shell links", () => {
  it("header renders only live destinations", () => {
    const { container } = render(<SiteHeader />);

    const hrefs = collectHrefs(container);
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(LIVE_ROUTES, `dead header link: ${href}`).toContain(href);
    }
  });

  it("footer renders only live destinations", () => {
    const { container } = render(<SiteFooter />);

    for (const href of collectHrefs(container)) {
      expect(LIVE_ROUTES, `dead footer link: ${href}`).toContain(href);
    }
  });

  it("does not present later-phase navigation labels as controls", () => {
    const { queryByText } = render(<SiteHeader />);

    // These belong to later phases; they must not look functional yet.
    for (const label of ["Shop", "Our Story", "Journal", "Wholesale", "Account", "Cart"]) {
      expect(queryByText(label)).toBeNull();
    }
  });
});