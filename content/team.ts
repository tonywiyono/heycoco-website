export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: { x?: string; behance?: string; linkedin?: string; instagram?: string };
};

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CEO Founder",
    image: "/images/team-1.svg",
    social: { x: "#", instagram: "#", linkedin: "#" },
  },
  {
    id: "2",
    name: "Rizky Pratama",
    role: "CTO",
    image: "/images/team-2.svg",
    social: { x: "#", behance: "#" },
  },
  {
    id: "3",
    name: "Diana Putri",
    role: "Senior Product Management",
    image: "/images/team-3.svg",
    social: { x: "#", behance: "#" },
  },
  {
    id: "4",
    name: "Thomas Wijaya",
    role: "Creative Director",
    image: "/images/team-1.svg",
    social: { linkedin: "#", behance: "#" },
  },
];

export const teamStats = {
  headline: "Geek and Heat",
  subhead: "Work Hard, Play Hard is Hey Coco!'s philosophy",
  stat: "25+",
  statLabel: "multidisciplinary designers and managers",
};

export const career = {
  title: "Remote UI/UX Designer",
  subtitle: "Work on anywhere with high benefits and salary up to $3000",
  cta: "Join our team",
};
