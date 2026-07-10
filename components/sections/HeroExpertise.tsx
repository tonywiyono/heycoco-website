"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import type { ExpertiseItem } from "@/content/expertise";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type HeroExpertiseProps = {
  items: ExpertiseItem[];
  tagline: string;
};

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroExpertise({ items, tagline }: HeroExpertiseProps) {
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goPrev = () => {
    const next = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(next);
    scrollRef.current?.children[next]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const goNext = () => {
    const next = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(next);
    scrollRef.current?.children[next]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  if (!items.length) return null;

  return (
    <BentoCard
      variant="dark"
      hover={false}
      className="relative flex min-h-[300px] flex-1 flex-col overflow-hidden p-5 sm:min-h-[340px] sm:p-6"
    >
      <div className="mb-4 border-b border-border-subtle pb-4">
        <h3 className="text-lg font-bold text-text-primary sm:text-xl">Our Expertise</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-text-muted sm:text-sm">{tagline}</p>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-1 snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.button
              key={item.id}
              type="button"
              layout
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              aria-expanded={isActive}
              className={cn(
                "flex w-[88%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl text-left transition-colors duration-300 sm:w-[75%]",
                isActive
                  ? "bg-[#5b21b6] text-white shadow-lg"
                  : "bg-surface-card text-text-primary",
              )}
            >
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <h4
                    className={cn(
                      "text-sm font-semibold leading-snug sm:text-base",
                      isActive ? "text-white" : "text-accent",
                    )}
                  >
                    {item.title}
                  </h4>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                      isActive
                        ? "border-white/30 bg-[#bef264] text-[#5b21b6]"
                        : "border-border-interactive bg-transparent text-text-muted",
                    )}
                  >
                    <ArrowIcon />
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-xs leading-relaxed text-white/85 sm:text-sm">
                        {item.description}
                      </p>

                      <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 80vw, 320px"
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isActive && (
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {items.length > 1 && (
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-interactive text-sm transition-colors hover:border-border-interactive-hover"
            aria-label="Previous expertise"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-interactive text-sm transition-colors hover:border-border-interactive-hover"
            aria-label="Next expertise"
          >
            →
          </button>
        </div>
      )}
    </BentoCard>
  );
}
