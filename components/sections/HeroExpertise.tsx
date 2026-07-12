"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import type { ExpertiseItem } from "@/content/expertise";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const PEEK_PX = 10;
const HOVER_ZONE_RATIO = 0.32;
const AUTO_INTERVAL_MS = 5000;

type HeroExpertiseProps = {
  items: ExpertiseItem[];
};

type HoverSide = "left" | "right" | null;

function ExpertiseCardContent({
  item,
  isActive,
  preview = false,
}: {
  item: ExpertiseItem;
  isActive: boolean;
  preview?: boolean;
}) {
  return (
    <div className="flex h-full min-h-[220px] w-full flex-col p-4 sm:p-5">
      <h4
        className={cn(
          "text-sm font-semibold leading-snug sm:text-base",
          isActive ? "text-white" : "text-accent",
        )}
      >
        {item.title}
      </h4>

      {isActive ? (
        <>
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
        </>
      ) : preview ? (
        <>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-muted">
            {item.description}
          </p>
          <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden rounded-lg">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
        </>
      ) : null}
    </div>
  );
}

function PreviewCard({
  item,
  side,
}: {
  item: ExpertiseItem;
  side: "left" | "right";
}) {
  const swing = side === "left" ? [-5, -2, -5] : [5, 2, 5];
  const enterX = side === "left" ? -48 : 48;

  return (
    <motion.div
      key={`preview-${side}-${item.id}`}
      className={cn(
        "pointer-events-none absolute top-0 z-30 h-full w-[46%] overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-2xl",
        side === "left" ? "left-0 origin-left" : "right-0 origin-right",
      )}
      initial={{ opacity: 0, x: enterX, rotate: 0 }}
      animate={{
        opacity: 1,
        x: side === "left" ? "6%" : "-6%",
        rotate: swing,
      }}
      exit={{ opacity: 0, x: enterX, rotate: 0 }}
      transition={{
        opacity: { duration: 0.2 },
        x: { type: "spring", stiffness: 280, damping: 22 },
        rotate: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
      }}
    >
      <ExpertiseCardContent item={item} isActive={false} preview />
    </motion.div>
  );
}

export function HeroExpertise({ items }: HeroExpertiseProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [index, setIndex] = useState(1);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hoverSide, setHoverSide] = useState<HoverSide>(null);

  const count = items.length;

  const loopItems = useMemo(() => {
    if (count === 0) return [];
    if (count === 1) return items;
    return [items[count - 1], ...items, items[0]];
  }, [items, count]);

  const slideWidth = viewportWidth > 0 ? viewportWidth - PEEK_PX * 2 : 0;

  const prevItem = loopItems[index - 1];
  const nextItem = loopItems[index + 1];

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => setViewportWidth(el.offsetWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updateHoverSide = useCallback((clientX: number) => {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect || count <= 1) {
      setHoverSide(null);
      return;
    }

    const ratio = (clientX - rect.left) / rect.width;
    if (ratio < HOVER_ZONE_RATIO) setHoverSide("left");
    else if (ratio > 1 - HOVER_ZONE_RATIO) setHoverSide("right");
    else setHoverSide(null);
  }, [count]);

  const goNext = useCallback(() => {
    if (count <= 1) return;
    setInstant(false);
    setHoverSide(null);
    setIndex((i) => i + 1);
  }, [count]);

  const goPrev = useCallback(() => {
    if (count <= 1) return;
    setInstant(false);
    setHoverSide(null);
    setIndex((i) => i - 1);
  }, [count]);

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
        className="relative flex min-h-[300px] flex-1 flex-col overflow-hidden p-0 sm:min-h-[340px]"
      >
        <h3 className="px-5 pt-5 text-lg font-bold text-text-primary sm:px-6 sm:pt-6 sm:text-xl">
          Our Expertise
        </h3>

        <div
          ref={viewportRef}
          className="relative mt-4 min-h-[240px] w-full flex-1 overflow-hidden pb-5 sm:pb-6"
          onMouseMove={(e) => updateHoverSide(e.clientX)}
          onMouseLeave={() => setHoverSide(null)}
        >
          {slideWidth > 0 && (
            <motion.div
              className="flex h-full will-change-transform"
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
                        ? "bg-accent text-white shadow-lg"
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

          {/* Swinging preview overlays */}
          <AnimatePresence>
            {hoverSide === "left" && prevItem && (
              <PreviewCard item={prevItem} side="left" />
            )}
            {hoverSide === "right" && nextItem && (
              <PreviewCard item={nextItem} side="right" />
            )}
          </AnimatePresence>

          {count > 1 && (
            <button
              type="button"
              onClick={goPrev}
              onMouseEnter={() => setHoverSide("left")}
              className="absolute left-0 top-0 z-40 h-full cursor-pointer bg-transparent"
              style={{ width: `${HOVER_ZONE_RATIO * 100}%` }}
              aria-label="Previous expertise"
            />
          )}

          {count > 1 && (
            <button
              type="button"
              onClick={goNext}
              onMouseEnter={() => setHoverSide("right")}
              className="absolute right-0 top-0 z-40 h-full cursor-pointer bg-transparent"
              style={{ width: `${HOVER_ZONE_RATIO * 100}%` }}
              aria-label="Next expertise"
            />
          )}
        </div>
      </BentoCard>
    </div>
  );
}
