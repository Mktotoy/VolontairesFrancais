import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata = {
    title: 'Galerie Photos - Milano Cortina 2026 | Volontaires français',
    description: 'Découvrez les photos des volontaires français sur le terrain à Milan, Cortina et Anterselva.',
};

// Function to get images from a directory
function getImages(dirName: string) {
    const dirPath = path.join(process.cwd(), 'public', 'assets', 'milano-cortina-photos', dirName);
    try {
        const files = fs.readdirSync(dirPath);
        return files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)).map(file => `/assets/milano-cortina-photos/${dirName}/${file}`);
    } catch (error) {
        console.warn(`Could not read directory ${dirName}:`, error);
        return [];
    }
}

import GalleryLightbox from '@/components/GalleryLightbox';

export default function GalleryPage() {
    const cortinaImages = getImages('cortina');
    const milanImages = getImages('milan');
    const anterselvaImages = getImages('anterselva');

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">Galerie Photos - Milano Cortina 2026</h1>
                    <p className="page-subtitle">Retour en images sur l'aventure des volontaires</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div style={{ marginBottom: '60px' }}>
                        <Link href="/milano-cortina" className="btn-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
                            <i className="fas fa-arrow-left"></i> Retour à la page Milano Cortina
                        </Link>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                            Retrouvez ici les photos partagées par les membres de l'association présents sur les différents sites des Jeux Olympiques et Paralympiques de Milan-Cortina 2026.
                            <br />
                            <em style={{ fontSize: '0.9rem', color: '#666' }}>(Cliquez sur une photo pour l'agrandir)</em>
                        </p>
                    </div>

                    {/* Cortina Section */}
                    {cortinaImages.length > 0 && (
                        <div style={{ marginBottom: '80px' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '2px solid var(--color-blue)', paddingBottom: '10px', display: 'inline-block' }}>
                                🏔️ Cortina d'Ampezzo
                            </h2>
                            <GalleryLightbox images={cortinaImages} />
                        </div>
                    )}

                    {/* Milan Section */}
                    {milanImages.length > 0 && (
                        <div style={{ marginBottom: '80px' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '2px solid var(--color-blue)', paddingBottom: '10px', display: 'inline-block' }}>
                                🏙️ Milano
                            </h2>
                            <GalleryLightbox images={milanImages} />
                        </div>
                    )}

                    {/* Anterselva Section */}
                    {anterselvaImages.length > 0 && (
                        <div style={{ marginBottom: '80px' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '2px solid var(--color-blue)', paddingBottom: '10px', display: 'inline-block' }}>
                                🎯 Anterselva / Antholz
                            </h2>
                            <GalleryLightbox images={anterselvaImages} />
                        </div>
                    )}

                    {cortinaImages.length === 0 && milanImages.length === 0 && anterselvaImages.length === 0 && (
                        <p>Aucune photo pour le moment.</p>
                    )}
                </div>
            </section>
        </>
    );
}
