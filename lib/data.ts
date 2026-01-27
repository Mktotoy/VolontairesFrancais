import fs from 'fs/promises';
import path from 'path';
import { Post, Faq, TeamMember, PressArticle } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const GUIDE_DIR = path.join(CONTENT_DIR, 'guide');

async function readJson<T>(filename: string): Promise<T[]> {
    try {
        const filePath = path.join(CONTENT_DIR, filename);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as T[];
    } catch (error) {
        console.warn(`Failed to read ${filename}:`, error);
        return [];
    }
}

import matter from 'gray-matter';

export async function fetchGuideArticles(): Promise<Post[]> {
    try {
        const files = await fs.readdir(GUIDE_DIR);
        const articles = await Promise.all(
            files.filter(f => f.endsWith('.md')).map(async (file) => {
                const content = await fs.readFile(path.join(GUIDE_DIR, file), 'utf-8');
                const { data, content: markdownBody } = matter(content);
                return {
                    ...data,
                    content: markdownBody,
                    slug: file.replace('.md', ''),
                    // Ensure required fields for Post type
                    id: data.id || Math.random(), // fallback
                    published_at: data.published_at || new Date().toISOString(),
                    featured: false
                } as Post;
            })
        );
        return articles;
    } catch (e) {
        console.warn('Failed to fetch guide articles', e);
        return [];
    }
}

export async function fetchPosts(): Promise<Post[]> {
    try {
        const files = await fs.readdir(POSTS_DIR);
        const posts = await Promise.all(
            files.filter(f => f.endsWith('.md')).map(async (file) => {
                const content = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
                const { data } = matter(content);
                return { ...data, slug: file.replace('.md', '') } as Post;
            })
        );
        return posts
            .filter(p => p.status === 'published')
            .sort((a, b) => {
                const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
                const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
                return dateB - dateA;
            });
    } catch (e) {
        console.warn('Failed to fetch posts from directory', e);
        return [];
    }
}

export async function fetchLatestPosts(limit: number = 3): Promise<Post[]> {
    const posts = await fetchPosts();
    return posts.filter(p => p.featured === true).slice(0, limit);
}

export async function fetchPost(slug: string): Promise<Post | null> {
    try {
        // Try finding in posts first
        let filePath = path.join(POSTS_DIR, `${slug}.md`);
        let fileContent;

        try {
            fileContent = await fs.readFile(filePath, 'utf-8');
        } catch {
            // If not found, try guide directory
            filePath = path.join(GUIDE_DIR, `${slug}.md`);
            fileContent = await fs.readFile(filePath, 'utf-8');
        }

        const { data, content } = matter(fileContent);

        const post = { ...data, content, slug } as Post;

        if (post.status !== 'published') return null;
        return post;
    } catch {
        return null;
    }
}

export async function fetchFaqs(): Promise<Faq[]> {
    const faqs = await readJson<Faq>('faq.json');
    return faqs.sort((a, b) => {
        // Sort by 'sort' field, then by question
        if ((a.sort || 0) !== (b.sort || 0)) {
            return (a.sort || 0) - (b.sort || 0);
        }
        return a.question.localeCompare(b.question);
    });
}

export async function fetchTeam(): Promise<TeamMember[]> {
    const members = await readJson<TeamMember>('team.json');
    return members.sort((a, b) => {
        // Sort by 'sort', then last_name, then first_name
        if ((a.sort || 0) !== (b.sort || 0)) {
            return (a.sort || 0) - (b.sort || 0);
        }
        if (a.last_name !== b.last_name) {
            return a.last_name.localeCompare(b.last_name);
        }
        return a.first_name.localeCompare(b.first_name);
    });
}

const PRESS_DIR = path.join(CONTENT_DIR, 'press');

export async function fetchPressArticles(): Promise<PressArticle[]> {
    try {
        const files = await fs.readdir(PRESS_DIR);
        const articles = await Promise.all(
            files.filter(f => f.endsWith('.md')).map(async (file) => {
                const content = await fs.readFile(path.join(PRESS_DIR, file), 'utf-8');
                const { data, content: markdownBody } = matter(content);
                return {
                    ...data,
                    extract: markdownBody.trim()
                } as PressArticle;
            })
        );
        return articles
            .filter(a => a.status === 'published')
            .sort((a, b) => {
                const dateA = a.publication_date ? new Date(a.publication_date).getTime() : 0;
                const dateB = b.publication_date ? new Date(b.publication_date).getTime() : 0;
                return dateB - dateA;
            });
    } catch (e) {
        console.warn('Failed to fetch press articles', e);
        return [];
    }
}
