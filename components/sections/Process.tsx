import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { SectionPanel } from "@/components/ui/SectionPanel";
import type { ProcessStat, ProcessStep } from "@/lib/types/content";

type ProcessProps = {
  processSteps: ProcessStep[];
  processStats: ProcessStat[];
};

export function Process({ processSteps, processStats }: ProcessProps) {
  const accordionItems = processSteps.map((step) => ({
    id: step.id,
    title: step.title,
    content: step.description,
  }));

  return (
    <Section id="process" title="Process" className="mb-4 space-y-4">
      <SectionPanel>
        <SectionHead
          title="Process"
          description="Business challenges are tough, but we have a proven record of elevating our partners to their next and best selves."
        />

        <Accordion items={accordionItems} />
      </SectionPanel>

      <div className="grid gap-3 sm:grid-cols-3">
        {processStats.map((stat) => (
          <SectionPanel key={stat.value + stat.label} className="text-center">
            <p className="text-3xl font-bold text-text-dark sm:text-4xl">{stat.value}</p>
            <p className="mt-2 text-sm text-text-dark/60">{stat.label}</p>
          </SectionPanel>
        ))}
      </div>

      <SectionPanel className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-bold text-text-dark">Ready to start?</h3>
          <p className="mt-2 text-sm text-text-dark/60">
            Tell us about your project and we&apos;ll get back within 24 hours.
          </p>
        </div>
        <Button href="#contact" variant="primary">
          Get in touch →
        </Button>
      </SectionPanel>
    </Section>
  );
}
