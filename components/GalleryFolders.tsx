"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Folder {
    name: string;
    previewUrl: string | null;
}

export default function GalleryFolders() {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFolders = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/photos?mode=folders');
            const data = await res.json();
            if (Array.isArray(data)) {
                setFolders(data);
            }
        } catch (error) {
            console.error('Failed to fetch folders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    return (
        <section className="section-padding">
            <div className="container">
                <div style={{ marginBottom: '60px' }}>
                    <Link href="/milano-cortina" className="btn-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
                        <i className="fas fa-arrow-left"></i> Retour à la page Milano Cortina
                    </Link>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                        Retrouvez ici les photos partagées par les membres de l'association présents sur les différents sites des Jeux Olympiques et Paralympiques de Milan-Cortina 2026.
                        Choisissez un événement pour voir les photos :
                    </p>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <i className="fas fa-spinner fa-spin fa-2x"></i>
                    </div>
                ) : folders.length === 0 ? (
                    <div className="empty-state" style={{ textAlign: 'center', padding: '3rem', background: '#f8f9fa', borderRadius: '15px', margin: '20px 0' }}>
                        <i className="fas fa-folder-open fa-3x" style={{ color: '#dee2e6', marginBottom: '1rem' }}></i>
                        <p>Aucun dossier d'événement trouvé dans le stockage.</p>
                    </div>
                ) : (
                    <div className="event-grid">
                        {folders.map((folder) => (
                            <Link
                                key={folder.name}
                                href={`/galerie-milano-cortina/${folder.name}`}
                                className="event-card"
                            >
                                <div className="event-preview">
                                    {folder.previewUrl ? (
                                        <img src={folder.previewUrl} alt={folder.name} loading="lazy" />
                                    ) : (
                                        <div className="event-icon">
                                            <i className="fas fa-camera-retro"></i>
                                        </div>
                                    )}
                                </div>
                                <div className="event-info">
                                    <h3>{folder.name.charAt(0).toUpperCase() + folder.name.slice(1)}</h3>
                                </div>
                                <div className="event-arrow">
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .event-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 30px;
                    margin: 20px 0;
                }
                .event-card {
                    display: flex;
                    flex-direction: column;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    text-decoration: none;
                    color: inherit;
                    transition: all 0.3s ease;
                    border: 1px solid #eee;
                    overflow: hidden;
                }
                .event-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 30px rgba(0,0,0,0.12);
                    border-color: var(--color-blue);
                }
                .event-preview {
                    width: 100%;
                    height: 200px;
                    background: #f8f9fa;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    border-bottom: 1px solid #eee;
                }
                .event-preview img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .event-icon {
                    font-size: 2.5rem;
                    color: #007bff;
                }
                .event-info {
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .event-info h3 {
                    margin: 0 0 5px 0;
                    font-size: 1.25rem;
                    color: #333;
                }
                .event-info p {
                    margin: 0;
                    font-size: 0.9rem;
                    color: #666;
                }
                .event-arrow {
                    color: #ccc;
                    transition: color 0.3s;
                }
                .event-card:hover .event-arrow {
                    color: #007bff;
                }
            `}</style>
        </section>
    );
}
