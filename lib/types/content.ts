export type SidebarCta = {
  enabled: boolean;
  label: string;
  url: string;
  backgroundColor: string;
  hoverBackgroundColor: string;
  textColor: string;
};

export type SiteInfo = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  location: string;
  whatsapp: string;
  social: {
    x: string;
    instagram: string;
    threads: string;
    linkedin: string;
    dribbble: string;
    clutch: string;
  };
  copyright: string;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  scope: string[];
  date: string;
  featured?: boolean;
  image: string;
  video?: string;
  description: string;
  details?: string;
  body?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  publishedLabel?: string;
};

export type ReviewsSectionContent = {
  rating: string;
  ratingLabel: string;
  googleMapsUrl: string;
  ctaLabel: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    x?: string;
    behance?: string;
    linkedin?: string;
    instagram?: string;
  };
};

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  featured?: boolean;
  image: string;
  body?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type Award = {
  id: string;
  headline: string;
  caption: string;
  logo: string;
};

export type ExpertiseItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type ServiceTag = {
  id: string;
  label: string;
  color: "accent" | "muted" | "dark";
  rotation: number;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type ProcessStat = {
  value: string;
  label: string;
};

export type ClientLogo = {
  id: string;
  name: string;
  logo: string;
};

export type HeroContent = {
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  introText: string;
  rating: string;
  ratingLabel: string;
  expertiseSectionTitle: string;
};

export type TeamSectionContent = {
  headline: string;
  subhead: string;
  stat: string;
  statLabel: string;
  career: {
    title: string;
    subtitle: string;
    cta: string;
  };
};

export type HomePageData = {
  site: SiteInfo;
  navItems: NavItem[];
  sidebarWhatsappCta: SidebarCta;
  hero: HeroContent;
  services: ServiceTag[];
  awards: Award[];
  expertiseItems: ExpertiseItem[];
  projects: Project[];
  processSteps: ProcessStep[];
  processStats: ProcessStat[];
  clientLogos: ClientLogo[];
  testimonials: Testimonial[];
  reviewsSection: ReviewsSectionContent;
  teamMembers: TeamMember[];
  teamSection: TeamSectionContent;
  newsItems: NewsItem[];
  faqItems: FaqItem[];
};
