import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { getProjectBySlug } from "@/lib/cms";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Hey Coco!`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl space-y-8 pb-16">
      <Link
        href="/#projects"
        className="inline-flex text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        ← Back to projects
      </Link>

      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
        <Image src={project.image} alt="" fill className="object-cover" priority />
      </div>

      <div className="space-y-4">
        <p className="text-sm uppercase tracking-wide text-text-muted">{project.category}</p>
        <h1 className="text-4xl font-bold tracking-tight text-text-dark">{project.title}</h1>
        <p className="text-sm text-text-muted">{project.date}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-text-dark"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-lg leading-relaxed text-text-dark/80">{project.description}</p>
      </div>

      <BentoCard variant="light" className="p-8">
        <h2 className="text-xl font-semibold text-text-dark">Project overview</h2>
        <p className="mt-4 text-text-dark/70">
          Full case study content can be managed in the CMS admin under Projects. Add rich text in
          the body field to expand this page.
        </p>
      </BentoCard>

      <div className="text-center">
        <Button href="/#contact" variant="primary">
          Start a similar project →
        </Button>
      </div>
    </article>
  );
}
