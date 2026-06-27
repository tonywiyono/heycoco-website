import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            { name: "name", type: "text", required: true, localized: true },
            { name: "tagline", type: "text", required: true, localized: true },
            { name: "description", type: "textarea", required: true, localized: true },
            { name: "url", type: "text", required: true },
            { name: "email", type: "email", required: true },
            { name: "phone", type: "text", required: true },
            { name: "location", type: "text", required: true, localized: true },
            { name: "whatsapp", type: "text", required: true },
            {
              name: "social",
              type: "group",
              fields: [
                { name: "x", type: "text" },
                { name: "instagram", type: "text" },
                { name: "linkedin", type: "text" },
                { name: "dribbble", type: "text" },
                { name: "clutch", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Navigation",
          fields: [
            {
              name: "navItems",
              type: "array",
              fields: [
                { name: "id", type: "text", required: true },
                { name: "label", type: "text", required: true, localized: true },
                { name: "href", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Hero",
          fields: [
            { name: "headlineLine1", type: "text", required: true, localized: true },
            { name: "headlineLine2", type: "text", required: true, localized: true },
            { name: "subheadline", type: "text", required: true, localized: true },
            { name: "introText", type: "textarea", required: true, localized: true },
            { name: "rating", type: "text", defaultValue: "4.9/5" },
            { name: "ratingLabel", type: "text", localized: true },
          ],
        },
        {
          label: "Team section",
          fields: [
            { name: "teamHeadline", type: "text", required: true, localized: true },
            { name: "teamSubhead", type: "text", required: true, localized: true },
            { name: "teamStat", type: "text", required: true },
            { name: "teamStatLabel", type: "text", required: true, localized: true },
            {
              name: "career",
              type: "group",
              fields: [
                { name: "title", type: "text", required: true, localized: true },
                { name: "subtitle", type: "text", required: true, localized: true },
                { name: "cta", type: "text", required: true, localized: true },
              ],
            },
          ],
        },
        {
          label: "Process stats",
          fields: [
            {
              name: "processStats",
              type: "array",
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true, localized: true },
              ],
            },
          ],
        },
        {
          label: "Sidebar",
          fields: [
            {
              name: "sidebarWhatsappCta",
              type: "group",
              label: "WhatsApp CTA",
              fields: [
                {
                  name: "enabled",
                  type: "checkbox",
                  defaultValue: true,
                  label: "Show WhatsApp button",
                },
                {
                  name: "label",
                  type: "text",
                  required: true,
                  localized: true,
                  defaultValue: "Consult Through Whatsapp",
                },
                {
                  name: "url",
                  type: "text",
                  required: true,
                  admin: { description: "Full WhatsApp link (e.g. https://wa.me/6281234567890)" },
                },
                {
                  name: "backgroundColor",
                  type: "text",
                  required: true,
                  defaultValue: "#25D366",
                  admin: { description: "Hex color for button background" },
                },
                {
                  name: "hoverBackgroundColor",
                  type: "text",
                  required: true,
                  defaultValue: "#20BD5A",
                  admin: { description: "Hex color on hover" },
                },
                {
                  name: "textColor",
                  type: "text",
                  required: true,
                  defaultValue: "#FFFFFF",
                  admin: { description: "Hex color for button text" },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
