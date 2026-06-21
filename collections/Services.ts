import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "color", "updatedAt"],
  },
  fields: [
    {
      name: "key",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "label",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "color",
      type: "select",
      required: true,
      defaultValue: "muted",
      options: [
        { label: "Accent", value: "accent" },
        { label: "Muted", value: "muted" },
        { label: "Dark", value: "dark" },
      ],
    },
    {
      name: "rotation",
      type: "number",
      required: true,
      defaultValue: 0,
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
