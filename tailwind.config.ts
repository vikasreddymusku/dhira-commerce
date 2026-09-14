import type { Config } from "tailwindcss";

/**
 * Dhira Industries design tokens.
 *
 * Palette rationale:
 * - cocoa: deep, premium chocolate brown - primary brand color, used for
 *   headings, dark surfaces, and primary buttons.
 * - cream: warm off-white - primary background, communicates warmth and
 *   editorial calm rather than clinical e-commerce white.
 * - gold: restrained metallic accent - used sparingly for highlights,
 *   dividers, and premium cues (never as a dominant fill).
 * - leaf: natural, muted green - used sparingly for provenance/organic cues.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        cocoa: {
          50: "#f6efe9",
          100: "#e9d9cb",
          200: "#d3b596",
          300: "#b98e66",
          400: "#8f603f",
          500: "#5c3a28",
          600: "#432a1d",
          700: "#331f16",
          800: "#25160f",
          900: "#180e09",
          950: "#0f0805",
        },
        cream: {
          50: "#fffdfa",
          100: "#fbf5ea",
          200: "#f5ebd7",
          300: "#ecdcbc",
          400: "#dfc699",
          500: "#cdac74",
        },
        gold: {
          100: "#f4e6c2",
          200: "#e8cf8f",
          300: "#d4af5f",
          400: "#b8903f",
          500: "#96742f",
          600: "#755823",
        },
        leaf: {
          100: "#e4e9d9",
          200: "#c8d3b3",
          300: "#a3b481",
          400: "#7c925a",
          500: "#5c7040",
          600: "#455530",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.4" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.7" }],
        lg: ["1.125rem", { lineHeight: "1.7" }],
        xl: ["1.25rem", { lineHeight: "1.6" }],
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["1.953rem", { lineHeight: "1.3" }],
        "4xl": ["2.441rem", { lineHeight: "1.2" }],
        "5xl": ["3.052rem", { lineHeight: "1.1" }],
        "6xl": ["3.815rem", { lineHeight: "1.05" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      maxWidth: {
        container: "1280px",
        prose: "68ch",
      },
      letterSpacing: {
        wide: "0.03em",
        wider: "0.08em",
        widest: "0.16em",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(24, 14, 9, 0.06), 0 4px 16px -4px rgba(24, 14, 9, 0.10)",
        elevated: "0 8px 30px -8px rgba(24, 14, 9, 0.25)",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
export default config;
