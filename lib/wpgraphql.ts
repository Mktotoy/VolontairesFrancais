import { Post } from './types';

const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_URL || 'https://espace.volontairesfrancais.fr/graphql';
const WP_GRAPHQL_TOKEN = process.env.WP_GRAPHQL_TOKEN;

async function wpFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (WP_GRAPHQL_TOKEN) {
    headers['Authorization'] = `Bearer ${WP_GRAPHQL_TOKEN}`;
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
