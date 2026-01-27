
import Link from 'next/link';

export const metadata = {
    title: 'Tout savoir sur le bénévolat aux Jeux Olympiques | Volontaires français',
    description: 'Devenir bénévole pour les JO : conseils, inscription, missions. Rejoignez la communauté des Volontaires français pour Milano Cortina 2026.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function LandingBenevolatPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero" style={{ padding: '80px 0', background: 'linear-gradient(135deg, var(--color-blue), var(--color-dark))', color: 'white' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Devenir volontaire aux Jeux Olympiques</h1>
                    <p style={{ fontSize: '1.4rem', maxWidth: '800px', margin: '0 auto 40px auto', opacity: '0.9' }}>
                        Vous rêvez de participer à l'aventure olympique ? De Paris 2024 à Milano Cortina 2026, découvrez comment rejoindre la grande famille des volontaires.
                    </p>
                    <Link href="/adhesion" className="btn-primary btn-large">
                        Rejoindre l'association maintenant
                    </Link>
                    <p style={{ marginTop: '15px', fontSize: '0.9rem', opacity: '0.8' }}>Rejoignez le réseau des experts du bénévolat olympique</p>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="landing-grid">
                        <div className="landing-text">
                            <h2 className="section-title" style={{ textAlign: 'left' }}>Pourquoi s'engager ?</h2>
                            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                                Les inscriptions pour les bénévoles des JO (comme Paris 2024 ou Milano Cortina 2026) attirent des milliers de candidats. C'est une expérience unique, mais la sélection est rude.
                            </p>
                            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                                <strong>L'Association Volontaires français</strong> est née de cette passion. Créée par des volontaires de Paris 2024, elle rassemble ceux qui veulent :
                            </p>
                            <ul style={{ listStyle: 'none', marginLeft: '0' }}>
                                <li style={{ marginBottom: '15px', paddingLeft: '30px', position: 'relative' }}>
                                    <i className="fas fa-check" style={{ position: 'absolute', left: 0, top: '5px', color: 'var(--color-green)' }}></i>
                                    <strong>Perpétuer l'aventure</strong> : Garder contact avec la communauté olympique.
                                </li>
                                <li style={{ marginBottom: '15px', paddingLeft: '30px', position: 'relative' }}>
                                    <i className="fas fa-check" style={{ position: 'absolute', left: 0, top: '5px', color: 'var(--color-green)' }}></i>
                                    <strong>Accéder aux infos</strong> : Conseils exclusifs pour les candidatures (Milano Cortina, Alpes 2030...).
                                </li>
                                <li style={{ marginBottom: '15px', paddingLeft: '30px', position: 'relative' }}>
                                    <i className="fas fa-check" style={{ position: 'absolute', left: 0, top: '5px', color: 'var(--color-green)' }}></i>
                                    <strong>Se former</strong> : Echanger sur les bonnes pratiques du volontariat sportif.
                                </li>
                            </ul>
                        </div>
                        <div className="landing-image" style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                            <img src="/images/visio-milano-cortina-2026.jpg" alt="Communauté Volontaires français" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 className="section-title">Questions Fréquentes sur le Bénévolat JO</h2>

                    <div className="faq-item" style={{ marginBottom: '30px', background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'var(--color-dark)' }}>Est-ce que les bénévoles des Jeux Olympiques sont payés ?</h3>
                        <p>Non, par définition, une mission de volontaire ou de bénévole n'est pas rémunérée. Cependant, l'organisation prend généralement en charge les repas pendant les missions et les transports locaux. L'hébergement et le voyage restent souvent à la charge du volontaire, d'où l'importance de l'entraide (covoiturage, colocation) que nous favorisons dans l'association.</p>
                    </div>

                    <div className="faq-item" style={{ marginBottom: '30px', background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'var(--color-dark)' }}>Quelles sont les conditions pour candidater ?</h3>
                        <p>Il faut généralement avoir 18 ans au 1er janvier de l'année des Jeux, parler anglais et/ou la langue du pays hôte, et être disponible sur une période minimale (souvent 10 jours). Pour Milano Cortina 2026, la communauté <strong>Volontaires français</strong> vous aide à préparer votre dossier.</p>
                    </div>

                    <div className="faq-item" style={{ marginBottom: '30px', background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'var(--color-dark)' }}>Quelles sont les associations qui recherchent des bénévoles ?</h3>
                        <p>Au-delà des JO, de nombreuses structures sportives cherchent de l'aide. Notre réseau est connecté avec le mouvement sportif français et peut relayer des opportunités. Rejoindre notre association, c'est intégrer un vivier de compétences reconnu.</p>
                    </div>

                </div>
            </section>

            {/* CTA Final */}
            <section className="section-padding text-center">
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Prêt à rejoindre l'aventure ?</h2>
                    <p style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto 40px', color: '#666' }}>
                        Ne restez pas seul face à votre candidature. Rejoignez la première communauté de volontaires francophones pour les grands événements sportifs.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/adhesion" className="btn-primary btn-large">
                            J'adhère à l'association
                        </Link>
                        <Link href="/guide-milano-cortina" className="btn-secondary btn-large">
                            Découvrir le Guide 2026
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
                .landing-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 50px;
                    align-items: center;
                }
                @media (min-width: 968px) {
                    .landing-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }
            `}</style>
        </>
    );
}
