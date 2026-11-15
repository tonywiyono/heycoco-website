import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // The new site lives at /lab; the homepage sends visitors straight there.
  // Temporary (307) on purpose, so it is easy to change later without browsers caching it forever.
  async redirects() {
    return [{ source: "/", destination: "/lab", permanent: false }];
  },
};

export default withPayload(nextConfig);
