import { fetchPost } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAssetUrl } from '@/lib/assets';

export const revalidate = 0; // always fetch fresh
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr));
}


import { marked } from 'marked';
import ArticleBody from '@/components/ArticleBody';
import Carousel from '@/components/Carousel';

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.join('/'); // Reconstruct full slug path

  const post = await fetchPost(slug);
  if (!post) return {};

  const title = post.seo?.title || post.title;
  const description = post.seo?.meta_description || post.excerpt || post.content?.slice(0, 150);
  const image = getAssetUrl(post.featured_picture || post.seo?.og_image);

  return {
    title: `${title} | Volontaires français`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: image ? [image] : [],
      type: 'article',
      publishedTime: post.published_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: image ? [image] : [],
    },
  };
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.join('/'); // Reconstruct full slug path

  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }
  const date = post.published_at;
  const image = getAssetUrl(post.featured_picture);
  const seo = post.seo || {};

  const contentHtml = post.content ? await marked.parse(post.content, { breaks: true }) : '';

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
              {contentHtml ? (
                <ArticleBody contentHtml={contentHtml} />
              ) : (
                <p>Contenu à venir.</p>
              )}

              {post.gallery && post.gallery.length > 0 && (
                <div className="article-gallery mt-8">
                  <h3>Galerie photos</h3>
                  <Carousel images={post.gallery} />
                </div>
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
