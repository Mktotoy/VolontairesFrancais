import { createDirectus, rest, staticToken } from '@directus/sdk';

// Logic for URL:
// - Server side: Call localhost backend directly (127.0.0.1:8055)
// - Client side: Use relative path (/) so it goes through Next.js rewrites to the backend
const getServerUrl = () => 'https://admin.volontairesfrancais.fr';
const getClientUrl = () => typeof window !== 'undefined' ? window.location.origin : getServerUrl();

const url = typeof window === 'undefined' ? getServerUrl() : (process.env.NEXT_PUBLIC_DIRECTUS_URL || getClientUrl());
const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

const baseClient = createDirectus(url);
const authenticatedClient = token ? baseClient.with(staticToken(token)) : baseClient;
const directus = authenticatedClient.with(rest());

export default directus;
