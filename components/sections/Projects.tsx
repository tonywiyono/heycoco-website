"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { SectionPanel } from "@/components/ui/SectionPanel";
import type { Project } from "@/lib/types/content";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

function ProjectScope({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md bg-accent/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-accent"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;

  const fullDetails = project.details ?? project.description;

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />

      <motion.div
        className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-surface-card-light shadow-2xl"
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 28, delay: 0.05 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-black/10">
          {project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 rounded-md bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            {project.category}
          </span>
          <h2 className="absolute bottom-5 left-5 right-5 text-2xl font-bold text-white sm:text-3xl">
            {project.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        <div className="space-y-6 p-6 sm:p-8">
          <p className="text-sm text-black/50">{project.date}</p>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-black/40">
              Summary
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-black/80">{project.description}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-black/40">
              Full details
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-black/70">{fullDetails}</p>
          </div>

          {project.scope.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/40">
                Project scope
              </h3>
              <div className="mt-3">
                <ProjectScope items={project.scope} />
              </div>
            </div>
          )}

          {project.tags.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/40">
                Services
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-text-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            onClick={onClose}
          >
            View full case study →
          </Link>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

function ProjectCard({
  project,
  onOpen,
  delay = 0,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  delay?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (project.video) {
      videoRef.current?.play().catch(() => {});
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (project.video) {
      videoRef.current?.pause();
      setIsHovered(false);
    }
  };

  return (
    <ScrollReveal delay={delay}>
      <article>
        <button
          type="button"
          onClick={() => onOpen(project)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group flex w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-shadow hover:shadow-md"
        >
          {/* Image + header */}
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover transition-all duration-500 group-hover:scale-105",
                project.video && isHovered && "opacity-0",
              )}
            />

            {project.video && (
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                preload="metadata"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                  isHovered ? "opacity-100" : "opacity-0",
                )}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <span className="absolute left-4 top-4 rounded-md bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              {project.category}
            </span>

            <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold leading-tight text-white sm:text-2xl">
              {project.title}
            </h3>
          </div>

          {/* Caption + scope */}
          <div className="flex flex-1 flex-col gap-4 p-5">
            <p className="text-sm leading-relaxed text-black/75">{project.description}</p>

            <ProjectScope items={project.scope} />

            <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-text-dark transition-colors group-hover:text-accent">
              Read case
              <span aria-hidden>→</span>
            </span>
          </div>
        </button>
      </article>
    </ScrollReveal>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  if (!projects.length) return null;

  const featuredProjects = projects.slice(0, 6);

  return (
    <>
      <Section id="projects" title="Projects" className="mb-4">
        <SectionPanel>
          <ScrollReveal y={32}>
            <SectionHead
              title="Projects"
              description="Business challenges are tough, but we have a proven record of elevating our partners to their next and best selves."
            />
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onOpen={setSelected}
                delay={index * 0.05}
              />
            ))}
          </div>

          <ScrollReveal className="mt-12 text-center" delay={0.1}>
            <Button href="/projects" variant="primary">
              See All Our Projects →
            </Button>
          </ScrollReveal>
        </SectionPanel>
      </Section>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
