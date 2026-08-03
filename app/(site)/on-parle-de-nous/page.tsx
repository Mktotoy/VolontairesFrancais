import Link from 'next/link';
import { fetchWPPressArticles } from '@/lib/wpgraphql';
import { getAssetUrl } from '@/lib/assets';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

export const revalidate = 300; // revalidate every 5 minutes

async function getOgImage(url: string): Promise<string | null> {
    if (!url) return null;
    try {
        const response = await fetch(url, { next: { revalidate: 3600 } });
        if (!response.ok) return null;
        const html = await response.text();
        const $ = cheerio.load(html);
        return $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || null;
    } catch (e) {
        console.warn(`Failed to fetch og:image for ${url}`);
        return null;
    }
}

function formatDate(dateStr?: string | null) {
    if (!dateStr) return '';
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr));
}

export const metadata = {
    title: 'Ils parlent de nous | Volontaires français',
    description: 'Retrouvez tous les articles de presse, reportages et médias qui parlent de l\'association Volontaires français et de la communauté des volontaires olympiques.',
    openGraph: {
        title: 'Ils parlent de nous | Volontaires français',
        description: 'Articles de presse et reportages sur les volontaires français des Jeux Olympiques.',
        type: 'website',
        locale: 'fr_FR',
        siteName: 'Volontaires français',
        url: 'https://volontairesfrancais.fr/on-parle-de-nous',
    },
    twitter: {
        card: 'summary',
        title: 'Ils parlent de nous | Volontaires français',
        description: 'Articles de presse et reportages sur les volontaires français des JOP.',
    },
};

export default async function PressPage() {
    const rawArticles = await fetchWPPressArticles();
    const hasArticles = rawArticles.length > 0;

    const articles = await Promise.all(
        rawArticles.map(async (article) => {
            let image = getAssetUrl(article.image);

            if (image && image.startsWith('/')) {
                const filePath = path.join(process.cwd(), 'public', image);
                if (!fs.existsSync(filePath)) {
                    image = null;
                }
            }

            if (!image && article.url) {
                const ogImage = await getOgImage(article.url);
                if (ogImage) image = ogImage;
            }
            return { ...article, resolvedImage: image };
        })
    );

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">On parle de nous</h1>
                    <p className="page-subtitle">Les articles de presse sur Volontaires français</p>
                </div>
            </section>

            <section className="news">
                <div className="container">
                    {!hasArticles && <p>Aucun article de presse pour le moment.</p>}
                    {hasArticles &&
                        articles.map((article) => {
                            const date = article.publication_date;
                            const image = article.resolvedImage;

                            return (
                                <article className="news-article" key={article.id}>
                                    <div className="article-header">
                                        <h2 className="article-title">
                                            <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                                        </h2>
                                        <div className="article-meta" style={{ display: 'flex', gap: '1rem', color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                            {date && (
                                                <p className="article-date">
                                                    <i className="far fa-calendar" /> {formatDate(date)}
                                                </p>
                                            )}
                                            {article.source && (
                                                <p className="article-source">
                                                    <i className="far fa-newspaper" /> {article.source}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="article-content">
                                        {image && (
                                            <div className="article-image">
                                                <img src={image} alt={article.title} style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '16px', objectFit: 'contain', maxHeight: '300px', width: 'auto' }} />
                                            </div>
                                        )}
                                        <div className="article-text">
                                            {article.extract && (
                                                <div className="article-preview">
                                                    <p>{article.extract}</p>
                                                </div>
                                            )}
                                            <a
                                                href={article.url}
                                                className="btn-read-more"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                            >
                                                {article.cta_label || 'Lire l’article'} <i className={`fas ${article.cta_label ? 'fa-play-circle' : 'fa-external-link-alt'}`}></i>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                </div>
            </section>
        </>
    );
}
