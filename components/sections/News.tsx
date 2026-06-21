import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { SectionPanel } from "@/components/ui/SectionPanel";
import type { NewsItem } from "@/lib/types/content";
import Image from "next/image";
import Link from "next/link";

export function News({ newsItems }: { newsItems: NewsItem[] }) {
  const featured = newsItems.find((n) => n.featured) ?? newsItems[0];
  const rest = newsItems.filter((n) => n.slug !== featured?.slug);

  if (!featured) return null;

  return (
    <Section id="news" title="News" className="mb-4">
      <SectionPanel>
        <SectionHead
          title="News"
          aside={
            <Button href="#news" variant="outline" className="border-black/20 text-text-dark hover:bg-black/5">
              All Articles →
            </Button>
          }
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <article>
            <div className="mb-4 flex items-center justify-between text-xs text-black/50">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src="/images/avatar-4.svg" alt="" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-text-dark">Hey Coco!</p>
                  <p>editor</p>
                </div>
              </div>
              <p>{featured.date}</p>
            </div>
            <Link href={`/news/${featured.slug}`} className="group block">
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl">
                <Image src={featured.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold text-text-dark transition-colors group-hover:text-accent sm:text-2xl">
                {featured.title}
              </h3>
            </Link>
          </article>

          <ul className="divide-y divide-black/10">
            {rest.map((item) => (
              <li key={item.slug} className="py-5 first:pt-0">
                <Link href={`/news/${item.slug}`} className="group block">
                  <p className="text-xs text-black/50">{item.date}</p>
                  <h3 className="mt-2 font-semibold leading-snug text-text-dark transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SectionPanel>
    </Section>
  );
}
