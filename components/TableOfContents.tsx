"use client";

import { useEffect, useState } from 'react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents({ headings }: { headings: TOCItem[] }) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -66% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Offset for sticky header
                behavior: 'smooth'
            });
            setActiveId(id);
        }
    };

    if (headings.length === 0) return null;

    return (
        <nav className="toc-container">
            <h4 style={{ marginBottom: '15px', color: 'var(--color-blue)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Dans cet article
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: '2px solid #eee' }}>
                {headings.map((heading) => (
                    <li key={heading.id} style={{ marginBottom: '0' }}>
                        <a
                            href={`#${heading.id}`}
                            onClick={(e) => handleClick(e, heading.id)}
                            style={{
                                display: 'block',
                                padding: '8px 0 8px 15px',
                                fontSize: '0.9rem',
                                color: activeId === heading.id ? 'var(--color-blue)' : 'var(--color-gray)',
                                fontWeight: activeId === heading.id ? 'bold' : 'normal',
                                borderLeft: '2px solid',
                                borderLeftColor: activeId === heading.id ? 'var(--color-blue)' : 'transparent',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                marginLeft: heading.level === 3 ? '15px' : '-2px'
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>

            <style jsx>{`
                .toc-container {
                    position: sticky;
                    top: 100px; /* Offset from top */
                    max-height: calc(100vh - 120px);
                    overflow-y: auto;
                    padding-left: 20px;
                }
                
                @media (max-width: 1024px) {
                    .toc-container {
                        display: none;
                    }
                }
            `}</style>
        </nav>
    );
}
