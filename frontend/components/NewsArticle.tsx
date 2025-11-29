"use client";

import { useState } from 'react';

interface NewsArticleProps {
    title: string;
    date: string;
    preview: string;
    fullContent: React.ReactNode;
    image?: string;
    imageAlt?: string;
}

export default function NewsArticle({ title, date, preview, fullContent, image, imageAlt }: NewsArticleProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <article className="news-article">
            <div className="article-header">
                <h2 className="article-title">{title}</h2>
                <p className="article-date">
                    <i className="far fa-calendar"></i> {date}
                </p>
            </div>
            <div className="article-content">
                {image && (
                    <div className="article-image">
                        <img
                            src={image}
                            alt={imageAlt || title}
                            style={{
                                width: '100%',
                                borderRadius: '8px',
                                marginBottom: '20px',
                            }}
                        />
                    </div>
                )}
                <div className="article-preview">
                    <div dangerouslySetInnerHTML={{ __html: preview }} />
                </div>

                {isExpanded && (
                    <div className="article-full">
                        {fullContent}
                    </div>
                )}

                <button
                    className="btn-read-more"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Lire moins' : 'Lire plus'} <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                </button>
            </div>
        </article>
    );
}
