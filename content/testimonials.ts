export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Their services aren't cookie-cutter and are truly specific to us.",
    name: "Brian Lee",
    role: "CEO at Archin Co.",
    avatar: "/images/avatar-1.svg",
  },
  {
    id: "2",
    quote:
      "A rebrand is not typically done in a chaotic, archaic industry like ours, so their work has really set us apart.",
    name: "Aaron Beck",
    role: "President, Newz JSC.",
    avatar: "/images/avatar-2.svg",
  },
  {
    id: "3",
    quote:
      "Hey Coco! truly amplified our messaging through their expert use of visuals.",
    name: "Tim Morthy",
    role: "Marketing Manager, OKG",
    avatar: "/images/avatar-3.svg",
  },
  {
    id: "4",
    quote: "Our experience with Hey Coco! was really good.",
    name: "Lewis Cook",
    role: "Director, ZumarCons",
    avatar: "/images/avatar-4.svg",
  },
  {
    id: "5",
    quote:
      "They have been excellent at leveraging the wealth of knowledge and expertise across their team members.",
    name: "Mohamed Moussa",
    role: "CTO, Itech Co.",
    avatar: "/images/avatar-2.svg",
  },
];
