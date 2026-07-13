import type { CollectionConfig } from "payload";

export const Awards: CollectionConfig = {
  slug: "awards",
  labels: {
    singular: "Hero Accolade",
    plural: "Hero Accolades",
  },
  admin: {
    useAsTitle: "headline",
    defaultColumns: ["headline", "sortOrder", "updatedAt"],
    description: "Slides in the hero accolade carousel (Hubfolio-style card).",
  },
  fields: [
    {
      name: "key",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Stable identifier (e.g. adage, upwork)" },
    },
    {
      name: "headline",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "Large centered text. Use line breaks for multi-line headlines.",
      },
    },
    {
      name: "caption",
      type: "textarea",
      localized: true,
      admin: {
        description: "Small text shown bottom-left (e.g. “20 best agency\\n2023”).",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional logo image shown centered instead of headline text.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};
