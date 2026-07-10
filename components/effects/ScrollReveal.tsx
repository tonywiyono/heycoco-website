"use client";

import { cn } from "@/lib/cn";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 48,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    scrollRootRef.current = document.getElementById("main-scroll");
  }, []);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
    margin: "0px 0px -5% 0px",
    root: scrollRootRef,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ y, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y, opacity: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
