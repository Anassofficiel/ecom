import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.20"],
  devIndicators: false,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "veneziaelectro.vercel.app",
          },
        ],
        destination: "https://electromostafa55.ma/:path*",
        permanent: true,
      },
      {
        source: "/checkout",
        destination: "/",
        permanent: false,
      },
    ];
  },

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