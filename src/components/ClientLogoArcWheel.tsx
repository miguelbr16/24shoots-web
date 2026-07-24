"use client";

import Image from "next/image";
import type { ClientLogo } from "@/lib/types";

interface ClientLogoArcWheelProps {
  clients: ClientLogo[];
  ariaLabel: string;
}

function monogram(client: ClientLogo): string {
  return client.monogram ?? client.name.slice(0, 3).toUpperCase();
}

export function ClientLogoArcWheel({ clients, ariaLabel }: ClientLogoArcWheelProps) {
  const n = clients.length;
  if (n === 0) return null;

  const step = 360 / n;

  return (
    <div
      className="client-wheel-group relative mx-auto w-full max-w-4xl"
      aria-label={ariaLabel}
    >
      <div className="relative h-[clamp(11rem,32vw,17.5rem)] overflow-hidden">
        <div
          className="pointer-events-auto absolute left-1/2 bottom-0 aspect-square w-[min(132vw,42rem)] -translate-x-1/2 translate-y-[62%] scale-[0.82] sm:scale-90 md:scale-100"
          aria-hidden
        >
          <div className="client-wheel-spin relative h-full w-full origin-center">
            <div className="absolute inset-[4%] rounded-full border border-border/50 bg-elevated/20" />

            {clients.map((client, i) => {
              const angle = i * step - 90;
              return (
                <div
                  key={client.id}
                  className="absolute left-1/2 top-1/2 h-0 w-0"
                  style={{
                    transform: `rotate(${angle}deg) translateY(calc(-1 * min(46vw, 19rem)))`,
                  }}
                >
                  <div
                    className="absolute left-0 top-0"
                    style={{ transform: `rotate(${-angle}deg) translate(-50%, -50%)` }}
                  >
                    <div className="client-wheel-counter">
                      <div
                        className="flex h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-full bg-[#f3f2ef] shadow-[0_8px_28px_rgba(0,0,0,0.45)] ring-1 ring-white/20 sm:h-14 sm:w-14 md:h-[3.75rem] md:w-[3.75rem]"
                        title={client.name}
                      >
                        {client.logo ? (
                          <Image
                            src={client.logo}
                            alt={client.name}
                            width={56}
                            height={56}
                            unoptimized
                            className="h-[70%] w-[70%] object-contain"
                          />
                        ) : (
                          <span className="text-[9px] font-bold uppercase tracking-wide text-neutral-800 sm:text-[10px]">
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
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
