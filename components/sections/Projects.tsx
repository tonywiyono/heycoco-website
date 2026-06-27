"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { SectionPanel } from "@/components/ui/SectionPanel";
import type { Project } from "@/lib/types/content";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── Project modal ─────────────────────────────────────────────────────── */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />

      {/* Modal card */}
      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-surface-card-light shadow-2xl"
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 28, delay: 0.05 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media */}
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
        </div>

        {/* Close button */}
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

        {/* Info */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="mt-3 text-xl font-bold text-text-dark sm:text-2xl">
            {project.title}
          </h2>
          <p className="mt-1 text-sm text-black/50">
            {project.category} · {project.date}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-black/70">
            {project.description}
          </p>

          <div className="mt-6">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              onClick={onClose}
            >
              View Full Case Study →
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Project card ──────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  onOpen,
  className,
  square = false,
  delay = 0,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  className?: string;
  square?: boolean;
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
    <ScrollReveal className={className} delay={delay}>
      <article>
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="group block w-full text-left"
        >
          <div
            className={`relative overflow-hidden rounded-2xl bg-black/5 ${square ? "aspect-square" : "aspect-[4/3]"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={project.image}
              alt=""
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                project.video && isHovered ? "opacity-0" : "opacity-100"
              }`}
            />

            {project.video && (
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                preload="metadata"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}

            {/* Tags */}
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

            {/* Video play hint */}
            {project.video && !isHovered && (
              <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden>
                  <path d="M0 0l10 6-10 6z" />
                </svg>
              </div>
            )}
          </div>

          <h3 className="mt-4 text-base font-semibold text-text-dark transition-colors group-hover:text-accent">
            {project.title}
          </h3>
        </button>
      </article>
    </ScrollReveal>
  );
}

/* ── Projects section ──────────────────────────────────────────────────── */

export function Projects({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [p1, p2, p3, p4, p5, p6] = projects;

  if (!p1) return null;

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

          <div className="space-y-10 lg:space-y-14">
            <div className="lg:w-2/3">
              <ProjectCard project={p1} onOpen={setSelected} delay={0} />
            </div>

            {p2 && p3 ? (
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-3">
                  <ProjectCard project={p2} onOpen={setSelected} square delay={0.05} />
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <ProjectCard project={p3} onOpen={setSelected} delay={0.1} />
                </div>
              </div>
            ) : null}

            {p4 ? (
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-3 lg:col-start-5">
                  <ProjectCard project={p4} onOpen={setSelected} square delay={0.05} />
                </div>
              </div>
            ) : null}

            {p5 ? (
              <div className="lg:w-2/3 lg:ml-auto">
                <ProjectCard project={p5} onOpen={setSelected} delay={0.08} />
              </div>
            ) : null}

            {p6 ? (
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-6">
                  <ProjectCard project={p6} onOpen={setSelected} delay={0.1} />
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

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
