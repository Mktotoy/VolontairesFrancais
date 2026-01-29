
import { fetchPost } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAssetUrl } from '@/lib/assets';
import { marked } from 'marked';
import ArticleBody from '@/components/ArticleBody';
import Carousel from '@/components/Carousel';
import TableOfContents from '@/components/TableOfContents';

export const revalidate = 0; // always fetch fresh
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

function formatDate(dateStr?: string | null) {
    if (!dateStr) return '';
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: rawSlug } = await params;
    let slug = rawSlug;
    try {
        slug = decodeURIComponent(rawSlug);
    } catch {
        // keep raw slug
    }

    const post = await fetchPost(slug);
    if (!post) return {};

    const title = `${post.title} | Guide Milano Cortina`;
    const description = post.excerpt || post.content?.slice(0, 150);
    const image = getAssetUrl(post.featured_picture);

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            images: image ? [image] : [],
            type: 'article',
        },
    };
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: rawSlug } = await params;
    let slug = rawSlug;
    try {
        slug = decodeURIComponent(rawSlug);
    } catch {
        // keep raw slug
    }
    const post = await fetchPost(slug);

    if (!post) {
        notFound();
    }

    const image = getAssetUrl(post.featured_picture);

    // Extract headings and inject IDs
    const headings: { id: string; text: string; level: number }[] = [];
    let contentWithIds = post.content || '';

    // Regex to match headings and replace them with ID-injected versions
    // We do this naively for h2 and h3
    contentWithIds = contentWithIds.replace(/^(#{2,3})\s+(.*)$/gm, (match, hashes, title) => {
        const level = hashes.length;
        const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        headings.push({ id, text: title, level });
        return `<h${level} id="${id}">${title}</h${level}>`;
    });

    // Parse the modified markdown (which now contains HTML headings, which marked handles fine)
    const contentHtml = await marked.parse(contentWithIds, { breaks: true });

    return (
        <>
            <section className="page-header" style={{ background: 'linear-gradient(135deg, #067fcc, #07a459)' }}>
                <div className="container">
                    <p className="page-subtitle">
                        <Link href="/guide-milano-cortina" className="nav-link" style={{ color: 'white', textDecoration: 'underline' }}>
                            ← Retour au Guide Milano Cortina
                        </Link>
                    </p>
                    <h1 className="page-title">{post.title}</h1>
                </div>
            </section>

            <section className="news" style={{ padding: '60px 0' }}>
                <div className="container guide-layout">
                    {/* Main Content */}
                    <div className="guide-content">
                        <article className="news-article" style={{ boxShadow: 'none', padding: 0 }}>
                            {image && (
                                <div className="article-image" style={{ marginBottom: '40px' }}>
                                    <img src={image} alt={post.title} style={{ width: '100%', borderRadius: '15px', maxHeight: '500px', objectFit: 'cover' }} />
                                </div>
                            )}

                            <div className="article-content" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                                {contentHtml ? (
                                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
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

                    {/* Sidebar TOC - Visible on Desktop */}
                    <aside className="guide-sidebar">
                        <TableOfContents headings={headings} />
                    </aside>
                </div>
            </section>

            <style>{`
                .guide-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 40px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                @media (min-width: 1024px) {
                    .guide-layout {
                        grid-template-columns: 2fr 1fr; /* 2/3 content, 1/3 sidebar */
                        align-items: start;
                    }
                    
                    .guide-content {
                        max-width: 100%; /* Let grid control width */
                    }
                }
            `}</style>
        </>
    );
}
