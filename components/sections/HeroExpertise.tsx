"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import type { ExpertiseItem } from "@/lib/types/content";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const AUTO_INTERVAL_MS = 5000;

type HeroExpertiseProps = {
  items: ExpertiseItem[];
  sectionTitle?: string;
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
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm transition-colors hover:bg-white/20"
      aria-label={label}
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}

export function HeroExpertise({
  items,
  sectionTitle = "Our Expertise",
}: HeroExpertiseProps) {
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
      className="flex min-h-0 flex-1 flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h3 className="mb-3 text-base font-bold text-text-primary sm:mb-4 sm:text-lg">
        {sectionTitle}
      </h3>

      <BentoCard
        variant="accent"
        hover={false}
        className="relative flex min-h-[260px] flex-1 flex-col overflow-hidden p-5 sm:min-h-[300px] sm:p-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <h4 className="text-base font-bold leading-snug text-white sm:text-lg">
              {item.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-white/90 sm:mt-3 sm:text-sm">
              {item.description}
            </p>
            {item.image ? (
              <div className="relative mt-4 min-h-[120px] flex-1 overflow-hidden rounded-2xl sm:mt-5">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {count > 1 ? (
          <div className="absolute bottom-5 right-5 flex gap-2 sm:bottom-6 sm:right-6">
            <NavButton direction="prev" onClick={goPrev} label="Previous expertise" />
            <NavButton direction="next" onClick={goNext} label="Next expertise" />
          </div>
        ) : null}
      </BentoCard>
    </div>
  );
}
