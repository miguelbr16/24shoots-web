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

/** Radius matches ~44% of wheel diameter (see --wheel-diam in styles). */
const LOGO_RADIUS = "min(62vw, 24.5rem)";

export function ClientLogoArcWheel({ clients, ariaLabel, center }: ClientLogoArcWheelProps) {
  const n = clients.length;
  if (n === 0) return null;

  const step = 360 / n;

  return (
    <div
      className="client-wheel-group relative mx-auto w-full max-w-[56rem] px-2"
      aria-label={ariaLabel}
    >
      <div className="relative h-[clamp(19rem,52vw,30rem)] overflow-hidden">
        <div
          className="pointer-events-auto absolute left-1/2 bottom-0 aspect-square w-[min(148vw,56rem)] -translate-x-1/2 translate-y-[56%]"
          style={{ ["--wheel-diam" as string]: "min(148vw, 56rem)" }}
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
                        className="flex h-[4.25rem] w-[4.25rem] items-center justify-center overflow-hidden rounded-full border border-border bg-elevated shadow-[0_14px_36px_rgba(0,0,0,0.55)] ring-1 ring-accent/25 sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20"
                        title={client.name}
                      >
                        {client.logo ? (
                          <Image
                            src={client.logo}
                            alt={client.name}
                            width={72}
                            height={72}
                            unoptimized
                            className="h-[72%] w-[72%] object-contain"
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

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-4 pt-[clamp(1.5rem,8vw,3.5rem)]">
          <div className="pointer-events-auto max-w-md text-center">{center}</div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-background via-background/70 to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
