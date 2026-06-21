export const site = {
  name: "Hey Coco!",
  tagline: "Creative Agency",
  description:
    "Hey Coco! is a Jakarta-based creative agency specializing in brand design, social media management, content creation, and digital marketing.",
  url: "https://heycoco.agency",
  email: "hello@heycoco.agency",
  phone: "+62 812 3456 7890",
  location: "Based in Jakarta, Indonesia",
  whatsapp: "https://wa.me/6281234567890",
  social: {
    x: "https://x.com/heycoco",
    instagram: "https://instagram.com/heycoco.agency",
    linkedin: "https://linkedin.com/company/heycoco",
    dribbble: "https://dribbble.com/heycoco",
    clutch: "https://clutch.co/profile/heycoco",
  },
  copyright: `© ${new Date().getFullYear()}, All Rights Reserved`,
} as const;

export const navItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "process", label: "Process", href: "#process" },
  { id: "reviews", label: "Reviews", href: "#reviews" },
  { id: "team", label: "Team", href: "#team" },
  { id: "news", label: "News", href: "#news" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;
