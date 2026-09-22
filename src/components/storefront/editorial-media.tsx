import { cn } from "@/lib/utils";

type EditorialMediaTone = "cocoa" | "cream" | "gold" | "leaf";

const TONE_GRADIENTS: Record<EditorialMediaTone, string> = {
  cocoa:
    "bg-[radial-gradient(circle_at_30%_20%,#5c3a28_0%,#331f16_55%,#180e09_100%)]",
  cream:
    "bg-[radial-gradient(circle_at_70%_30%,#f5ebd7_0%,#e9d9cb_55%,#d3b596_100%)]",
  gold: "bg-[radial-gradient(circle_at_50%_20%,#e8cf8f_0%,#b8903f_60%,#755823_100%)]",
  leaf: "bg-[radial-gradient(circle_at_40%_25%,#c8d3b3_0%,#7c925a_60%,#455530_100%)]",
};

/**
 * Placeholder editorial imagery.
 *
 * Real photography does not exist yet for Phase 2. This renders a
 * high-quality, brand-toned gradient "plate" (with a subtle grain overlay
 * and an optional caption) that stands in for a photo, so it never looks
 * like a broken/empty image box. Once photography is available, pass a real
 * `src` through the same `caption`/`aspect` contract - no visual component
 * needs to change.
 */
export function EditorialMedia({
  tone = "cocoa",
  caption,
  aspect = "aspect-[4/5]",
  className,
}: {
  tone?: EditorialMediaTone;
  caption?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-none",
        TONE_GRADIENTS[tone],
        aspect,
        className,
      )}
      role="img"
      aria-label={caption ?? "Dhira Industries editorial imagery placeholder"}
    >
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      {caption && (
        <p className="absolute bottom-4 left-4 right-4 text-xs font-medium uppercase tracking-widest text-cream-50/80">
          {caption}
        </p>
      )}
    </div>
  );
}
