import type { CollectionConfig } from "payload";

export const ClientLogos: CollectionConfig = {
  slug: "client-logos",
  labels: {
    singular: "Client Logo",
    plural: "Client Logos",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "sortOrder", "updatedAt"],
    description: "Logos shown in the Process section marquee.",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Client or brand name (used for alt text)" },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: { description: "Prefer white or light logos for the accent stats bar." },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
