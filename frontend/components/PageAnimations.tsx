"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageAnimations() {
    const pathname = usePathname();

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    (entry.target as HTMLElement).style.opacity = '1';
                    (entry.target as HTMLElement).style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.mission-card, .team-card, .benefit-card, .news-article, .gallery-item');
        animatedElements.forEach(el => {
            (el as HTMLElement).style.opacity = '0';
            (el as HTMLElement).style.transform = 'translateY(30px)';
            (el as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        return () => {
            animatedElements.forEach(el => observer.unobserve(el));
            observer.disconnect();
        };
    }, [pathname]); // Re-run when pathname changes

    return null;
}
