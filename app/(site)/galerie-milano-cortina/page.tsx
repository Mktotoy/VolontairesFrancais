import GalleryFolders from '@/components/GalleryFolders';

export const metadata = {
    title: 'Galerie Photos - Milano Cortina 2026 | Volontaires français',
    description: 'Retrouvez toutes les photos de nos volontaires français aux Jeux Olympiques et Paralympiques d\'hiver Milano Cortina 2026, par événement et par lieu.',
    openGraph: {
        title: 'Galerie Photos - Milano Cortina 2026 | Volontaires français',
        description: 'Les photos de nos volontaires français sur le terrain à Milan, Cortina et Anterselva.',
        type: 'website',
        locale: 'fr_FR',
        siteName: 'Volontaires français',
        url: 'https://volontairesfrancais.fr/galerie-milano-cortina',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Galerie Photos Milano Cortina 2026 | Volontaires français',
        description: 'Les photos de nos volontaires sur le terrain aux JO d\'hiver 2026.',
    },
};

export default function GalleryPage() {
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">Galerie Photos - Milano Cortina 2026</h1>
                    <p className="page-subtitle">Retour en images sur l&apos;aventure des volontaires</p>
                </div>
            </section>

            <GalleryFolders />
        </>
    );
}
