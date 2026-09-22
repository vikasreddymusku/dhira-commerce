import { Container } from "@/components/ui/container";
import { EditorialMedia } from "@/components/storefront/editorial-media";
import type { HomepageSectionContent } from "@/server/services/storefront/homepage.service";

const TONES = ["cocoa", "gold", "leaf", "cream", "cocoa", "gold"] as const;

export function SocialSection({ content }: { content: HomepageSectionContent | null }) {
  if (!content) return null;

  return (
    <section className="bg-cream-100 py-24 sm:py-32">
      <Container>
        <div className="mb-14 flex flex-col gap-3 sm:mb-20">
          {content.subtitle && (
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              {content.subtitle}
            </span>
          )}
          {content.title && (
            <h2 className="font-display text-3xl text-cocoa-900 sm:text-4xl">{content.title}</h2>
          )}
          {content.body && (
            <p className="max-w-md text-sm leading-relaxed text-cocoa-600">{content.body}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {TONES.map((tone, index) => (
            <EditorialMedia key={index} tone={tone} aspect="aspect-square" />
          ))}
        </div>
      </Container>
    </section>
  );
}
