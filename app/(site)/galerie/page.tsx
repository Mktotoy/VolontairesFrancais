import Gallery from '@/components/Gallery';

export default function GaleriePage() {
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">Galerie Photos</h1>
                    <p className="page-subtitle">
                        Nos souvenirs olympiques et paralympiques
                    </p>
                </div>
            </section>

            <section className="gallery">
                <div className="container">
                    <Gallery />

                    <div className="gallery-info">
                        <p>
                            <i className="fas fa-info-circle"></i> Cette galerie
                            sera enrichie avec de nouvelles photos de nos
                            événements et activités. Restez connectés !
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
