import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
