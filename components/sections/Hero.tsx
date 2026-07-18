"use client";

import { Section } from "@/components/layout/Section";
import { HeroAccolades } from "@/components/sections/HeroAccolades";
import { BentoCard } from "@/components/ui/BentoCard";
import { Tag } from "@/components/ui/Tag";
import type { Award, HeroContent, ServiceTag } from "@/lib/types/content";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type HeroProps = {
  hero: HeroContent;
  services: ServiceTag[];
  awards: Award[];
};

type ScrambledTag = ServiceTag & { rotation: number };

function ScrambledServices({ services }: { services: ServiceTag[] }) {
  const [items, setItems] = useState<ScrambledTag[]>(() =>
    services.map((s) => ({ ...s })),
  );

  const scramble = () => {
    setItems((prev) => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.map((s) => ({
        ...s,
        rotation: Math.floor(Math.random() * 80) - 40,
      }));
    });
  };

  return (
    <motion.div
      onClick={scramble}
      whileTap={{ scale: 0.96 }}
      className="group relative mt-6 flex flex-1 cursor-pointer select-none flex-wrap content-center items-center gap-2"
      title="Click to shuffle"
    >
      {items.map((service) => (
        <motion.span
          key={service.id}
          layout
          animate={{ rotate: service.rotation }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="inline-flex"
        >
          <Tag color={service.color} rotation={0}>
            {service.label}
          </Tag>
        </motion.span>
      ))}
      <span className="absolute bottom-0 right-0 text-[10px] text-black/30 opacity-0 transition-opacity group-hover:opacity-100">
        click to shuffle ↻
      </span>
    </motion.div>
  );
}

export function Hero({ hero, services, awards }: HeroProps) {
  const subheadLines = hero.subheadline.split("\n");

  return (
    <Section id="home" title="Home" className="mb-4">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:min-h-[calc(100dvh-3rem)]">
        <BentoCard
          variant="dark"
          hover={false}
          className="relative flex min-h-[420px] flex-col justify-between overflow-hidden p-6 sm:p-10 lg:col-span-9 lg:row-span-2 lg:min-h-0 lg:h-full"
        >
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/hero-chess.svg"
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {hero.headlineLine1}
              <br />
              {hero.headlineLine2}
            </h1>
            <p className="mt-6 text-base text-text-muted sm:text-lg">
              {subheadLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < subheadLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </div>

          <div className="relative z-10 mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-accent">
              C
            </div>
            <div>
              <p className="text-sm font-semibold">
                {hero.rating}{" "}
                <span className="text-accent">★★★★★</span>
              </p>
              <p className="text-xs text-text-muted">
                {hero.ratingLabel.includes("Google") ? (
                  <>
                    {hero.ratingLabel.split("Google")[0]}
                    <a href="#reviews" className="underline hover:text-text-primary">
                      Google
                    </a>
                    {hero.ratingLabel.split("Google")[1]}
                  </>
                ) : hero.ratingLabel.includes("Clutch") ? (
                  <>
                    {hero.ratingLabel.split("Clutch")[0]}
                    <a href="#reviews" className="underline hover:text-text-primary">
                      Clutch
                    </a>
                    {hero.ratingLabel.split("Clutch")[1]}
                  </>
                ) : (
                  hero.ratingLabel
                )}
              </p>
            </div>
          </div>
        </BentoCard>

        <div className="flex min-h-0 flex-col gap-3 sm:gap-4 lg:col-span-3 lg:row-span-2 lg:h-full">
          <BentoCard
            variant="light"
            hover={false}
            className="flex min-h-[200px] flex-1 flex-col justify-between p-6 sm:p-8"
          >
            <p className="text-sm leading-relaxed text-black/70">{hero.introText}</p>
            <ScrambledServices services={services} />
          </BentoCard>

          <HeroAccolades items={awards} />
        </div>
      </div>
    </Section>
  );
}
