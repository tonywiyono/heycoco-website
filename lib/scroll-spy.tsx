"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getScrollRoot, scrollToSection } from "@/lib/scroll";

type ScrollSpyContextValue = {
  activeSection: string;
  setActiveSection: (id: string) => void;
};

const ScrollSpyContext = createContext<ScrollSpyContextValue | null>(null);

export function ScrollSpyProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <ScrollSpyContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ScrollSpyContext.Provider>
  );
}

export function useScrollSpy() {
  const context = useContext(ScrollSpyContext);
  if (!context) {
    throw new Error("useScrollSpy must be used within ScrollSpyProvider");
  }
  return context;
}

export function useSectionObserver(sectionIds: string[]) {
  const { setActiveSection } = useScrollSpy();

  useEffect(() => {
    const root = getScrollRoot();
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          root,
          rootMargin: "-35% 0px -45% 0px",
          threshold: 0,
        },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds, setActiveSection]);
}

export { scrollToSection };

export function useScrollToSection() {
  return useCallback((id: string) => scrollToSection(id), []);
}
