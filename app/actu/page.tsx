import Link from 'next/link';
import { fetchPosts } from '@/lib/data';
import { getAssetUrl } from '@/lib/assets';

export const revalidate = 60; // revalidate every 1 minute

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr));
}


export default async function ActuPage() {
  const posts = await fetchPosts();
  const hasPosts = posts.length > 0;

  return (
    <>
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
                        <img src={image} alt={post.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                      </div>
                    )}
                    {preview && <div className="article-preview" dangerouslySetInnerHTML={{ __html: preview }} />}
                    <Link
                      href={`/actu/${post.slug}`}
                      className="btn-read-more"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      Lire l’article <i className="fas fa-chevron-right"></i>
                    </Link>
                  </div>
                </article>
              );
            })}
        </div>
      </section>
    </>
  );
}
