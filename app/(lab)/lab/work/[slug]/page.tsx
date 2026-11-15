import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/lab/LabClient";
import { Arrow, CtaBlock, Eyebrow, JsonLd, PillButton, categoryLabel } from "@/components/lab/LabShared";
import { href } from "@/content/lab";
import { workResults } from "@/content/work-results";
import { works } from "@/content/works";

type Params = { slug: string };

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

const serviceHub = (category: string) =>
  category === "photo-video" ? "production" : category === "performance-marketing" ? "performance" : "social-media";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const w = works.find((x) => x.slug === slug);
  if (!w) return {};
  return {
    title: `${w.title}: ${w.type}`,
    description: w.description.slice(0, 155),
    openGraph: { images: [w.hero] },
  };
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = works.findIndex((w) => w.slug === slug);
  if (i < 0) notFound();
  const w = works[i];
  const prev = works[(i - 1 + works.length) % works.length];
  const next = works[(i + 1) % works.length];
  const extra = workResults[w.slug];
  const hub = serviceHub(w.category);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${w.title}: ${w.type}`,
          creator: { "@type": "Organization", name: "Hey Coco!" },
          about: w.client,
          dateCreated: w.year,
          image: w.hero,
          description: w.description,
        }}
      />
      <section className="bg-lab-bg pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="lab-container">
          <a href={href("/work")} className="t-mono inline-flex items-center gap-2 text-lab-muted hover:text-lab-ink">← All work</a>
          <Reveal>
            <Eyebrow className="mt-6">{categoryLabel[w.category] ?? w.type} · {w.year}</Eyebrow>
            <h1 className="t-h1 mt-5 max-w-[760px]">{w.title}</h1>
          </Reveal>

          <Reveal delay={100} className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-lab-line bg-white">
            <Image src={w.hero} alt={w.title} fill priority sizes="(min-width: 1240px) 1176px, 100vw" className="object-cover" />
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <div>
              <p className="t-mono text-lab-light">The brand</p>
              <p className="mt-3 max-w-[620px] whitespace-pre-line text-[19px] leading-relaxed tracking-[-0.01em]">{extra?.brief ?? w.description}</p>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 rounded-2xl border border-lab-line bg-white p-6">
              {[
                ["Client", w.client],
                ["Service", w.type],
                ["Year", w.year],
                ["Agency", "Hey Coco! Creative Agency"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="t-mono text-lab-light">{k}</dt>
                  <dd className="mt-1 text-[14.5px] font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {extra?.results && extra.results.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {extra.results.map((r) => (
                <div key={r.label} className="rounded-2xl bg-lab-dark p-6 text-white">
                  <div className="text-[44px] font-normal leading-none tracking-[-0.04em] text-lab-accent">{r.value}</div>
                  <div className="t-mono mt-3 text-white/55">{r.label}</div>
                </div>
              ))}
            </div>
          )}

          {w.gallery.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {w.gallery.map((src, n) => (
                <Reveal key={src} delay={(n % 2) * 80}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-lab-line bg-white">
                    <Image src={src} alt={`${w.title} ${n + 1}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-lab-line bg-white p-6 sm:p-8">
            <p className="max-w-md text-[18px] tracking-tight">Want this for your brand? See how our {categoryLabel[w.category]?.toLowerCase() ?? "creative"} service works.</p>
            <PillButton href={href(`/services/${hub}`)}>About the service</PillButton>
          </div>

          <nav aria-label="More projects" className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Previous project", p: prev },
              { label: "Next project", p: next },
            ].map(({ label, p }) => (
              <a key={label} href={href(`/work/${p.slug}`)} className="group flex items-center justify-between rounded-2xl border border-lab-line bg-white p-6 transition-shadow hover:shadow-[0_14px_34px_rgba(13,13,13,0.1)]">
                <span>
                  <span className="t-mono text-lab-light">{label}</span>
                  <span className="mt-1 block text-[22px] font-medium tracking-tight">{p.title}</span>
                </span>
                <span className="grid size-8 place-items-center rounded-full bg-lab-bg transition-transform group-hover:translate-x-1"><Arrow /></span>
              </a>
            ))}
          </nav>
        </div>
      </section>
      <div className="bg-lab-bg"><CtaBlock /></div>
    </>
  );
}
