import { MetadataRoute } from 'next';
import { fetchPosts } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await fetchPosts({ includeNested: true });
    const baseUrl = 'https://volontairesfrancais.fr';

    // Base routes
    const routes = [
        '',
        '/equipe',
        '/actu',
        '/on-parle-de-nous',
        '/faq',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    // Post routes
    // Note: We need to handle nested slugs logic if we were strictly following the file system,
    // but fetchPosts now returns slugs.
    // Exception: For our nested structure, fetchPosts returns "rdv-.../index" which is wrong for the URL.
    // We need to fix fetchPosts to return the correct slug for the index page.

    // Wait, I need to check what fetchPosts returns for the index file.
    // "slug: entry.name" -> "rdv-..." (directory name). 
    // OK, so the index article has slug "rdv-...".
    // URL: /actu/rdv-...

    // What about sub-pages?
    // fetchPosts only scans the root of POSTS_DIR.
    // It DOES NOT scan subdirectories recursively for *files*.
    // It only checks if a directory has `index.md`.

    // **CRITICAL BUG FOUND**: `fetchPosts` does NOT recursively find `nice.md` inside `rdv-.../`.
    // It only looks at top-level entries.
    // I need to update `fetchPosts` to recurse or specifically look into directories.

    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/actu/${post.slug}`,
        lastModified: new Date(post.published_at || new Date()),
    }));

    return [...routes, ...postRoutes];
}
