"use client";

import type { NavItem, SiteInfo } from "@/lib/types/content";
import { cn } from "@/lib/cn";
import { scrollToSection, useScrollSpy } from "@/lib/scroll-spy";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  site: SiteInfo;
};

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const } },
};

const panel = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

const navItem = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.12 + index * 0.06,
    },
  }),
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
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

  const handleNav = (id: string) => {
    onClose();
    scrollToSection(id);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[60] bg-surface-base/95 backdrop-blur-md"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdrop}
        >
          <motion.button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-2xl transition-colors hover:border-white/40"
            aria-label="Close menu"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          >
            ×
          </motion.button>

          <motion.nav
            className="flex h-full flex-col justify-center px-8 sm:px-16"
            aria-label="Main navigation"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  custom={index}
                  variants={navItem}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
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
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-12 space-y-1 text-sm text-text-muted"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.35 }}
            >
              <a href={`mailto:${site.email}`} className="block hover:text-text-primary">
                {site.email}
              </a>
              <p>{site.location}</p>
            </motion.div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
