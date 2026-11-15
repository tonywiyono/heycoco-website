import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { LabNav } from "@/components/lab/LabClient";
import { JsonLd, LabFooter } from "@/components/lab/LabShared";
import { labSite } from "@/content/lab";
import { site } from "@/content/site";
import "./lab.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Hey Coco! | Boutique creative agency", template: "%s | Hey Coco!" },
  description:
    "Hey Coco! is a boutique creative agency in Jakarta & Bali: production, social media and performance marketing from one 15+ strong team working seamlessly across all three.",
  robots: { index: true, follow: true }, // live: this is now the main site
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable}`}>
      <body className="min-h-screen antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: labSite.name,
            url: site.url,
            email: site.email,
            telephone: site.phone,
            areaServed: ["Jakarta", "Bali", "Indonesia"],
            description: "Boutique creative agency for production, social media and performance marketing.",
            sameAs: [site.social.instagram, site.social.linkedin],
          }}
        />
        <LabNav />
        <main>{children}</main>
        <LabFooter />
      </body>
    </html>
  );
}
