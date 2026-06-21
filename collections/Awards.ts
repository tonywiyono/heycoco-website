import type { CollectionConfig } from "payload";

export const Awards: CollectionConfig = {
  slug: "awards",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "updatedAt"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "icon",
      type: "text",
      required: true,
      admin: { description: "Emoji or symbol shown in the hero card" },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
