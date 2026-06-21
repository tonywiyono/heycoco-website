import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
  },
  admin: {
    useAsTitle: "filename",
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};
