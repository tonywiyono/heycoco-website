import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { SectionPanel } from "@/components/ui/SectionPanel";
import type { SiteInfo, Testimonial } from "@/lib/types/content";
import Image from "next/image";

type ReviewsProps = {
  testimonials: Testimonial[];
  site: SiteInfo;
};

export function Reviews({ testimonials, site }: ReviewsProps) {
  return (
    <Section id="reviews" title="Reviews" className="mb-4">
      <SectionPanel variant="dark">
        <SectionHead
          title="Reviews"
          dark
          aside={
            <div className="mb-4 flex items-center justify-end gap-3 lg:mb-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-border-subtle text-sm font-bold text-accent">
                C
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold">
                  4.9/5 <span className="text-accent">★★★★★</span>
                </p>
                <a
                  href={site.social.clutch}
                  className="text-xs text-text-muted underline hover:text-text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Clutch
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
          <Button href={site.social.clutch} variant="outline">
            Read all reviews →
          </Button>
        </div>
      </SectionPanel>
    </Section>
  );
}
