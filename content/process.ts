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
    id: "research-strategy",
    title: "Research & Strategy",
    description:
      "We start by understanding the audience, competitors, and where the brand's digital presence has gaps. Profiles get audited and optimized, and content pillars are defined from the brand's own story.",
  },
  {
    id: "content-planning",
    title: "Content Planning",
    description:
      "The content calendar takes shape. We develop the core content concepts and draft captions, so production starts with a clear brief instead of a blank page.",
  },
  {
    id: "production",
    title: "Production",
    description:
      "Photo and video shoots happen, followed by design and editing. In parallel, we set up the paid ad campaigns that will support the content once it's live.",
  },
  {
    id: "approval",
    title: "Approval",
    description:
      "Everything is reviewed and revised together with the client's internal team, visual and copy assets are finalized.",
  },
  {
    id: "launch",
    title: "Launch",
    description:
      "Content goes live, weekly scheduling is activated to kick off your brand journey.",
  },
];
