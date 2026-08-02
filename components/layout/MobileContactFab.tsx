"use client";

import { openConsultationPopup } from "@/components/ui/consultationPopup";
import type { SidebarCta } from "@/lib/types/content";
import { scrollToSection } from "@/lib/scroll-spy";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type MobileContactFabProps = {
  whatsappCta: SidebarCta;
};

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

export function MobileContactFab({ whatsappCta }: MobileContactFabProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const whatsappStyle = {
    "--cta-bg": whatsappCta.backgroundColor,
    "--cta-bg-hover": whatsappCta.hoverBackgroundColor,
    "--cta-text": whatsappCta.textColor,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className="fixed bottom-6 right-6 z-50 lg:hidden"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(calc(100vw-3rem),280px)]"
            role="dialog"
            aria-label="Contact options"
          >
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  openConsultationPopup();
                  setOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2.5 rounded-full border border-white/15 bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-900"
              >
                <CalendarIcon />
                Book a Consultation
              </button>

              {whatsappCta.enabled ? (
                <a
                  href={whatsappCta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={whatsappStyle}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2.5 rounded-full px-4 py-3 text-sm font-semibold transition-colors [background-color:var(--cta-bg)] [color:var(--cta-text)] hover:[background-color:var(--cta-bg-hover)]"
                >
                  <WhatsAppIcon />
                  {whatsappCta.label}
                </a>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  scrollToSection("contact");
                }}
                className="flex w-full items-center justify-center gap-2.5 rounded-full border border-white/15 bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-900"
              >
                <MailIcon />
                Work With Us
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="fab"
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(true)}
            className="flex h-14 items-center gap-2 rounded-full border border-border-interactive bg-surface-card px-4 text-sm font-semibold text-text-primary shadow-lg transition-colors hover:border-border-interactive-hover"
            aria-expanded={false}
            aria-label="Contact Us"
          >
            <ContactIcon />
            Contact Us
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
