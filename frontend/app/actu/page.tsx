import Link from 'next/link';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { getAssetUrl } from '@/lib/assets';

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  published_at?: string | null;
  status?: string | null;
  category?: string | number | null;
  featured_picture?: string | null;
  seo?: any;
};

export const revalidate = 300; // revalidate every 5 minutes

async function fetchPosts(): Promise<Post[]> {
  try {
    const posts = await directus.request(
      readItems('posts', {
        fields: [
          'id',
          'title',
          'slug',
          'excerpt',
          'content',
          'published_at',
          'status',
          'category',
          'featured_picture',
          'seo',
        ],
        filter: { status: { _eq: 'published' } },
        sort: ['-published_at'],
      })
    );
    return (posts as Post[]) || [];
  } catch (e) {
    console.warn('Failed to fetch posts', e);
    return [];
  }
}

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
