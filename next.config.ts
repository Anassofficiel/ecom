import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.20"],
  devIndicators: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;