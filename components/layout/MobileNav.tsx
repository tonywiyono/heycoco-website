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
      <header className="fixed left-[5px] right-[5px] top-0 z-50 flex h-16 items-center gap-2 px-4 lg:hidden">
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="mr-auto flex items-center"
          aria-label="Scroll to top"
        >
          <div className="overflow-hidden rounded-full bg-neutral-900" style={{ width: 32, height: 32 }}>
            <Image
              src="/logo.png"
              alt={site.name}
              width={32}
              height={32}
              style={{ mixBlendMode: "screen", display: "block" }}
            />
          </div>
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
