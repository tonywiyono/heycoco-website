import Image from "next/image";
import { growth, href, labSite, reasons } from "@/content/lab";
import { crafts } from "@/content/lab-crafts";
import { works } from "@/content/works";
import { cn } from "@/lib/cn";
import { Reveal } from "./LabClient";
import { FeaturedWork, GrowthLadder, StepsToggle } from "./LabInteractive";
import { Arrow, ClientMark, CtaBlock, Dim, Eyebrow, GhostButton, Hl, PillButton, WorkRow } from "./LabShared";

const byCat = (c: string) => works.filter((w) => w.category === c);

/* ───────────── 1. Hero ───────────── */
const heroIntro =
  "We are a small team of proactive and slightly crazy professionals. We love our job with all our heart and that’s why we’re here for you!";

/**
 * A rounded photo panel that starts at the very top of the page, so the white nav bar floats over it:
 * we look up out of a cardboard box at a cat against the sky.
 * The panel always fits the screen height, so the buttons on the box floor are always visible.
 * Headline stacks "For anyone / who dares / to grow!" on the left wall (lg+) or at the top of the panel
 * (phones). White text in landscape and on desktop; dark text on a white haze in phone portrait.
 */
export function LabHero() {
  return (
    <section id="top" className="bg-lab-bg px-2 pt-2 sm:px-3 sm:pt-3 lg:px-4 lg:pt-4">
      <div className="relative mx-auto h-[calc(100svh-16px)] min-h-[560px] max-w-[1840px] overflow-hidden rounded-[24px] landscape:min-h-[300px] sm:h-[calc(100svh-24px)] lg:h-[min(56.55vw,1040px,calc(100svh-32px))] lg:min-h-[540px] lg:rounded-[34px] landscape:lg:min-h-[540px]">
        <Image
          src="/images/hero-cat.webp"
          alt="An orange fluffy cat peeking down into a cardboard box, blue sky behind"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[52%_50%] lg:object-center"
        />
        {/* Phones: a haze behind the nav + headline: white in portrait (dark text), dark in landscape (white text) */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-lab-bg/95 via-lab-bg/80 to-transparent landscape:from-black/50 landscape:via-black/20 lg:hidden" />

        {/* Headline: left wall on lg, top of the panel (under the floating nav) on phones */}
        <Reveal className="absolute inset-x-0 top-0 z-10 px-5 pt-[108px] sm:px-8 landscape:pt-[96px] lg:inset-x-auto lg:left-[4.2%] lg:top-[19%] lg:w-[27%] lg:p-0 landscape:lg:pt-0">
          <Eyebrow className="w-fit rounded-full bg-lab-bg/90 px-3 py-1.5 text-lab-ink lg:w-max">{labSite.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-[clamp(2.1rem,9.2vw,3.3rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] landscape:text-[clamp(1.8rem,4.6vw,2.8rem)] landscape:text-white landscape:[text-shadow:0_2px_14px_rgba(0,0,0,0.3)] lg:mt-5 lg:text-[clamp(2.2rem,3.3vw,3.9rem)] lg:text-white lg:[text-shadow:0_2px_14px_rgba(0,0,0,0.3)] landscape:lg:text-[clamp(2.2rem,3.3vw,3.9rem)]">
            <span className="lg:block">
              For <span className="text-lab-accent landscape:text-white lg:text-white">anyone</span>
            </span>{" "}
            <span className="lg:block">who dares</span>{" "}
            <span className="lg:mt-1 lg:block">
              to{" "}
              <span className="inline-block -rotate-3 rounded-[0.16em] bg-lab-accent px-[0.16em] pb-[0.04em] text-white lg:shadow-[0_6px_0_rgba(26,18,9,0.22)]">grow!</span>
            </span>
          </h1>
        </Reveal>

        {/* Desktop: the intro sits small and left-aligned in the bottom-left corner of the box */}
        <Reveal delay={260} className="absolute bottom-[6.5%] left-[4.2%] z-10 hidden w-[17%] min-w-[220px] max-w-[290px] lg:block">
          <span aria-hidden className="mb-3 block h-[2px] w-7 rounded-full bg-lab-accent" />
          <p className="text-pretty text-left text-[13px] font-medium leading-[1.6] text-white">{heroIntro}</p>
        </Reveal>

        {/* Box floor: (phones) the intro in a narrow left column with a short orange rule, then the buttons */}
        <Reveal delay={200} className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-4 pb-5 sm:p-8 lg:bottom-[6.5%] lg:p-0">
          <div className="max-w-[56%] sm:max-w-[300px] lg:hidden">
            <span aria-hidden className="mb-2.5 block h-[2px] w-6 rounded-full bg-lab-accent" />
            <p className="text-pretty text-left text-[12px] font-medium leading-[1.55] text-white">{heroIntro}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <PillButton href={href("/contact")}>Start a project</PillButton>
            <GhostButton href={href("/work")}>
              See our work <Arrow />
            </GhostButton>
          </div>
        </Reveal>
      </div>

      {/* Phones/tablets: short intro under the panel */}
      <Reveal className="mx-auto max-w-[620px] px-3 pb-4 pt-8 lg:hidden">
        <p className="text-[16px] leading-relaxed text-lab-muted">
          A 15+ strong team, working seamlessly across production, social media and performance.{" "}
          <strong className="font-medium text-lab-ink">We plan, shoot, post and promote, then let the results shape the next shoot.</strong>
        </p>
      </Reveal>
    </section>
  );
}

/* ───────────── 2. Brands (white) ───────────── */
const dots = ["bg-lab-accent", "bg-lab-yellow", "bg-lab-pink", "bg-lab-ink"];
const nameStyles = [
  "font-medium tracking-tight",
  "font-medium uppercase tracking-[0.08em] text-[15px]",
  "font-normal tracking-[-0.03em]",
  "font-semibold tracking-tighter",
];

export function LabBrands() {
  const shown = works.slice(0, 12);
  return (
    <section className="lab-section bg-white">
      <div className="lab-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 className="t-h2 max-w-[360px]">
            The creative partner behind brands <Hl>across Indonesia.</Hl>
          </h2>
          <div className="mt-10 flex gap-10 border-b border-lab-line pb-8">
            <div>
              <p className="text-[44px] font-normal leading-none tracking-[-0.04em]">{works.length}<span className="text-lab-accent">+</span></p>
              <p className="t-mono mt-2 text-lab-light">brands featured</p>
            </div>
            <div className="border-l border-lab-line pl-10">
              <p className="text-[44px] font-normal leading-none tracking-[-0.04em]">3</p>
              <p className="t-mono mt-2 text-lab-light">crafts, one team</p>
            </div>
          </div>
          <p className="t-mono mt-6 text-lab-light">Based in</p>
          <p className="mt-2 text-[18px] font-medium tracking-tight">Jakarta & Bali</p>
        </Reveal>
        <Reveal delay={100}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
            {shown.map((w, i) => (
              <li key={w.slug}>
                <a href={href(`/work/${w.slug}`)} className="group block">
                  <span className="flex items-start gap-2">
                    <span className={cn("mt-[7px] size-2 shrink-0 rounded-full", dots[i % dots.length])} />
                    <ClientMark slug={w.slug} name={w.client} className={cn("block text-[19px] leading-tight text-lab-ink", nameStyles[i % nameStyles.length])} />
                  </span>
                  <span className="t-mono mt-2 block text-[9.5px] text-lab-accent opacity-90 group-hover:underline">Case study →</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13px] text-lab-muted">and {Math.max(works.length - shown.length, 0)} more brands</p>
            <PillButton href={href("/work")}>All our work</PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── 3. Featured work (grey) ───────────── */
export function LabFeatured() {
  const picks = ["kahf-extrait", "beluga-coffee", "first-step-matters-photoshoot", "snail-helmet"]
    .map((s) => works.find((w) => w.slug === s)!)
    .filter(Boolean);
  return (
    <section className="lab-section bg-lab-bg">
      <div className="lab-container">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>In our work</Eyebrow>
            <h2 className="t-h2 mt-4">
              Recent work, <Hl>up close.</Hl>
            </h2>
          </div>
          <GhostButton href={href("/work")}>See all work <Arrow /></GhostButton>
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <FeaturedWork items={picks} />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── 4. Grow together: small to enterprise ───────────── */
export function LabGrow() {
  return (
    <section id="grow" className="bg-lab-bg pb-20 lg:pb-28">
      <div className="lab-container">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <Eyebrow className="justify-center">Grow together</Eyebrow>
          <h2 className="t-h2 mt-4">
            <Hl>{growth.title.accent}</Hl> {growth.title.post}
          </h2>
          <p className="t-body mx-auto mt-4 max-w-[560px] text-[16px]">{growth.sub}</p>
        </Reveal>
        <Reveal delay={100} className="mt-12">
          <GrowthLadder />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── 5. Eight steps (dark) ───────────── */
export function LabLoop() {
  return (
    <section className="lab-section bg-lab-dark text-white">
      <div className="lab-container">
        <Reveal>
          <h2 className="t-h2 max-w-[680px]">
            Eight jobs, ten people to brief. <Dim dark>Or one team that already works together.</Dim>
          </h2>
          <p className="mt-4 max-w-[520px] text-[15px] text-white/65">Strategy, branding, production, design, social and ads, all in-house. You brief us once; we brief each other.</p>
        </Reveal>
        <Reveal delay={100} className="mt-12">
          <StepsToggle />
        </Reveal>
        <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-[15px] text-white/80">Want this loop built around your brand?</p>
          <PillButton href={href("/contact")} light>
            Start a project
          </PillButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── 6. Reasons (white) ───────────── */
function ReasonMock({ n }: { n: string }) {
  const social = byCat("social-media");
  if (n === "1") {
    return (
      <div className="rounded-2xl border border-lab-line bg-lab-yellow/25 p-5">
        <p className="t-mono text-lab-muted">One brief</p>
        <div className="mt-3 rounded-xl border border-lab-line bg-white p-4 text-[14px]">“Launch the new range with content that sells.”</div>
        <div className="my-3 flex justify-center text-lab-line2">↓</div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {["Concept", "Shoot", "Post", "Promote"].map((s, i) => (
            <div key={s} className="rounded-xl border border-lab-line bg-white p-3 text-center">
              <p className="t-mono text-lab-accent">0{i + 1}</p>
              <p className="mt-1 text-[13px] font-medium">{s}</p>
            </div>
          ))}
        </div>
        <p className="t-mono mt-4 text-lab-light">Same team, same week</p>
      </div>
    );
  }
  if (n === "2") {
    const six = [...byCat("photo-video"), ...social].slice(0, 6);
    return (
      <div className="rounded-2xl border border-lab-line bg-lab-pink/30 p-5">
        <div className="flex items-center justify-between">
          <p className="t-mono text-lab-muted">One shoot, six variants</p>
          <p className="t-mono text-lab-light">Illustrative</p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {six.map((w, i) => (
            <div key={w.slug} className="relative aspect-square overflow-hidden rounded-xl border border-lab-line bg-white">
              <Image src={w.thumb} alt="" fill sizes="140px" className={cn("object-cover", i > 1 && "opacity-60 saturate-50")} />
              <span className={cn("t-mono absolute left-1.5 top-1.5 rounded px-1.5 py-0.5 text-[8.5px]", i < 2 ? "bg-lab-accent text-white" : "bg-white/90 text-lab-muted")}>
                {i < 2 ? "Promoted" : `Hook ${String.fromCharCode(65 + i)}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-lab-line bg-lab-bg p-5">
      <div className="flex items-center justify-between">
        <p className="t-mono flex items-center gap-2 text-lab-muted"><span className="size-1.5 bg-lab-accent" /> Monthly review</p>
        <p className="t-mono text-lab-light">Example</p>
      </div>
      <div className="mt-4 space-y-2">
        {[
          ["What we posted", "Reels, carousels, stories"],
          ["What worked", "Behind-the-scenes Reels"],
          ["What we’ll change", "Shoot more of what worked"],
        ].map(([k, v], i) => (
          <div key={k} className={cn("flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-[13.5px]", i === 2 ? "border-lab-ink bg-lab-ink text-white" : "border-lab-line bg-white")}>
            <span className={cn("t-mono", i === 2 ? "text-white/60" : "text-lab-light")}>{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11.5px] text-lab-light">Example report, illustrative content.</p>
    </div>
  );
}

export function LabReasons() {
  return (
    <section id="why" className="lab-section bg-white">
      <div className="lab-container">
        <Reveal>
          <Eyebrow>Why Hey Coco!</Eyebrow>
          <h2 className="t-h2 mt-4 max-w-[600px]">
            Why you should <Hl>work with us.</Hl>
          </h2>
        </Reveal>
        <div className="mt-6 divide-y divide-lab-line">
          {reasons.map((r) => {
            const [pre, post] = r.title.split(r.accent);
            return (
              <div key={r.n} className="grid items-center gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                <Reveal className={cn(r.n === "2" && "lg:order-2")}>
                  <p className="t-mono text-lab-light">Reason #{r.n}</p>
                  <h3 className="t-h2 mt-3 text-[clamp(1.6rem,2.4vw,2.1rem)]">
                    {pre}
                    <Hl>{r.accent}</Hl>
                    {post}
                  </h3>
                  <p className="t-body mt-5 max-w-[440px]">{r.body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {r.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[14px]">
                        <svg width="14" height="14" viewBox="0 0 14 14" className="mt-[3px] shrink-0 text-lab-accent" aria-hidden>
                          <path d="M2.5 7.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={100} className={cn(r.n === "2" && "lg:order-1")}>
                  <ReasonMock n={r.n} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── 7. Services (grey) ───────────── */
function ServiceMock({ slug }: { slug: string }) {
  if (slug === "production") {
    const p = byCat("photo-video").slice(0, 2);
    const extra = works[3];
    const list = [...p, extra].filter(Boolean);
    return (
      <div className="relative h-[210px] overflow-hidden rounded-xl bg-lab-yellow/25 p-3">
        <div className="grid h-full grid-cols-3 gap-2">
          {list.map((w, i) => (
            <div key={w.slug} className={cn("relative overflow-hidden rounded-lg border border-lab-line bg-white", i === 1 && "translate-y-4")}>
              <Image src={w.thumb} alt="" fill sizes="120px" className="object-cover" />
            </div>
          ))}
        </div>
        <span className="t-mono absolute bottom-3 left-3 rounded bg-white/90 px-2 py-1 text-[9px] text-lab-muted">Shot once, cut for every channel</span>
      </div>
    );
  }
  if (slug === "social-media") {
    const s = byCat("social-media").slice(0, 6);
    return (
      <div className="h-[210px] overflow-hidden rounded-xl bg-lab-pink/30 p-3">
        <div className="flex items-center gap-2 pb-2">
          <span className="size-5 rounded-full bg-lab-ink" />
          <span className="text-[11px] font-medium">yourbrand</span>
          <span className="t-mono ml-auto text-[8.5px] text-lab-light">Illustrative feed</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {s.map((w) => (
            <div key={w.slug} className="relative aspect-square overflow-hidden rounded-md bg-white">
              <Image src={w.thumb} alt="" fill sizes="90px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="h-[210px] rounded-xl bg-lab-soft p-3">
      <div className="flex items-center justify-between">
        <span className="t-mono text-[9px] text-lab-muted">Campaign · last 30 days</span>
        <span className="t-mono text-[8.5px] text-lab-light">Illustrative numbers</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[["Reach", "128k"], ["Leads", "412"], ["Cost / lead", "Rp 38k"]].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-lab-line bg-white p-2.5">
            <p className="t-mono text-[8px] text-lab-light">{k}</p>
            <p className="mt-1 text-[16px] font-medium tracking-tight">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-[78px] items-end gap-1.5 rounded-lg border border-lab-line bg-white p-2.5">
        {[28, 40, 34, 52, 46, 64, 58, 78].map((h, i) => (
          <span key={i} className={cn("flex-1 rounded-sm", i === 7 ? "bg-lab-accent" : "bg-lab-line2")} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function LabServices() {
  return (
    <section id="services" className="lab-section bg-lab-bg">
      <div className="lab-container">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h2 className="t-h2 mt-4 max-w-[720px]">
            We make, post and promote <Hl>work that gets noticed</Hl> <Dim>for ambitious brands.</Dim>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {crafts.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <a href={href(`/services/${c.slug}`)} className="group flex h-full flex-col rounded-2xl border border-lab-line bg-white p-5 transition-shadow hover:shadow-[0_14px_34px_rgba(13,13,13,0.1)]">
                <p className="t-mono text-lab-accent">{c.name}</p>
                <h3 className="t-h3 mt-3 min-h-[58px]">{c.panelLine}</h3>
                <ul className="mt-4 space-y-1.5 text-[13px] text-lab-muted">
                  {c.includes.slice(0, 2).map((it) => (
                    <li key={it.title} className="flex gap-2"><span className="text-lab-light">·</span>{it.title}</li>
                  ))}
                </ul>
                <div className="mt-6"><ServiceMock slug={c.slug} /></div>
                <span className="mt-5 flex items-center justify-end gap-1.5 text-[12.5px] font-medium">
                  Explore <Arrow className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── 8. Selected work (white) ───────────── */
export function LabWork() {
  const rows = [...byCat("photo-video"), ...byCat("social-media")].slice(0, 6);
  return (
    <section id="work" className="lab-section bg-white">
      <div className="lab-container">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="t-h2 mt-4">
              The kind of work that <Hl>gets noticed.</Hl>
            </h2>
          </div>
          <PillButton href={href("/work")}>All {works.length} projects</PillButton>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {rows.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 2) * 80}>
              <WorkRow work={w} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { CtaBlock };
