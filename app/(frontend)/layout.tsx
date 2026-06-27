import { AppShell } from "@/components/layout/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { getSiteInfo } from "@/lib/cms";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteInfo();

  return {
    title: `${site.name} | Creative Agency Jakarta`,
    description: site.description,
    metadataBase: new URL(site.url),
    openGraph: {
      title: `${site.name} | Creative Agency Jakarta`,
      description: site.description,
      url: site.url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} | Creative Agency Jakarta`,
      description: site.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { site, navItems, sidebarWhatsappCta } = await getSiteInfo();

  return (
    <html lang="en" className={`${bricolage.variable} h-full`}>
      <head>
        <JsonLd site={site} />
      </head>
      <body className="min-h-full antialiased">
        <AppShell site={site} navItems={navItems} sidebarWhatsappCta={sidebarWhatsappCta}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
