import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "./site-footer";
import { FOOTER_COLUMNS } from "@/config/navigation";

const plannedHrefs = FOOTER_COLUMNS.flatMap((column) => column.links)
  .filter((item) => item.status === "planned")
  .map((item) => item.href);

describe("SiteFooter", () => {
  it("renders brand/support copy", () => {
    render(<SiteFooter />);
    expect(screen.getByText(/crafted for those who value provenance/i)).toBeInTheDocument();
  });

  it("does not render links for planned (not-yet-built) routes", () => {
    render(<SiteFooter />);
    const renderedHrefs = screen
      .queryAllByRole("link")
      .map((link) => link.getAttribute("href"));

    for (const href of plannedHrefs) {
      expect(renderedHrefs).not.toContain(href);
    }
  });

  it("renders no dead links while all footer destinations are planned", () => {
    render(<SiteFooter />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
