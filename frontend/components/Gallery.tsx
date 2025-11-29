"use client";

import { useState } from 'react';

interface GalleryItem {
    category: string;
    caption: string;
    image?: string; // Placeholder for now, as we don't have real images
}

export default function Gallery() {
    const [filter, setFilter] = useState('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<GalleryItem | null>(null);

    const items: GalleryItem[] = [
        { category: 'paris2024', caption: 'Volontaires Paris 2024' },
        { category: 'paris2024', caption: "Cérémonie d'ouverture" },
        { category: 'evenements', caption: 'Événement communautaire' },
        { category: 'equipe', caption: 'Équipe Volontaires français' },
        { category: 'paris2024', caption: 'Jeux Paralympiques' },
        { category: 'evenements', caption: 'Rencontre des volontaires' },
        { category: 'paris2024', caption: 'Stade olympique' },
        { category: 'equipe', caption: "Conseil d'administration" },
    ];

    const filteredItems = filter === 'all'
        ? items
        : items.filter(item => item.category === filter);

    const openLightbox = (item: GalleryItem) => {
        setCurrentImage(item);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setCurrentImage(null);
    };

    return (
        <>
            <div className="gallery-filters">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Toutes
                </button>
                <button
                    className={`filter-btn ${filter === 'paris2024' ? 'active' : ''}`}
                    onClick={() => setFilter('paris2024')}
                >
                    Paris 2024
                </button>
                <button
                    className={`filter-btn ${filter === 'evenements' ? 'active' : ''}`}
                    onClick={() => setFilter('evenements')}
                >
                    Événements
                </button>
                <button
                    className={`filter-btn ${filter === 'equipe' ? 'active' : ''}`}
                    onClick={() => setFilter('equipe')}
                >
                    Équipe
                </button>
            </div>

            <div className="gallery-grid" id="galleryGrid">
                {filteredItems.map((item, index) => (
                    <div
                        key={index}
                        className="gallery-item"
                        onClick={() => openLightbox(item)}
                    >
                        <div className="gallery-image">
                            <i className="fas fa-image"></i>
                            <div className="gallery-overlay">
                                <i className="fas fa-search-plus"></i>
                            </div>
                        </div>
                        <p className="gallery-caption">{item.caption}</p>
                    </div>
                ))}
            </div>

            {lightboxOpen && currentImage && (
                <div className="lightbox active" id="lightbox">
                    <button className="lightbox-close" onClick={closeLightbox}>
                        <i className="fas fa-times"></i>
                    </button>
                    {/* Navigation buttons could be added here */}
                    <div className="lightbox-content">
                        {/* Placeholder for image */}
                        <div style={{ width: '100%', height: '300px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fas fa-image fa-3x"></i>
                        </div>
                        <p id="lightboxCaption">{currentImage.caption}</p>
                    </div>
                </div>
            )}
        </>
    );
}
