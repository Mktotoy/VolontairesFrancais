import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DIRECTUS_API_URL: 'http://0.0.0.0:8055'
  },
};

export default nextConfig;
