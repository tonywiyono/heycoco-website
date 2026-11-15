# Hey Coco! — full site plan (inspired by gtmlab.ai, not a copy)

Research date: 2026-10-20. Source: gtmlab.ai sitemap (183 URLs) + a crawl of one page per template.
Status: `/lab` homepage concept is built locally (`app/(lab)/lab`). Everything below is still to build.

## 1. How GTMLab is actually built

**183 URLs, but only ~12 templates.** The site feels big because a few templates repeat:

| Group | URLs | Template |
|---|---|---|
| Home | 1 | Long scroll story |
| Service hubs (5 pillars) | 5 | Hub: outcome H1, definition, leak grid, audit offer, FAQ |
| Service details | ~20 | Same skeleton + "one ad taken apart", pricing, form |
| Case studies | 45 | One client, several "lenses" (overview / performance / creative / funnel / data) |
| Testimonials | 22 | Quote or video card pages |
| Industries | 9 | Pain points + numbers + testimonials + related reading |
| Blog | 72 | Index with search + 2 filters, SEO listicles |
| Company | ~10 | about, how-we-work, pricing, careers (+role), contact, clients, proof |
| Entry offers | 3 | Paid workshops from $500 (growth-decode, gtm-mapping, growth-workshops) |
| Lead magnet | 1 | Free AI Visibility Check tool |

**Patterns worth learning (structure, not words):**
1. Every page ends with the same CTA block, and every service page has a short form (name, email, phone, website, budget) plus a hidden honeypot field.
2. Each service hub opens with a plain-language definition ("What does an X agency do?"), which is written for search and AI answers, then a grid of "six places your budget leaks", then an audit offer with a fixed turnaround ("in 5 working days").
3. Pricing is public, with "start with one job" small entry products.
4. Case studies are split by lens (one client, three stories), cross-linked.
5. The mega-menu lists customer pain points ("Our creative burns out too fast") as links to the fix.
6. Heavy structured data: Organization, Service, FAQPage, Article, BreadcrumbList, JobPosting, ItemList.
7. A free tool as a lead magnet; paid low-ticket workshops as the entry offer.

## 2. Hey Coco! sitemap

Your three crafts replace their five pillars. Keep names plain.

```
/                         Home                     (built: /lab)
/production               Hub
  /production/photo-video
  /production/brand-films
  /production/branding-collaterals
/social-media             Hub
  /social-media/management
  /social-media/reels-short-form
/performance              Hub
  /performance/meta-ads
  /performance/tiktok-ads
  /performance/google-ads
  /performance/creative-testing
/work                     Index (search + filters: craft, industry)
  /work/[slug]            Case study, with "lenses": Overview · Production · Social · Performance
/industries/[slug]        Only industries you can prove (e.g. F&B, hospitality, wellness, retail)
/reviews                  Google reviews + video testimonials
  /reviews/[slug]
/pricing                  Packages in the open
/how-we-work
/about                    Crew, philosophy, locations
/careers  /careers/[role]
/contact                  Book a 30-min call
/journal                  Blog (search + filters), /journal/[slug]
/content-audit            Free lead magnet (see §4)
/content-sprint           Paid entry offer (see §4)
```

## 3. Templates and sections

**Home** (v1 built): hero · three crafts · one-crew loop · work · numbers · process · reviews · CTA.
Add: logo strip (real clients only), 60-second showreel modal, journal teaser, pain-point mega-menu.

**Service hub** — outcome H1 · "What does a [craft] agency do?" (2–3 sentences, FAQ-schema friendly) · sub-service cards · "Six places [craft] quietly goes wrong" grid · free audit offer + form · how it works · pricing teaser · 2 related cases · FAQ · CTA.

**Service detail** — same skeleton plus an "anatomy" block (one reel / one ad taken apart), real package prices, and an enquiry form.

**Case study** — H1 (headline result) · intro · meet the client · challenge · approach · results (before → after) · "rest of the engagement" lens switcher · the crew behind it · more work · CTA. Article schema.

**Industry** — outcome H1 · real numbers · where this industry loses attention/leads (4 items) · one story across the three crafts · testimonials · related journal posts.

**Reviews** — grid with quote/video filter; detail page per review.

**Pricing** — per craft: monthly plans + "start with one job" one-off items; transparent starting prices; enquiry form.

**Journal** — featured + editor’s picks + filtered list (search, craft, topic); Article/ItemList schema.

**About / How we work** — founders’ note · who it is for (and not for) · the one-crew idea · what a week on an account looks like · team · locations.

**Careers** — culture + role pages with JobPosting schema.

**Contact** — "Book a 30-minute call" + form (name, email, phone, website/Instagram, budget, what you need) + WhatsApp.

**Global** — mega-menu with crafts + pain-point shortcuts · sticky mobile CTA · footer with locations · analytics events (GA4, Meta Pixel, PostHog).

## 4. Offers inspired by GTMLab (Hey Coco versions)

- **Free Content & Ads Audit** (lead-magnet analogue): enter your Instagram/website, get a short scorecard of content, posting rhythm and ad readiness. Build as a form + a manual or AI-assisted report first.
- **Content Sprint** (low-ticket paid entry): one day of strategy plus a shoot concept, delivered as a content plan and shot list. Price TBD.
- **"Start with one job"** items on the pricing page: one shoot day, a 30-day Reels pack, an ad-creative pack.

## 5. CMS (Payload) collections to add

`Crafts` · `Services` (belongs to a craft) · `CaseStudies` (+ `lenses[]`) · `Industries` · `Reviews` (quote/video) · `Articles` · `PricingItems` · `Roles` · `FaqItems` (existing, link to pages) · `Leads` (form submissions, existing `ContactSubmissions` extends). Page SEO fields on all (title, description, OG image).

## 6. Build phases

1. **Foundation** — shared components (Section, SectionHead, CTA block, Form, FAQ, Mega-menu), SEO/JSON-LD helpers, sitemap.
2. **Home v2 polish** — real work, showreel, journal teaser (after real assets arrive).
3. **Service system** — hub + detail templates, 3 hubs, 8–10 detail pages.
4. **Proof system** — `/work` index + case template (start with 3–4 real cases), `/reviews`.
5. **Conversion** — `/contact`, `/pricing`, audit form + backend, analytics.
6. **Content engine** — `/journal` with filters and SEO templates, `/industries`.
7. **Company** — about, how-we-work, careers.
8. **Launch** — move to `/`, redirects from the old site, performance and accessibility pass, Railway deploy.

## 7. What I need from you

- Real **case studies** (3–4 minimum): client, brief, what you did across production/social/performance, and real numbers.
- Real **client names and logos** you may show; real team photos and roles.
- **Pricing**, or at least starting prices per craft.
- Which **industries** you want to rank for.
- Showreel or best 6–8 videos/photos.
- Decision on the free audit and the Content Sprint offer.

## 8. What not to copy

Their copy, their claims (Forbes/YC, ad-spend figures), their "engine/leak" metaphor in full, and the 8-step funnel. Keep the *structure*; the voice should stay Hey Coco: creative-led, boutique, warm.
