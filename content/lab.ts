/**
 * Copy + config for the /lab site (GTMLab-style UI feel, Hey Coco! voice).
 * Works come from content/works.ts (real, scraped from heycoco.agency).
 * Nothing here invents results: add real figures to content/work-results.ts when you have them.
 * Anything labelled "illustrative" on the page is an example, not a client result.
 */
import { site } from "./site";
import { works } from "./works";

/** Change to "" when /lab is promoted to the site root. */
export const BASE = "/lab";
export const href = (path = "") => `${BASE}${path}` || "/";

export const labSite = {
  name: "Hey Coco!",
  eyebrow: "Boutique creative agency · Jakarta & Bali",
  cta: "Start a project",
  email: site.email,
  phone: site.phone,
  whatsapp: site.whatsapp,
  locations: "Jakarta · Bali",
  instagram: site.social.instagram,
};

export const nav = {
  services: [
    { label: "Production", href: href("/services/production"), note: "Photo, video, brand films and design." },
    { label: "Social media", href: href("/services/social-media"), note: "Strategy, content and community." },
    { label: "Performance", href: href("/services/performance"), note: "Paid ads built and tested with the creative." },
  ],
  links: [
    { label: "Work", href: href("/work") },
    { label: "How we work", href: href("/how-we-work") },
    { label: "Contact", href: href("/contact") },
  ],
};

/** Verifiable numbers only (derived from real data). */
export const heroStats = [
  { value: `${works.length}`, label: "brands in our portfolio" },
  { value: "3", label: "crafts, one team" },
  { value: "2", label: "cities: Jakarta & Bali" },
];

/**
 * Four stages, eight jobs. `roles` = the specialists each job needs. Hiring freelancers means finding and briefing
 * each of those people separately; with Hey Coco! they are one in-house team that already works together.
 */
export const stages = [
  { n: 1, label: "Strategy" },
  { n: 2, label: "Create" },
  { n: 3, label: "Distribute" },
  { n: 4, label: "Learn" },
];

export const eightSteps: { n: string; stage: number; title: string; roles: string[]; body: string }[] = [
  { n: "01", stage: 1, title: "Strategy", roles: ["Brand strategist"], body: "Audience, competitors and what the brand should say" },
  { n: "02", stage: 1, title: "Branding", roles: ["Brand designer"], body: "Logo, look and collaterals that hold together" },
  { n: "03", stage: 2, title: "Photo & video production", roles: ["Photographer", "Videographer"], body: "Shoots planned for every format" },
  { n: "04", stage: 2, title: "Design & editing", roles: ["Graphic designer", "Video editor"], body: "Key visuals, feeds, reels and cut-downs" },
  { n: "05", stage: 3, title: "Social media", roles: ["Copywriter", "Social media specialist"], body: "Captions, posting and community" },
  { n: "06", stage: 3, title: "Performance ads", roles: ["Ads specialist"], body: "Best content put in front of real buyers" },
  { n: "07", stage: 4, title: "Reporting", roles: ["Data analyst"], body: "What worked, in plain language" },
  { n: "08", stage: 4, title: "Next brief", roles: [], body: "Results shape what gets made next" },
];

/* ───────── Grow together: the brand journey from small to enterprise ───────── */

export const growth = {
  title: { accent: "Start small, grow together", post: "with you." },
  sub: "Every brand begins somewhere. We start where you are, with the team and scope that fit, and add more as you grow, without ever starting over.",
  services: [
    { id: "branding", label: "Branding & collaterals" },
    { id: "photo-video", label: "Photo & videography" },
    { id: "social-media", label: "Social media" },
    { id: "performance", label: "Performance" },
  ],
  /** Four stages of a brand's journey. scope[] lines up with services[] (same order). Unnamed proof only. */
  stages: [
    {
      id: "start",
      label: "Just starting",
      who: "New brand, tiny team",
      line: "A name, an idea, a first customer. We help you look and sound like a brand from day one.",
      model: { name: "Project by project", body: "Start with one job: a logo, a first shoot, a month of content. Pay for what you need." },
      scope: ["Logo and a simple look", "A first shoot day", "A simple monthly feed", "Small test ads"],
      proof: [] as { value: string; label: string; who: string }[],
    },
    {
      id: "grow",
      label: "Growing",
      who: "Proven product, small team",
      line: "People know you. Now they should remember you. Consistent content, steady campaigns, one clear look.",
      model: { name: "Monthly team", body: "A steady monthly rhythm, with content, community and campaigns planned together." },
      scope: ["Full identity and collaterals", "Regular shoots", "Strategy, daily content and community", "Always-on campaigns"],
      proof: [
        { value: "1,000+", label: "leads within 9 months of always-on ads", who: "A B2B textile manufacturer" },
        { value: "5,200+", label: "new followers at 50% lower cost per result", who: "An automotive accessories brand" },
      ],
    },
    {
      id: "scale",
      label: "Scaling",
      who: "More products, bigger team",
      line: "More products, more channels, more people. We keep the brand coherent as it multiplies.",
      model: { name: "Extended team", body: "We work alongside your team with shared planning, reporting and priorities." },
      scope: ["A brand system for several product lines", "Campaign productions and events", "Multi-platform content and creator work", "Multi-channel funnels with proper tracking"],
      proof: [] as { value: string; label: string; who: string }[],
    },
    {
      id: "enterprise",
      label: "Enterprise",
      who: "National or multi-brand",
      line: "Big brands still need a team that cares. We bring enterprise-level rigour with studio energy.",
      model: { name: "Dedicated team", body: "A customised service and a dedicated team, built around your brand and your calendar, up to national-level campaigns." },
      scope: ["Brand architecture and rollout", "Brand films and large-scale productions", "Integrated content operations", "National-level campaigns, data-led"],
      proof: [
        { value: "~4M", label: "new subscribers, and 48% lower cost per new customer", who: "A telco company" },
        { value: "−28%", label: "cost per lead within 4 months", who: "A finance company" },
      ],
    },
  ],
  constant: [
    { title: "The same team", body: "The people who know your brand keep working on it." },
    { title: "One brand memory", body: "What we learn on day one is still there on day one thousand." },
    { title: "No restart", body: "Moving up a stage adds scope. It never resets the relationship." },
  ],
};

export const reasons = [
  {
    n: "1",
    title: "A full creative team, working as one",
    accent: "working as one",
    body: "Strategists, designers, photographers, videographers, editors, copywriters and ads specialists sit in one team. They brief each other, so you only brief once, and nothing gets lost between the plan and the shoot.",
    points: ["A team that already works together", "One brief, one calendar, one report"],
  },
  {
    n: "2",
    title: "Content built to be tested",
    accent: "built to be tested",
    body: "Every shoot is planned with several hooks, formats and cut-downs. We post them, promote the promising ones and let real results decide what to make next.",
    points: ["Many variants from every session", "Winners get promoted, the rest teach us something"],
  },
  {
    n: "3",
    title: "Reports that end in a next step",
    accent: "end in a next step",
    body: "Each month you get a short, plain-language review: what we posted, what worked, and what we will change. No pages of numbers without a decision attached.",
    points: ["Plain language, no dashboard maze", "Every report ends with what we do next"],
  },
];

export const hiringSteps = [
  { n: "1", title: "Say hello", body: "Tell us about the brand and what you want to make happen. A few lines is enough." },
  { n: "2", title: "We look at what you have", body: "We review your content, channels and any ads already running, and tell you honestly what we would change." },
  { n: "3", title: "A clear proposal", body: "A scoped plan, a timeline and a price, so you can decide with the full picture." },
];

/** Add real Google reviews / client quotes here. Nothing renders until you do. */
export const reviews: { quote: string; name: string; role: string }[] = [];

export const footerCols = [
  { title: "Services", links: nav.services.map((s) => ({ label: s.label, href: s.href })) },
  {
    title: "Studio",
    links: [
      { label: "Work", href: href("/work") },
      { label: "How we work", href: href("/how-we-work") },
      { label: "Contact", href: href("/contact") },
    ],
  },
];
