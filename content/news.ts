export type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  featured?: boolean;
  image: string;
};

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "We're winner SOTY at CSS Design Awards 2024",
    date: "12 hours ago",
    excerpt:
      "Hey Coco! recognized for outstanding digital design and creative direction.",
    featured: true,
    image: "/images/news-featured.svg",
  },
  {
    id: "2",
    title: "Rebrand vs Refresh: 10 Minutes on Brand with Hey Coco!",
    date: "2 days ago",
    excerpt: "A quick take on when to rebrand versus refresh your identity.",
    image: "/images/news-2.svg",
  },
  {
    id: "3",
    title: "How to build culture for a young creative office?",
    date: "15 days ago",
    excerpt: "Lessons from building our Jakarta studio culture.",
    image: "/images/news-3.svg",
  },
  {
    id: "4",
    title: "Case Study: Crafting a UX Strategy for Compelling Messaging",
    date: "1 month ago",
    excerpt: "How we approach UX strategy for brand messaging.",
    image: "/images/news-2.svg",
  },
];
