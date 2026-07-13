import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "featured", "updatedAt"],
    livePreview: {
      url: ({ data }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
        return `${base}/projects/${data?.slug ?? ""}`;
      },
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "category",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
      admin: { description: "Service areas (e.g. Performance Marketing, Content Creation)." },
    },
    {
      name: "scope",
      type: "array",
      fields: [{ name: "platform", type: "text", required: true }],
      admin: { description: "Platforms and tools (e.g. Instagram, TikTok, Google Ads, Kommo)." },
    },
    {
      name: "date",
      type: "text",
      required: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional preview video (MP4). Plays on hover in the portfolio grid.",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "body",
      type: "richText",
      localized: true,
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
