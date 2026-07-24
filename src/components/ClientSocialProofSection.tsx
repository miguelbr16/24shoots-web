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
  headlineBrand?: string;
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
  headlineBrand = "24Shoots",
  subline,
  dragHint,
  privacyNote,
  ctaLabel,
  reviewsTitle,
  reviewsSubtitle,
  reviews,
}: ClientSocialProofSectionProps) {
  const center = (
    <>
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
        Valencia · España
      </p>
      <h2 className="mt-4 text-balance leading-[1.12] tracking-tight">
        <span className="block text-[clamp(1.65rem,4.2vw,2.65rem)] font-semibold text-foreground">
          {headline}
        </span>
        <span className="mt-1 block text-[clamp(1.65rem,4.2vw,2.65rem)]">
          <span className="font-light text-foreground/85">{headlineAccent}</span>{" "}
          <span className="font-serif text-[1.05em] italic text-accent">{headlineBrand}</span>
        </span>
      </h2>
      <p className="mx-auto mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted md:max-w-sm">
        {subline}
      </p>
      <div className="mt-7">
        <Button
          href={getRoute(locale, "contact")}
          showArrow
          className="!rounded-full !px-7 !py-3.5 !text-[10px] !tracking-[0.18em] shadow-lg shadow-accent/30"
        >
          {ctaLabel}
        </Button>
      </div>
    </>
  );

  return (
    <section className="relative border-y border-border bg-background">
      <div className="relative overflow-hidden py-4 md:py-6">
        <ClientLogoArcWheel clients={clients} ariaLabel={dragHint} center={center} />

        <p className="relative z-10 -mt-1 pb-2 text-center text-[10px] uppercase tracking-[0.22em] text-muted/70">
          {dragHint}
        </p>
      </div>

      <div className="relative z-20 bg-surface pb-20 pt-6 md:pb-28 md:pt-8">
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
