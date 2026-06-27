"use client";

import { cn } from "@/lib/cn";

type MenuButtonProps = {
  open?: boolean;
  onClick: () => void;
  className?: string;
  size?: "sm" | "md";
  label?: string;
};

export function MenuButton({
  open = false,
  onClick,
  className,
  size = "md",
  label = "Open menu",
}: MenuButtonProps) {
  const dimensions = size === "sm" ? "h-10 w-10" : "h-10 w-10";
  const lineWidth = size === "sm" ? "w-5" : "w-[18px]";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : label}
      aria-expanded={open}
      className={cn(
        "group relative flex shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white/40",
        dimensions,
        className,
      )}
    >
      <span className="sr-only">{open ? "Close menu" : label}</span>
      <span
        className={cn("relative flex h-3.5 flex-col justify-between", lineWidth)}
        aria-hidden
      >
        <span
          className={cn(
            "block h-0.5 w-full origin-center rounded-full bg-current transition-all duration-300 ease-out",
            open && "translate-y-[6px] rotate-45",
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-out",
            open && "scale-x-0 opacity-0",
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-full origin-center rounded-full bg-current transition-all duration-300 ease-out",
            open && "-translate-y-[6px] -rotate-45",
          )}
        />
      </span>
    </button>
  );
}
