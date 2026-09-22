import { Container } from "@/components/ui/container";

/**
 * Slim announcement bar. Renders only when copy exists in SiteSetting
 * ("announcement_bar") - never hardcoded business messaging.
 */
export function AnnouncementBar({ text }: { text: string | null }) {
  if (!text) return null;

  return (
    <div className="bg-cocoa-900 py-2.5 text-cream-100">
      <Container className="flex items-center justify-center">
        <p className="text-center text-[11px] font-medium uppercase tracking-widest text-gold-200/90 sm:text-xs">
          {text}
        </p>
      </Container>
    </div>
  );
}
