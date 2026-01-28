export interface Post {
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
    featured?: boolean;
    gallery?: { src: string; alt?: string }[];
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
    category?: string | null;
    sort?: number | null;
}

export interface TeamMember {
    id: number;
    first_name: string;
    last_name: string;
    full_name?: string | null;
    role_title?: string | null;
    category?: string | null;
    sort?: number | null;
    image?: string | null;
}

export interface PressArticle {
    id: number;
    title: string;
    source: string;
    publication_date: string;
    url: string;
    image?: string | null;
    extract: string;
    status?: string;
    cta_label?: string;
}
