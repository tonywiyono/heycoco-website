"use client";

import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { MenuButton } from "@/components/ui/MenuButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { NavItem, SiteInfo } from "@/lib/types/content";
import { scrollToSection } from "@/lib/scroll-spy";
import Image from "next/image";
import { useState } from "react";

export function MobileNav({ site, navItems }: { site: SiteInfo; navItems: NavItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center gap-2 bg-surface-sidebar px-4 py-4 lg:hidden">
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="mr-auto flex items-center"
          aria-label="Scroll to top"
        >
          <Image src="/logo.svg" alt={site.name} width={28} height={28} />
        </button>

        <ThemeToggle size="sm" />
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
