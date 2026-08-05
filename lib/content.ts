import { marked } from 'marked';
import { Post, PressArticle } from './types';
import { fetchPosts, fetchPost, fetchPressArticles } from './data';
import { fetchWPPosts, fetchWPPostBySlug, fetchWPPressArticles } from './wpgraphql';

// Facade unique consommee par les pages : bascule entre l'ancienne source (markdown
// local, content/posts/*.md) et WordPress via WPGraphQL, pilotee par un flag.
//
// Desactive par defaut (les articles ne sont pas encore prets cote WordPress). Pour
// activer une fois prets, ajouter le secret Replit ENABLE_WPGRAPHQL=true (workspace ET
// Deployment > Secrets pour que la prod le prenne aussi), puis republier. Aucun
// changement de code necessaire pour l'activation.
const WPGRAPHQL_ENABLED = process.env.ENABLE_WPGRAPHQL === 'true';

export const isWPGraphQLEnabled = WPGRAPHQL_ENABLED;

export async function getActualitesPosts(): Promise<Post[]> {
  if (WPGRAPHQL_ENABLED) {
    return fetchWPPosts({ categorySlug: 'actualites' });
  }
  return fetchPosts();
}

export async function getActualitePostBySlug(slug: string): Promise<Post | null> {
  if (WPGRAPHQL_ENABLED) {
    return fetchWPPostBySlug(slug);
  }
  const post = await fetchPost(slug);
  if (!post) return null;
  // Source markdown : contenu brut, rendu en HTML ici (meme comportement que la prod
  // actuelle sur main) pour que ArticleBody recoive du HTML quelle que soit la source.
  const html = post.content ? await marked.parse(post.content, { breaks: true }) : '';
  return { ...post, content: html as string };
}

export async function getPressArticles(): Promise<PressArticle[]> {
  if (WPGRAPHQL_ENABLED) {
    return fetchWPPressArticles();
  }
  return fetchPressArticles();
}
