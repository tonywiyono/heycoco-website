"use client";

import { getLenis } from "@/lib/lenis-instance";

function isDesktopPanel(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 1024px)").matches;
}

export function getScrollRoot(): HTMLElement | null {
  if (!isDesktopPanel()) return null;
  return document.getElementById("main-scroll");
}

export function getScrollTop(): number {
  const root = getScrollRoot();
  if (root) return root.scrollTop;
  return window.scrollY;
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const root = getScrollRoot();
  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(element, { offset: -24, duration: 1.1 });
    return;
  }

  if (root) {
    const rootRect = root.getBoundingClientRect();
    const elRect = element.getBoundingClientRect();
    const top = elRect.top - rootRect.top + root.scrollTop - 24;
    root.scrollTo({ top, behavior: "smooth" });
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
