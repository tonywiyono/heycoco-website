"use client";

import { cn } from "@/lib/cn";
import type { ProcessStep } from "@/lib/types/content";

type ProcessGraphicProps = {
  steps: ProcessStep[];
  activeId: string;
};

const pillStyles = [
  "bg-accent text-white",
  "border border-black/15 bg-white text-text-dark",
  "bg-black text-white",
  "bg-[#d8dce8] text-text-dark",
  "border border-black/15 bg-white text-text-dark",
];

export function ProcessGraphic({ steps, activeId }: ProcessGraphicProps) {
  const positions = [
    "left-[4%] top-[8%]",
    "right-[2%] top-[14%]",
    "left-[10%] top-[36%]",
    "right-[6%] top-[50%]",
    "left-[16%] bottom-[10%]",
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg
        viewBox="0 0 420 420"
        className="h-full w-full"
        aria-hidden
        fill="none"
      >
        {[
          { x: 40, y: 70, w: 150, h: 110, r: 18, rot: -18 },
          { x: 170, y: 40, w: 170, h: 120, r: 18, rot: -8 },
          { x: 90, y: 150, w: 180, h: 130, r: 18, rot: 6 },
          { x: 210, y: 130, w: 160, h: 115, r: 18, rot: 14 },
          { x: 55, y: 240, w: 175, h: 125, r: 18, rot: -4 },
          { x: 200, y: 220, w: 165, h: 120, r: 18, rot: 10 },
          { x: 120, y: 300, w: 190, h: 95, r: 18, rot: -12 },
        ].map((box, index) => (
          <rect
            key={index}
            x={box.x}
            y={box.y}
            width={box.w}
            height={box.h}
            rx={box.r}
            transform={`rotate(${box.rot} ${box.x + box.w / 2} ${box.y + box.h / 2})`}
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-black/25"
          />
        ))}
      </svg>

      {steps.map((step, index) => {
        const isActive = step.id === activeId;

        return (
          <span
            key={step.id}
            className={cn(
              "absolute max-w-[118px] rounded-full px-3 py-2 text-center text-[10px] font-semibold leading-tight shadow-sm transition-transform sm:max-w-[132px] sm:px-4 sm:text-xs",
              positions[index] ?? "left-1/2 top-1/2",
              pillStyles[index % pillStyles.length],
              isActive && "scale-105 ring-2 ring-black/10",
            )}
          >
            {step.title}
          </span>
        );
      })}
    </div>
  );
}
