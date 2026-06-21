import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  labelledBy?: string;
};

export function Section({
  id,
  children,
  className,
  title,
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? (title ? `${id}-heading` : undefined)}
      className={cn("scroll-mt-24 lg:scroll-mt-8", className)}
    >
      {title && (
        <h2 id={`${id}-heading`} className="sr-only">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
