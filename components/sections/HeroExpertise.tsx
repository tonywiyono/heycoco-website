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
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <BentoCard
        variant="dark"
        hover={false}
        className="flex min-h-[300px] flex-1 flex-col p-5 sm:min-h-[340px] sm:p-6"
      >
        <h3 className="text-lg font-bold text-text-primary sm:text-xl">{sectionTitle}</h3>

        <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-2xl bg-accent p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <h4 className="text-sm font-semibold leading-snug text-white sm:text-base">
                {item.title}
              </h4>
              <p className="mt-3 text-xs leading-relaxed text-white/90 sm:text-sm">
                {item.description}
              </p>
              <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {count > 1 ? (
            <div className="mt-4 flex justify-end gap-2">
              <NavButton direction="prev" onClick={goPrev} label="Previous expertise" />
              <NavButton direction="next" onClick={goNext} label="Next expertise" />
            </div>
          ) : null}
        </div>
      </BentoCard>
    </div>
  );
}
