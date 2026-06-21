"use client";

import type { NavItem, SiteInfo } from "@/lib/types/content";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { scrollToSection } from "@/lib/scroll-spy";
import Image from "next/image";
import { useState } from "react";

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-text-muted transition-colors hover:border-white/40 hover:text-text-primary"
    >
      {children}
    </a>
  );
}

export function Sidebar({ site, navItems }: { site: SiteInfo; navItems: NavItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-[var(--sidebar-width)] lg:flex-col lg:justify-between lg:bg-surface-sidebar lg:px-6 lg:py-8">
        <div className="w-full">
          <div className="flex w-full items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="flex min-h-10 flex-1 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold tracking-tight text-text-dark transition-opacity hover:opacity-90"
            >
              {site.name}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white/40"
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
                <defs>
                  <path
                    id="circlePath"
                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="fill-text-muted text-[7px] uppercase tracking-widest">
                  <textPath href="#circlePath">
                    Award Winning Agency — Since 2021 — Hey Coco! —
                  </textPath>
                </text>
              </svg>
              <Image
                src="/logo.svg"
                alt=""
                width={36}
                height={36}
                className="relative z-10"
              />
            </div>
          </div>
        </div>

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
            <SocialIcon href={site.social.x} label="X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={site.social.instagram} label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={site.social.dribbble} label="Dribbble">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.74 2.24 3.93 2.32 6.298-.28-.06-3.08-.64-5.88-.3-.12-.28-.24-.56-.38-.84 2.16-1.32 3.94-3.1 4.94-5.158zM12 2.04c2.52 0 4.84.88 6.66 2.34-.88 1.84-2.52 3.44-4.48 4.66-1.12-2.04-2.36-3.8-3.7-5.24C11.02 2.12 11.5 2.04 12 2.04zM7.34 4.02c1.38 1.46 2.64 3.24 3.78 5.32-4.78 1.28-8.98 1.26-9.38 1.24.32-2.52 1.68-4.74 3.6-6.56zM2.04 12c0-.2 0-.4.02-.6 4.46.2 9.3-.56 12.78-2.04.24.48.46.96.66 1.46-4.3 1.38-7.92 4.28-10.12 8.02C3.62 17.06 2.04 14.64 2.04 12zm9.96 9.96c-1.82 0-3.52-.5-4.98-1.36 1.9-3.48 5.18-6.16 9.16-7.42.52 1.34 1 2.72 1.42 4.12-1.74.64-3.3 1.54-4.6 2.66-1.02.9-1.76 1.66-1.76 1.66s.02 0 0 0z" />
              </svg>
            </SocialIcon>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 py-3 text-sm font-medium transition-colors hover:border-white/60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Work With Us
          </button>
        </div>
      </aside>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} navItems={navItems} site={site} />
    </>
  );
}
