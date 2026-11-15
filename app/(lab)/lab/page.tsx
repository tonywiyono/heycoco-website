import {
  CtaBlock,
  LabGrow,
  LabFeatured,
  LabHero,
  LabLoop,
  LabReasons,
  LabServices,
  LabWork,
} from "@/components/lab/LabHome";

export default function LabHome() {
  return (
    <>
      <LabHero />
      <LabFeatured />
      <LabGrow />
      <LabLoop />
      <LabReasons />
      <LabServices />
      <LabWork />
      <div className="bg-lab-bg pt-16 lg:pt-24">
        <CtaBlock />
      </div>
    </>
  );
}
