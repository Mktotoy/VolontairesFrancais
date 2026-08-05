import * as cheerio from 'cheerio';
import { Post, PressArticle } from './types';

const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_URL || 'https://espace.volontairesfrancais.fr/graphql';
// Format attendu : "user:application_password" (Application Password WP, auth Basic — pas un Bearer token)
const WP_GRAPHQL_TOKEN = process.env.WP_GRAPHQL_TOKEN;

async function wpFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (WP_GRAPHQL_TOKEN) {
    headers['Authorization'] = `Basic ${Buffer.from(WP_GRAPHQL_TOKEN).toString('base64')}`;
  }

  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`WPGraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

const POST_FIELDS = `
  databaseId
  title
  slug
  excerpt
  content
  date
  status
  categories { nodes { name } }
  featuredImage { node { sourceUrl } }
`;

type WPPostNode = {
  databaseId: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  date?: string | null;
  status?: string | null;
  categories?: { nodes: { name: string }[] };
  featuredImage?: { node: { sourceUrl: string } } | null;
};

function mapWPPost(node: WPPostNode): Post {
  return {
    id: node.databaseId,
    title: node.title,
    slug: node.slug,
    excerpt: node.excerpt ?? null,
    content: node.content ?? null,
    published_at: node.date ?? null,
    status: node.status === 'publish' ? 'published' : node.status ?? null,
    category: node.categories?.nodes?.[0]?.name ?? null,
    featured_picture: node.featuredImage?.node?.sourceUrl ?? null,
  };
}

export async function fetchWPPosts(options: { first?: number; categorySlug?: string } = {}): Promise<Post[]> {
  const { first = 50, categorySlug } = options;

  const query = categorySlug
    ? `query Posts($first: Int!, $categorySlug: String!) { posts(first: $first, where: { categoryName: $categorySlug }) { nodes { ${POST_FIELDS} } } }`
    : `query Posts($first: Int!) { posts(first: $first) { nodes { ${POST_FIELDS} } } }`;

  const data = await wpFetch<{ posts: { nodes: WPPostNode[] } }>(
    query,
    categorySlug ? { first, categorySlug } : { first }
  );
  return data.posts.nodes.map(mapWPPost);
}

export async function fetchWPPostBySlug(slug: string): Promise<Post | null> {
  const data = await wpFetch<{ postBy: WPPostNode | null }>(
    `query PostBySlug($slug: String!) { postBy(slug: $slug) { ${POST_FIELDS} } }`,
    { slug }
  );
  return data.postBy ? mapWPPost(data.postBy) : null;
}

// Convention éditoriale WP pour la catégorie "on-parle-de-nous" :
// 1er paragraphe <em>Source : <strong>NOM</strong> — publié le ...</em>
// dernier paragraphe <p class="press-cta"><a href="URL_EXTERNE">...</a></p>
function extractPressMeta(content?: string | null): { source: string | null; url: string | null } {
  if (!content) return { source: null, url: null };
  const $ = cheerio.load(content);
  const source = $('p').first().find('strong').first().text().trim() || null;
  const url = $('p.press-cta a').first().attr('href') ?? null;
  return { source, url };
}

// .text() de cheerio décode les entités HTML (&rsquo; &#039; ...), contrairement à un strip regex brut
function extractPressBody(content?: string | null): string {
  if (!content) return '';
  const $ = cheerio.load(content);
  const parts: string[] = [];
  $('p, h1, h2, h3').each((_, el) => {
    const $el = $(el);
    if ($el.hasClass('press-cta')) return;
    const text = $el.text().trim();
    if (!text || /^Source\s*:/i.test(text)) return;
    parts.push(text);
  });
  return parts.join(' ');
}

export async function fetchWPPressArticles(categorySlug = 'on-parle-de-nous', first = 50): Promise<PressArticle[]> {
  const posts = await fetchWPPosts({ first, categorySlug });
  return posts.map((post) => {
    const { source, url } = extractPressMeta(post.content);
    const body = extractPressBody(post.content);
    return {
      id: post.id,
      title: post.title,
      source: source ?? '',
      publication_date: post.published_at ?? '',
      url: url ?? '#',
      image: post.featured_picture ?? null,
      extract: body.length > 220 ? `${body.slice(0, 220)}…` : body,
    };
  });
}
