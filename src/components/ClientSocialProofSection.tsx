"use client";

import { useCallback, useMemo, useRef, useState } from "react";
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  const orderedClients = useMemo(() => shuffle(clients), [clients]);

  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

  const n = orderedClients.length;
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
    setRotation(startRotation.current + (e.clientX - startX.current) * 0.28);
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  return (
    <section className="relative border-y border-border bg-background">
      {/* Clipped wheel — Surfly-style arc */}
      <div className="relative overflow-hidden">
        <div
          className="relative mx-auto h-[min(72vw,340px)] max-w-6xl touch-none select-none md:h-[400px]"
          role="application"
          aria-label={dragHint}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="absolute left-1/2 top-[108%] h-[min(130vw,640px)] w-[min(130vw,640px)] -translate-x-1/2 -translate-y-1/2 md:top-[112%]">
            <div
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div
                className="absolute inset-0 rounded-full border border-border/40"
                aria-hidden
              />

              {orderedClients.map((client, i) => {
                const angle = i * step;
                const r = "min(42vw, 268px)";
                return (
                  <div
                    key={client.id}
                    className="absolute left-1/2 top-1/2 w-0"
                    style={{
                      transform: `rotate(${angle}deg) translateY(calc(-1 * ${r}))`,
                    }}
                  >
                    <div
                      style={{ transform: `rotate(${-(angle + rotation)}deg)` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-black/[0.06] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] md:h-[3.75rem] md:w-[3.75rem]"
                        title={client.name}
                      >
                        {client.logo ? (
                          <Image
                            src={client.logo}
                            alt={client.name}
                            width={48}
                            height={48}
                            className="max-h-[1.65rem] max-w-[2.25rem] object-contain p-1 md:max-h-[1.85rem]"
                          />
                        ) : (
                          <span className="px-1 text-[8px] font-bold uppercase tracking-wide text-neutral-800 md:text-[9px]">
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

          {/* Center copy — fixed, not rotating */}
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-4 pt-16 text-center md:justify-center md:pb-0 md:pt-0">
            <p className="max-w-[18rem] text-[1.65rem] font-light leading-tight tracking-tight text-foreground md:max-w-md md:text-4xl">
              {headline}{" "}
              <span className="font-medium text-accent">{headlineAccent}</span>
            </p>
            <p className="mt-3 hidden max-w-xs text-sm text-muted md:block">{subline}</p>
            <div className="pointer-events-auto mt-6 md:mt-8">
              <Button
                href={getRoute(locale, "contact")}
                showArrow
                className="!rounded-full !px-6 !py-3.5 !text-[10px] shadow-lg shadow-accent/20"
              >
                {ctaLabel}
              </Button>
            </div>
          </div>

          {/* Cut + blend into reviews */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-surface via-surface/90 to-transparent md:h-36"
            aria-hidden
          />
        </div>

        <p className="relative z-10 -mt-2 pb-2 text-center text-[10px] uppercase tracking-[0.22em] text-muted/70">
          {dragHint}
        </p>
      </div>

      {/* Reviews band — overlaps wheel cut */}
      <div className="relative z-30 -mt-6 bg-surface pb-20 pt-4 md:-mt-10 md:pb-28 md:pt-6">
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
