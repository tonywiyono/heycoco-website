"use client";

import { MenuOverlay } from "@/components/layout/MenuOverlay";
import type { NavItem, SiteInfo } from "@/lib/types/content";
import { scrollToSection } from "@/lib/scroll-spy";
import { useState } from "react";

export function MobileNav({ site, navItems }: { site: SiteInfo; navItems: NavItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center gap-3 bg-surface-sidebar px-4 py-4 lg:hidden">
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="flex min-h-10 flex-1 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-text-dark"
        >
          {site.name}
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20"
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} navItems={navItems} site={site} />
    </>
  );
}
