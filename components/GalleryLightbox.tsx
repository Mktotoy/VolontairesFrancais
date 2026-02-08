'use client';

import { useState, useEffect } from 'react';

interface GalleryLightboxProps {
    images: string[];
}

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedImageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedImageIndex]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex]);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
    };

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev! + 1) % images.length);
        }
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev! - 1 + images.length) % images.length);
        }
    };

    return (
        <>
            <div className="gallery-grid">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="gallery-item"
                        onClick={() => openLightbox(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                openLightbox(index);
                            }
                        }}
                    >
                        <img src={src} alt={`Photo ${index + 1}`} loading="lazy" />
                        <div className="overlay">
                            <i className="fas fa-search-plus"></i>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImageIndex !== null && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="close-btn" onClick={closeLightbox}>
                        <i className="fas fa-times"></i>
                    </button>

                    <button className="nav-btn prev-btn" onClick={prevImage}>
                        <i className="fas fa-chevron-left"></i>
                    </button>

                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={images[selectedImageIndex]}
                            alt={`Full size ${selectedImageIndex + 1}`}
                        />
                    </div>

                    <button className="nav-btn next-btn" onClick={nextImage}>
                        <i className="fas fa-chevron-right"></i>
                    </button>

                    <div className="counter">
                        {selectedImageIndex + 1} / {images.length}
                    </div>
                </div>
            )}

            <style jsx>{`
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 20px;
                }
                
                .gallery-item {
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                    height: 250px;
                    cursor: pointer;
                    position: relative;
                }
                
                .gallery-item:hover {
                    transform: translateY(-5px);
                }
                
                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .gallery-item .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.3);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .gallery-item:hover .overlay {
                    opacity: 1;
                }

                .gallery-item .overlay i {
                    color: white;
                    font-size: 2rem;
                }

                .lightbox-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 10000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .lightbox-content {
                    max-width: 90%;
                    max-height: 90%;
                    position: relative;
                }

                .lightbox-content img {
                    max-width: 100%;
                    max-height: 90vh;
                    object-fit: contain;
                    border-radius: 4px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.5);
                }

                .close-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    z-index: 10001;
                    padding: 10px;
                }

                .nav-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: white;
                    font-size: 2rem;
                    padding: 20px 15px;
                    cursor: pointer;
                    transition: background 0.3s;
                    z-index: 10001;
                }

                .nav-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .prev-btn {
                    left: 20px;
                    border-radius: 0 4px 4px 0;
                }

                .next-btn {
                    right: 20px;
                    border-radius: 4px 0 0 4px;
                }

                .counter {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    color: white;
                    background: rgba(0, 0, 0, 0.5);
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .nav-btn {
                        padding: 10px;
                        font-size: 1.5rem;
                    }
                    .prev-btn { left: 10px; }
                    .next-btn { right: 10px; }
                }
            `}</style>
        </>
    );
}
