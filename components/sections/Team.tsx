"use client";

import { Section } from "@/components/layout/Section";
import { BentoCard } from "@/components/ui/BentoCard";
import type { TeamMember, TeamSectionContent } from "@/lib/types/content";
import { scrollToSection } from "@/lib/scroll-spy";
import Image from "next/image";
import { useState } from "react";

type TeamProps = {
  teamMembers: TeamMember[];
  teamSection: TeamSectionContent;
};

export function Team({ teamMembers, teamSection }: TeamProps) {
  const [index, setIndex] = useState(0);
  const member = teamMembers[index];

  if (!member) return null;

  const prev = () =>
    setIndex((i) => (i === 0 ? teamMembers.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === teamMembers.length - 1 ? 0 : i + 1));

  return (
    <Section id="team" title="Team" className="mb-4">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
        <BentoCard className="relative min-h-[360px] overflow-hidden lg:col-span-9 lg:min-h-[480px]">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0px, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 8px)",
            }}
          />
          <div className="relative flex h-full flex-col justify-between p-6 sm:p-10">
            <div>
              <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                {teamSection.headline.split(" ").map((word, i, words) => (
                  <span key={`${word}-${i}`}>
                    {word}
                    {i === 0 ? <br /> : i < words.length - 1 ? " " : null}
                  </span>
                ))}
              </h2>
              <p className="mt-4 text-sm text-text-muted sm:text-base">
                {teamSection.subhead}
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold sm:text-7xl">{teamSection.stat}</p>
              <p className="mt-2 max-w-xs text-sm text-text-muted">
                {teamSection.statLabel}
              </p>
            </div>
          </div>
        </BentoCard>

        <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-3">
          <BentoCard variant="light" className="flex flex-1 flex-col p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-black/50">
              Our Leaders
            </p>
            <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
              <Image
                src={member.image}
                alt=""
                width={88}
                height={88}
                className="h-20 w-20 rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold text-text-dark">
                {member.name}
              </h3>
              <p className="text-sm text-black/60">{member.role}</p>
            </div>
            {teamMembers.length > 1 ? (
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 text-text-dark transition-colors hover:bg-black/5"
                  aria-label="Previous team member"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 text-text-dark transition-colors hover:bg-black/5"
                  aria-label="Next team member"
                >
                  →
                </button>
              </div>
            ) : null}
          </BentoCard>

          <BentoCard variant="accent" className="p-6">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="flex h-full w-full flex-col gap-4 text-left"
            >
              <p className="text-sm opacity-80">{teamSection.career.cta}</p>
              <p className="text-xl font-bold leading-tight sm:text-2xl">
                {teamSection.career.title}
              </p>
              <p className="text-xs opacity-80">{teamSection.career.subtitle}</p>
              <span className="self-end flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                ↗
              </span>
            </button>
          </BentoCard>
        </div>
      </div>
    </Section>
  );
}
