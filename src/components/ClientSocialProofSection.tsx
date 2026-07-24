"use client";

import type { ClientLogo, Locale } from "@/lib/types";
import { getRoute } from "@/lib/i18n";
import { Button } from "./ui";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { ClientLogoArcWheel } from "./ClientLogoArcWheel";

interface Review {
  quote: string;
  author: string;
  role: string;
  service: string;
}

interface ClientSocialProofSectionProps {
  locale: Locale;
  clients: ClientLogo[];
  headline: string;
  headlineAccent: string;
  subline: string;
  dragHint: string;
  privacyNote: string;
  ctaLabel: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  reviews: Review[];
}

export function ClientSocialProofSection({
  locale,
  clients,
  headline,
  headlineAccent,
  subline,
  dragHint,
  privacyNote,
  ctaLabel,
  reviewsTitle,
  reviewsSubtitle,
  reviews,
}: ClientSocialProofSectionProps) {
  return (
    <section className="relative border-y border-border bg-background">
      <div className="relative overflow-hidden pt-6 md:pt-10">
        <div className="relative z-20 mx-auto max-w-3xl px-4 text-center">
          <p className="text-3xl font-light tracking-tight text-foreground md:text-[2.5rem] md:leading-tight">
            {headline}
          </p>
          <p className="mt-1 text-lg font-medium text-accent md:text-xl">{headlineAccent}</p>
          <p className="mx-auto mt-3 hidden max-w-md text-sm text-muted md:block">{subline}</p>
          <div className="relative z-30 mt-6">
            <Button
              href={getRoute(locale, "contact")}
              showArrow
              className="!rounded-full !px-6 !py-3.5 !text-[10px] shadow-lg shadow-accent/25"
            >
              {ctaLabel}
            </Button>
          </div>
        </div>

        <div className="-mt-2 md:-mt-4">
          <ClientLogoArcWheel clients={clients} ariaLabel={dragHint} />
        </div>

        <p className="relative z-10 -mt-1 pb-3 text-center text-[10px] uppercase tracking-[0.22em] text-muted/70">
          {dragHint}
        </p>
      </div>

      <div className="relative z-20 bg-surface pb-20 pt-4 md:pb-28 md:pt-6">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <ReviewsCarousel title={reviewsTitle} subtitle={reviewsSubtitle} items={reviews} />
          <p className="mx-auto mt-10 max-w-lg text-center text-xs leading-relaxed text-muted/75">
            {privacyNote}
          </p>
        </div>
      </div>
    </section>
  );
}
