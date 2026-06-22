import { awards } from "../content/awards";
import { faqItems } from "../content/faq";
import { newsItems } from "../content/news";
import { processStats, processSteps } from "../content/process";
import { projects } from "../content/projects";
import { services } from "../content/services";
import { navItems, site } from "../content/site";
import { career, teamMembers, teamStats } from "../content/team";
import { testimonials } from "../content/testimonials";
import config from "../payload.config";
import { getPayload } from "payload";

async function seed() {
  const payload = await getPayload({ config });

  const existingUsers = await payload.find({
    collection: "users",
    limit: 1,
  });

  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: process.env.ADMIN_EMAIL ?? "weare@heycoco.agency",
        password: process.env.ADMIN_PASSWORD ?? "ChangeMe123!",
        name: "Hey Coco Admin",
      },
    });
    console.log("Created admin user");
  }

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      name: site.name,
      tagline: site.tagline,
      description: site.description,
      url: site.url,
      email: site.email,
      phone: site.phone,
      location: site.location,
      whatsapp: site.whatsapp,
      social: site.social,
      navItems: navItems.map((item) => ({
        id: item.id,
        label: item.label,
        href: item.href,
      })),
      headlineLine1: "Brand and",
      headlineLine2: "Design",
      subheadline: "Hey Coco!, small agency\nwith big ideas",
      introText:
        "Based in Jakarta, Indonesia. We're an agency focused on crafting experience design & development digital products.",
      rating: "4.9/5",
      ratingLabel: "Based on 24 reviews on Clutch",
      teamHeadline: teamStats.headline,
      teamSubhead: teamStats.subhead,
      teamStat: teamStats.stat,
      teamStatLabel: teamStats.statLabel,
      career,
      processStats: processStats.map((stat) => ({
        value: stat.value,
        label: stat.label,
      })),
    },
  });

  for (const [index, service] of services.entries()) {
    const existing = await payload.find({
      collection: "services",
      where: { key: { equals: service.id } },
      limit: 1,
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "services",
        data: {
          key: service.id,
          label: service.label,
          color: service.color,
          rotation: service.rotation,
          sortOrder: index,
        },
      });
    }
  }

  for (const [index, award] of awards.entries()) {
    const existing = await payload.find({
      collection: "awards",
      where: { title: { equals: award.title } },
      limit: 1,
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "awards",
        data: {
          title: award.title,
          icon: award.icon,
          sortOrder: index,
        },
      });
    }
  }

  for (const [index, step] of processSteps.entries()) {
    const existing = await payload.find({
      collection: "process-steps",
      where: { key: { equals: step.id } },
      limit: 1,
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "process-steps",
        data: {
          key: step.id,
          title: step.title,
          description: step.description,
          sortOrder: index,
        },
      });
    }
  }

  for (const [index, item] of faqItems.entries()) {
    const existing = await payload.find({
      collection: "faq-items",
      where: { key: { equals: item.id } },
      limit: 1,
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "faq-items",
        data: {
          key: item.id,
          question: item.question,
          answer: item.answer,
          sortOrder: index,
        },
      });
    }
  }

  for (const [index, member] of teamMembers.entries()) {
    const existing = await payload.find({
      collection: "team-members",
      where: { name: { equals: member.name } },
      limit: 1,
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "team-members",
        data: {
          name: member.name,
          role: member.role,
          social: member.social,
          sortOrder: index,
        },
      });
    }
  }

  for (const [index, item] of testimonials.entries()) {
    const existing = await payload.find({
      collection: "testimonials",
      where: { name: { equals: item.name } },
      limit: 1,
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "testimonials",
        data: {
          quote: item.quote,
          name: item.name,
          role: item.role,
          sortOrder: index,
        },
      });
    }
  }

  for (const [index, project] of projects.entries()) {
    const existing = await payload.find({
      collection: "projects",
      where: { slug: { equals: project.slug } },
      limit: 1,
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "projects",
        draft: false,
        data: {
          title: project.title,
          slug: project.slug,
          category: project.category,
          tags: project.tags.map((tag) => ({ tag })),
          date: project.date,
          featured: project.featured ?? false,
          description: project.description,
          sortOrder: index,
          _status: "published",
        },
      });
    }
  }

  for (const [index, item] of newsItems.entries()) {
    const slug = item.id;
    const existing = await payload.find({
      collection: "news-posts",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "news-posts",
        draft: false,
        data: {
          title: item.title,
          slug,
          excerpt: item.excerpt,
          featured: item.featured ?? false,
          publishedAt: new Date(Date.now() - index * 86400000).toISOString(),
          sortOrder: index,
          _status: "published",
        },
      });
    }
  }

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
