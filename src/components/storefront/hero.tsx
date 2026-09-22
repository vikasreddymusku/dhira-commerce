import Image from "next/image";
import { Container } from "@/components/ui/container";
import { EditorialMedia } from "@/components/storefront/editorial-media";
import type { HomepageSectionContent } from "@/server/services/storefront/homepage.service";

/**
 * Homepage hero - asymmetric editorial composition (not centered
 * heading+paragraph+button). Copy comes from the "hero" HomepageSection;
 * falls back to nothing extra if unpublished (no hardcoded business claims).
 */
export function Hero({ content }: { content: HomepageSectionContent | null }) {
  const title = content?.title ?? "Dhira Industries";
  const subtitle = content?.subtitle ?? "";
  const body = content?.body ?? "";

  return (
    <section className="relative overflow-hidden bg-cocoa-950">
      <Container className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10 flex flex-col justify-center gap-8 py-20 pr-0 lg:py-32 lg:pr-16">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold-300/70" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-300">
              Single-Origin &middot; Est. 2010
            </span>
          </div>

          <h1 className="max-w-xl font-display text-5xl leading-[1.05] text-cream-50 sm:text-6xl lg:text-[4rem]">
            {title}
          </h1>

          {subtitle && (
            <p className="max-w-md font-display text-xl italic leading-relaxed text-cream-200/90 sm:text-2xl">
              {subtitle}
            </p>
          )}

          {body && (
            <p className="max-w-md text-base leading-relaxed text-cream-200/70">{body}</p>
          )}

          <div className="mt-2 flex items-center gap-4">
            <Image
              src="/brand/dhira-logo.png.jpeg"
              alt="Dhira Industries mark"
              width={40}
              height={40}
              className="h-10 w-10 object-contain opacity-90"
            />
            <span className="text-xs uppercase tracking-widest text-cream-200/60">
              Traceable from estate to bar
            </span>
          </div>
        </div>

        <div className="relative min-h-[420px] lg:min-h-[640px]">
          <EditorialMedia
            tone="cocoa"
            aspect="h-full"
            className="absolute inset-0 lg:-mr-6"
            caption="Single-origin cocoa, worked by hand"
          />
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream-50/10 to-transparent" />
    </section>
  );
}
