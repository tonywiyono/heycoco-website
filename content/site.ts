export const site = {
  name: "Hey Coco!",
  tagline: "Creative Agency",
  description:
    "Hey Coco! is a Jakarta-based creative agency specializing in brand design, social media management, content creation, and digital marketing.",
  url: "https://heycoco.agency",
  email: "weare@heycoco.agency",
  phone: "+62 819 1950 1005",
  location: "Based in Jakarta & Bali",
  whatsapp: "https://wa.me/6281919501005",
  social: {
    x: "https://x.com/heycoco",
    instagram: "https://instagram.com/hey.cocoagency",
    threads: "https://www.threads.com/@hey.cocoagency",
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
