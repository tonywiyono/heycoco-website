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
    slug: "social-reels-launch",
    title: "Social Reels Launch",
    category: "Social Media Campaign",
    tags: ["Social Media", "Video", "Content"],
    date: "March 2025",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-phone-with-the-facebook-logo-34508-large.mp4",
    description:
      "A high-energy Instagram Reels series that grew reach by 3× in the first month through scroll-stopping short-form content.",
  },
  {
    slug: "brand-film-series",
    title: "Brand Film Series",
    category: "Video Production",
    tags: ["Video", "Branding", "Content"],
    date: "January 2025",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-1237-large.mp4",
    description:
      "Cinematic brand films and cut-downs for paid social, built for both awareness and conversion.",
  },
  {
    slug: "content-studio-drop",
    title: "Content Studio Drop",
    category: "Content Creation",
    tags: ["Content", "Social Media", "Photo"],
    date: "November 2024",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-young-woman-vlogging-with-her-smartphone-41701-large.mp4",
    description:
      "Monthly content drops — photography, short clips, and platform-native edits for a lifestyle brand.",
  },
  {
    slug: "paid-social-creatives",
    title: "Paid Social Creatives",
    category: "Paid Ads",
    tags: ["Paid Ads", "Video", "Social Media"],
    date: "September 2024",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-using-a-smartphone-with-a-green-screen-34509-large.mp4",
    description:
      "Performance-first ad creatives tested across Meta and TikTok with rapid iteration on hooks and formats.",
  },
  {
    slug: "product-launch-content",
    title: "Product Launch Content",
    category: "Launch Campaign",
    tags: ["Content", "Video", "Branding"],
    date: "July 2024",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-live-stream-on-social-media-41702-large.mp4",
    description:
      "Full launch toolkit: teaser reels, hero film, UGC-style cutdowns, and static assets for a product drop.",
  },
  {
    slug: "always-on-social",
    title: "Always-On Social",
    category: "Social Media Management",
    tags: ["Social Media", "Content", "Strategy"],
    date: "May 2024",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9ef8eb70d?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-person-using-a-smartphone-34507-large.mp4",
    description:
      "Always-on social system covering planning, production, publishing, and monthly performance reporting.",
  },
];
