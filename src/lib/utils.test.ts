import { describe, expect, it } from "vitest";
import { cn, formatPriceFromPaise } from "./utils";

describe("cn", () => {
  it("merges class names and resolves conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-cocoa-800", undefined, "font-medium")).toBe("text-cocoa-800 font-medium");
  });
});

describe("formatPriceFromPaise", () => {
  it("formats paise as INR currency", () => {
    expect(formatPriceFromPaise(129900)).toBe("₹1,299");
  });

  it("rounds to the nearest rupee", () => {
    expect(formatPriceFromPaise(4999)).toBe("₹50");
  });
});
