import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/enquete/', '/api/'],
            },
        ],
        sitemap: 'https://volontairesfrancais.fr/sitemap.xml',
    };
}
