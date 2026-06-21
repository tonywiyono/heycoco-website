"use client";

import type { NavItem, SiteInfo } from "@/lib/types/content";
import { cn } from "@/lib/cn";
import { scrollToSection, useScrollSpy } from "@/lib/scroll-spy";
import { useEffect } from "react";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  site: SiteInfo;
};

export function MenuOverlay({ open, onClose, navItems, site }: MenuOverlayProps) {
  const { activeSection } = useScrollSpy();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleNav = (id: string) => {
    onClose();
    scrollToSection(id);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-[60] bg-surface-base/95 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-2xl"
        aria-label="Close menu"
      >
        ×
      </button>

      <nav
        className="flex h-full flex-col justify-center px-8 sm:px-16"
        aria-label="Main navigation"
      >
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleNav(item.id)}
                className={cn(
                  "text-left text-4xl font-bold transition-colors sm:text-5xl lg:text-6xl",
                  activeSection === item.id
                    ? "text-accent"
                    : "text-text-primary hover:text-accent",
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-12 space-y-1 text-sm text-text-muted">
          <a href={`mailto:${site.email}`} className="block hover:text-text-primary">
            {site.email}
          </a>
          <p>{site.location}</p>
        </div>
      </nav>
    </div>
  );
}
