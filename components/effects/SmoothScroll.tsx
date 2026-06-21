"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis-instance";
import { useEffect, useRef, type ReactNode } from "react";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = {
  children: ReactNode;
  active: boolean;
};

export function SmoothScroll({ children, active }: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const setNative = () => {
      wrapper.dataset.scrollMode = "native";
    };

    if (!active) {
      setNative();
      return;
    }

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!isDesktop || prefersReducedMotion) {
      setNative();
      return;
    }

    wrapper.dataset.scrollMode = "lenis";

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
    });

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value!, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.scrollerProxy(wrapper, {});
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.destroy();
      setLenis(null);
      setNative();
    };
  }, [active]);

  return (
    <div
      id="main-scroll"
      ref={wrapperRef}
      data-scroll-mode="native"
      className="main-scroll-panel"
    >
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
