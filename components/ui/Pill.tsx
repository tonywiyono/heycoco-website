import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark" | "accent";
};

const variants = {
  light: "bg-white text-text-dark",
  dark: "bg-surface-card text-text-primary border border-border-subtle",
  accent: "bg-accent text-white",
};

export function Pill({ children, className, variant = "light" }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
