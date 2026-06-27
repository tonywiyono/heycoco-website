export type Project = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  date: string;
  featured?: boolean;
  image: string;
  video?: string;
  description: string;
};

export const projects: Project[] = [
  {
    slug: "newz-magazine",
    title: "Newz — Magazine Site",
    category: "Online Magazine Website",
    tags: ["UI/UX", "Web", "Product"],
    date: "December 2023",
    featured: true,
    image: "/images/project-newz.svg",
    description:
      "A digital magazine experience with editorial layouts and immersive storytelling.",
  },
  {
    slug: "lw-rebrand",
    title: "LW Rebrand",
    category: "Brand Identity",
    tags: ["Branding", "Visual Identity"],
    date: "October 2023",
    image: "/images/project-lw.svg",
    description:
      "Complete brand refresh with bold typography and vibrant color system.",
  },
  {
    slug: "zumarcons",
    title: "ZumarCons Firm",
    category: "Architecture Website",
    tags: ["Web", "UI/UX"],
    date: "August 2023",
    image: "/images/project-zumar.svg",
    description:
      "Premium architecture firm website showcasing sustainable design projects.",
  },
  {
    slug: "atlas-architecture",
    title: "Atlas Architecture",
    category: "Portfolio Site",
    tags: ["Web", "Branding"],
    date: "June 2023",
    image: "/images/project-atlas.svg",
    description:
      "Minimal portfolio for a boutique architecture studio in Southeast Asia.",
  },
  {
    slug: "the-unerio",
    title: "The Unerio",
    category: "E-commerce",
    tags: ["Product", "UI/UX"],
    date: "April 2023",
    image: "/images/project-unerio.svg",
    description:
      "Luxury lifestyle e-commerce with curated product storytelling.",
  },
  {
    slug: "super-clean",
    title: "Super Clean",
    category: "Brand Campaign",
    tags: ["Branding", "Content"],
    date: "February 2023",
    image: "/images/project-clean.svg",
    description:
      "Full-funnel brand campaign for a sustainable cleaning products startup.",
  },
];
