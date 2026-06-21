"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "dark" | "light" | "accent";
  hover?: boolean;
  as?: "div" | "article" | "section";
};

const variants = {
  dark: "bg-surface-card text-text-primary",
  light: "bg-surface-card-light text-text-dark",
  accent: "bg-accent text-white",
};

export function BentoCard({
  children,
  className,
  variant = "dark",
  hover = true,
  as = "div",
}: BentoCardProps) {
  const Component = motion[as];

  return (
    <Component
      className={cn(
        "overflow-hidden rounded-[var(--radius-card)]",
        variants[variant],
        className,
      )}
      whileHover={
        hover
          ? { scale: 1.01, transition: { duration: 0.2 } }
          : undefined
      }
    >
      {children}
    </Component>
  );
}
