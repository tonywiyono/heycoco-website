import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 180,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Dev copy: the site lives at /lab here (the live copy, hey-coco-website-new, serves it from the root).
  // Temporary (307) on purpose, so it is easy to change later without browsers caching it forever.
  async redirects() {
    return [{ source: "/", destination: "/lab", permanent: false }];
  },
};

export default nextConfig;
