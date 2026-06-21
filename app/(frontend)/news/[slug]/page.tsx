import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { getNewsBySlug } from "@/lib/cms";
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
  const post = await getNewsBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Hey Coco! News`,
    description: post.excerpt,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl space-y-8 pb-16">
      <Link
        href="/#news"
        className="inline-flex text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        ← Back to news
      </Link>

      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
        <Image src={post.image} alt="" fill className="object-cover" priority />
      </div>

      <div className="space-y-4">
        <p className="text-sm text-text-muted">{post.date}</p>
        <h1 className="text-4xl font-bold tracking-tight text-text-dark">{post.title}</h1>
        <p className="text-lg leading-relaxed text-text-dark/80">{post.excerpt}</p>
      </div>

      <BentoCard variant="light" className="p-8">
        <p className="text-text-dark/70">
          Article body content is managed in the CMS under News Posts. Use the rich text editor to
          publish the full article here.
        </p>
      </BentoCard>

      <div className="text-center">
        <Button href="/#contact" variant="primary">
          Work with us →
        </Button>
      </div>
    </article>
  );
}
