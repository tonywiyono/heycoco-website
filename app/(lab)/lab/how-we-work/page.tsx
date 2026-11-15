import type { Metadata } from "next";
import { Reveal } from "@/components/lab/LabClient";
import { StepsToggle } from "@/components/lab/LabInteractive";
import { CtaBlock, Eyebrow, Hl } from "@/components/lab/LabShared";
import { reasons } from "@/content/lab";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "How we work",
  description: "How Hey Coco! works: one creative team, five clear steps from research to launch.",
};

export default function HowWeWork() {
  return (
    <>
      <section className="bg-lab-bg pb-16 pt-36 lg:pb-24 lg:pt-44">
        <div className="lab-container">
          <Reveal>
            <Eyebrow>How we work</Eyebrow>
            <h1 className="t-h1 mt-5 max-w-[700px]">One team. <Hl>Five clear steps.</Hl></h1>
            <p className="t-body mt-5 max-w-[500px] text-[16px]">
              Strategists, designers, photographers, editors and ads specialists in one team that already works together. You brief us once; we take it from there.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="lab-section bg-white">
        <div className="lab-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>From first brief to going live</Eyebrow>
            <h2 className="t-h2 mt-4">What happens after you <Hl>say hello.</Hl></h2>
          </Reveal>
          <ol className="divide-y divide-lab-line rounded-2xl border border-lab-line bg-white">
            {processSteps.map((s, i) => (
              <Reveal key={s.id} delay={i * 50}>
                <li className="flex list-none gap-5 p-6 sm:p-7">
                  <span className={cn("grid size-8 shrink-0 place-items-center rounded-full text-[12px] font-medium", i === processSteps.length - 1 ? "bg-lab-accent text-white" : "bg-lab-bg")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[19px] font-medium tracking-tight">{s.title}</h3>
                    <p className="t-body mt-1.5 text-[14px]">{s.description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="lab-section bg-lab-dark text-white">
        <div className="lab-container">
          <Reveal>
            <h2 className="t-h2 max-w-[680px]">
              And then the loop continues. <span className="text-white/45">Results shape the next brief.</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-12"><StepsToggle /></Reveal>
        </div>
      </section>

      <section className="lab-section bg-white">
        <div className="lab-container">
          <Reveal>
            <Eyebrow>Principles</Eyebrow>
            <h2 className="t-h2 mt-4">How we <Hl>think about it.</Hl></h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.n} delay={i * 80}>
                <div className="h-full rounded-2xl border border-lab-line bg-lab-bg p-6">
                  <p className="t-mono text-lab-accent">0{r.n}</p>
                  <p className="mt-4 text-[20px] font-medium leading-tight tracking-tight">{r.title}</p>
                  <p className="t-body mt-3 text-[14px]">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-lab-bg pt-16 lg:pt-24"><CtaBlock /></div>
    </>
  );
}
