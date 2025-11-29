import { createDirectus, rest, staticToken } from '@directus/sdk';

const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055')
    .with(process.env.NEXT_PUBLIC_DIRECTUS_TOKEN ? staticToken(process.env.NEXT_PUBLIC_DIRECTUS_TOKEN) : (client) => client)
    .with(rest());

export default directus;
