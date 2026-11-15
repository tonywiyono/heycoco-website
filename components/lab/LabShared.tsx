import Image from "next/image";
import { clientLogos } from "@/content/client-logos";
import { footerCols, hiringSteps, href, labSite } from "@/content/lab";
import { works, type Work } from "@/content/works";
import { cn } from "@/lib/cn";
import { Reveal } from "./LabClient";

export const categoryLabel: Record<string, string> = {
  "social-media": "Social media",
  "photo-video": "Photo & video",
  branding: "Branding",
  "performance-marketing": "Performance",
};

export const Arrow = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Mono micro-label with the orange square marker. */
export function Eyebrow({ children, className, dark }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <p className={cn("t-mono flex items-center gap-2", dark ? "text-white/55" : "text-lab-muted", className)}>
      <span className="size-[7px] shrink-0 bg-lab-accent" />
      {children}
    </p>
  );
}

/** Orange keyword inside a heading. */
export function Hl({ children }: { children: React.ReactNode }) {
  return <span className="text-lab-accent">{children}</span>;
}

/** Yellow highlighter marker behind a keyword. */
export function Mark({ children }: { children: React.ReactNode }) {
  return <span className="lab-mark">{children}</span>;
}

/** Muted second half of a heading (the GTMLab two-tone headline). */
export function Dim({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={dark ? "text-white/45" : "text-lab-ink/40"}>{children}</span>;
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Primary pill: near-black with a white arrow chip. */
export function PillButton({ href: to, children, light }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <a
      href={to}
      className={cn(
        "lab-btn inline-flex h-10 items-center gap-3 rounded-full pl-[18px] pr-[5px] text-[13.5px] font-medium",
        light ? "bg-white text-lab-ink" : "bg-lab-ink text-white",
      )}
    >
      {children}
      <span className={cn("chip grid size-[30px] place-items-center rounded-full", light ? "bg-lab-ink text-white" : "bg-white text-lab-ink")}>
        <Arrow />
      </span>
    </a>
  );
}
export const ArrowButton = PillButton;

/** Secondary pill: white with a hairline border. */
export function GhostButton({ href: to, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={to} className="inline-flex h-10 items-center gap-2 rounded-full border border-lab-line2 bg-white px-[18px] text-[13.5px] font-medium transition-colors hover:border-lab-ink">
      {children}
    </a>
  );
}

/** Simple work card (image + category + title). */
export function WorkCard({ work, priority = false }: { work: Work; priority?: boolean }) {
  return (
    <a href={href(`/work/${work.slug}`)} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-lab-line bg-lab-bg">
        <Image
          src={work.thumb}
          alt={`${work.title}: ${work.type}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <p className="t-mono mt-4 text-lab-light">{categoryLabel[work.category] ?? work.type} · {work.year}</p>
      <h3 className="mt-1 text-[19px] font-medium tracking-tight group-hover:underline">{work.title}</h3>
    </a>
  );
}

/** Horizontal work row with a thumbnail on the right (the "case card" pattern). */
export function WorkRow({ work }: { work: Work }) {
  return (
    <a
      href={href(`/work/${work.slug}`)}
      className="group grid grid-cols-[1fr_150px] gap-5 rounded-2xl border border-lab-line bg-white p-5 transition-shadow hover:shadow-[0_14px_34px_rgba(13,13,13,0.1)] sm:grid-cols-[1fr_190px]"
    >
      <div className="flex min-w-0 flex-col justify-between gap-5">
        <div>
          <p className="text-[22px] font-medium leading-none tracking-tight">{work.client}</p>
          <p className="t-mono mt-2 text-lab-light">{categoryLabel[work.category] ?? work.type}</p>
          <p className="t-body mt-4 text-[13.5px] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">{work.description}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="t-mono text-lab-muted">{work.type} · {work.year}</span>
          <span className="grid size-8 place-items-center rounded-full bg-lab-bg text-lab-ink transition-transform group-hover:translate-x-1"><Arrow /></span>
        </div>
      </div>
      <div className="relative aspect-[4/5] self-stretch overflow-hidden rounded-xl bg-lab-bg">
        <Image src={work.thumb} alt={work.title} fill sizes="190px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
    </a>
  );
}

/** Client name, or its logo when one exists in content/client-logos.ts. */
export function ClientMark({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const logo = clientLogos[slug];
  return logo ? (
    <Image src={logo} alt={name} width={140} height={36} className={cn("h-8 w-auto max-w-[140px] object-contain", className)} />
  ) : (
    <span className={className}>{name}</span>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-lab-line rounded-2xl border border-lab-line bg-white">
      {items.map((it) => (
        <details key={it.q} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium tracking-tight">
            {it.q}
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-lab-bg text-lab-ink transition-transform group-open:rotate-45" aria-hidden>+</span>
          </summary>
          <p className="t-body mt-3 max-w-2xl">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/** "How we start" white card (used inside the dark CTA). */
export function HowWeStartCard() {
  return (
    <div className="rounded-2xl bg-white p-6 text-lab-ink shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
      <p className="t-mono text-lab-light">How we start</p>
      <ol className="mt-5 divide-y divide-lab-line">
        {hiringSteps.map((s) => (
          <li key={s.n} className="flex gap-4 py-4 first:pt-0">
            <span className={cn("grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-medium", s.n === "3" ? "bg-lab-accent text-white" : "bg-lab-bg")}>{s.n}</span>
            <div>
              <p className="text-[15px] font-medium">{s.title}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-lab-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[12.5px] text-lab-muted">
        For brands ready to invest in content. <span className="text-lab-ink">Replies within a day.</span>
      </p>
      <a href={href("/contact")} className="lab-btn mt-5 flex h-11 items-center justify-between rounded-full bg-lab-ink pl-5 pr-[6px] text-[13.5px] font-medium text-white">
        Start a project
        <span className="chip grid size-[32px] place-items-center rounded-full bg-white text-lab-ink"><Arrow /></span>
      </a>
    </div>
  );
}

/** Dark CTA card: orange glow, two-tone heading, mono tags, white steps card, client-name marquee. */
export function CtaBlock({ title }: { title?: React.ReactNode }) {
  const names = works.map((w) => w.client);
  const loop = [...names, ...names];
  return (
    <section className="px-3 pb-16 sm:px-6 lg:pb-24">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-2xl bg-lab-dark text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_0%_0%,rgba(236,101,48,0.32),transparent_60%),radial-gradient(ellipse_40%_55%_at_100%_100%,rgba(236,101,48,0.14),transparent_60%)]" />
        <div className="relative grid gap-10 p-7 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
          <Reveal>
            <h2 className="t-h1">
              {title ?? (
                <>
                  Let’s make something <Hl>people remember.</Hl>
                </>
              )}
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/70">
              A launch, a new look, a feed that needs a pulse. Tell us what you’re making and we’ll reply within a day.
            </p>
            <p className="t-mono mt-10 text-white/40">Ways to work with us</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {["Production", "Social media", "Performance"].map((t) => (
                <li key={t} className="t-mono rounded-md border border-white/15 bg-white/[0.04] px-3 py-2 text-white/80">{t}</li>
              ))}
            </ul>
            <a href={labSite.whatsapp} className="mt-8 inline-block text-[13.5px] text-white/70 underline underline-offset-4 hover:text-white">
              Or chat with us on WhatsApp
            </a>
          </Reveal>
          <Reveal delay={120}>
            <HowWeStartCard />
          </Reveal>
        </div>
        <div className="relative flex items-center gap-6 border-t border-white/10 px-7 py-5 sm:px-12">
          <p className="t-mono hidden shrink-0 text-white/35 sm:block">Selected clients</p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <div className="lab-marquee flex w-max gap-10">
              {loop.map((n, i) => (
                <span key={i} className="whitespace-nowrap text-[17px] font-medium tracking-tight text-white/55">{n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LabFooter() {
  return (
    <footer className="bg-lab-dark px-5 pb-10 pt-16 text-white sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="t-h1 max-w-3xl">Make it, post it, <span className="text-white/45">and make it perform.</span></h2>
        <p className="t-mono mt-6 text-white/45">{labSite.locations}</p>
        <div className="mt-16 grid gap-10 border-t border-white/12 pt-10 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-3 text-[24px] font-semibold tracking-tight">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-96.webp" alt="" width={40} height={40} className="size-10" />
              {labSite.name}
            </p>
            <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-white/60">Boutique creative agency for production, social media and performance marketing.</p>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <p className="t-mono text-white/40">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-white/75 transition-colors hover:text-white">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/12 pt-6 text-[12.5px] text-white/45">
          <span>© {new Date().getFullYear()} {labSite.name}</span>
          <span className="flex gap-5">
            <a href={labSite.instagram} className="hover:text-white">Instagram</a>
            <a href={`mailto:${labSite.email}`} className="hover:text-white">{labSite.email}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
