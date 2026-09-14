import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Explore</Button>);
    expect(screen.getByRole("button", { name: "Explore" })).toBeInTheDocument();
  });

  it("applies the primary variant by default", () => {
    render(<Button>Shop Now</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-cocoa-700");
  });
});
