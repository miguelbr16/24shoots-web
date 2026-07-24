"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { ClientLogo, Locale } from "@/lib/types";
import { getRoute } from "@/lib/i18n";
import { Button } from "./ui";

interface ClientLogoWheelProps {
  locale: Locale;
  clients: ClientLogo[];
  headline: string;
  headlineAccent: string;
  subline: string;
  dragHint: string;
  privacyNote: string;
  ctaLabel: string;
}

function label(client: ClientLogo): string {
  return client.monogram ?? client.name.slice(0, 3).toUpperCase();
}

export function ClientLogoWheel({
  locale,
  clients,
  headline,
  headlineAccent,
  subline,
  dragHint,
  privacyNote,
  ctaLabel,
}: ClientLogoWheelProps) {
  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

  const n = clients.length;
  const step = n > 0 ? 360 / n : 0;
  const radius = "min(38vw, 168px)";

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
    setRotation(startRotation.current + (e.clientX - startX.current) * 0.35);
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  return (
    <section className="border-y border-border bg-panel py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="relative mx-auto flex max-w-lg flex-col items-center">
          <div
            className="relative h-[min(92vw,420px)] w-[min(92vw,420px)] touch-none select-none"
            role="application"
            aria-label={dragHint}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className="pointer-events-none absolute inset-[8%] rounded-full border border-border/60"
              aria-hidden
            />

            <div
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {clients.map((client, i) => {
                const angle = i * step;
                return (
                  <div
                    key={client.id}
                    className="absolute left-1/2 top-1/2 w-0"
                    style={{
                      transform: `rotate(${angle}deg) translateY(calc(-1 * ${radius}))`,
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2"
                      style={{ transform: `rotate(${-(angle + rotation)}deg)` }}
                    >
                      <div
                        className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-black/5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] md:h-[4.75rem] md:w-[4.75rem]"
                        title={client.name}
                      >
                        {client.logo ? (
                          <Image
                            src={client.logo}
                            alt={client.name}
                            width={56}
                            height={56}
                            className="max-h-[2.25rem] max-w-[2.75rem] object-contain p-1.5"
                          />
                        ) : (
                          <span className="px-1.5 text-center text-[9px] font-bold uppercase leading-tight tracking-wide text-neutral-800 md:text-[10px]">
                            {label(client)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-10">
              <p className="text-4xl font-light tracking-tight text-foreground md:text-[2.75rem] md:leading-none">
                {headline}
              </p>
              <p className="mt-2 text-base font-medium text-accent md:text-lg">{headlineAccent}</p>
              <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted md:max-w-xs">
                {subline}
              </p>
              <div className="pointer-events-auto mt-8">
                <Button href={getRoute(locale, "contact")} showArrow className="!text-[10px]">
                  {ctaLabel}
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-[11px] uppercase tracking-[0.2em] text-muted">
            {dragHint}
          </p>
          <p className="mt-3 max-w-md text-center text-xs leading-relaxed text-muted/80">
            {privacyNote}
          </p>
        </div>
      </div>
    </section>
  );
}
