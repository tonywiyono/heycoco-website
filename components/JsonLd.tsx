import type { SiteInfo } from "@/lib/types/content";

export function JsonLd({ site }: { site: SiteInfo }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: site.name,
        url: site.url,
        email: site.email,
        description: site.description,
        sameAs: [site.social.instagram, site.social.threads, site.social.linkedin].filter(Boolean),
      },
      {
        "@type": "LocalBusiness",
        name: site.name,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jakarta",
          addressCountry: "ID",
        },
        description: site.description,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
