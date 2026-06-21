"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouchPrimary = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchPrimary) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onEnter = () => {
      gsap.to(ring, {
        scale: 1.8,
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.9, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.15 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const hoverables = document.querySelectorAll(HOVER_SELECTOR);
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll(HOVER_SELECTOR).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      observer.disconnect();
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-2 w-2 rounded-full bg-accent mix-blend-difference"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-10 w-10 rounded-full border border-white/60 mix-blend-difference"
        aria-hidden
      />
    </>
  );
}
