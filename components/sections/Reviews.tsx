import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { SectionPanel } from "@/components/ui/SectionPanel";
import type { ReviewsSectionContent, Testimonial } from "@/lib/types/content";
import Image from "next/image";

type ReviewsProps = {
  testimonials: Testimonial[];
  reviewsSection: ReviewsSectionContent;
};

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="text-accent" aria-label={`${filled} out of 5 stars`}>
      {"★".repeat(filled)}
      <span className="text-white/20">{"★".repeat(5 - filled)}</span>
    </span>
  );
}

function parseRatingValue(rating: string) {
  const value = Number.parseFloat(rating);
  return Number.isFinite(value) ? value : 5;
}

export function Reviews({ testimonials, reviewsSection }: ReviewsProps) {
  const summaryRating = parseRatingValue(reviewsSection.rating);

  return (
    <Section id="reviews" title="Reviews" className="mb-4">
      <SectionPanel variant="dark">
        <SectionHead
          title="Reviews"
          dark
          aside={
            <div className="mb-4 flex items-center justify-end gap-3 lg:mb-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-border-subtle text-sm font-bold text-accent">
                G
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold">
                  {reviewsSection.rating} <Stars rating={summaryRating} />
                </p>
                <a
                  href={reviewsSection.googleMapsUrl}
                  className="text-xs text-text-muted underline hover:text-text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google
                </a>
              </div>
            </div>
          }
        />

        <ul className="divide-y divide-border-subtle">
          {testimonials.map((item) => (
            <li key={item.id} className="flex gap-6 py-8 first:pt-0 last:pb-0">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={item.avatar} alt="" fill className="object-cover" />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                  <Stars rating={item.rating} />
                  {item.publishedLabel ? (
                    <span className="text-xs text-text-muted">{item.publishedLabel}</span>
                  ) : null}
                </div>
                <blockquote className="text-base leading-relaxed text-text-muted sm:text-lg">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <p className="mt-4 text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-text-muted">{item.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Button href={reviewsSection.googleMapsUrl} variant="outline">
            {reviewsSection.ctaLabel}
          </Button>
        </div>
      </SectionPanel>
    </Section>
  );
}
