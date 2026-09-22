"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { HomepageSectionContent } from "@/server/services/storefront/homepage.service";

/**
 * Newsletter signup. Client-side only for the small form-state interaction;
 * no submission endpoint exists yet in Phase 2, so we show a graceful local
 * confirmation rather than wiring a fake network call.
 */
export function NewsletterSection({ content }: { content: HomepageSectionContent | null }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!content) return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="bg-cocoa-900 py-24 text-cream-50 sm:py-28">
      <Container className="flex flex-col items-center gap-6 text-center">
        {content.subtitle && (
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-300">
            {content.subtitle}
          </span>
        )}
        {content.title && (
          <h2 className="max-w-lg font-display text-3xl sm:text-4xl">{content.title}</h2>
        )}
        {content.body && (
          <p className="max-w-md text-sm leading-relaxed text-cream-200/75">{content.body}</p>
        )}

        {submitted ? (
          <p className="mt-2 text-sm font-medium text-gold-200">
            Thank you - we&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-2 flex w-full max-w-sm flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="you@email.com"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-cream-100/20 bg-cream-50/5 text-cream-50 placeholder:text-cream-200/50 focus:border-gold-300"
            />
            <Button type="submit" variant="gold" className="shrink-0">
              Subscribe
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
