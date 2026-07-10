"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import type { ExpertiseItem } from "@/content/expertise";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type HeroExpertiseProps = {
  items: ExpertiseItem[];
};

type PeekSide = "left" | "right";

function ExpertiseCardContent({
  item,
  isActive,
  compact = false,
}: {
  item: ExpertiseItem;
  isActive: boolean;
  compact?: boolean;
}) {
  return (
    <div className="flex w-full flex-col p-4 sm:p-5">
      <h4
        className={cn(
          "text-sm font-semibold leading-snug sm:text-base",
          isActive ? "text-white" : "text-accent",
        )}
      >
        {item.title}
      </h4>

      {!compact && (
        <>
          <p
            className={cn(
              "mt-3 text-xs leading-relaxed sm:text-sm",
              isActive ? "text-white/85" : "text-text-muted",
            )}
          >
            {item.description}
          </p>

          {isActive && (
            <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function HeroExpertise({ items }: HeroExpertiseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);
  const [peekSide, setPeekSide] = useState<PeekSide>("right");

  const updatePeekSide = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPeekSide(clientX - rect.left < rect.width / 2 ? "left" : "right");
  };

  const getPeekIndex = (index: number, side: PeekSide) => {
    if (side === "right") {
      return index === items.length - 1 ? 0 : index + 1;
    }
    return index === 0 ? items.length - 1 : index - 1;
  };

  if (!items.length) return null;

  return (
    <BentoCard
      variant="dark"
      hover={false}
      className="relative flex min-h-[300px] flex-1 flex-col overflow-hidden p-5 sm:min-h-[340px] sm:p-6"
    >
      <h3 className="mb-4 text-lg font-bold text-text-primary sm:text-xl">Our Expertise</h3>

      <div
        ref={containerRef}
        className="relative flex flex-1 flex-col gap-2 overflow-visible"
        onMouseLeave={() => setHoveredIndex(1)}
      >
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const peekIndex = getPeekIndex(index, peekSide);
          const peekItem = items[peekIndex];

          return (
            <div
              key={item.id}
              className="relative w-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseMove={(e) => {
                updatePeekSide(e.clientX);
                setHoveredIndex(index);
              }}
            >
              {/* Adjacent card peeking from left or right */}
              {isHovered && peekItem && (
                <motion.div
                  key={`${peekItem.id}-${peekSide}`}
                  className={cn(
                    "pointer-events-none absolute top-1/2 z-20 w-[44%] overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-2xl",
                    peekSide === "right" ? "right-0 origin-right" : "left-0 origin-left",
                  )}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: peekSide === "right" ? "22%" : "-22%",
                    y: "-50%",
                    rotate: peekSide === "right" ? [5, 2, 5] : [-5, -2, -5],
                  }}
                  transition={{
                    opacity: { duration: 0.2 },
                    scale: { type: "spring", stiffness: 280, damping: 24 },
                    x: { type: "spring", stiffness: 280, damping: 24 },
                    rotate: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
                  }}
                >
                  <ExpertiseCardContent item={peekItem} isActive={false} compact />
                </motion.div>
              )}

              {/* Full-width card */}
              <motion.div
                layout
                className={cn(
                  "relative z-10 w-full overflow-hidden rounded-2xl transition-colors duration-300",
                  isHovered
                    ? "bg-[#5b21b6] text-white shadow-lg"
                    : "bg-surface-card text-text-primary",
                )}
              >
                <ExpertiseCardContent item={item} isActive={isHovered} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </BentoCard>
  );
}
