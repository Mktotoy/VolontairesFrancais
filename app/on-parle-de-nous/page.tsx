import Link from 'next/link';
import { fetchPressArticles } from '@/lib/data';
import { getAssetUrl } from '@/lib/assets';

export const revalidate = 300; // revalidate every 5 minutes

function formatDate(dateStr?: string | null) {
    if (!dateStr) return '';
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr));
}

export const metadata = {
    title: 'On parle de nous | Volontaires français',
    description: 'Retrouvez tous les articles de presse et reportages parlant de l\'association Volontaires français.',
};

export default async function PressPage() {
    const articles = await fetchPressArticles();
    const hasArticles = articles.length > 0;

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
                            const image = getAssetUrl(article.image);

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
                                                <img src={image} alt={article.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '16px', objectFit: 'cover', maxHeight: '300px' }} />
                                            </div>
                                        )}
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
                                </article>
                            );
                        })}
                </div>
            </section>
        </>
    );
}
