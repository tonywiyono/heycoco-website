"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
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

const Plus = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M6 1.75v8.5M1.75 6h8.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/** Frosted glass (over the hero photo) vs. solid white (everywhere else) for the bar; panels use a denser glass.
    Portrait phones/tablets: the hero has a white haze up top, so the glass is darker there to stay crisp. */
const surface = (glass: boolean) =>
  glass
    ? "border-white/[0.18] bg-[rgba(20,14,8,0.32)] text-white max-lg:portrait:bg-[rgba(20,14,8,0.62)]"
    : "border-lab-line bg-white/[0.92] text-lab-ink";
const panelSurface = (glass: boolean) =>
  glass
    ? "border-white/[0.18] bg-[rgba(20,14,8,0.5)] text-white max-lg:portrait:bg-[rgba(20,14,8,0.62)] shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
    : "border-lab-line bg-white/[0.97] text-lab-ink shadow-[0_20px_50px_rgba(13,13,13,0.14)]";

const burgerLine = cn(
  "absolute left-1/2 top-1/2 -ml-2 block h-[1.5px] w-4 rounded-full bg-current transition-[transform,background-color] duration-300 motion-reduce:transition-none",
  EASE,
);

/** Orange underline for the current page (grows in from the left). */
const Underline = ({ on, className }: { on: boolean; className?: string }) => (
  <span
    aria-hidden
    className={cn(
      "pointer-events-none absolute h-[2px] origin-left rounded-full bg-lab-accent transition-transform duration-500 motion-reduce:transition-none",
      EASE,
      on ? "scale-x-100" : "scale-x-0",
      className,
    )}
  />
);

/** Numbered service row ("01 Production" + note + arrow); fills orange on hover/focus. */
function ServiceRow({
  s,
  k,
  glass,
  shown,
  delay,
  onClick,
  menuitem,
  current,
}: {
  s: (typeof nav.services)[number];
  k: number;
  glass: boolean;
  shown: boolean;
  delay: number;
  onClick: () => void;
  menuitem?: boolean;
  current?: boolean;
}) {
  return (
    <a
      role={menuitem ? "menuitem" : undefined}
      href={s.href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={cn(
        "group flex items-center gap-4 rounded-xl px-4 py-3 transition-[background-color,color,opacity,transform] duration-300 motion-reduce:transition-none",
        "hover:bg-lab-accent hover:text-white focus-visible:bg-lab-accent focus-visible:text-white",
        EASE,
        shown ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
      )}
    >
      <span aria-hidden
        className={cn(
          "t-mono w-5 shrink-0 tabular-nums transition-colors duration-300 group-hover:text-white group-focus-visible:text-white",
          current ? "text-lab-accent" : glass ? "text-white/50" : "text-lab-light",
        )}
      >
        {String(k + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-medium">{s.label}</span>
        <span
          className={cn(
            "mt-0.5 block text-[12.5px] leading-snug transition-colors duration-300 group-hover:text-white/85 group-focus-visible:text-white/85",
            glass ? "text-white/65" : "text-lab-muted",
          )}
        >
          {s.note}
        </span>
      </span>
      <Arrow className={cn("shrink-0 transition-transform duration-300 group-hover:translate-x-0.5", EASE)} />
    </a>
  );
}

/**
 * Floating nav bar. Frosted glass while it floats over the home hero photo; turns solid white once the page
 * scrolls past the hero (and on pages without one). Services dropdown on desktop, full menu on mobile.
 */
export function LabNav() {
  const pathname = usePathname() || "/";
  const home = href("");
  const isCurrent = (h: string) => (h === home ? pathname === home : pathname === h || pathname.startsWith(`${h}/`));
  const servicesCurrent = nav.services.some((s) => isCurrent(s.href));

  const [open, setOpen] = useState(false);
  const [svc, setSvc] = useState(false);
  const svcRef = useRef<HTMLLIElement>(null);
  const svcBtnRef = useRef<HTMLButtonElement>(null);

  // At the very top the bar sits a little lower (inside the hero panel); once the page scrolls it glides up.
  const [atTop, setAtTop] = useState(true);
  // Glass while the bar is over the hero photo. Starts from the route so inner pages render solid straight away.
  const [glass, setGlass] = useState(pathname === home);
  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY < 24);
      const hero = document.querySelector("[data-nav-hero]");
      // Solid once the hero's bottom edge has passed up behind the bar.
      setGlass(!!hero && hero.getBoundingClientRect().bottom > 96);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Hand focus back to the trigger if it was inside the panel (which is about to go inert).
      if (svcRef.current?.contains(document.activeElement)) svcBtnRef.current?.focus();
      setSvc(false);
    };
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
  const linkCls = (on: boolean) =>
    cn(
      "relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors duration-300",
      glass ? (on ? "text-white" : "text-white/80 hover:text-white") : on ? "text-lab-ink" : "text-lab-ink/70 hover:text-lab-ink",
    );

  return (
    <header
      data-tone={glass ? "glass" : "solid"}
      className={cn(
        "fixed inset-x-0 top-3 z-50 px-4 transition-transform duration-500 motion-reduce:transition-none sm:px-7",
        EASE,
        atTop ? "translate-y-4 lg:translate-y-6" : "translate-y-0",
      )}
    >
      <nav aria-label="Main" className={cn("relative mx-auto flex h-[61px] max-w-[1180px] items-center justify-between pl-5 pr-3", glass ? "text-white" : "text-lab-ink")}>
        {/* The bar's surface is its own layer, so the dropdown (a child of the nav) can blur the photo behind it too:
            a backdrop-filter on an ancestor would stop it seeing past the bar. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl border backdrop-blur-[14px] backdrop-saturate-[1.4]",
            "transition-[background-color,border-color,box-shadow] duration-500 motion-reduce:transition-none",
            EASE,
            surface(glass),
            glass ? "shadow-[0_10px_30px_rgba(0,0,0,0.12)]" : "shadow-[0_10px_32px_rgba(0,0,0,0.08),0_1px_0_rgba(0,0,0,0.02)]",
          )}
        />

        <a href={home} onClick={close} className="relative flex items-center gap-2 text-[16px] font-semibold tracking-tight">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-96.webp" alt="" width={30} height={30} className="lab-logo size-[30px]" />
          {/* One line from sm up; stacked on narrow phones so it fits beside the buttons */}
          <span className="flex flex-col leading-[1.05] sm:flex-row sm:items-baseline sm:gap-1.5">
            <span>{labSite.name}</span>
            <span
              className={cn(
                "text-[11px] font-medium transition-colors duration-500 sm:text-[16px] sm:font-semibold sm:text-current",
                glass ? "text-white/70" : "text-lab-muted",
              )}
            >
              Creative Agency
            </span>
          </span>
        </a>

        <ul className="relative hidden items-center md:flex">
          <li ref={svcRef} className="relative">
            <button
              ref={svcBtnRef}
              type="button"
              aria-expanded={svc}
              aria-haspopup="menu"
              onClick={() => setSvc((s) => !s)}
              className={linkCls(servicesCurrent || svc)}
            >
              Services
              <svg width="9" height="9" viewBox="0 0 10 10" className={cn("transition-transform duration-300", svc && "rotate-180")} aria-hidden>
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <Underline on={servicesCurrent} className="inset-x-3 bottom-1" />
            </button>
            {/* Always mounted so it can fade/slide both ways; inert while closed. */}
            <div
              role="menu"
              aria-label="Services"
              inert={!svc}
              className={cn(
                "absolute left-1/2 top-full mt-4 w-[340px] origin-top -translate-x-1/2 rounded-2xl border p-2 backdrop-blur-[14px] backdrop-saturate-[1.4]",
                "transition-[opacity,transform,visibility,background-color,border-color,color,box-shadow] duration-300 motion-reduce:transition-none",
                EASE,
                panelSurface(glass),
                svc ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[0.97] opacity-0",
              )}
            >
              {nav.services.map((s, k) => (
                <ServiceRow key={s.href} s={s} k={k} glass={glass} shown={svc} delay={60 + k * 40} onClick={close} menuitem current={isCurrent(s.href)} />
              ))}
            </div>
          </li>
          {nav.links.map((l) => {
            const on = isCurrent(l.href);
            return (
              <li key={l.href}>
                <a href={l.href} aria-current={on ? "page" : undefined} className={linkCls(on)}>
                  {l.label}
                  <Underline on={on} className="inset-x-3 bottom-1" />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="relative flex items-center gap-2">
          <a
            href={href("/contact")}
            onClick={close}
            className="lab-cta inline-flex h-10 items-center gap-3 rounded-full bg-lab-accent pl-[18px] pr-[5px] text-[13.5px] font-medium text-white shadow-[0_6px_18px_rgba(236,101,48,0.32)] hover:bg-[#dc5822]"
          >
            Let’s talk
            <span className="chip grid size-[30px] place-items-center rounded-full bg-white text-lab-accent">
              <Plus />
            </span>
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "relative grid size-10 place-items-center rounded-full border transition-colors duration-300 md:hidden",
              glass ? "border-white/30 hover:border-white" : "border-lab-line hover:border-lab-ink",
            )}
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
          "mx-auto grid max-w-[1180px] transition-[grid-template-rows,opacity,transform,margin] duration-500 motion-reduce:transition-none md:hidden",
          EASE,
          open ? "mt-2 grid-rows-[1fr] translate-y-0 opacity-100" : "pointer-events-none mt-0 grid-rows-[0fr] -translate-y-2 opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "rounded-2xl border p-2 backdrop-blur-[14px] backdrop-saturate-[1.4] transition-[background-color,border-color,color,box-shadow] duration-500 motion-reduce:transition-none",
              EASE,
              panelSurface(glass),
            )}
          >
            <p className={cn("t-mono px-4 pb-1 pt-3", glass ? "text-white/50" : "text-lab-light")}>Services</p>
            {nav.services.map((s, k) => (
              <ServiceRow key={s.href} s={s} k={k} glass={glass} shown={open} delay={80 + k * 35} onClick={close} current={isCurrent(s.href)} />
            ))}
            <div className={cn("mx-4 my-2 h-px", glass ? "bg-white/15" : "bg-lab-line")} />
            {nav.links.map((l, k) => {
              const on = isCurrent(l.href);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  aria-current={on ? "page" : undefined}
                  style={{ transitionDelay: open ? `${80 + (nav.services.length + k) * 35}ms` : "0ms" }}
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-[background-color,color,opacity,transform] duration-500 motion-reduce:transition-none",
                    "hover:bg-lab-accent hover:text-white focus-visible:bg-lab-accent focus-visible:text-white",
                    EASE,
                    open ? "translate-y-0 opacity-100" : "-translate-y-1.5 opacity-0",
                  )}
                >
                  <span className="relative">
                    {l.label}
                    <Underline on={on} className="inset-x-0 -bottom-1 group-hover:bg-white group-focus-visible:bg-white" />
                  </span>
                  <Arrow className={cn("opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:opacity-100", EASE)} />
                </a>
              );
            })}
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
