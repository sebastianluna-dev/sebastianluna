import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: the screenshots are flat UI where it wins clearly over WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
