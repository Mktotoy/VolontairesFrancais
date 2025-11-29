import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAssetUrl } from '@/lib/assets';

type Post = {
  id: number;
  title: string;
  slug: string;
  content?: string | null;
  excerpt?: string | null;
  published_at?: string | null;
  status?: string | null;
  category?: string | number | null;
  featured_picture?: string | null;
  seo?: any;
};

export const revalidate = 0; // always fetch fresh
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const posts = await directus.request(
      readItems('posts', {
        fields: [
          'id',
          'title',
          'slug',
          'content',
          'excerpt',
          'published_at',
          'status',
          'category',
          'featured_picture',
          'seo',
        ],
        filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
        limit: 1,
      })
    );
    if (!posts || !posts.length) return null;
    return posts[0] as Post;
  } catch (e) {
    console.warn('Failed to fetch post', e);
    return null;
  }
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr));
}


export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    // keep raw slug if decoding fails
  }
  const post = await fetchPost(slug);
  if (!post) {
    notFound();
  }
  const date = post.published_at;
  const image = getAssetUrl(post.featured_picture);
  const seo = post.seo || {};

  return (
    <>
      <section className="page-header">
        <div className="container">
          <p className="page-subtitle">
            <Link href="/actu" className="nav-link">
              ← Retour aux actualités
            </Link>
          </p>
          <h1 className="page-title">{post.title}</h1>
          {date && <p className="page-subtitle">{formatDate(date)}</p>}
        </div>
      </section>

      <section className="news">
        <div className="container">
          <article className="news-article">
            {image && (
              <div className="article-image">
                <img src={image} alt={post.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
              </div>
            )}
            <div className="article-content">
              {post.content ? (
                <div className="article-full" dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p>Contenu à venir.</p>
              )}
            </div>
          </article>
        </div>
      </section>

      {seo && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo) }}
        />
      )}
    </>
  );
}
