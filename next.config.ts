import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // env removed
  allowedDevOrigins: [
    "*.janeway.replit.dev",
    "*.replit.dev",
    "*.repl.co",
    "localhost:3000",
  ],
  // rewrites removed for static migration
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/guide-milano-cortina',
        destination: '/milano-cortina',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
