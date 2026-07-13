export const processStats = [
  { value: "95%", label: "Clients satisfied and\nrepeating" },
  { value: "125+", label: "projects completed in\n20 countries" },
  { value: "24", label: "award winning and honorable\nrecognition" },
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
      "Once the wireframe get approved at step 1, we'll build prototype design to visually the idea",
  },
  {
    id: "concept",
    title: "Concept Design",
    description:
      "Once the wireframe get approved at step 1, we'll build prototype design to visually the idea",
  },
  {
    id: "implementation",
    title: "Implementation",
    description:
      "Once the wireframe get approved at step 1, we'll build prototype design to visually the idea",
  },
  {
    id: "testing",
    title: "Testing",
    description:
      "Once the wireframe get approved at step 1, we'll build prototype design to visually the idea",
  },
];
