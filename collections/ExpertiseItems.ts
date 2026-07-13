import type { CollectionConfig } from "payload";

export const ExpertiseItems: CollectionConfig = {
  slug: "expertise-items",
  labels: {
    singular: "Expertise Item",
    plural: "Expertise Items",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "sortOrder", "updatedAt"],
  },
  fields: [
    {
      name: "key",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Stable identifier (e.g. branding, social-media)" },
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Featured image shown in the hero expertise card" },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
