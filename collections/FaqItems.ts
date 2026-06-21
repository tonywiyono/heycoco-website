import type { CollectionConfig } from "payload";

export const FaqItems: CollectionConfig = {
  slug: "faq-items",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "updatedAt"],
  },
  fields: [
    {
      name: "key",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "Stable id used in the frontend (e.g. services, pricing)" },
    },
    {
      name: "question",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
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
