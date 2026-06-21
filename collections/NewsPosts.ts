import type { CollectionConfig } from "payload";

export const NewsPosts: CollectionConfig = {
  slug: "news-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "featured", "publishedAt", "updatedAt"],
    livePreview: {
      url: ({ data }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
        return `${base}/news/${data?.slug ?? ""}`;
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
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
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
      name: "publishedAt",
      type: "date",
      admin: { date: { pickerAppearance: "dayAndTime" } },
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
