import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/lab/LabClient";
import { ContactForm } from "@/components/lab/ContactForm";
import { Arrow, CtaBlock, Eyebrow, Faq, GhostButton, Hl, JsonLd, PillButton, WorkCard } from "@/components/lab/LabShared";
import { href, labSite } from "@/content/lab";
import { craftBySlug, crafts } from "@/content/lab-crafts";
import { works } from "@/content/works";

type Params = { craft: string };

export function generateStaticParams() {
  return crafts.map((c) => ({ craft: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = craftBySlug((await params).craft);
  if (!c) return {};
  return { title: c.name, description: c.intro };
}

export default async function CraftPage({ params }: { params: Promise<Params> }) {
  const c = craftBySlug((await params).craft);
  if (!c) notFound();
  const proof = works.filter((w) => c.workCategories.includes(w.category)).slice(0, 6);
  const others = crafts.filter((x) => x.slug !== c.slug);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: c.name,
            serviceType: c.name,
            provider: { "@type": "ProfessionalService", name: labSite.name },
            areaServed: ["Jakarta", "Bali", "Indonesia"],
            description: c.definitionA,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      {/* Hero */}
      <section className="bg-lab-bg pb-16 pt-36 lg:pb-24 lg:pt-44">
        <div className="lab-container">
          <Reveal>
            <Eyebrow>{c.name}</Eyebrow>
            <h1 className="t-h1 mt-5 max-w-[760px]">{c.h1}</h1>
            <p className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-lab-muted">{c.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton href="#enquire">Talk to us about {c.name.toLowerCase()}</PillButton>
              {proof.length > 0 && <GhostButton href="#proof">See the work <Arrow /></GhostButton>}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Definition (written to be quotable by search and AI answers) */}
      <section className="bg-white py-14 lg:py-20">
        <Reveal className="lab-container grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="t-h2">{c.definitionQ}</h2>
          <p className="text-[18px] leading-relaxed tracking-[-0.01em] text-lab-muted">{c.definitionA}</p>
        </Reveal>
      </section>

      {/* What's included */}
      <section className="lab-section bg-lab-bg">
        <div className="lab-container">
          <Reveal>
            <Eyebrow>What’s included</Eyebrow>
            <h2 className="t-h2 mt-4 max-w-[560px]">What you get with <Hl>{c.name.toLowerCase()}.</Hl></h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.includes.map((it, i) => (
              <Reveal key={it.title} delay={(i % 3) * 70}>
                <div className="h-full rounded-2xl border border-lab-line bg-white p-6">
                  <p className="t-mono text-lab-accent">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-4 text-[19px] font-medium tracking-tight">{it.title}</p>
                  <p className="t-body mt-2 text-[14px]">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where it goes wrong (dark) */}
      <section className="lab-section bg-lab-dark text-white">
        <div className="lab-container">
          <Reveal>
            <Eyebrow dark>Where it usually goes wrong</Eyebrow>
            <h2 className="t-h2 mt-4 max-w-[640px]">{c.leaksTitle}</h2>
          </Reveal>
          <div className="mt-10 grid overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {c.leaks.map((l, i) => (
              <Reveal key={l.title} delay={(i % 3) * 70}>
                <div className="h-full border-b border-r border-white/10 p-6">
                  <p className="t-mono text-lab-accent">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-4 text-[17px] font-medium leading-snug tracking-tight">{l.title}</p>
                  <p className="mt-2 text-[13.5px] leading-snug text-white/60">{l.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="lab-section bg-white">
        <div className="lab-container">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="t-h2 mt-4">From brief to <Hl>delivered.</Hl></h2>
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {c.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <li className="h-full list-none rounded-2xl border border-lab-line bg-lab-bg p-6">
                  <span className="grid size-7 place-items-center rounded-full bg-lab-ink text-[11px] font-medium text-white">{i + 1}</span>
                  <p className="mt-5 text-[19px] font-medium tracking-tight">{s.title}</p>
                  <p className="t-body mt-2 text-[14px]">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Proof: real works only */}
      <section id="proof" className="lab-section bg-lab-bg">
        <div className="lab-container">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Proof</Eyebrow>
              <h2 className="t-h2 mt-4">{c.name} <Hl>we’ve done.</Hl></h2>
            </div>
            {proof.length > 0 && <GhostButton href={href("/work")}>All work <Arrow /></GhostButton>}
          </Reveal>
          {proof.length > 0 ? (
            <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {proof.map((w, i) => (
                <Reveal key={w.slug} delay={(i % 3) * 70}>
                  <WorkCard work={w} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-8 max-w-xl rounded-2xl border border-dashed border-lab-line2 bg-white p-8 text-[15px] text-lab-muted">
              We’re adding {c.name.toLowerCase()} case studies. Ask us and we’ll share examples that fit your category.
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="lab-section bg-white">
        <div className="lab-container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Questions we hear most</Eyebrow>
            <h2 className="t-h2 mt-4">Good to <Hl>know.</Hl></h2>
          </Reveal>
          <Reveal delay={80}><Faq items={c.faq} /></Reveal>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="lab-section scroll-mt-24 bg-lab-bg">
        <div className="lab-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Start here</Eyebrow>
            <h2 className="t-h2 mt-4">Tell us about your <Hl>{c.name.toLowerCase()}</Hl> needs.</h2>
            <p className="t-body mt-4 max-w-sm">A few lines is enough. We reply within a day.</p>
          </Reveal>
          <Reveal delay={80} className="rounded-2xl border border-lab-line bg-white p-6 sm:p-8">
            <ContactForm defaultService={c.name} />
          </Reveal>
        </div>
      </section>

      {/* Other crafts */}
      <section className="bg-white pb-16 pt-4 lg:pb-24">
        <div className="lab-container grid gap-4 sm:grid-cols-2">
          {others.map((o) => (
            <a key={o.slug} href={href(`/services/${o.slug}`)} className="group flex items-center justify-between rounded-2xl border border-lab-line bg-lab-bg p-6 transition-shadow hover:shadow-[0_14px_34px_rgba(13,13,13,0.1)]">
              <span>
                <span className="t-mono text-lab-light">Also from the same team</span>
                <span className="mt-1 block text-[24px] font-medium tracking-tight">{o.name}</span>
              </span>
              <span className="grid size-8 place-items-center rounded-full bg-white transition-transform group-hover:translate-x-1"><Arrow /></span>
            </a>
          ))}
        </div>
      </section>
      <div className="bg-lab-bg"><CtaBlock /></div>
    </>
  );
}
