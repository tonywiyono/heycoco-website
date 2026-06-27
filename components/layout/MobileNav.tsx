"use client";

import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { MenuButton } from "@/components/ui/MenuButton";
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

        <MenuButton
          open={menuOpen}
          size="sm"
          onClick={() => setMenuOpen((prev) => !prev)}
        />
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} navItems={navItems} site={site} />
    </>
  );
}
