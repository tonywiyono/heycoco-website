export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "services",
    question: "What services does Hey Coco! Creative Agency offer?",
    answer:
      "We provide brand strategy, content creation, social media management, performance marketing, and creative campaign execution.",
  },
  {
    id: "work-together",
    question: "How can we work together?",
    answer:
      "We start with learning your goals, create a tailored plan, and deliver results with a clear timeline and suitable service according to your needs.",
  },
  {
    id: "startups",
    question: "Can you work with small businesses or startups?",
    answer:
      "Yes! We specialize in growth strategies that fit your budget and scale with your brand.",
  },
  {
    id: "pricing",
    question: "How much does your service cost?",
    answer:
      "Pricing depends on scope and deliverables, with flexible packages for different needs.",
  },
  {
    id: "get-started",
    question: "How can I get started?",
    answer:
      "Contact us via website, email, or WhatsApp. We won't charge you anything before we start our contract.",
  },
];
