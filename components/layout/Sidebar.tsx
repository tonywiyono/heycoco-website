"use client";

import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { MenuButton } from "@/components/ui/MenuButton";
import { SidebarCtaLink } from "@/components/ui/SidebarCtaLink";
import { SpinningLogo } from "@/components/ui/SpinningLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { NavItem, SidebarCta, SiteInfo } from "@/lib/types/content";
import { scrollToSection } from "@/lib/scroll-spy";
import { useState } from "react";

export function Sidebar({
  site,
  navItems,
  sidebarWhatsappCta,
}: {
  site: SiteInfo;
  navItems: NavItem[];
  sidebarWhatsappCta: SidebarCta;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-[var(--sidebar-width)] lg:flex-col lg:bg-surface-sidebar lg:px-8 lg:py-8">
        {/* Header row */}
        <div className="flex w-full items-center justify-end gap-2">
          <ThemeToggle />
          <MenuButton open={menuOpen} onClick={() => setMenuOpen((prev) => !prev)} />
        </div>

        {/* Spinning logo — vertically centered in remaining space */}
        <div className="flex flex-1 items-center justify-center">
          <SpinningLogo onClick={() => scrollToSection("home")} />
        </div>

        {/* Bottom info + CTAs */}
        <div className="w-full space-y-6">
          <div className="space-y-1 text-center text-xs text-text-muted">
            <a href={`mailto:${site.email}`} className="block hover:text-text-primary">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="block hover:text-text-primary">
              {site.phone}
            </a>
            <p>{site.location}</p>
          </div>

          <p className="text-center text-xs text-text-muted">{site.copyright}</p>

          <div className="flex justify-center gap-2">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-interactive text-text-muted transition-colors hover:border-border-interactive-hover hover:text-text-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>

          <div className="space-y-3">
            <a
              href="https://calendar.app.google/tvUFkMfP1FaBgMiz9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Book a Consultation
            </a>

            <SidebarCtaLink cta={sidebarWhatsappCta} />

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border-interactive py-3 text-sm font-medium transition-colors hover:border-border-interactive-hover"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Work With Us
            </button>
          </div>
        </div>
      </aside>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} navItems={navItems} site={site} />
    </>
  );
}
