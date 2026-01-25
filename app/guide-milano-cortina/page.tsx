import Link from 'next/link';

export const metadata = {
    title: 'Guide des Volontaires - Milano Cortina 2026 | Volontaires français',
    description: 'Bienvenue dans la communauté des Volontaires français pour Milano Cortina 2026.',
};

export default function GuidePage() {
    const downloadUrl = "/docs/Guide des Volontaires français.pdf";

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">Guide des Volontaires</h1>
                    <p className="page-subtitle">Milano Cortina 2026</p>
                </div>
            </section>

            <section className="section-padding" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div className="guide-hero" style={{ marginBottom: '40px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                            <img src="/images/guide-highlight.jpg" alt="Volontaires français Milano Cortina 2026" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>

                        <p style={{ marginBottom: '20px', fontSize: '1.2rem' }}><strong>Chère volontaire, cher volontaire,</strong></p>

                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            C’est avec une immense joie, et une grande fierté, que nous t’accueillons au sein de la communauté des Volontaires français pour les Jeux Olympiques et Paralympiques d’hiver Milano Cortina 2026.
                        </p>

                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            En rejoignant cette aventure, tu deviens bien plus qu’un·e volontaire : tu fais partie d’une expérience humaine unique, portée par des valeurs fortes d’<strong>engagement</strong>, de <strong>partage</strong> et d’<strong>ouverture au monde</strong>. Ces Jeux seront faits de missions, bien sûr, mais aussi de rencontres, d’émotions et de souvenirs qui resteront gravés.
                        </p>

                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Ce guide, conçu par l’association Volontaires français, a été pensé pour t’accompagner à chaque étape de ta mobilisation. Tu y trouveras de nombreuses informations pratiques pour t’aider à vivre cette expérience dans les meilleures conditions possibles.
                        </p>

                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            Et parce que l’aventure se vit encore plus intensément ensemble, nous te proposerons tout au long des Jeux des temps de rassemblement : repas conviviaux, moments d’échange entre volontaires et rencontres informelles, pour créer du lien bien au-delà des missions.
                        </p>

                        <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
                            L’ensemble du bureau s’est pleinement investi dans la création de ce guide. Merci à toi pour ton engagement, ta motivation et ton énergie.
                        </p>

                        <p style={{ marginBottom: '40px', lineHeight: '1.8', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Nous sommes fiers de t’accompagner dans cette aventure exceptionnelle.<br />
                            L’équipe des Volontaires français
                        </p>

                        <div style={{ textAlign: 'center' }}>
                            <a href={downloadUrl} className="btn-primary btn-large" download target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-download" style={{ marginRight: '10px' }}></i>
                                Télécharger le guide
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
