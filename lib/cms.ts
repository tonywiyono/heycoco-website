import { awards as staticAwards } from "@/content/awards";
import { faqItems as staticFaq } from "@/content/faq";
import { newsItems as staticNews } from "@/content/news";
import { processStats as staticProcessStats, processSteps as staticProcessSteps } from "@/content/process";
import { projects as staticProjects } from "@/content/projects";
import { services as staticServices } from "@/content/services";
import { navItems as staticNavItems, site as staticSite } from "@/content/site";
import { career as staticCareer, teamMembers as staticTeam, teamStats as staticTeamStats } from "@/content/team";
import { testimonials as staticTestimonials } from "@/content/testimonials";
import { formatNewsDate, mediaUrl } from "@/lib/media";
import { getPayloadClient, isCmsConfigured } from "@/lib/payload";
import type {
  Award,
  FaqItem,
  HeroContent,
  HomePageData,
  NavItem,
  NewsItem,
  ProcessStat,
  ProcessStep,
  Project,
  ServiceTag,
  SiteInfo,
  TeamMember,
  TeamSectionContent,
  Testimonial,
} from "@/lib/types/content";
import { draftMode } from "next/headers";

const DEFAULT_LOCALE = "en" as const;
type Locale = "en" | "id";

function staticHomeData(): HomePageData {
  return {
    site: { ...staticSite, copyright: staticSite.copyright },
    navItems: staticNavItems.map((item) => ({ ...item })),
    hero: {
      headlineLine1: "Brand and",
      headlineLine2: "Design",
      subheadline: "Hey Coco!, small agency\nwith big ideas",
      introText:
        "Based in Jakarta, Indonesia. We're an agency focused on crafting experience design & development digital products.",
      rating: "4.9/5",
      ratingLabel: "Based on 24 reviews on Clutch",
    },
    services: staticServices.map((s) => ({ ...s })),
    awards: staticAwards.map((a) => ({ ...a })),
    projects: staticProjects.map((p) => ({ ...p })),
    processSteps: staticProcessSteps.map((s) => ({ ...s })),
    processStats: staticProcessStats.map((s) => ({ ...s })),
    testimonials: staticTestimonials.map((t) => ({ ...t })),
    teamMembers: staticTeam.map((m) => ({ ...m, social: m.social ? { ...m.social } : undefined })),
    teamSection: {
      headline: staticTeamStats.headline,
      subhead: staticTeamStats.subhead,
      stat: staticTeamStats.stat,
      statLabel: staticTeamStats.statLabel,
      career: { ...staticCareer },
    },
    newsItems: staticNews.map((n) => ({ ...n, slug: n.id })),
    faqItems: staticFaq.map((f) => ({ ...f })),
  };
}

async function getDraftFlag(): Promise<boolean> {
  try {
    const { isEnabled } = await draftMode();
    return isEnabled;
  } catch {
    return false;
  }
}

export async function getHomePageData(locale: Locale = DEFAULT_LOCALE): Promise<HomePageData> {
  if (!isCmsConfigured()) {
    return staticHomeData();
  }

  try {
    const payload = await getPayloadClient();
    const draft = await getDraftFlag();

    const [
      settings,
      servicesResult,
      awardsResult,
      projectsResult,
      processStepsResult,
      testimonialsResult,
      teamResult,
      newsResult,
      faqResult,
    ] = await Promise.all([
      payload.findGlobal({ slug: "site-settings", locale, draft }),
      payload.find({
        collection: "services",
        locale,
        sort: "sortOrder",
        limit: 20,
        pagination: false,
      }),
      payload.find({
        collection: "awards",
        locale,
        sort: "sortOrder",
        limit: 20,
        pagination: false,
      }),
      payload.find({
        collection: "projects",
        locale,
        sort: "sortOrder",
        limit: 50,
        pagination: false,
        draft,
        ...(draft ? {} : { where: { _status: { equals: "published" } } }),
      }),
      payload.find({
        collection: "process-steps",
        locale,
        sort: "sortOrder",
        limit: 20,
        pagination: false,
      }),
      payload.find({
        collection: "testimonials",
        locale,
        sort: "sortOrder",
        limit: 20,
        pagination: false,
      }),
      payload.find({
        collection: "team-members",
        locale,
        sort: "sortOrder",
        limit: 20,
        pagination: false,
      }),
      payload.find({
        collection: "news-posts",
        locale,
        sort: "sortOrder",
        limit: 20,
        pagination: false,
        draft,
        ...(draft ? {} : { where: { _status: { equals: "published" } } }),
      }),
      payload.find({
        collection: "faq-items",
        locale,
        sort: "sortOrder",
        limit: 20,
        pagination: false,
      }),
    ]);

    const site: SiteInfo = {
      name: settings.name ?? staticSite.name,
      tagline: settings.tagline ?? staticSite.tagline,
      description: settings.description ?? staticSite.description,
      url: settings.url ?? staticSite.url,
      email: settings.email ?? staticSite.email,
      phone: settings.phone ?? staticSite.phone,
      location: settings.location ?? staticSite.location,
      whatsapp: settings.whatsapp ?? staticSite.whatsapp,
      social: {
        x: settings.social?.x ?? staticSite.social.x,
        instagram: settings.social?.instagram ?? staticSite.social.instagram,
        linkedin: settings.social?.linkedin ?? staticSite.social.linkedin,
        dribbble: settings.social?.dribbble ?? staticSite.social.dribbble,
        clutch: settings.social?.clutch ?? staticSite.social.clutch,
      },
      copyright: `© ${new Date().getFullYear()}, All Rights Reserved`,
    };

    const navItems: NavItem[] =
      settings.navItems?.map((item) => ({
        id: item.id,
        label: item.label,
        href: item.href,
      })) ?? staticNavItems.map((item) => ({ ...item }));

    const hero: HeroContent = {
      headlineLine1: settings.headlineLine1 ?? "Brand and",
      headlineLine2: settings.headlineLine2 ?? "Design",
      subheadline: settings.subheadline ?? "Hey Coco!, small agency\nwith big ideas",
      introText: settings.introText ?? staticHomeData().hero.introText,
      rating: settings.rating ?? "4.9/5",
      ratingLabel: settings.ratingLabel ?? "Based on 24 reviews on Clutch",
    };

    const services: ServiceTag[] = servicesResult.docs.map((doc) => ({
      id: doc.key,
      label: doc.label,
      color: doc.color as ServiceTag["color"],
      rotation: doc.rotation ?? 0,
    }));

    const awards: Award[] = awardsResult.docs.map((doc, index) => ({
      id: String(doc.id ?? index),
      title: doc.title,
      icon: doc.icon,
    }));

    const projects: Project[] = projectsResult.docs.map((doc) => ({
      slug: doc.slug,
      title: doc.title,
      category: doc.category,
      tags: (doc.tags ?? []).map((t) => t.tag).filter(Boolean) as string[],
      date: doc.date,
      featured: doc.featured ?? false,
      image: mediaUrl(doc.image, "/images/project-newz.svg"),
      description: doc.description,
    }));

    const processSteps: ProcessStep[] = processStepsResult.docs.map((doc) => ({
      id: doc.key,
      title: doc.title,
      description: doc.description,
    }));

    const processStats: ProcessStat[] =
      settings.processStats?.map((stat) => ({
        value: stat.value,
        label: stat.label,
      })) ?? staticProcessStats.map((s) => ({ ...s }));

    const testimonials: Testimonial[] = testimonialsResult.docs.map((doc, index) => ({
      id: String(doc.id ?? index),
      quote: doc.quote,
      name: doc.name,
      role: doc.role,
      avatar: mediaUrl(doc.avatar, `/images/avatar-${(index % 4) + 1}.svg`),
    }));

    const teamMembers: TeamMember[] = teamResult.docs.map((doc, index) => ({
      id: String(doc.id ?? index),
      name: doc.name,
      role: doc.role,
      image: mediaUrl(doc.image, `/images/team-${(index % 3) + 1}.svg`),
      social: doc.social
        ? {
            x: doc.social.x ?? undefined,
            behance: doc.social.behance ?? undefined,
            linkedin: doc.social.linkedin ?? undefined,
            instagram: doc.social.instagram ?? undefined,
          }
        : undefined,
    }));

    const teamSection: TeamSectionContent = {
      headline: settings.teamHeadline ?? staticTeamStats.headline,
      subhead: settings.teamSubhead ?? staticTeamStats.subhead,
      stat: settings.teamStat ?? staticTeamStats.stat,
      statLabel: settings.teamStatLabel ?? staticTeamStats.statLabel,
      career: {
        title: settings.career?.title ?? staticCareer.title,
        subtitle: settings.career?.subtitle ?? staticCareer.subtitle,
        cta: settings.career?.cta ?? staticCareer.cta,
      },
    };

    const newsItems: NewsItem[] = newsResult.docs.map((doc, index) => ({
      slug: doc.slug,
      title: doc.title,
      date: formatNewsDate(doc.publishedAt, staticNews[index]?.date ?? ""),
      excerpt: doc.excerpt,
      featured: doc.featured ?? false,
      image: mediaUrl(doc.image, `/images/news-${doc.featured ? "featured" : "2"}.svg`),
    }));

    const faqItems: FaqItem[] = faqResult.docs.map((doc) => ({
      id: doc.key,
      question: doc.question,
      answer: doc.answer,
    }));

    if (projects.length === 0 && services.length === 0) {
      return staticHomeData();
    }

    return {
      site,
      navItems,
      hero,
      services: services.length ? services : staticHomeData().services,
      awards: awards.length ? awards : staticHomeData().awards,
      projects: projects.length ? projects : staticHomeData().projects,
      processSteps: processSteps.length ? processSteps : staticHomeData().processSteps,
      processStats,
      testimonials: testimonials.length ? testimonials : staticHomeData().testimonials,
      teamMembers: teamMembers.length ? teamMembers : staticHomeData().teamMembers,
      teamSection,
      newsItems: newsItems.length ? newsItems : staticHomeData().newsItems,
      faqItems: faqItems.length ? faqItems : staticHomeData().faqItems,
    };
  } catch (error) {
    console.error("[cms] Failed to load home page data:", error);
    return staticHomeData();
  }
}

export async function getProjectBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<Project | null> {
  if (!isCmsConfigured()) {
    return staticProjects.find((p) => p.slug === slug) ?? null;
  }

  try {
    const payload = await getPayloadClient();
    const draft = await getDraftFlag();
    const result = await payload.find({
      collection: "projects",
      locale,
      limit: 1,
      draft,
      where: draft
        ? { slug: { equals: slug } }
        : { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
    });

    const doc = result.docs[0];
    if (!doc) return staticProjects.find((p) => p.slug === slug) ?? null;

    return {
      slug: doc.slug,
      title: doc.title,
      category: doc.category,
      tags: (doc.tags ?? []).map((t) => t.tag).filter(Boolean) as string[],
      date: doc.date,
      featured: doc.featured ?? false,
      image: mediaUrl(doc.image, "/images/project-newz.svg"),
      description: doc.description,
      body: doc.body ? JSON.stringify(doc.body) : undefined,
    };
  } catch (error) {
    console.error("[cms] Failed to load project:", error);
    return staticProjects.find((p) => p.slug === slug) ?? null;
  }
}

export async function getNewsBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Promise<NewsItem | null> {
  if (!isCmsConfigured()) {
    const item = staticNews.find((n) => n.id === slug);
    return item ? { ...item, slug: item.id } : null;
  }

  try {
    const payload = await getPayloadClient();
    const draft = await getDraftFlag();
    const result = await payload.find({
      collection: "news-posts",
      locale,
      limit: 1,
      draft,
      where: draft
        ? { slug: { equals: slug } }
        : { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
    });

    const doc = result.docs[0];
    if (!doc) {
      const item = staticNews.find((n) => n.id === slug);
      return item ? { ...item, slug: item.id } : null;
    }

    return {
      slug: doc.slug,
      title: doc.title,
      date: formatNewsDate(doc.publishedAt, ""),
      excerpt: doc.excerpt,
      featured: doc.featured ?? false,
      image: mediaUrl(doc.image, "/images/news-featured.svg"),
      body: doc.body ? JSON.stringify(doc.body) : undefined,
    };
  } catch (error) {
    console.error("[cms] Failed to load news post:", error);
    return null;
  }
}

export async function saveContactSubmission(input: {
  name: string;
  email: string;
  subject: string;
  budget?: string;
  message: string;
  sourceIp?: string;
}): Promise<void> {
  if (!isCmsConfigured()) return;

  const payload = await getPayloadClient();
  await payload.create({
    collection: "contact-submissions",
    data: {
      name: input.name,
      email: input.email,
      subject: input.subject,
      budget: input.budget,
      message: input.message,
      sourceIp: input.sourceIp,
      status: "new",
    },
  });
}

export async function getSiteInfo(locale: Locale = DEFAULT_LOCALE): Promise<{ site: SiteInfo; navItems: NavItem[] }> {
  const data = await getHomePageData(locale);
  return { site: data.site, navItems: data.navItems };
}
