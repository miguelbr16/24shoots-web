"use client";

import Image from "next/image";
import type { ClientLogo } from "@/lib/types";
import type { ReactNode } from "react";

interface ClientLogoArcWheelProps {
  clients: ClientLogo[];
  ariaLabel: string;
  center: ReactNode;
}

function monogram(client: ClientLogo): string {
  return client.monogram ?? client.name.slice(0, 3).toUpperCase();
}

/** Outer rim of the wheel (~48% of diameter) — keeps logos away from center copy. */
const LOGO_RADIUS = "min(68vw, 27rem)";

export function ClientLogoArcWheel({ clients, ariaLabel, center }: ClientLogoArcWheelProps) {
  const n = clients.length;
  if (n === 0) return null;

  const step = 360 / n;

  return (
    <div
      className="client-wheel-group relative mx-auto w-full max-w-[56rem] px-2"
      aria-label={ariaLabel}
    >
      <div className="relative h-[clamp(21rem,56vw,33rem)] overflow-hidden">
        <div
          className="pointer-events-auto absolute left-1/2 bottom-0 z-0 aspect-square w-[min(152vw,58rem)] -translate-x-1/2 translate-y-[68%]"
          style={{ ["--wheel-diam" as string]: "min(152vw, 58rem)" }}
          aria-hidden
        >
          <div className="client-wheel-spin relative h-full w-full origin-center">
            <div className="absolute inset-[2.5%] rounded-full border border-border/70 bg-elevated/15 shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />

            {clients.map((client, i) => {
              const angle = i * step - 90;
              return (
                <div
                  key={client.id}
                  className="absolute left-1/2 top-1/2 h-0 w-0"
                  style={{
                    transform: `rotate(${angle}deg) translateY(calc(-1 * ${LOGO_RADIUS}))`,
                  }}
                >
                  <div
                    className="absolute left-0 top-0"
                    style={{ transform: `rotate(${-angle}deg) translate(-50%, -50%)` }}
                  >
                    <div className="client-wheel-counter">
                      <div
                        className="flex h-[4.75rem] w-[4.75rem] items-center justify-center overflow-hidden rounded-full border border-border bg-elevated shadow-[0_14px_36px_rgba(0,0,0,0.55)] ring-1 ring-accent/25 sm:h-20 sm:w-20 md:h-[5.25rem] md:w-[5.25rem] lg:h-24 lg:w-24"
                        title={client.name}
                      >
                        {client.logo ? (
                          <Image
                            src={client.logo}
                            alt={client.name}
                            width={80}
                            height={80}
                            unoptimized
                            className="h-[74%] w-[74%] object-contain"
                          />
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-foreground/90 md:text-[11px]">
                            {monogram(client)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[15] bg-[radial-gradient(ellipse_58%_48%_at_50%_36%,var(--color-background)_0%,var(--color-background)_42%,transparent_78%)]"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-4 pt-3 sm:pt-4 md:pt-5">
          <div className="pointer-events-auto max-w-[18rem] text-center sm:max-w-xs md:max-w-sm">
            {center}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-background via-background/70 to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
