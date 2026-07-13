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
};

export const projects: Project[] = [
  {
    slug: "social-reels-launch",
    title: "Social Reels Launch",
    category: "Social Media",
    tags: ["Content Creation", "Performance Marketing"],
    scope: ["Instagram", "TikTok", "Meta Ads Manager"],
    date: "March 2025",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-phone-with-the-facebook-logo-34508-large.mp4",
    description:
      "We grew reach 3× in the first month with a high-energy Reels series built for scroll-stopping discovery and conversion.",
    details:
      "We planned, shot, and edited a full Reels content system — from hook frameworks and trend adaptation to platform-native captions. Paid support through Meta Ads Manager amplified top performers into retargeting funnels, driving measurable lift in profile visits and inbound leads.",
  },
  {
    slug: "brand-film-series",
    title: "Brand Film Series",
    category: "Video Production",
    tags: ["Video Production", "Brand Storytelling"],
    scope: ["Instagram", "YouTube", "Google Ads"],
    date: "January 2025",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-1237-large.mp4",
    description:
      "Cinematic brand films and cut-downs for paid social, built for both awareness and conversion across multiple channels.",
    details:
      "A hero film anchored the campaign, supported by 15s and 30s cut-downs for paid social and YouTube pre-roll. We handled creative direction, production, color grade, and versioning for each placement — then synced delivery with Google Ads and Meta campaigns.",
  },
  {
    slug: "content-studio-drop",
    title: "Content Studio Drop",
    category: "Content Creation",
    tags: ["Content Creation", "Social Media"],
    scope: ["Instagram", "TikTok", "Kommo"],
    date: "November 2024",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-young-woman-vlogging-with-her-smartphone-41701-large.mp4",
    description:
      "Monthly content drops — photography, short clips, and platform-native edits for a lifestyle brand's always-on calendar.",
    details:
      "Each month we delivered a batch of photo sets, short-form clips, and carousel assets aligned to campaign themes. Assets were organized in Kommo for client approval, then scheduled across Instagram and TikTok with consistent brand voice and visual language.",
  },
  {
    slug: "paid-social-creatives",
    title: "Paid Social Creatives",
    category: "Paid Ads",
    tags: ["Performance Marketing", "Funnel & CRO"],
    scope: ["Meta Ads Manager", "TikTok", "Google Ads"],
    date: "September 2024",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-using-a-smartphone-with-a-green-screen-34509-large.mp4",
    description:
      "Performance-first ad creatives tested across Meta and TikTok with rapid iteration on hooks, formats, and audiences.",
    details:
      "We produced a library of UGC-style and polished ad variants, then ran structured creative tests across Meta Ads Manager, TikTok Ads, and Google Ads. Winning hooks were scaled into retargeting and lookalike campaigns with weekly reporting on CPA and ROAS.",
  },
  {
    slug: "product-launch-content",
    title: "Product Launch Content",
    category: "Launch Campaign",
    tags: ["Launch Campaign", "Content Creation"],
    scope: ["Instagram", "TikTok", "Meta Ads Manager", "Kommo"],
    date: "July 2024",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-live-stream-on-social-media-41702-large.mp4",
    description:
      "Full launch toolkit: teaser reels, hero film, UGC-style cutdowns, and static assets for a coordinated product drop.",
    details:
      "The launch spanned teaser content, launch-day Reels, live stream support, and post-launch retargeting assets. Kommo tracked influencer deliverables and client approvals while paid campaigns ran through Meta Ads Manager to sustain momentum after launch week.",
  },
  {
    slug: "always-on-social",
    title: "Always-On Social",
    category: "Social Media",
    tags: ["Social Media Management", "Data & Analytics"],
    scope: ["Instagram", "TikTok", "Google Ads", "Kommo"],
    date: "May 2024",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9ef8eb70d?auto=format&fit=crop&w=1200&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-person-using-a-smartphone-34507-large.mp4",
    description:
      "Always-on social system covering planning, production, publishing, and monthly performance reporting.",
    details:
      "We built a repeatable content engine: monthly planning sessions, batch production days, scheduled publishing, and performance reviews. Reporting covered reach, engagement, and paid efficiency across Instagram, TikTok, and Google Ads with action items each month.",
  },
];
