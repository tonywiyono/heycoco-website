"use client";

import { cn } from "@/lib/cn";
import type { ClientLogo } from "@/lib/types/content";
import Image from "next/image";

type LogoMarqueeProps = {
  logos: ClientLogo[];
  className?: string;
};

export function LogoMarquee({ logos, className }: LogoMarqueeProps) {
  if (!logos.length) return null;

  const track = [...logos, ...logos];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-label="Client logos"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-accent to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-accent to-transparent sm:w-16" />

      <div className="logo-marquee-track flex w-max items-center gap-10 py-2 sm:gap-14">
        {track.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex h-10 shrink-0 items-center justify-center sm:h-12"
          >
            {logo.logo ? (
              <Image
                src={logo.logo}
                alt={logo.name}
                width={140}
                height={48}
                className="h-8 w-auto max-w-[140px] object-contain opacity-90 brightness-0 invert sm:h-10"
              />
            ) : (
              <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-base">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
