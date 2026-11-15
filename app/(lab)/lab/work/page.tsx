import type { Metadata } from "next";
import { Reveal } from "@/components/lab/LabClient";
import { CtaBlock, Eyebrow, Hl } from "@/components/lab/LabShared";
import { WorkGrid } from "@/components/lab/WorkGrid";
import { works } from "@/content/works";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected production, social media and content work by Hey Coco! for brands across Indonesia.",
};

export default async function WorkIndex({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  return (
    <>
      <section className="bg-lab-bg pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div className="lab-container">
          <Reveal>
            <Eyebrow>Work</Eyebrow>
            <h1 className="t-h1 mt-5 max-w-[640px]">
              Brands we’ve <Hl>made things for.</Hl>
            </h1>
            <p className="t-body mt-5 max-w-[460px] text-[16px]">
              Photo, video and social content for {works.length} brands. Open a project to see what we made.
            </p>
          </Reveal>
          <div className="mt-12">
            <WorkGrid works={works} initial={category} />
          </div>
        </div>
      </section>
      <div className="bg-lab-bg"><CtaBlock /></div>
    </>
  );
}
