import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionHeadProps = {
  title: string;
  description?: ReactNode;
  aside?: ReactNode;
  className?: string;
  dark?: boolean;
};

export function SectionHead({
  title,
  description,
  aside,
  className,
  dark = false,
}: SectionHeadProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <h2
        className={cn(
          "text-3xl font-bold sm:text-4xl lg:text-5xl",
          dark ? "text-text-primary" : "text-text-dark",
        )}
      >
        {title}
      </h2>
      {(description || aside) && (
        <div className="lg:max-w-md lg:text-right">
          {aside}
          {description && (
            <p
              className={cn(
                "text-sm leading-relaxed",
                dark ? "text-text-muted" : "text-black/60",
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
