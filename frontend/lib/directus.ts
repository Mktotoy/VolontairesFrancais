import { createDirectus, rest, staticToken } from '@directus/sdk';

const url = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:5000';
const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

const baseClient = createDirectus(url);
const authenticatedClient = token ? baseClient.with(staticToken(token)) : baseClient;
const directus = authenticatedClient.with(rest());

export default directus;
