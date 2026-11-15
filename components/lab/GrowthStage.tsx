"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

/**
 * One illustrated stage of the brand journey (acorn → sapling → small tree → big tree).
 * Art was generated with Higgsfield (GPT Image 2.5 stills, Seedance 2.5 seamless idle loops, first frame = last frame).
 *
 *  - Not yet reached (`shown` false): hidden.
 *  - Intro: when a stage first scrolls into view, is newly reached, or is selected, the art springs up out of the
 *    ground (squash and stretch) while a little burst of soil and leaves pops from its base.
 *  - Selected (`active`): after the intro, the looping clip plays (only while on screen). Deselecting pauses it on
 *    the poster frame, which is the same image as the still, so there is no visible jump.
 *  - Reduced motion: stills only, no intro, no loop.
 * Transparent by default: WebM (VP9 with alpha) clips and transparent WebP stills, keyed from the generated art.
 * Safari cannot show WebM alpha, so it gets the original white-background MP4, blended away with
 * `mix-blend-multiply` + a small brightness lift (fine on the white page). Place this BEHIND neighbouring cards.
 */
const STAGES = ["stage1-acorn", "stage2-sapling", "stage3-small-tree", "stage4-big-tree"] as const;
const LABELS = ["An acorn: the seed", "A sapling", "A small tree", "A big tree bearing fruit"];
const INTRO_MS = 750;

const noopSubscribe = () => () => {};
const isSafari = () => {
  const ua = navigator.userAgent;
  return /safari/i.test(ua) && !/chrome|chromium|crios|fxios|edg|android/i.test(ua);
};

/** Burst particles at the base: [x offset %, rise %, size px, colour, delay ms]. */
const BITS: [number, number, number, string, number][] = [
  [-34, 16, 7, "#8fbf3f", 0],
  [-22, 26, 5, "#c9a26b", 40],
  [-10, 32, 6, "#6aa83a", 80],
  [10, 30, 5, "#bccf3c", 20],
  [24, 24, 7, "#c9a26b", 60],
  [36, 14, 5, "#8fbf3f", 100],
];

export default function GrowthStage({ kind, shown, active = false, className }: { kind: 0 | 1 | 2 | 3; shown: boolean; active?: boolean; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const seen = useRef(false);
  const base = `/images/grow/${STAGES[kind]}`;
  // Safari can't render WebM alpha, so it falls back to the white-background MP4 (blended away on the white page).
  // (Server render assumes not-Safari; the browser value is picked up right after hydration.)
  const safari = useSyncExternalStore(noopSubscribe, isSafari, () => false);

  const reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Restart the CSS intro + burst (class toggle with a forced reflow, so the <video> is not remounted). */
  const playIntro = useCallback(() => {
    if (reduce()) return;
    for (const [el, cls] of [
      [art.current, "lab-stage-intro"],
      [burst.current, "lab-stage-burst"],
    ] as const) {
      if (!el) continue;
      el.classList.remove(cls);
      void el.offsetWidth;
      el.classList.add(cls);
    }
  }, []);

  // Intro the first time the stage is on screen, and whenever it is newly reached or selected afterwards.
  useEffect(() => {
    const el = root.current;
    if (!el || !shown) return;
    if (!seen.current) {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        seen.current = true;
        playIntro();
        io.disconnect();
      });
      io.observe(el);
      return () => io.disconnect();
    }
    playIntro();
  }, [shown, active, playIntro]);

  // Selected → after the intro, rewind and loop while on screen. Deselected → pause on the poster frame.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (!(active && shown) || reduce()) {
      v.pause();
      v.currentTime = 0;
      return;
    }
    v.currentTime = 0;
    let visible = false;
    let ready = false;
    const go = () => (visible && ready ? v.play().catch(() => {}) : v.pause());
    const t = setTimeout(() => {
      ready = true;
      go();
    }, INTRO_MS);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      go();
    });
    io.observe(v);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [active, shown]);

  return (
    <div
      ref={root}
      role={shown ? "img" : undefined}
      aria-label={shown ? LABELS[kind] : undefined}
      aria-hidden={shown ? undefined : true}
      className={cn("pointer-events-none aspect-square transition-opacity duration-300 motion-reduce:transition-none", shown ? "opacity-100" : "opacity-0", className)}
    >
      <div ref={art} className="h-full w-full origin-bottom">
        <video
          ref={video}
          key={safari ? "mp4" : "webm"}
          src={safari ? `${base}.mp4` : `${base}.webm`}
          poster={safari ? `${base}.webp` : `${base}-alpha.webp`}
          muted
          loop
          playsInline
          preload="metadata"
          // Safari only: the MP4 background is slightly off-white (RGB ~246–252); multiply + this nudge make it vanish.
          className={cn("h-full w-full object-contain", safari && "mix-blend-multiply [filter:brightness(1.035)_contrast(1.06)]")}
        />
      </div>
      {/* soil-and-leaf burst at the base during the intro */}
      <div ref={burst} aria-hidden className="absolute inset-x-0 bottom-[12%] h-0">
        {BITS.map(([dx, rise, size, color, delay], k) => (
          <span
            key={k}
            className="lab-bit absolute left-1/2 top-0 rounded-full opacity-0"
            style={
              {
                width: size,
                height: size,
                background: color,
                "--dx": `${dx * 1.5}px`,
                "--rise": `${-rise * 1.6}px`,
                animationDelay: `${120 + delay}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
