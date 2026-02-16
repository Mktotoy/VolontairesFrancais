"use client";

import { useState, useEffect } from 'react';

interface Photo {
    name: string;
    path: string;
    url: string;
}

export default function Gallery() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/photos');
            const data = await res.json();
            if (Array.isArray(data)) {
                setPhotos(data);
            }
        } catch (error) {
            console.error('Failed to fetch photos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/photos', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                await fetchPhotos();
            } else {
                alert('Erreur lors du téléchargement');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Erreur lors du téléchargement');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (e: React.MouseEvent, filename: string) => {
        e.stopPropagation();
        if (!confirm('Voulez-vous vraiment supprimer cette photo ?')) return;

        try {
            const res = await fetch(`/api/photos/${encodeURIComponent(filename)}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                await fetchPhotos();
                if (currentPhoto?.name === filename) {
                    closeLightbox();
                }
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const openLightbox = (photo: Photo) => {
        setCurrentPhoto(photo);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setCurrentPhoto(null);
    };

    return (
        <>
            <div className="gallery-header-actions" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <label className="upload-btn" style={{
                    cursor: 'pointer',
                    padding: '10px 20px',
                    background: '#007bff',
                    color: 'white',
                    borderRadius: '5px',
                    display: 'inline-block',
                    opacity: uploading ? 0.7 : 1
                }}>
                    <i className={`fas ${uploading ? 'fa-spinner fa-spin' : 'fa-upload'}`} style={{ marginRight: '10px' }}></i>
                    {uploading ? 'Téléchargement...' : 'Ajouter une photo'}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        style={{ display: 'none' }}
                        disabled={uploading}
                    />
                </label>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <i className="fas fa-spinner fa-spin fa-2x"></i>
                    <p>Chargement des photos...</p>
                </div>
            ) : photos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: '#f8f9fa', borderRadius: '10px' }}>
                    <i className="fas fa-images fa-3x" style={{ color: '#dee2e6', marginBottom: '1rem' }}></i>
                    <p>Aucune photo dans la galerie pour le moment.</p>
                </div>
            ) : (
                <div className="gallery-grid">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            className="gallery-item"
                            onClick={() => openLightbox(photo)}
                        >
                            <img src={photo.url} alt={photo.name} loading="lazy" />
                            <div className="gallery-overlay">
                                <i className="fas fa-search-plus"></i>
                                <button
                                    className="delete-btn"
                                    onClick={(e) => handleDelete(e, photo.name)}
                                    title="Supprimer"
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        background: 'rgba(255,0,0,0.7)',
                                        border: 'none',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                            <p className="gallery-caption">{photo.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {lightboxOpen && currentPhoto && (
                <div className="lightbox active" id="lightbox" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>
                        <i className="fas fa-times"></i>
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={currentPhoto.url} alt={currentPhoto.name} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                        <p id="lightboxCaption">{currentPhoto.name}</p>
                    </div>
                </div>
            )}

            <style jsx>{`
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                }
                .gallery-item {
                    position: relative;
                    border-radius: 8px;
                    overflow: hidden;
                    cursor: pointer;
                    background: #eee;
                    aspect-ratio: 1;
                }
                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s;
                }
                .gallery-item:hover img {
                    transform: scale(1.05);
                }
                .gallery-overlay {
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
                .gallery-item:hover .gallery-overlay {
                    opacity: 1;
                }
                .gallery-overlay > i {
                    color: white;
                    font-size: 2rem;
                }
                .gallery-caption {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 10px;
                    background: rgba(0,0,0,0.6);
                    color: white;
                    margin: 0;
                    font-size: 0.8rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s;
                }
                .lightbox.active {
                    opacity: 1;
                    pointer-events: auto;
                }
                .lightbox-content {
                    text-align: center;
                    color: white;
                }
                .lightbox-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
}
