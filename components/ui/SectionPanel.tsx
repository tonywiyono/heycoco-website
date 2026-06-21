import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionPanelProps = {
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
};

export function SectionPanel({
  children,
  variant = "light",
  className,
}: SectionPanelProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-card)] p-6 sm:p-8 lg:p-10",
        variant === "light"
          ? "bg-surface-card-light text-text-dark"
          : "bg-surface-card text-text-primary",
        className,
      )}
    >
      {children}
    </div>
  );
}
