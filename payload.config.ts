import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Awards } from "./collections/Awards";
import { ExpertiseItems } from "./collections/ExpertiseItems";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { FaqItems } from "./collections/FaqItems";
import { Media } from "./collections/Media";
import { NewsPosts } from "./collections/NewsPosts";
import { ProcessSteps } from "./collections/ProcessSteps";
import { Projects } from "./collections/Projects";
import { Services } from "./collections/Services";
import { TeamMembers } from "./collections/TeamMembers";
import { Testimonials } from "./collections/Testimonials";
import { Users } from "./collections/Users";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "— Hey Coco! CMS",
    },
  },
  collections: [
    Users,
    Media,
    Projects,
    Testimonials,
    TeamMembers,
    NewsPosts,
    FaqItems,
    Awards,
    ExpertiseItems,
    ProcessSteps,
    Services,
    ContactSubmissions,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Indonesian", code: "id" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  sharp,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
});
