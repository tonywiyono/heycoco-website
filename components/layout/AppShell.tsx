"use client";

import { SiteEffects } from "@/components/effects/SiteEffects";
import { MobileContactFab } from "@/components/layout/MobileContactFab";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { BackToTop } from "@/components/ui/BackToTop";
import type { NavItem, SidebarCta, SiteInfo } from "@/lib/types/content";
import {
  ScrollSpyProvider,
  useSectionObserver,
} from "@/lib/scroll-spy";
import { useEffect, type ReactNode } from "react";

function SectionObserver({
  children,
  navItems,
}: {
  children: ReactNode;
  navItems: NavItem[];
}) {
  useSectionObserver(navItems.map((item) => item.id));
  return <>{children}</>;
}

function DesktopScrollLock() {
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      document.body.classList.toggle("panel-scroll", mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      document.body.classList.remove("panel-scroll");
    };
  }, []);
  return null;
}

type AppShellProps = {
  children: ReactNode;
  site: SiteInfo;
  navItems: NavItem[];
  sidebarWhatsappCta: SidebarCta;
};

export function AppShell({ children, site, navItems, sidebarWhatsappCta }: AppShellProps) {
  return (
    <ScrollSpyProvider>
      <DesktopScrollLock />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <MobileNav site={site} navItems={navItems} />
      <Sidebar site={site} navItems={navItems} sidebarWhatsappCta={sidebarWhatsappCta} />
      <SiteEffects>
        <SectionObserver navItems={navItems}>
          <main className="px-3 pb-4 pt-3 sm:px-4 lg:px-6 lg:py-6">{children}</main>
        </SectionObserver>
      </SiteEffects>
      <MobileContactFab whatsappCta={sidebarWhatsappCta} />
      <BackToTop />
    </ScrollSpyProvider>
  );
}
