import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  color?: "accent" | "muted" | "dark";
  rotation?: number;
  className?: string;
};

const colors = {
  accent: "bg-accent text-white",
  muted: "bg-surface-card text-text-primary border border-border-subtle",
  dark: "bg-black text-white",
};

export function Tag({
  children,
  color = "muted",
  rotation = 0,
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap",
        colors[color],
        className,
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </span>
  );
}
