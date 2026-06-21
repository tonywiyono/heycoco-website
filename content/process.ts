export const processStats = [
  { value: "95%", label: "Clients satisfied and repeating" },
  { value: "125+", label: "projects completed in 20 countries" },
  { value: "24", label: "award winning and honorable recognition" },
] as const;

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "research",
    title: "Research",
    description:
      "We dive deep into your brand, audience, and goals to uncover insights that drive creative direction.",
  },
  {
    id: "concept",
    title: "Concept Design",
    description:
      "Once the wireframe gets approved at step 1, we'll build prototype designs to visually communicate the idea.",
  },
  {
    id: "implementation",
    title: "Implementation",
    description:
      "Our team brings the approved concepts to life across all touchpoints — digital, print, and motion.",
  },
  {
    id: "testing",
    title: "Testing",
    description:
      "We test, refine, and optimize to ensure your brand delivers a flawless experience before launch.",
  },
];
