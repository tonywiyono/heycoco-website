"use client";

import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
  variant?: "dark" | "light";
  showIndex?: boolean;
  onOpenChange?: (id: string) => void;
};

export function Accordion({
  items,
  defaultOpenId,
  className,
  variant = "dark",
  showIndex = true,
  onOpenChange,
}: AccordionProps) {
  const [openId, setOpenId] = useState(defaultOpenId ?? items[0]?.id ?? "");

  const isLight = variant === "light";

  const toggle = (id: string, isOpen: boolean) => {
    const next = isOpen ? "" : id;
    setOpenId(next);
    onOpenChange?.(next);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              "border-b",
              isLight ? "border-black/10" : "border-white/10",
            )}
          >
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between gap-4 py-5 text-left transition-colors",
                isLight
                  ? cn(isOpen && "text-accent", !isOpen && "text-text-dark")
                  : cn(isOpen && "text-accent", !isOpen && "text-text-primary"),
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              onClick={() => toggle(item.id, isOpen)}
            >
              <span className="flex items-center gap-4">
                {showIndex ? (
                  <span
                    className={cn(
                      "text-sm tabular-nums",
                      isLight ? "text-black/40" : "text-text-muted",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <span className="text-lg font-semibold">{item.title}</span>
              </span>
              <span className="text-xl leading-none" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "pb-5 text-sm leading-relaxed",
                      showIndex ? "pl-10" : "pl-0",
                      isLight ? "text-black/60" : "text-text-muted",
                    )}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
