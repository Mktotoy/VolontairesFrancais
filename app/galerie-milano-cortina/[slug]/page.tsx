"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import GalleryLightbox from '@/components/GalleryLightbox';

interface Photo {
    name: string;
    path: string;
    url: string;
}

export default function EventGalleryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver>(null);

    const PHOTOS_PER_PAGE = 12;

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/photos?folder=${encodeURIComponent(slug)}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setPhotos(data);
                // For simplicity in this demo, we load all and "paginate" locally for lazy load effect
                // In a real large-scale app, we would add limit/offset to the API
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to fetch photos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) fetchPhotos();
    }, [slug]);

    // Format slug for title (e.g., milan -> Milano)
    const title = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : '';

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">{title} - Milano Cortina 2026</h1>
                    <p className="page-subtitle">Photos des volontaires à {title}</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div style={{ marginBottom: '40px' }}>
                        <Link href="/galerie-milano-cortina" className="btn-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                            <i className="fas fa-arrow-left"></i> Retour à la galerie principale
                        </Link>
                    </div>

                    {loading && photos.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <i className="fas fa-spinner fa-spin fa-2x"></i>
                            <p>Chargement des souvenirs...</p>
                        </div>
                    ) : photos.length === 0 ? (
                        <p>Aucune photo pour cet événement pour le moment.</p>
                    ) : (
                        <div className="gallery-section">
                            {/* We use GalleryLightbox but we want lazy loading for the images inside it */}
                            <GalleryLightbox images={photos.map(p => p.url)} />
                        </div>
                    )}
                </div>
            </section>

            <style jsx>{`
                .gallery-section {
                    margin-top: 2rem;
                }
            `}</style>
        </>
    );
}
