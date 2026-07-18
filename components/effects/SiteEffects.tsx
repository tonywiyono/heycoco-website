"use client";

import { CustomCursor } from "@/components/effects/CustomCursor";
import { PageLoader } from "@/components/effects/PageLoader";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { useCallback, useState, useSyncExternalStore, type ReactNode } from "react";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type SiteEffectsProps = {
  children: ReactNode;
};

export function SiteEffects({ children }: SiteEffectsProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const isDesktop = useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
  const [ready, setReady] = useState(reducedMotion);

  const handleLoaderComplete = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <>
      {!ready && <PageLoader onComplete={handleLoaderComplete} />}
      {ready && isDesktop && <CustomCursor />}
      <SmoothScroll active={ready}>{children}</SmoothScroll>
    </>
  );
}
