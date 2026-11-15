# Hey Coco! — section breakdown (GTMLab) and improvement plan

Research date: 2026-10-20.
- **GTMLab:** sitemap of 183 URLs. Crawled every non-blog/case/testimonial page (all ~40 unique pages), 30 of 72 blog posts, 7 case studies across 4 lenses, and testimonial pages. The remaining blog/case/testimonial URLs are the same templates.
- **Hey Coco (live heycoco.agency):** crawled home, /work, a work page, /profile, /journal, /contact.
Full structure also in `docs/SITE_PLAN.md`. This file is the section-by-section comparison and what to fix.

---

## A. What your live site has today

| Page | What is there | Problem |
|---|---|---|
| `/` | About 60 words, 3 work cards, WhatsApp button | No services, no proof, no process, no reviews, no CTA story |
| `/work` | 21 real works, filters (Social Media, Branding, Photo & Video, Performance) | 19 of 21 are labelled "Social Media Management", so production, branding and performance look absent |
| `/work/[slug]` | Client, type, year, agency, 3 images, prev/next | No brief, approach or results, so a visitor can't tell what you achieved |
| `/profile` | **Template placeholder text is live**: "Write your studio's story here", "Client One/Two/Three", Awwwards, Smashing Magazine, Figma | Looks unfinished. Fix first |
| `/journal` | "No journal posts yet" | Empty page linked from the main nav |
| `/contact` | Form: name, email, brand, message; email, phone, WhatsApp | No budget/service fields, no "what happens next" |
| Whole site | Same meta description on every page, no JSON-LD, empty `sitemap.xml`, cookie banner | Weak search visibility, nothing for Google or AI answers to cite |

Real clients already on the site (use these instead of stock content): First Step Matters, Snail Helmet, Kahf, Beluga Coffee Roastery, Dorskin, DokterIN, Life at GPS, Duanyam, Arta Texindo, Ayam Presto Nita, Indoprima, Viroteq, Liga Peter Collection, Coco Cart, Edo Food, Chef Daniel, Dapur Jeng Gendhis, Kara, Fitmee, Biopet, Digimap.

---

## B. GTMLab section breakdown, with a verdict for Hey Coco

Verdict key: **Adopt** (same idea, your voice) · **Adapt** (change to fit a creative agency) · **Skip**.

### Global
| GTMLab element | Purpose | Verdict |
|---|---|---|
| Floating nav with one "Let's Talk" button | One clear action on every page | Adopt (built in `/lab`) |
| Mega-menu: pillars + pain-point shortcuts ("Our creative burns out too fast") | Lets visitors self-select by problem | Adapt: "Our feed feels flat", "Our reels get views but no sales" |
| Footer: services, locations, availability line ("Available for Q4") | Trust + urgency | Adopt (availability line, Jakarta/Bali) |
| Same closing CTA block on every page | Never a dead end | Adopt |
| Route progress bar, video modals, scroll reveals | Polish | Adopt lightly |
| GA4 + GTM + Meta Pixel + PostHog | Measure the funnel | Adopt (see D) |

### Home (10 sections)
| # | GTMLab section | Verdict for Hey Coco |
|---|---|---|
| 1 | Hero: outcome headline, 3D loop video, eyebrow | Adapt (built: headline + tilted work cards; swap for a showreel) |
| 2 | Track record: counters + case-study strip | Adopt with real numbers |
| 3 | Featured testimonial with metrics + video | Adopt with a real Google review/video |
| 4 | Clicks vs revenue comparison | Skip. Replaced by "one crew vs three vendors" |
| 5 | "One step of eight" funnel | Skip. Replaced by Make → Post → Prove → Repeat loop |
| 6 | Four reasons to work with us | Adapt as "Small on purpose" + team |
| 7 | Services (4 pillars with mini UI mocks) | Adopt: 3 craft panels (built) |
| 8 | Case-study cards with headline metric | Adopt (needs real results) |
| 9 | More testimonials + CTA with 3-step "how we start" | Adopt |
| 10 | Insights teaser | Adopt once the journal has posts |

### Service hub (~12 sections, 14 H2s on average)
1. Outcome H1, e.g. "More customers from the same ad budget"
2. "The growth partner behind…" credibility line
3. "What does an X agency do?": a plain-language definition (written for search and AI answers)
4. Sub-services grid
5. **"Six places your budget quietly leaks"**: the problem grid (strongest sales device on the site)
6. **Free audit in 5 working days** with form
7. How it works / process
8. Pricing teaser
9. Case proof
10. FAQ (also marked up as FAQPage)
11. Enquiry form
12. CTA

**Verdict: Adopt for all three crafts.** Hey Coco versions of the "leak" grid: "Six reasons content doesn't convert", "Six reasons a feed stalls", "Six reasons ads burn out".

### Service detail
Same skeleton plus an **"anatomy" block** (one ad/reel taken apart), real prices, and a form with a budget field. Adopt. For Production, the anatomy is "one shoot day, taken apart" (brief → shot list → cut-downs → results).

### Case study (the most reusable idea on the site)
GTMLab publishes one client as several **lenses** (overview, performance, creative, funnel, data), each a separate page cross-linked as "one client, three lenses". Each page has: headline-result H1 · meet the client · challenge · approach (numbered, each with "strategic reasoning") · before → after table · results · "what this taught us" · rest of the engagement · the team pod · more wins · CTA. 1–3 comparison tables per page, a video, Article schema.

**Verdict: Adopt, with lenses = Production / Social / Performance.** This turns your 21 mostly "Social Media Management" entries into a story of one crew doing all three.

### Industries (9 pages)
Outcome H1 · real numbers · "four places [industry] loses attention" · one story across services · testimonials · related reading · form · Service+FAQ schema.
**Adapt**: only for industries you can prove (likely F&B, beauty/skincare, health, B2B).

### Testimonials (22 pages)
Quote/video card per client with its own URL and breadcrumb. **Adopt** using Google reviews; add a video for the strongest 2–3.

### Pricing (24 H2s, the longest page)
Per service: monthly plan with starting price → "not ready? start with one job" one-off products → form.
**Adopt** because it filters bad-fit leads and builds trust. Suggested items: Reels pack, shoot day, ad-creative pack, social management plan.

### Entry offers
- Growth Decode / GTM Mapping / Workshops: paid from $500, 6-step process, FAQ, online/office/Bali formats. **Adapt** as a "Content Sprint".
- Free AI Visibility Check: a form + report as lead magnet. **Adapt** as a "Free Content & Ads Audit" (enter Instagram/website, get a scorecard).

### Company pages
- About: founder note ("Before I ran an agency, I hired them"), team grid, how the pod works, AI agents note. **Adapt**.
- How we work: note from founders · who it is for · what it is · first weeks · a week on an account. **Adopt** (you already have a 5-step process).
- Careers: role pages with JobPosting schema. **Optional**.
- Proof: anonymized results. **Skip**, since you have named work.
- Contact: "Book a 30-minute call", form, 24-hour reply. **Adopt**.

### Blog / journal (72 posts)
Index with search and two filters, featured + editor's picks, ItemList schema. Posts have a table of contents, 2 comparison tables, a video, FAQ schema, and a "what our X work shows" proof box. Topics are SEO-led: "best N agencies in [city]", price guides, how-tos.
**Adopt** a smaller version: 1 post a week for 3 months on topics buyers search (e.g. "how much does a social media agency cost in Jakarta", "content production vs ads").

---

## C. Improvement plan, in priority order

### P0. Fix on the live site now (hours, not weeks)
1. **Replace the Profile placeholder text** with the real studio story, real clients, real links. Remove Awwwards/Smashing/Figma lines unless true.
2. **Hide Journal from the nav** until it has at least 3 posts.
3. **Unique title + description per page**, plus Open Graph images.
4. **Generate `sitemap.xml` and `robots.txt`**, and add JSON-LD (Organization/ProfessionalService on every page, CreativeWork on work pages).
5. **Add a services block + proof numbers to the home page.** 60 words isn't enough to convert.
6. **Extend the contact form**: budget range, service needed, Instagram/website; confirm "we reply within a day".

### P1. Build the conversion core (weeks 1–3)
7. Home v2 from `/lab` using real work and real reviews.
8. Three craft hubs with the "six places it goes wrong" grid, a free audit offer, FAQ and form.
9. Case-study template with the lens switcher; upgrade **5–6 works** first (pick ones with real numbers and at least one each of production, branding, performance).
10. Rebalance `/work` categories so Production, Branding and Performance are visible, not buried under 19 social entries.
11. `/reviews` with Google reviews and 2–3 video testimonials.

### P2. Grow it (weeks 4–8)
12. `/pricing` with starting prices and "start with one job" items.
13. Free Content & Ads Audit (lead magnet) and Content Sprint (paid entry offer).
14. Journal: 12 posts over 3 months with TOC, FAQ schema and a proof box.
15. Industry pages for 3–4 proven industries.
16. `/how-we-work` and `/about` with a real team page.

### P3. Later
17. Careers + role pages with JobPosting schema. 18. Showreel video modal. 19. Multi-language (Bahasa Indonesia) pages.

---

## D. Measurement to add from day one
- GA4 events: `cta_click`, `whatsapp_click`, `form_start`, `form_submit`, `audit_submit`, `case_open`.
- Meta Pixel `Lead` on form submit and WhatsApp click.
- Store every submission in Payload (`ContactSubmissions` already exists) with source page and UTM.
- Weekly check: which pages lead to a form submit.

## E. Inputs only you can provide
- Real results for each case study (before/after, even 1–2 metrics per client).
- Permission to show each client's name and logo.
- Starting prices per craft.
- The studio story and a team photo.
- Your best showreel clips.
