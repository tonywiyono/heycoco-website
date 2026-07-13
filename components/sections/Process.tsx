"use client";

import { Section } from "@/components/layout/Section";
import { ProcessGraphic } from "@/components/sections/ProcessGraphic";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { SectionHead } from "@/components/ui/SectionHead";
import type { ClientLogo, ProcessStat, ProcessStep } from "@/lib/types/content";
import { useState } from "react";

type ProcessProps = {
  processSteps: ProcessStep[];
  processStats: ProcessStat[];
  clientLogos: ClientLogo[];
};

export function Process({ processSteps, processStats, clientLogos }: ProcessProps) {
  const [openId, setOpenId] = useState(processSteps[0]?.id ?? "");

  const accordionItems = processSteps.map((step, index) => ({
    id: step.id,
    title: `${index + 1}. ${step.title}`,
    content: step.description,
  }));

  return (
    <Section id="process" title="Process" className="mb-4">
      <div className="overflow-hidden rounded-[var(--radius-card)]">
        <div className="bg-surface-card-light px-6 py-8 text-text-dark sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <SectionHead
            title="Process"
            description="Business challenges are tough, but we have a proven record of elevating our partners to their next and best selves."
          />

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <ProcessGraphic steps={processSteps} activeId={openId} />

            <div>
              <Accordion
                items={accordionItems}
                defaultOpenId={processSteps[0]?.id}
                variant="light"
                showIndex={false}
                className="process-accordion"
                onOpenChange={setOpenId}
              />

              <Button
                href="#contact"
                variant="outline"
                className="mt-8 border-black/20 text-text-dark hover:border-black/40"
              >
                Work With Us Now →
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-accent px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <LogoMarquee logos={clientLogos} className="mb-8 sm:mb-10" />

          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {processStats.map((stat) => (
              <div key={stat.value + stat.label} className="text-center sm:text-left">
                <p className="text-4xl font-bold leading-none sm:text-5xl">{stat.value}</p>
                <p className="mt-3 whitespace-pre-line text-xs uppercase leading-relaxed tracking-wide text-white/85 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
