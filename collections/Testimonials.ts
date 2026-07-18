import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Google Review",
    plural: "Google Reviews",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "rating", "sortOrder", "updatedAt"],
    description: "Paste reviews manually from Google Maps / Business Profile.",
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
      localized: true,
      admin: { description: "Review text copied from Google" },
    },
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Reviewer display name from Google" },
    },
    {
      name: "role",
      type: "text",
      defaultValue: "Google review",
      admin: { description: "Optional subtitle (e.g. Google review, Local Guide)" },
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: { description: "Star rating from Google (1–5)" },
    },
    {
      name: "publishedLabel",
      type: "text",
      admin: { description: "Optional date label from Google (e.g. 2 months ago)" },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optional reviewer photo" },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
