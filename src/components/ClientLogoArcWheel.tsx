"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { ClientLogo } from "@/lib/types";
import type { ReactNode } from "react";

interface ClientLogoArcWheelProps {
  clients: ClientLogo[];
  ariaLabel: string;
  center: ReactNode;
}

const TARGET_LOGO_COUNT = 22;
const LOGO_RADIUS = "min(71vw, 28.5rem)";

function monogram(client: ClientLogo): string {
  return client.monogram ?? client.name.slice(0, 3).toUpperCase();
}

function buildWheelClients(clients: ClientLogo[]): ClientLogo[] {
  if (clients.length === 0) return [];
  if (clients.length >= TARGET_LOGO_COUNT) return clients.slice(0, TARGET_LOGO_COUNT);
  const out: ClientLogo[] = [];
  for (let i = 0; i < TARGET_LOGO_COUNT; i++) {
    out.push(clients[i % clients.length]);
  }
  return out;
}

export function ClientLogoArcWheel({ clients, ariaLabel, center }: ClientLogoArcWheelProps) {
  const wheelClients = useMemo(() => buildWheelClients(clients), [clients]);
  const n = wheelClients.length;
  if (n === 0) return null;

  const step = 360 / n;
  const uniqueCount = clients.length;

  return (
    <div
      className="client-wheel-group relative mx-auto w-full max-w-[64rem]"
      aria-label={ariaLabel}
    >
      <div className="relative h-[clamp(22rem,68vw,32rem)] overflow-hidden md:h-[32rem]">
        {/* Large wheel — center aligned with copy; top/bottom clipped */}
        <div
          className="pointer-events-auto absolute left-1/2 top-[48%] z-0 aspect-square w-[min(200vw,64rem)] -translate-x-1/2 -translate-y-[44%]"
          aria-hidden
        >
          <div className="client-wheel-spin relative h-full w-full origin-center">
            <div className="absolute inset-[2%] rounded-full border border-border/60 bg-transparent" />

            {wheelClients.map((client, i) => {
              const angle = i * step - 90;
              const isDuplicate = i >= uniqueCount;
              return (
                <div
                  key={`${client.id}-${i}`}
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
                        className="flex h-[3.75rem] w-[3.75rem] items-center justify-center overflow-hidden rounded-full border border-border/80 bg-elevated shadow-[0_12px_32px_rgba(0,0,0,0.5)] ring-1 ring-accent/20 sm:h-16 sm:w-16 md:h-[4.25rem] md:w-[4.25rem]"
                        title={client.name}
                        aria-hidden={isDuplicate}
                      >
                        {client.logo ? (
                          <Image
                            src={client.logo}
                            alt={isDuplicate ? "" : client.name}
                            width={68}
                            height={68}
                            unoptimized
                            className="h-[72%] w-[72%] object-contain"
                          />
                        ) : (
                          <span className="text-[9px] font-bold uppercase tracking-wide text-foreground/90">
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
          className="pointer-events-none absolute inset-0 z-[15] bg-[radial-gradient(ellipse_50%_42%_at_50%_48%,var(--color-background)_0%,var(--color-background)_38%,transparent_72%)]"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-4">
          <div className="pointer-events-auto w-full max-w-[17rem] text-center sm:max-w-xs md:max-w-sm">
            {center}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-background to-transparent md:h-12"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
