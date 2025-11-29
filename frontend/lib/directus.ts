import { createDirectus, rest, staticToken } from '@directus/sdk';

// Use /api instead of localhost:8055 - goes through Next.js proxy
const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:5000')
    .with(process.env.NEXT_PUBLIC_DIRECTUS_TOKEN ? staticToken(process.env.NEXT_PUBLIC_DIRECTUS_TOKEN) : (client) => client)
    .with(rest());

export default directus;
