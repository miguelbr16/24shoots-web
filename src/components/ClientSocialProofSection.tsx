"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import type { ClientLogo, Locale } from "@/lib/types";
import { getRoute } from "@/lib/i18n";
import { Button } from "./ui";
import { ReviewsCarousel } from "./ReviewsCarousel";

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

function label(client: ClientLogo): string {
  return client.monogram ?? client.name.slice(0, 3).toUpperCase();
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
  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

  const n = clients.length;
  const step = n > 0 ? 360 / n : 0;

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      dragging.current = true;
      startX.current = e.clientX;
      startRotation.current = rotation;
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [rotation]
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setRotation(startRotation.current + (e.clientX - startX.current) * 0.32);
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  return (
    <section className="relative border-y border-border bg-background">
      <div className="relative overflow-hidden pb-2">
        <div
          className="relative mx-auto h-[380px] max-w-4xl touch-none select-none md:h-[440px]"
          role="application"
          aria-label={dragHint}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {/* Headline above the arc */}
          <div className="pointer-events-none relative z-20 px-4 pt-6 text-center md:pt-10">
            <p className="text-3xl font-light tracking-tight text-foreground md:text-[2.5rem] md:leading-tight">
              {headline}
            </p>
            <p className="mt-1 text-lg font-medium text-accent md:text-xl">{headlineAccent}</p>
            <p className="mx-auto mt-3 hidden max-w-md text-sm text-muted md:block">{subline}</p>
            <div className="pointer-events-auto mt-6">
              <Button
                href={getRoute(locale, "contact")}
                showArrow
                className="!rounded-full !px-6 !py-3.5 !text-[10px] shadow-lg shadow-accent/25"
              >
                {ctaLabel}
              </Button>
            </div>
          </div>

          {/* Wheel — bottom half clipped */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] overflow-hidden md:top-[38%]">
            <div className="absolute left-1/2 top-full h-[min(105vw,580px)] w-[min(105vw,580px)] -translate-x-1/2 -translate-y-[8%]">
              <div
                className="absolute inset-0 cursor-grab active:cursor-grabbing pointer-events-auto"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div
                  className="absolute inset-[2%] rounded-full border border-border/50"
                  aria-hidden
                />
                {clients.map((client, i) => {
                  const angle = i * step - 90;
                  const r = "min(36vw, 240px)";
                  return (
                    <div
                      key={client.id}
                      className="absolute left-1/2 top-1/2 w-0"
                      style={{
                        transform: `rotate(${angle}deg) translateY(calc(-1 * ${r}))`,
                      }}
                    >
                      <div
                        className="absolute left-1/2 top-1/2"
                        style={{
                          transform: `rotate(${-(angle + rotation)}deg) translate(-50%, -50%)`,
                        }}
                      >
                        <div
                          className="flex h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-full border border-black/8 bg-white shadow-[0_10px_32px_rgba(0,0,0,0.5)] md:h-[3.5rem] md:w-[3.5rem]"
                          title={client.name}
                        >
                          {client.logo ? (
                            <Image
                              src={client.logo}
                              alt={client.name}
                              width={44}
                              height={44}
                              loading="lazy"
                              className="h-full w-full object-contain p-1.5"
                            />
                          ) : (
                            <span className="text-[9px] font-bold uppercase tracking-wide text-neutral-800">
                              {label(client)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-surface via-surface/95 to-transparent md:h-40"
            aria-hidden
          />
        </div>

        <p className="relative z-10 text-center text-[10px] uppercase tracking-[0.22em] text-muted/70">
          {dragHint}
        </p>
      </div>

      <div className="relative z-20 -mt-4 bg-surface pb-20 pt-2 md:-mt-8 md:pb-28 md:pt-4">
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
