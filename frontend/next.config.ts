import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DIRECTUS_API_URL: 'http://0.0.0.0:8055'
  },
  allowedDevOrigins: [
    '*.janeway.replit.dev',
    '*.replit.dev',
    '*.repl.co',
    'localhost:5000',
  ],
  async rewrites() {
    return {
      beforeFiles: [
        // Directus admin interface
        {
          source: '/admin/:path*',
          destination: 'http://0.0.0.0:8055/admin/:path*',
        },
        // Directus API routes - authentication
        {
          source: '/auth/:path*',
          destination: 'http://0.0.0.0:8055/auth/:path*',
        },
        // Directus API routes - server info
        {
          source: '/server/:path*',
          destination: 'http://0.0.0.0:8055/server/:path*',
        },
        // Directus API routes - admin features
        {
          source: '/flows/:path*',
          destination: 'http://0.0.0.0:8055/flows/:path*',
        },
        {
          source: '/users/:path*',
          destination: 'http://0.0.0.0:8055/users/:path*',
        },
        {
          source: '/roles/:path*',
          destination: 'http://0.0.0.0:8055/roles/:path*',
        },
        {
          source: '/permissions/:path*',
          destination: 'http://0.0.0.0:8055/permissions/:path*',
        },
        {
          source: '/collections/:path*',
          destination: 'http://0.0.0.0:8055/collections/:path*',
        },
        {
          source: '/fields/:path*',
          destination: 'http://0.0.0.0:8055/fields/:path*',
        },
        {
          source: '/relations/:path*',
          destination: 'http://0.0.0.0:8055/relations/:path*',
        },
        {
          source: '/settings/:path*',
          destination: 'http://0.0.0.0:8055/settings/:path*',
        },
        {
          source: '/webhooks/:path*',
          destination: 'http://0.0.0.0:8055/webhooks/:path*',
        },
        {
          source: '/policies/:path*',
          destination: 'http://0.0.0.0:8055/policies/:path*',
        },
        {
          source: '/translations/:path*',
          destination: 'http://0.0.0.0:8055/translations/:path*',
        },
        {
          source: '/extensions/:path*',
          destination: 'http://0.0.0.0:8055/extensions/:path*',
        },
        {
          source: '/files/:path*',
          destination: 'http://0.0.0.0:8055/files/:path*',
        },
        {
          source: '/folders/:path*',
          destination: 'http://0.0.0.0:8055/folders/:path*',
        },
        // Directus access control
        {
          source: '/access/:path*',
          destination: 'http://0.0.0.0:8055/access/:path*',
        },
        // Directus admin UI - presets, dashboards, panels, notifications
        {
          source: '/presets/:path*',
          destination: 'http://0.0.0.0:8055/presets/:path*',
        },
        {
          source: '/dashboards/:path*',
          destination: 'http://0.0.0.0:8055/dashboards/:path*',
        },
        {
          source: '/panels/:path*',
          destination: 'http://0.0.0.0:8055/panels/:path*',
        },
        {
          source: '/notifications/:path*',
          destination: 'http://0.0.0.0:8055/notifications/:path*',
        },
        // Directus comments and activity
        {
          source: '/comments/:path*',
          destination: 'http://0.0.0.0:8055/comments/:path*',
        },
        {
          source: '/activity/:path*',
          destination: 'http://0.0.0.0:8055/activity/:path*',
        },
        // Directus versioning and history
        {
          source: '/versions/:path*',
          destination: 'http://0.0.0.0:8055/versions/:path*',
        },
        {
          source: '/revisions/:path*',
          destination: 'http://0.0.0.0:8055/revisions/:path*',
        },
        // Directus assets
        {
          source: '/assets/:path*',
          destination: 'http://0.0.0.0:8055/assets/:path*',
        },
        // Directus API routes - content
        {
          source: '/api/:path*',
          destination: 'http://0.0.0.0:8055/api/:path*',
        },
        {
          source: '/items/:path*',
          destination: 'http://0.0.0.0:8055/items/:path*',
        },
        // Health check
        {
          source: '/health',
          destination: 'http://0.0.0.0:8055/health',
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
