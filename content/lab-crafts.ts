/**
 * The three craft (service hub) pages. Draft copy: edit freely.
 * Structure mirrors GTMLab's hub template: outcome H1 → definition → what's included →
 * "six places it goes wrong" → how it works → proof → FAQ → enquiry.
 */

export type Craft = {
  slug: "production" | "social-media" | "performance";
  name: string;
  tone: "orange" | "butter" | "ink";
  n: string;
  panelLine: string;
  h1: string;
  intro: string;
  definitionQ: string;
  definitionA: string;
  includes: { title: string; body: string }[];
  leaksTitle: string;
  leaks: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  /** works.ts categories shown as proof on this hub */
  workCategories: string[];
  faq: { q: string; a: string }[];
};

export const crafts: Craft[] = [
  {
    slug: "production",
    name: "Production",
    tone: "orange",
    n: "01",
    panelLine: "Shoots and edits that earn their screen time.",
    h1: "Shoots and edits built to be used everywhere.",
    intro: "Photo, video and design made once and shaped into everything your brand needs: the feed, the website, the ads.",
    definitionQ: "What does a production partner actually do?",
    definitionA:
      "We plan, shoot and edit the photo and video your brand needs, from product and campaign shoots to brand films and short-form cut-downs. Then we format every piece for where it will live, so one session feeds weeks of content.",
    includes: [
      { title: "Photo & videography", body: "Product, lifestyle and campaign shoots with a clear shot list." },
      { title: "Brand films", body: "Story-led films with cut-downs for social and ads." },
      { title: "Short-form & Reels", body: "Vertical edits designed for the first three seconds." },
      { title: "Design & collaterals", body: "Graphics, motion and templates that keep every post on-brand." },
      { title: "Branding", body: "Identity and guidelines so everything we make looks like you." },
      { title: "Formats for every channel", body: "Every asset delivered in the sizes you’ll actually post." },
    ],
    leaksTitle: "Six places production quietly goes wrong",
    leaks: [
      { title: "A shoot with no brief", body: "Great-looking footage that doesn’t say what the brand needs to say." },
      { title: "One hero video, nothing to post", body: "A big shoot that yields a single asset and a quiet feed afterwards." },
      { title: "Beautiful, but the wrong format", body: "Landscape footage for a vertical world." },
      { title: "Off-brand, every time", body: "Each shoot starts from scratch, so the look drifts." },
      { title: "Edits that arrive too late", body: "The moment passes before the content is ready." },
      { title: "Content nobody learns from", body: "No link between what was shot and what actually worked." },
    ],
    steps: [
      { title: "Brief & concept", body: "We agree the goal, the audience and the story before anyone picks up a camera." },
      { title: "Shoot", body: "Planned shot list, on-brand direction, multiple hooks and formats captured in one session." },
      { title: "Edit & cut-downs", body: "A hero cut plus short edits for each channel." },
      { title: "Handover", body: "Organised files in every format, ready to post or promote." },
    ],
    workCategories: ["photo-video"],
    faq: [
      { q: "What kind of shoots do you do?", a: "Product, campaign and brand shoots, photo and video. If you’re unsure what fits, send us the brief and we’ll suggest a format." },
      { q: "Can you shoot and then run the content?", a: "Yes. That’s the point of one team: the people who shoot it also schedule it and promote it." },
      { q: "How is production priced?", a: "By scope: shoot days, number of finished assets and formats. We scope it with you and quote before we start." },
      { q: "Where do you shoot?", a: "We’re based in Jakarta and Bali and shoot on location or in studio, depending on the brief." },
    ],
  },
  {
    slug: "social-media",
    name: "Social media",
    tone: "butter",
    n: "02",
    panelLine: "A feed with a point of view, run like a newsroom.",
    h1: "A feed with a point of view, run like a newsroom.",
    intro: "Strategy, content and community for brands that want a social presence people actually follow.",
    definitionQ: "What does a social media agency do?",
    definitionA:
      "We plan what your brand should say, make the photos, videos and designs, publish them on a steady calendar and look after the community. Each month we review what worked and adjust the plan.",
    includes: [
      { title: "Strategy & content pillars", body: "A clear voice and a small set of themes to build around." },
      { title: "Content calendar", body: "Posts planned ahead so the feed is consistent." },
      { title: "Reels & short-form", body: "Native vertical content, not repurposed ads." },
      { title: "Design & captions", body: "On-brand graphics and copy written for the platform." },
      { title: "Community management", body: "Replying, engaging and keeping the brand present." },
      { title: "Monthly reporting", body: "What was posted, what worked, what we’ll change." },
    ],
    leaksTitle: "Six reasons a feed stalls",
    leaks: [
      { title: "Posting without a plan", body: "Random posts, no themes, nothing for a follower to come back for." },
      { title: "Every post sounds like a different brand", body: "No consistent look, voice or point of view." },
      { title: "Views, but no enquiries", body: "Content that entertains but never points anywhere." },
      { title: "Chasing every trend", body: "Trends used with no link to the brand." },
      { title: "Comments left unanswered", body: "Followers who reach out and hear nothing back." },
      { title: "Reports nobody acts on", body: "Numbers pasted into slides with no next step." },
    ],
    steps: [
      { title: "Audit & strategy", body: "We review your profile, audience and competitors, then define content pillars from the brand’s own story." },
      { title: "Plan the month", body: "A content calendar with concepts and captions drafted, so production starts with a clear brief." },
      { title: "Create & approve", body: "Photo, video and design are produced and reviewed with your team before anything goes live." },
      { title: "Publish & review", body: "Content goes out on schedule. Each month we report and refine." },
    ],
    workCategories: ["social-media"],
    faq: [
      { q: "Which platforms do you manage?", a: "Mainly Instagram and TikTok, plus others when they fit the audience. We’ll recommend where your effort pays off." },
      { q: "Do you create the content too?", a: "Yes. We make the photos, videos and designs in-house, so there’s no hand-off between strategy and creation." },
      { q: "How do approvals work?", a: "You review content before it’s published, and we agree the review rhythm at the start." },
      { q: "Can social media be combined with ads?", a: "Yes. The best-performing posts are natural candidates to promote through paid media." },
    ],
  },
  {
    slug: "performance",
    name: "Performance",
    tone: "ink",
    n: "03",
    panelLine: "Paid media that turns attention into enquiries.",
    h1: "Paid media that turns attention into enquiries.",
    intro: "Ads built and optimised by the same team that makes the creative, so every campaign tests what the brand actually has to say.",
    definitionQ: "What does a performance marketing agency do?",
    definitionA:
      "We set up, run and optimise paid campaigns on Meta, TikTok and Google, make the ad creative, and track what comes back. The goal is more of the right customers from the same budget, not more clicks.",
    includes: [
      { title: "Meta, TikTok & Google ads", body: "Campaigns set up around your actual goal." },
      { title: "Creative testing", body: "Several hooks and formats tested, winners scaled." },
      { title: "Audience & funnel setup", body: "Prospecting and retargeting that fit how buyers decide." },
      { title: "Tracking", body: "Conversions measured properly so decisions rest on real data." },
      { title: "Weekly optimisation", body: "Budgets and creative adjusted as results come in." },
      { title: "Reporting", body: "Plain-language reports that end in a next step." },
    ],
    leaksTitle: "Six places ad budgets quietly leak",
    leaks: [
      { title: "Ads that look like ads", body: "Creative that feels like an interruption and gets scrolled past." },
      { title: "Creative that burns out", body: "One asset run until the audience stops responding." },
      { title: "Clicks without tracking", body: "No way to tell which ads led to an enquiry." },
      { title: "Audiences guessed, not tested", body: "Targeting set once and never questioned." },
      { title: "Leads that wait too long", body: "Enquiries that go cold before anyone replies." },
      { title: "Reports that stop at the click", body: "Numbers about views, nothing about customers." },
    ],
    steps: [
      { title: "Audit", body: "We review your accounts, tracking, creative and offer, and tell you what we’d fix first." },
      { title: "Build & launch", body: "Campaigns, audiences and creative set up with tracking in place from day one." },
      { title: "Test creative", body: "We run multiple concepts to learn what earns attention and action." },
      { title: "Optimise & report", body: "Weekly adjustments, and reports that say what changed and why." },
    ],
    workCategories: ["performance-marketing"],
    faq: [
      { q: "Which ad platforms do you run?", a: "Meta (Instagram and Facebook), TikTok and Google. We recommend based on where your buyers are." },
      { q: "Do you make the ads too?", a: "Yes. Creative and media sit in one team, which is what makes testing fast." },
      { q: "How is it priced?", a: "A management fee separate from your ad spend, scoped to your goals. We’ll quote after a short audit." },
      { q: "Do I need an existing audience?", a: "No, though existing content and customer data help. We can start from a clean setup." },
    ],
  },
];

export const craftBySlug = (slug: string) => crafts.find((c) => c.slug === slug);
