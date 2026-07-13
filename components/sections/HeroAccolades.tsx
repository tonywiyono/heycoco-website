"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import type { Award } from "@/lib/types/content";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const AUTO_INTERVAL_MS = 5000;

type HeroAccoladesProps = {
  items: Award[];
};

function NavButton({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm transition-colors hover:bg-white/20"
      aria-label={label}
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}

export function HeroAccolades({ items }: HeroAccoladesProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const goNext = useCallback(() => {
    if (count <= 1) return;
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    if (count <= 1) return;
    setIndex((i) => (i === 0 ? count - 1 : i - 1));
  }, [count]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = window.setInterval(goNext, AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [count, goNext, paused, index]);

  if (!count) return null;

  const item = items[index];

  return (
    <div
      className="min-h-0 flex-1"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <BentoCard
        variant="accent"
        hover={false}
        className="relative flex h-full min-h-[160px] flex-col justify-between overflow-hidden p-6 sm:min-h-[180px] sm:p-8"
      >
        <span
          className="absolute left-6 top-6 h-2 w-2 rounded-full bg-[#4ecdc4] sm:left-8 sm:top-8"
          aria-hidden
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-1 flex-col justify-center pt-4"
          >
            {item.logo ? (
              <div className="relative mx-auto h-12 w-full max-w-[160px] sm:h-14">
                <Image
                  src={item.logo}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-contain object-center"
                />
              </div>
            ) : (
              <p className="whitespace-pre-line text-center text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl">
                {item.headline}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-end justify-between gap-4">
          {item.caption ? (
            <p className="whitespace-pre-line text-xs leading-snug text-white/90 sm:text-sm">
              {item.caption}
            </p>
          ) : (
            <span aria-hidden />
          )}

          {count > 1 ? (
            <div className="flex shrink-0 gap-2">
              <NavButton direction="prev" onClick={goPrev} label="Previous accolade" />
              <NavButton direction="next" onClick={goNext} label="Next accolade" />
            </div>
          ) : null}
        </div>
      </BentoCard>
    </div>
  );
}
