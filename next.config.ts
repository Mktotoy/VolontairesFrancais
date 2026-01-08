import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DIRECTUS_API_URL: "https://admin.volontairesfrancais.fr",
  },
  allowedDevOrigins: [
    "*.janeway.replit.dev",
    "*.replit.dev",
    "*.repl.co",
    "localhost:3000",
  ],
  async rewrites() {
    return {
      beforeFiles: [
        // Directus admin interface
        {
          source: "/admin/:path*",
          destination: "https://admin.volontairesfrancais.fr/:path*",
        },
        // Directus API routes - authentication
        {
          source: "/auth/:path*",
          destination: "https://admin.volontairesfrancais.fr/auth/:path*",
        },
        // Directus API routes - server info
        {
          source: "/server/:path*",
          destination: "https://admin.volontairesfrancais.fr/server/:path*",
        },
        // Directus API routes - admin features
        {
          source: "/flows/:path*",
          destination: "https://admin.volontairesfrancais.fr/flows/:path*",
        },
        {
          source: "/users/:path*",
          destination: "https://admin.volontairesfrancais.fr/users/:path*",
        },
        {
          source: "/roles/:path*",
          destination: "https://admin.volontairesfrancais.fr/roles/:path*",
        },
        {
          source: "/permissions/:path*",
          destination:
            "https://admin.volontairesfrancais.fr/permissions/:path*",
        },
        {
          source: "/collections/:path*",
          destination:
            "https://admin.volontairesfrancais.fr/collections/:path*",
        },
        {
          source: "/fields/:path*",
          destination: "https://admin.volontairesfrancais.fr/fields/:path*",
        },
        {
          source: "/relations/:path*",
          destination: "https://admin.volontairesfrancais.fr/relations/:path*",
        },
        {
          source: "/settings/:path*",
          destination: "https://admin.volontairesfrancais.fr/settings/:path*",
        },
        {
          source: "/webhooks/:path*",
          destination: "https://admin.volontairesfrancais.fr/webhooks/:path*",
        },
        {
          source: "/policies/:path*",
          destination: "https://admin.volontairesfrancais.fr/policies/:path*",
        },
        {
          source: "/translations/:path*",
          destination:
            "https://admin.volontairesfrancais.fr/translations/:path*",
        },
        {
          source: "/extensions/:path*",
          destination: "https://admin.volontairesfrancais.fr/extensions/:path*",
        },
        {
          source: "/files/:path*",
          destination: "https://admin.volontairesfrancais.fr/files/:path*",
        },
        {
          source: "/folders/:path*",
          destination: "https://admin.volontairesfrancais.fr/folders/:path*",
        },
        // Directus access control
        {
          source: "/access/:path*",
          destination: "https://admin.volontairesfrancais.fr/access/:path*",
        },
        // Directus admin UI - presets, dashboards, panels, notifications
        {
          source: "/presets/:path*",
          destination: "https://admin.volontairesfrancais.fr/presets/:path*",
        },
        {
          source: "/dashboards/:path*",
          destination: "https://admin.volontairesfrancais.fr/dashboards/:path*",
        },
        {
          source: "/panels/:path*",
          destination: "https://admin.volontairesfrancais.fr/panels/:path*",
        },
        {
          source: "/notifications/:path*",
          destination:
            "https://admin.volontairesfrancais.fr/notifications/:path*",
        },
        // Directus comments and activity
        {
          source: "/comments/:path*",
          destination: "https://admin.volontairesfrancais.fr/comments/:path*",
        },
        {
          source: "/activity/:path*",
          destination: "https://admin.volontairesfrancais.fr/activity/:path*",
        },
        // Directus versioning and history
        {
          source: "/versions/:path*",
          destination: "https://admin.volontairesfrancais.fr/versions/:path*",
        },
        {
          source: "/revisions/:path*",
          destination: "https://admin.volontairesfrancais.fr/revisions/:path*",
        },
        // Directus assets
        {
          source: "/assets/:path*",
          destination: "https://admin.volontairesfrancais.fr/assets/:path*",
        },
        // Directus API routes - content
        {
          source: "/api/:path*",
          destination: "https://admin.volontairesfrancais.fr/api/:path*",
        },
        {
          source: "/items/:path*",
          destination: "https://admin.volontairesfrancais.fr/items/:path*",
        },
        // Health check
        {
          source: "/health",
          destination: "https://admin.volontairesfrancais.fr/health",
        },
      ],
    };
  },
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
};

export default nextConfig;
