"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const LOADING_TEXT = "Loading";

type PageLoaderProps = {
  onComplete: () => void;
};

export function PageLoader({ onComplete }: PageLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("loading");

    const ctx = gsap.context(() => {
      const letters = textRef.current?.querySelectorAll("span");
      const path = pathRef.current;
      const loader = loaderRef.current;

      if (!letters || !path || !loader) {
        document.body.classList.remove("loading");
        onComplete();
        return;
      }

      gsap.set(letters, { y: 40, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove("loading");
          onComplete();
        },
      });

      tl.to(letters, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      })
        .to({}, { duration: 0.4 })
        .to(
          path,
          {
            attr: { d: "M0,0 L0,0 C0,0 500,0 1000,0 L1000,0 L1000,0 L0,0 Z" },
            duration: 1.1,
            ease: "power4.inOut",
          },
          "-=0.1",
        )
        .to(
          loader,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2",
        );
    }, loaderRef);

    return () => {
      ctx.revert();
      document.body.classList.remove("lenis-stopped");
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-base"
      aria-hidden
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          ref={pathRef}
          fill="var(--surface-base)"
          d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
        />
      </svg>

      <div
        ref={textRef}
        className="relative z-10 flex overflow-hidden text-2xl font-bold tracking-[0.3em] text-text-primary sm:text-3xl"
        aria-live="polite"
        aria-label="Loading"
      >
        {LOADING_TEXT.split("").map((char, i) => (
          <span key={i} className="inline-block">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
