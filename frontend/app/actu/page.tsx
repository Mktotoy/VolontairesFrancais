import Link from 'next/link';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  published_at?: string | null;
  date_created?: string | null;
  status?: string | null;
};

export const revalidate = 300; // revalidate every 5 minutes

async function fetchPosts(): Promise<Post[]> {
  try {
    const posts = await directus.request(
      readItems('posts', {
        fields: ['id', 'title', 'slug', 'excerpt', 'content', 'published_at', 'date_created', 'status'],
        filter: { status: { _eq: 'published' } },
        sort: ['-published_at', '-date_created'],
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
              const date = post.published_at || post.date_created;
              const preview = post.excerpt || (post.content ? `${post.content.slice(0, 220)}…` : '');
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
                    {preview && <div className="article-preview" dangerouslySetInnerHTML={{ __html: preview }} />}
                    <Link href={`/actu/${post.slug}`} className="btn-read-more">
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
