import { MetadataRoute } from 'next';
import { fetchPosts } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await fetchPosts({ includeNested: true });
    const baseUrl = 'https://volontairesfrancais.fr';

    const routes = [
        { url: `${baseUrl}`, priority: 1.0 },
        { url: `${baseUrl}/actu`, priority: 0.9 },
        { url: `${baseUrl}/adhesion`, priority: 0.9 },
        { url: `${baseUrl}/equipe`, priority: 0.7 },
        { url: `${baseUrl}/faq`, priority: 0.7 },
        { url: `${baseUrl}/on-parle-de-nous`, priority: 0.6 },
        { url: `${baseUrl}/milano-cortina`, priority: 0.8 },
        { url: `${baseUrl}/galerie-milano-cortina`, priority: 0.6 },
        { url: `${baseUrl}/mentions-legales`, priority: 0.3 },
    ].map((r) => ({ ...r, lastModified: new Date() }));

    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/actu/${post.slug}`,
        lastModified: new Date(post.published_at || new Date()),
        priority: 0.8,
    }));

    return [...routes, ...postRoutes];
}
