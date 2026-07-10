"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import type { ExpertiseItem } from "@/content/expertise";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const PEEK_PX = 10;
const AUTO_INTERVAL_MS = 5000;

type HeroExpertiseProps = {
  items: ExpertiseItem[];
};

function ExpertiseCardContent({
  item,
  isActive,
}: {
  item: ExpertiseItem;
  isActive: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col p-4 sm:p-5">
      <h4
        className={cn(
          "text-sm font-semibold leading-snug sm:text-base",
          isActive ? "text-white" : "text-accent",
        )}
      >
        {item.title}
      </h4>

      {isActive && (
        <>
          <p className="mt-3 text-xs leading-relaxed text-white/85 sm:text-sm">
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
        </>
      )}
    </div>
  );
}

export function HeroExpertise({ items }: HeroExpertiseProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [index, setIndex] = useState(1);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);

  const count = items.length;

  const loopItems = useMemo(() => {
    if (count === 0) return [];
    if (count === 1) return items;
    return [items[count - 1], ...items, items[0]];
  }, [items, count]);

  const slideWidth = viewportWidth > 0 ? viewportWidth - PEEK_PX * 2 : 0;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => setViewportWidth(el.offsetWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goNext = useCallback(() => {
    if (count <= 1) return;
    setInstant(false);
    setIndex((i) => i + 1);
  }, [count]);

  const goPrev = useCallback(() => {
    if (count <= 1) return;
    setInstant(false);
    setIndex((i) => i - 1);
  }, [count]);

  // Jump to real slide after reaching clones (infinite loop)
  useEffect(() => {
    if (count <= 1) return;

    if (index === 0) {
      const timer = window.setTimeout(() => {
        setInstant(true);
        setIndex(count);
      }, 420);
      return () => window.clearTimeout(timer);
    }

    if (index === count + 1) {
      const timer = window.setTimeout(() => {
        setInstant(true);
        setIndex(1);
      }, 420);
      return () => window.clearTimeout(timer);
    }
  }, [index, count]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (count <= 1 || paused) return;

    const timer = window.setInterval(goNext, AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [count, goNext, paused, index]);

  if (!count) return null;

  const translateX = slideWidth > 0 ? -index * slideWidth + PEEK_PX : 0;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <BentoCard
      variant="dark"
      hover={false}
      className="relative flex min-h-[300px] flex-1 flex-col overflow-hidden p-5 sm:min-h-[340px] sm:p-6"
    >
      <h3 className="mb-4 text-lg font-bold text-text-primary sm:text-xl">Our Expertise</h3>

      <div
        ref={viewportRef}
        className="relative min-h-[220px] flex-1 overflow-hidden"
      >
        {slideWidth > 0 && (
          <motion.div
            className="flex h-full"
            animate={{ x: translateX }}
            transition={
              instant
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 32 }
            }
          >
            {loopItems.map((item, i) => {
              const isActive = i === index;

              return (
                <div
                  key={`${item.id}-${i}`}
                  className={cn(
                    "h-full shrink-0 overflow-hidden rounded-2xl transition-colors duration-300",
                    isActive
                      ? "bg-[#5b21b6] text-white shadow-lg"
                      : "bg-surface-card text-text-primary",
                  )}
                  style={{ width: slideWidth }}
                >
                  <ExpertiseCardContent item={item} isActive={isActive} />
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Left peek — click previous */}
        {count > 1 && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-0 z-20 h-full cursor-pointer"
            style={{ width: PEEK_PX }}
            aria-label="Previous expertise"
          />
        )}

        {/* Right peek — click next */}
        {count > 1 && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-0 z-20 h-full cursor-pointer"
            style={{ width: PEEK_PX }}
            aria-label="Next expertise"
          />
        )}
      </div>
    </BentoCard>
    </div>
  );
}
