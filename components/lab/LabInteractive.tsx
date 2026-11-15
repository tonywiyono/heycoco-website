"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { eightSteps, growth, href, stages } from "@/content/lab";
import type { Work } from "@/content/works";
import { cn } from "@/lib/cn";
import GrowthStage from "./GrowthStage";
import { Segmented } from "./LabClient";

const Arrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** One big work card with a segmented switcher (the "featured story" pattern). */
export function FeaturedWork({ items }: { items: Work[] }) {
  const [id, setId] = useState(items[0].slug);
  const w = items.find((x) => x.slug === id) ?? items[0];
  return (
    <div>
      <Segmented label="Choose a project" value={id} onChange={setId} options={items.map((i) => ({ id: i.slug, label: i.title }))} />
      <article className="mt-6 grid overflow-hidden rounded-2xl border border-lab-line bg-white shadow-[0_14px_34px_rgba(13,13,13,0.06)] md:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-9">
          <div>
            <p className="t-mono text-lab-light">{w.type} · {w.year}</p>
            <h3 className="t-h2 mt-4">{w.title}</h3>
            <p className="t-body mt-4 max-w-md whitespace-pre-line [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] overflow-hidden">{w.description}</p>
          </div>
          <a
            href={href(`/work/${w.slug}`)}
            className="lab-btn inline-flex h-10 w-fit items-center gap-3 rounded-full bg-lab-ink pl-[18px] pr-[5px] text-[13.5px] font-medium text-white"
          >
            View project
            <span className="chip grid size-[30px] place-items-center rounded-full bg-white text-lab-ink"><Arrow /></span>
          </a>
        </div>
        <div className="relative aspect-[16/11] bg-lab-bg md:aspect-auto md:min-h-[380px]">
          <Image key={w.slug} src={w.hero} alt={w.title} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
        </div>
      </article>
    </div>
  );
}

/**
 * Dark "who do you brief" body: hiring freelancers vs the Hey Coco! team, over eight jobs.
 * Freelancers: every job needs its own specialist(s), so you find and brief each person separately (cards drift apart).
 * Hey Coco!: the same jobs are covered by one in-house team that already works together (cards join up, one brief).
 * Responsive grid (no sideways scroll): 2 columns on phones, 4 on tablets, 8 on desktop.
 */
const PEOPLE = eightSteps.reduce((n, s) => n + s.roles.length, 0);

const SIDES = {
  freelancer: {
    title: "Hiring freelancers",
    tag: `${PEOPLE} people to brief`,
    lines: ["Find, hire and brief each person separately", "Each one only sees their own piece", "You keep everyone in sync, and re-brief them all next time"],
  },
  team: {
    title: "Hey Coco!",
    tag: "1 brief",
    lines: ["One brief to a team that already works together", "Strategy, creative and ads share one plan", "We keep everyone in sync; results shape the next brief"],
  },
} as const;

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

const PersonIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="shrink-0">
    <circle cx="5" cy="3.1" r="2.1" fill="currentColor" />
    <path d="M1.2 9.4c.4-2.1 1.9-3.3 3.8-3.3s3.4 1.2 3.8 3.3" fill="currentColor" />
  </svg>
);

export function StepsToggle() {
  const [mode, setMode] = useState<"freelancer" | "team">("team");
  const team = mode === "team";
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="t-mono text-white/45">
          People you need to brief:{" "}
          <span key={mode} className="inline-block text-[13px] text-lab-accent [animation:lab-count-in_.5s_cubic-bezier(0.34,1.5,0.64,1)]">
            {team ? "1 team" : `${PEOPLE} freelancers`}
          </span>
        </p>
        <Segmented
          dark
          label="Compare hiring freelancers with the Hey Coco! team"
          value={mode}
          onChange={setMode}
          options={[
            { id: "freelancer", label: <>Freelancers <span className="ml-1 text-lab-accent">{PEOPLE} briefs</span></> },
            { id: "team", label: <>Hey Coco! <span className="ml-1 text-lab-accent">1 brief</span></> },
          ]}
        />
      </div>

      {/* Stage labels over each pair of jobs (desktop only; smaller screens show the stage inside each card) */}
      <div className="mt-8 hidden grid-cols-8 lg:grid">
        {stages.map((s) => (
          <p key={s.n} className="t-mono col-span-2 border-t border-white/15 pb-2 pt-2 text-white/40">
            {s.n} · {s.label}
          </p>
        ))}
      </div>

      {/* Joined into one block for the team; pulled apart into separate hires for freelancers */}
      <ol
        className={cn(
          "mt-6 grid grid-cols-2 overflow-hidden transition-[gap,border-color,border-radius] duration-500 sm:grid-cols-4 lg:mt-0 lg:grid-cols-8",
          EASE,
          team ? "gap-px rounded-xl border border-white/10 bg-white/10" : "gap-2 rounded-none border border-transparent bg-transparent",
        )}
      >
        {eightSteps.map((s, k) => {
          const delay = { transitionDelay: `${k * 45}ms` };
          const last = s.roles.length === 0;
          return (
            <li
              key={s.n}
              style={delay}
              className={cn(
                "relative flex min-h-[208px] list-none flex-col p-4 transition-[background-color,border-color,border-radius] duration-500",
                EASE,
                team ? "rounded-none border border-transparent bg-[#1c1c1c]" : "rounded-xl border border-dashed border-white/15 bg-lab-dark",
              )}
            >
              <span
                aria-hidden
                style={delay}
                className={cn("absolute inset-x-0 top-0 h-0.5 origin-left bg-lab-accent transition-transform duration-500", EASE, team ? "scale-x-100" : "scale-x-0")}
              />
              <p className="t-mono text-lab-accent">
                {s.n}
                <span className="text-white/35 lg:hidden"> · {stages[s.stage - 1].label}</span>
              </p>
              <p className="mt-3 text-[14px] font-medium leading-tight text-white">{s.title}</p>
              <p className="mt-1.5 text-[12px] leading-snug text-white/55">{s.body}</p>

              {/* The specialists this job needs */}
              <ul className="mb-4 mt-3 flex flex-wrap gap-1">
                {(last ? [team ? "The whole team" : "You, again"] : s.roles).map((r) => (
                  <li
                    key={r}
                    className={cn(
                      "flex items-center gap-1 rounded-full border px-1.5 py-[2px] text-[10.5px] leading-tight transition-colors duration-500",
                      team ? "border-white/10 bg-white/[0.06] text-white/75" : "border-dashed border-white/25 text-white/60",
                    )}
                  >
                    <PersonIcon />
                    {r}
                  </li>
                ))}
              </ul>

              <p
                className={cn(
                  "mt-auto w-fit rounded-full border px-2 pb-[2px] pt-[3px] text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors duration-500",
                  team ? "border-transparent bg-lab-accent/15 text-lab-accent" : "border-dashed border-white/25 text-white/55",
                )}
              >
                {team ? "Our team" : last ? "Back to you" : `${s.roles.length} to brief`}
              </p>
            </li>
          );
        })}
      </ol>

      {/* Side-by-side summary: both always visible, the selected one lit; clicking one switches the view */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {(["freelancer", "team"] as const).map((id) => {
          const sel = mode === id;
          const sum = SIDES[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              aria-pressed={sel}
              className={cn(
                "rounded-2xl border p-5 text-left transition-[background-color,border-color,opacity] duration-500",
                EASE,
                sel ? "border-white/25 bg-white/[0.06] opacity-100" : "border-white/10 bg-transparent opacity-55 hover:opacity-90",
              )}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-[17px] font-semibold tracking-tight text-white">{sum.title}</span>
                <span className="t-mono text-lab-accent">{sum.tag}</span>
              </span>
              <span className="mt-3 block space-y-1.5">
                {sum.lines.map((l) => (
                  <span key={l} className="flex gap-2 text-[14px] leading-snug text-white/70">
                    <span aria-hidden className={id === "team" ? "text-lab-accent" : "text-white/35"}>{id === "team" ? "✓" : "–"}</span>
                    {l}
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────── Grow together: the brand journey, small to enterprise ───────────── */

/** Bar length per service at each stage: scope grows as the brand does (illustrative, not a price). */
const BAR_BASE = [26, 52, 76, 100];
const BAR_SHIFT = [0, -8, 4, -4];

const TREE_LABEL = ["An acorn", "A sapling", "A small tree", "A big tree"];
/** Phone stepper: per-plant zoom so each one fills the illustration area. */
const MOBILE_SCALE = [1.5, 1.2, 1.06, 1];

export function GrowthLadder() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const st = growth.stages[i];
  const next = growth.stages[i + 1];

  // "Watch it grow": step through the stages, then stop at the full tree.
  useEffect(() => {
    if (!playing) return;
    if (i >= growth.stages.length - 1) {
      const t = setTimeout(() => setPlaying(false), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI(i + 1), 2000);
    return () => clearTimeout(t);
  }, [playing, i]);

  // Phone stepper: arrows and swipes move one stage at a time.
  const touchX = useRef<number | null>(null);
  const go = (d: number) => {
    setPlaying(false);
    setI((v) => Math.min(growth.stages.length - 1, Math.max(0, v + d)));
  };

  const watch = () => {
    if (playing) return setPlaying(false);
    setI(0);
    setPlaying(true);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="t-mono text-lab-muted">Your brand’s journey</p>
        <button
          type="button"
          onClick={watch}
          aria-pressed={playing}
          className="t-mono rounded-full bg-lab-ink px-3.5 py-1.5 text-white transition-transform hover:scale-[1.04]"
        >
          {playing ? "Pause" : "▶ Watch it grow"}
        </button>
      </div>

      {/* Phones: one stage at a time, with a big illustration and left/right arrows (swipe works too). */}
      <div
        className="overflow-x-clip sm:hidden" /* the scaled-up plants must not widen the page */
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        <div aria-hidden className="relative mx-auto h-[250px] max-w-[300px]">
          {/* Each plant is scaled up so it fills the space (the acorn and sapling are tiny at true scale). */}
          {growth.stages.map((s, k) => (
            <div key={s.id} className="absolute inset-0 origin-bottom" style={{ transform: `scale(${MOBILE_SCALE[k]})` }}>
              <GrowthStage
                kind={k as 0 | 1 | 2 | 3}
                shown={k === i}
                active={k === i}
                className="absolute bottom-0 left-1/2 h-full -translate-x-1/2 translate-y-[1%]"
              />
            </div>
          ))}
        </div>
        <div className="relative z-10 flex items-stretch gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={i === 0}
            aria-label="Previous stage"
            className="grid w-11 shrink-0 place-items-center rounded-xl border border-lab-line bg-white text-lab-ink transition-[opacity,border-color] duration-300 hover:border-lab-accent disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M9.5 6h-7M5.5 3l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div aria-live="polite" className="flex-1 rounded-xl border border-lab-accent bg-lab-accent p-4 text-white shadow-[0_12px_28px_rgba(236,101,48,0.28)]">
            <span key={i} className="block [animation:lab-count-in_.45s_cubic-bezier(0.34,1.4,0.64,1)]">
              <span className="t-mono text-white/80">
                Stage {i + 1} of {growth.stages.length}
              </span>
              <span className="mt-1 block text-[19px] font-semibold leading-tight tracking-tight">{st.label}</span>
              <span className="mt-0.5 block text-[13px] leading-snug text-white/85">{st.who}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={i === growth.stages.length - 1}
            aria-label="Next stage"
            className="grid w-11 shrink-0 place-items-center rounded-xl border border-lab-line bg-white text-lab-ink transition-[opacity,border-color] duration-300 hover:border-lab-accent disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {growth.stages.map((s, k) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setPlaying(false);
                setI(k);
              }}
              aria-label={`Go to stage ${k + 1}: ${s.label}`}
              aria-current={k === i ? "step" : undefined}
              className={cn("h-1.5 rounded-full transition-[width,background-color] duration-500", k === i ? "w-6 bg-lab-accent" : "w-1.5 bg-lab-line2")}
            />
          ))}
        </div>
      </div>

      {/* Staircase (tablet and up): each step is taller than the last, and a plant grows on each one. */}
      <div role="tablist" aria-label="Brand stage" className="hidden grid-cols-4 items-end gap-2 sm:grid">
        {growth.stages.map((s, k) => {
          const on = k === i;
          return (
            <div key={s.id} role="presentation" className="flex flex-col justify-end">
              <div aria-hidden className="relative h-[130px] sm:h-[190px]">
                <GrowthStage kind={k as 0 | 1 | 2 | 3} shown={k <= i} active={on} className="absolute bottom-0 left-1/2 h-full -translate-x-1/2 translate-y-[6%]" />
              </div>
              <button
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={`${s.label}: ${TREE_LABEL[k]}`}
                onClick={() => {
                  setPlaying(false);
                  setI(k);
                }}
                style={{ "--h": `${84 + k * 30}px` } as React.CSSProperties}
                className={cn(
                  "relative z-10 flex min-h-[84px] flex-col justify-end rounded-xl border p-3.5 text-left transition-[background-color,border-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:min-h-[var(--h)]",
                  on
                    ? "border-lab-accent bg-lab-accent text-white shadow-[0_12px_28px_rgba(236,101,48,0.28)]"
                    : "border-lab-line bg-white hover:border-lab-accent",
                )}
              >
                <span className={cn("t-mono transition-colors duration-500", on ? "text-white/80" : "text-lab-light")}>Stage {k + 1}</span>
                <span className="mt-1 text-[17px] font-semibold leading-tight tracking-tight">{s.label}</span>
                <span className={cn("mt-0.5 hidden text-[12px] leading-snug transition-colors duration-500 sm:block", on ? "text-white/85" : "text-lab-muted")}>{s.who}</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]" aria-live="polite">
        <article className="flex flex-col justify-between rounded-2xl border border-lab-line bg-white p-6 sm:p-8">
          <div>
            <p className="t-mono text-lab-accent">Where the brand is</p>
            <h3 className="t-h2 mt-3 text-[clamp(1.5rem,2.2vw,1.9rem)]">{st.who}</h3>
            <p className="t-body mt-3 text-[15.5px]">{st.line}</p>
          </div>
          <div className="mt-7 rounded-xl bg-lab-yellow/30 p-4">
            <p className="t-mono text-lab-muted">How we work together</p>
            <p className="mt-1 text-[19px] font-semibold tracking-tight">{st.model.name}</p>
            <p className="t-body mt-1 text-[14px]">{st.model.body}</p>
          </div>
        </article>

        <article className="rounded-2xl border border-lab-line bg-white p-6 sm:p-8">
          <p className="t-mono text-lab-accent">What we do at this stage</p>
          <ul className="mt-5 space-y-5">
            {growth.services.map((sv, k) => {
              const pct = Math.min(100, Math.max(14, BAR_BASE[i] + BAR_SHIFT[k]));
              return (
                <li key={sv.id}>
                  <span className="t-mono text-lab-muted">{sv.label}</span>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-lab-line">
                    <div className="h-full rounded-full bg-lab-accent transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-2 text-[14.5px] font-medium leading-snug">{st.scope[k]}</p>
                </li>
              );
            })}
          </ul>
          <p className="t-mono mt-6 text-lab-light">Bar length shows how scope grows, not a price.</p>
        </article>
      </div>

      {/* Proof (unnamed, from our own results) or a nudge to the next stage */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {st.proof.length > 0 ? (
          st.proof.map((p) => (
            <div key={p.who + p.value} className="flex items-center gap-5 rounded-2xl border border-lab-line bg-lab-bg p-5">
              <p className="text-[40px] font-semibold leading-none tracking-[-0.04em] text-lab-accent">{p.value}</p>
              <div>
                <p className="text-[14px] leading-snug">{p.label}</p>
                <p className="t-mono mt-1 text-lab-light">{p.who}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-dashed border-lab-line2 p-5 text-[14.5px] text-lab-muted sm:col-span-2">
            {next ? (
              <>
                Every big brand started somewhere. When you move up to <strong className="font-medium text-lab-ink">{next.label.toLowerCase()}</strong>, we move with you: {next.model.name.toLowerCase()}.
              </>
            ) : (
              <>Every big brand started somewhere.</>
            )}
          </p>
        )}
      </div>

      <ul className="mt-10 grid gap-4 border-t border-lab-line pt-8 sm:grid-cols-3">
        {growth.constant.map((c) => (
          <li key={c.title} className="flex gap-3">
            <span className="mt-[7px] size-2 shrink-0 rounded-full bg-lab-accent" />
            <div>
              <p className="text-[16px] font-semibold tracking-tight">{c.title}</p>
              <p className="t-body mt-0.5 text-[14px]">{c.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
