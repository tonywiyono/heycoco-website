import { AppShell } from "@/components/layout/AppShell";
import { JsonLd } from "@/components/JsonLd";
import { getSiteInfo } from "@/lib/cms";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  const { site, navItems } = await getSiteInfo();

  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <head>
        <JsonLd site={site} />
      </head>
      <body className="min-h-full antialiased">
        <AppShell site={site} navItems={navItems}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
