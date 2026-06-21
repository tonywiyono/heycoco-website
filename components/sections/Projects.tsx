"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { SectionPanel } from "@/components/ui/SectionPanel";
import type { Project } from "@/lib/types/content";
import Image from "next/image";
import Link from "next/link";

function ProjectCard({
  project,
  className,
  square = false,
  delay = 0,
}: {
  project: Project;
  className?: string;
  square?: boolean;
  delay?: number;
}) {
  return (
    <ScrollReveal className={className} delay={delay}>
      <article>
        <Link href={`/projects/${project.slug}`} className="block">
          <div
            className={`group relative overflow-hidden rounded-2xl bg-black/5 ${square ? "aspect-square" : "aspect-[4/3]"}`}
          >
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-text-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h3 className="mt-4 text-base font-semibold text-text-dark transition-colors group-hover:text-accent">
            {project.title}
          </h3>
        </Link>
      </article>
    </ScrollReveal>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const [p1, p2, p3, p4, p5, p6] = projects;

  if (!p1) return null;

  return (
    <Section id="projects" title="Projects" className="mb-4">
      <SectionPanel>
        <ScrollReveal y={32}>
          <SectionHead
            title="Projects"
            description="Business challenges are tough, but we have a proven record of elevating our partners to their next and best selves."
          />
        </ScrollReveal>

        <div className="space-y-10 lg:space-y-14">
          <div className="lg:w-2/3">
            <ProjectCard project={p1} delay={0} />
          </div>

          {p2 && p3 ? (
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-3">
                <ProjectCard project={p2} square delay={0.05} />
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <ProjectCard project={p3} delay={0.1} />
              </div>
            </div>
          ) : null}

          {p4 ? (
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-3 lg:col-start-5">
                <ProjectCard project={p4} square delay={0.05} />
              </div>
            </div>
          ) : null}

          {p5 ? (
            <div className="lg:w-2/3 lg:ml-auto">
              <ProjectCard project={p5} delay={0.08} />
            </div>
          ) : null}

          {p6 ? (
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-6">
                <ProjectCard project={p6} delay={0.1} />
              </div>
            </div>
          ) : null}
        </div>

        <ScrollReveal className="mt-12 text-center" delay={0.1}>
          <Button href="#contact" variant="primary">
            See All Our Projects →
          </Button>
        </ScrollReveal>
      </SectionPanel>
    </Section>
  );
}
