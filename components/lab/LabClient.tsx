"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { href, labSite, nav } from "@/content/lab";

export const GlassLoop = dynamic(() => import("./GlassLoop"), { ssr: false });

/** Fades/slides children in once they enter the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("lab-reveal", seen && "is-in", className)} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

/** Counts up to `value` when scrolled into view. */
export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      if (reduce) return setN(value);
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1200);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

const Arrow = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const burgerLine =
  "absolute left-1/2 top-1/2 -ml-2 block h-[1.5px] w-4 rounded-full bg-lab-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

/** Floating white nav bar: Services dropdown on desktop, full menu on mobile. */
export function LabNav() {
  const [open, setOpen] = useState(false);
  const [svc, setSvc] = useState(false);
  const svcRef = useRef<HTMLLIElement>(null);

  // At the very top the bar sits a little lower (inside the hero panel); once the page scrolls it glides up.
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu too.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!svc) return;
    const onDown = (e: MouseEvent) => {
      if (!svcRef.current?.contains(e.target as Node)) setSvc(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSvc(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [svc]);

  const close = () => {
    setOpen(false);
    setSvc(false);
  };
  const linkCls = "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[13.5px] font-medium text-lab-ink/80 transition-colors hover:text-lab-ink";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-3 z-50 px-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:px-7",
        atTop ? "translate-y-4 lg:translate-y-6" : "translate-y-0",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[61px] max-w-[1180px] items-center justify-between rounded-2xl bg-white pl-5 pr-3 shadow-[0_10px_32px_rgba(0,0,0,0.1),0_1px_0_rgba(0,0,0,0.02)]"
      >
        <a href={href("")} onClick={close} className="flex items-center gap-2 text-[16px] font-semibold tracking-tight">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-96.webp" alt="" width={30} height={30} className="lab-logo size-[30px]" />
          {/* One line from sm up; stacked on narrow phones so it fits beside the buttons */}
          <span className="flex flex-col leading-[1.05] sm:flex-row sm:items-baseline sm:gap-1.5">
            <span>{labSite.name}</span>
            <span className="text-[11px] font-medium text-lab-muted sm:text-[16px] sm:font-semibold sm:text-lab-ink">Creative Agency</span>
          </span>
        </a>

        <ul className="hidden items-center md:flex">
          <li ref={svcRef} className="relative">
            <button type="button" aria-expanded={svc} aria-haspopup="menu" onClick={() => setSvc((s) => !s)} className={linkCls}>
              Services
              <svg width="9" height="9" viewBox="0 0 10 10" className={cn("transition-transform", svc && "rotate-180")} aria-hidden>
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Always mounted so it can fade/slide both ways; inert while closed. */}
            <div
              role="menu"
              inert={!svc}
              className={cn(
                "absolute left-1/2 top-full mt-4 w-[300px] origin-top -translate-x-1/2 rounded-2xl border border-lab-line bg-white p-2 shadow-[0_20px_50px_rgba(13,13,13,0.14)]",
                "transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                svc ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[0.97] opacity-0",
              )}
            >
              {nav.services.map((s, k) => (
                <a
                  key={s.href}
                  role="menuitem"
                  href={s.href}
                  onClick={close}
                  style={{ transitionDelay: svc ? `${60 + k * 40}ms` : "0ms" }}
                  className={cn(
                    "block rounded-xl px-4 py-3 transition-[background-color,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-lab-bg motion-reduce:transition-none",
                    svc ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
                  )}
                >
                  <span className="block text-[14px] font-medium">{s.label}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-lab-muted">{s.note}</span>
                </a>
              ))}
            </div>
          </li>
          {nav.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={linkCls}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={href("/contact")}
            onClick={close}
            className="lab-btn inline-flex h-10 items-center gap-3 rounded-full bg-lab-ink pl-[18px] pr-[5px] text-[13.5px] font-medium text-white"
          >
            Let’s Talk
            <span className="chip grid size-[30px] place-items-center rounded-full bg-white text-lab-ink"><Arrow /></span>
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative grid size-10 place-items-center rounded-full border border-lab-line transition-colors duration-300 hover:border-lab-ink md:hidden"
          >
            {/* Two lines that rotate into an X */}
            <span aria-hidden className={cn(burgerLine, open ? "translate-y-0 rotate-45" : "-translate-y-[3.5px]")} />
            <span aria-hidden className={cn(burgerLine, open ? "translate-y-0 -rotate-45" : "translate-y-[3.5px]")} />
          </button>
        </div>
      </nav>

      {/* Mobile menu: always mounted; height, fade and slide transition both ways. */}
      <div
        inert={!open}
        className={cn(
          "mx-auto grid max-w-[1180px] transition-[grid-template-rows,opacity,transform,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:hidden",
          open ? "mt-2 grid-rows-[1fr] translate-y-0 opacity-100" : "pointer-events-none mt-0 grid-rows-[0fr] -translate-y-2 opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="rounded-2xl border border-lab-line bg-white p-3 shadow-lg">
            <p className="t-mono px-3 pt-2 text-lab-light">Services</p>
            {[...nav.services.map((s) => ({ ...s, group: 0 })), ...nav.links.map((l) => ({ ...l, group: 1 }))].map((item, k, all) => (
              <div key={item.href}>
                {item.group === 1 && all[k - 1]?.group === 0 && <div className="my-2 h-px bg-lab-line" />}
                <a
                  href={item.href}
                  onClick={close}
                  style={{ transitionDelay: open ? `${80 + k * 35}ms` : "0ms" }}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-[15px] transition-[background-color,opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-lab-bg motion-reduce:transition-none",
                    open ? "translate-y-0 opacity-100" : "-translate-y-1.5 opacity-0",
                  )}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

/** Segmented pill toggle, used by the interactive sections. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  dark = false,
  label,
}: {
  options: { id: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  dark?: boolean;
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className={cn("inline-flex flex-wrap gap-1 rounded-full border p-1", dark ? "border-white/15 bg-white/5" : "border-lab-line bg-white")}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
              on ? (dark ? "bg-white text-lab-ink" : "bg-lab-ink text-white") : dark ? "text-white/70 hover:text-white" : "text-lab-ink/70 hover:text-lab-ink",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
