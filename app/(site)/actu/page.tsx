import Link from 'next/link';
import { fetchWPPosts } from '@/lib/wpgraphql';
import { getAssetUrl } from '@/lib/assets';

export const revalidate = 60; // revalidate every 1 minute

export const metadata = {
  title: 'Actualités | Volontaires français',
  description: 'Toutes les dernières nouvelles de l\'association Volontaires français : événements, retours d\'expérience et vie de la communauté.',
  openGraph: {
    title: 'Actualités | Volontaires français',
    description: 'Toutes les dernières nouvelles de l\'association Volontaires français.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Volontaires français',
    url: 'https://volontairesfrancais.fr/actu',
  },
  twitter: {
    card: 'summary',
    title: 'Actualités | Volontaires français',
    description: 'Toutes les dernières nouvelles de l\'association Volontaires français.',
  },
};

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr));
}


export default async function ActuPage() {
  const posts = await fetchWPPosts({ categorySlug: 'actualites' });
  const hasPosts = posts.length > 0;

  return (
    <>
      <style>{`
        .article-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .article-image {
          width: 100%;
        }
        @media (min-width: 768px) {
          .article-content {
            flex-direction: row;
            align-items: flex-start;
            gap: 30px;
          }
          .article-image {
            width: 40%;
            flex-shrink: 0;
            max-width: 400px;
          }
          .article-text {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .article-preview {
            margin-bottom: 20px;
          }
          .btn-read-more {
            align-self: flex-start;
          }
        }
      `}</style>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Actualités</h1>
          <p className="page-subtitle">Les dernières nouvelles de Volontaires français</p>
        </div>
      </section>

      <section className="news">
        <div className="container">
          {!hasPosts && <p>Aucun article publié pour le moment.</p>}
          {hasPosts &&
            posts.map((post) => {
              const date = post.published_at;
              const preview = post.excerpt || (post.content ? `${post.content.slice(0, 220)}…` : '');
              const image = getAssetUrl(post.featured_picture);
              return (
                <article className="news-article" key={post.id}>
                  <div className="article-header">
                    <h2 className="article-title">
                      <Link href={`/actu/${post.slug}`}>{post.title}</Link>
                    </h2>
                    {date && (
                      <p className="article-date">
                        <i className="far fa-calendar" /> {formatDate(date)}
                      </p>
                    )}
                  </div>
                  <div className="article-content">
                    {image && (
                      <div className="article-image">
                        <img src={image} alt={post.title} style={{ width: '100%', maxHeight: '450px', objectFit: 'contain', borderRadius: '8px', marginBottom: '16px' }} />
                      </div>
                    )}
                    <div className="article-text">
                      {preview && <div className="article-preview" dangerouslySetInnerHTML={{ __html: preview }} />}
                      <Link
                        href={`/actu/${post.slug}`}
                        className="btn-read-more"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: 'auto' }}
                      >
                        Lire l’article <i className="fas fa-chevron-right"></i>
                      </Link>
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
