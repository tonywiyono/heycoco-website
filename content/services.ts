export const services = [
  {
    id: "social-media",
    label: "Social Media",
    color: "accent" as const,
    rotation: -12,
  },
  {
    id: "content",
    label: "Content Creation",
    color: "muted" as const,
    rotation: 8,
  },
  {
    id: "paid-ads",
    label: "Paid Ads",
    color: "dark" as const,
    rotation: 0,
  },
  {
    id: "branding",
    label: "Branding",
    color: "muted" as const,
    rotation: -90,
  },
] as const;

export const serviceDetails = [
  {
    title: "Social Media Management",
    description:
      "Our goal is to build strong connections and measurable growth across platforms.",
  },
  {
    title: "Photo & Videography",
    description:
      "From product shoots to brand films, we bring ideas to life through powerful shots.",
  },
  {
    title: "Paid Ads Management",
    description:
      "From strategy to execution, we manage campaigns that maximize ROI.",
  },
  {
    title: "Branding & Collaterals",
    description:
      "We design brand identities and collaterals that leave lasting impressions.",
  },
] as const;
