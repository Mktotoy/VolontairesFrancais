import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DIRECTUS_API_URL: process.env.DIRECTUS_API_URL || 'http://0.0.0.0:8055',
    DIRECTUS_STATIC_TOKEN: process.env.DIRECTUS_STATIC_TOKEN || '',
  },
};

export default nextConfig;
