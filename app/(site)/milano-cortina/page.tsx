import Link from 'next/link';
import { fetchGuideArticles } from '@/lib/data';

export const metadata = {
    title: 'Milano Cortina 2026 - Guide des Volontaires | Volontaires français',
    description: 'Guide complet pour les volontaires français aux Jeux Olympiques d\'hiver Milano Cortina 2026 : conseils pratiques, ressources et téléchargement du guide PDF.',
    openGraph: {
        title: 'Milano Cortina 2026 - Guide des Volontaires | Volontaires français',
        description: 'Guide complet pour les volontaires français aux JO d\'hiver 2026.',
        type: 'website',
        locale: 'fr_FR',
        siteName: 'Volontaires français',
        url: 'https://volontairesfrancais.fr/milano-cortina',
    },
    twitter: {
        card: 'summary',
        title: 'Milano Cortina 2026 | Volontaires français',
        description: 'Guide et ressources pour les volontaires français aux JO d\'hiver 2026.',
    },
};


export default async function GuidePage() {
    const downloadUrl = "/docs/Guide%20des%20Volontaires%20fran%C3%A7ais.pdf";
    const guideArticles = await fetchGuideArticles();

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">Milano Cortina 2026</h1>
                    <p className="page-subtitle">Le guide et les ressources pour les volontaires</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    {/* Intro Section - 2 Columns */}

                    {/* Gallery Promo Card - TOP OF PAGE */}
                    <div className="promo-section" style={{ margin: '40px 0 80px 0', padding: '30px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderRadius: '15px', color: 'white', textAlign: 'center', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>📸 Galerie Photos Souvenirs</h2>
                        <p style={{ fontSize: '1.2rem', marginBottom: '25px', maxWidth: '800px', margin: '0 auto 25px auto', lineHeight: '1.6' }}>
                            Retrouvez les photos de nos membres sur le terrain à Milan, Cortina et Anterselva !
                        </p>
                        <Link href="/galerie-milano-cortina" className="btn-primary" style={{ backgroundColor: 'white', color: '#2563eb', border: 'none', fontWeight: 'bold' }}>
                            Voir la galerie photos
                        </Link>
                    </div>

                    {/* YouTube Short Section */}
                    <div className="video-section" style={{ marginBottom: '80px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', color: 'var(--color-blue)' }}>Des nouvelles du terrain ! 🎥</h2>
                        <div style={{ maxWidth: '350px', margin: '0 auto', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                            <div style={{ position: 'relative', paddingTop: '177.77%' }}>
                                <iframe
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    src="https://www.youtube.com/embed/NZGmdQsGZDk"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    <div className="guide-intro-grid" style={{ marginBottom: '80px', marginTop: '40px' }}>
                        <div className="guide-intro-content">
                            <p style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--color-blue)' }}>
                                <strong>Chère volontaire, cher volontaire,</strong>
                            </p>
                            <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                                C’est avec une immense joie, et une grande fierté, que nous t’accueillons au sein de la communauté des Volontaires français pour les Jeux Olympiques et Paralympiques d’hiver Milano Cortina 2026.
                            </p>
                            <p style={{ marginBottom: '30px', lineHeight: '1.8' }}>
                                Ce guide a été pensé pour t’accompagner à chaque étape. Tu y trouveras de nombreuses informations pratiques pour t’aider à vivre cette expérience dans les meilleures conditions possibles.
                            </p>

                            <a href={downloadUrl} className="btn-primary" download target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                                <i className="fas fa-file-pdf"></i>
                                Télécharger le guide complet
                            </a>
                        </div>

                        <div className="guide-intro-image">
                            <img
                                src="/images/guide-highlight.jpg"
                                alt="Volontaires français Milano Cortina 2026"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '15px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    display: 'block'
                                }}
                            />
                        </div>
                    </div>



                    {/* New Article Promo Section */}
                    <div className="promo-section" style={{ marginBottom: '80px', padding: '30px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '15px', color: 'white', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>🇮🇹 En direct du terrain, les premiers éclaireurs sont là !</h2>
                        <p style={{ fontSize: '1.2rem', marginBottom: '25px', maxWidth: '800px', margin: '0 auto 25px auto', lineHeight: '1.6' }}>
                            Pendant que certains bouclent leurs valises, d'autres sont déjà à pied d'œuvre ! <br />
                            Découvrez les premiers retours et photos de nos volontaires déjà sur site. 🚀
                        </p>
                        <Link href="/actu/en-direct-du-terrain-premiers-eclaireurs" className="btn-primary" style={{ backgroundColor: 'white', color: '#059669', border: 'none', fontWeight: 'bold' }}>
                            Lire l'article
                        </Link>
                    </div>

                    {/* Guide Articles Grid - HIDDEN FOR NOW
                    <div style={{ marginTop: '80px' }}>
                        <h2 className="section-title text-center" style={{ marginBottom: '40px' }}>Les articles du guide</h2>
                        <div className="guide-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                            {guideArticles.map((article) => (
                                <Link href={`/guide-milano-cortina/${article.slug}`} key={article.slug} className="post-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="post-content" style={{ padding: '25px' }}>
                                        <h3 className="post-title" style={{ marginTop: 0, fontSize: '1.4rem' }}>{article.title}</h3>
                                        <p className="post-excerpt" style={{ marginBottom: '20px', color: '#666' }}>{article.excerpt}</p>
                                        <span style={{ color: 'var(--primary-color)', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                            Lire l'article <i className="fas fa-arrow-right" style={{ marginLeft: '8px', fontSize: '0.9rem' }}></i>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    */}
                </div>
            </section>

            <style>{`
                .guide-intro-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 40px;
                    align-items: center;
                }

                @media (min-width: 968px) {
                    .guide-intro-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 60px;
                    }
                    .guide-intro-content {
                        order: 1;
                    }
                    .guide-intro-image {
                        order: 2;
                    }
                }
                
                @media (max-width: 967px) {
                    .guide-intro-image {
                        margin-bottom: 30px;
                        order: 1;
                    }
                    .guide-intro-content {
                        order: 2;
                    }
                }
            `}</style>
        </>
    );
}
