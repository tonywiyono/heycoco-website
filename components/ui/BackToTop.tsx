"use client";

import { scrollToSection } from "@/lib/scroll";
import { getScrollTop } from "@/lib/scroll";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = document.getElementById("main-scroll");

    const onScroll = () => setVisible(getScrollTop() > 500);

    root?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      root?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => scrollToSection("home")}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-surface-card text-text-primary transition-colors hover:bg-white/10 lg:right-8"
      aria-label="Back to top"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 3L8 13M8 3L4 7M8 3L12 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
