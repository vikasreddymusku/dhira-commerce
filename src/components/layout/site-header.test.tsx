import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "./site-header";
import { ACCOUNT_NAV, PRIMARY_NAV } from "@/config/navigation";

const plannedHrefs = [...PRIMARY_NAV, ...ACCOUNT_NAV]
  .filter((item) => item.status === "planned")
  .map((item) => item.href);

describe("SiteHeader", () => {
  it("renders the brand link to the homepage", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: /Dhira Industries/i })).toHaveAttribute("href", "/");
  });

  it("does not render links for planned (not-yet-built) routes", () => {
    render(<SiteHeader />);
    const renderedHrefs = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));

    for (const href of plannedHrefs) {
      expect(renderedHrefs).not.toContain(href);
    }
  });

  it("renders no navigation links beyond known routes", () => {
    render(<SiteHeader />);
    const renderedHrefs = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));

    expect(renderedHrefs).toEqual(["/"]);
  });
});
