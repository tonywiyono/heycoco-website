"use client";

import Image from "next/image";

const CIRCLE_PATH_ID = "sidebarCirclePath";
/** Circumference of r=37 in the 100×100 viewBox */
const PATH_LENGTH = 232;

type SpinningLogoProps = {
  onClick?: () => void;
  size?: number;
  logoSize?: number;
};

export function SpinningLogo({ onClick, size = 160, logoSize = 56 }: SpinningLogoProps) {
  const label = "Hey Coco! · Creative Agency · ";

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label="Scroll to top"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-spin-slow"
        aria-hidden
      >
        <defs>
          <path
            id={CIRCLE_PATH_ID}
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fill="var(--text-muted)"
          fontSize="7.5"
          fontFamily="var(--font-bricolage), system-ui, sans-serif"
          letterSpacing="0.18em"
        >
          <textPath
            href={`#${CIRCLE_PATH_ID}`}
            startOffset="0%"
            textLength={PATH_LENGTH}
            lengthAdjust="spacing"
          >
            {`${label}${label}`}
          </textPath>
        </text>
      </svg>

      <Image
        src="/logo.png"
        alt=""
        width={logoSize}
        height={logoSize}
        className="relative z-10"
        priority
      />
    </button>
  );
}
