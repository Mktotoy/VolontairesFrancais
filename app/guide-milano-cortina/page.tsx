import Link from 'next/link';
import { fetchGuideArticles } from '@/lib/data';

export const metadata = {
    title: 'Guide des Volontaires - Milano Cortina 2026 | Volontaires français',
    description: 'Bienvenue dans la communauté des Volontaires français pour Milano Cortina 2026.',
};


export default async function GuidePage() {
    const downloadUrl = "https://483982b4-b69f-41eb-8217-e6037c2697c9-00-1816fkz78n2lg.janeway.replit.dev:3000/docs/Guide%20des%20Volontaires%20fran%C3%A7ais.pdf";
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
                    <div className="guide-intro-grid">
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
