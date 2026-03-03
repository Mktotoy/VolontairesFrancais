
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Charte Graphique | Volontaires français Milano Cortina 2026',
    description: 'Ressources graphiques, logos et couleurs de la communauté.',
};

export default function CharteGraphiquePage() {
    const brandColors = [
        { name: 'Bleu', hex: '#067fcc', class: 'bg-[#067fcc]' },
        { name: 'Jaune', hex: '#fcb133', class: 'bg-[#fcb133]' },
        { name: 'Vert', hex: '#07a459', class: 'bg-[#07a459]' },
        { name: 'Rouge', hex: '#eb2f50', class: 'bg-[#eb2f50]' },
    ];

    const logos = [
        {
            title: 'Logo Complet - Blanc',
            file: 'LOGO_BLANC.png',
            bg: 'dark',
            desc: 'À utiliser sur fond sombre.'
        },
        {
            title: 'Logo Complet - Noir',
            file: 'LOGO_NOIR.png',
            bg: 'light',
            desc: 'À utiliser sur fond clair.'
        },
        {
            title: 'Logo Complet - Couleur (Fond Blanc)',
            file: 'LOGO_BLANC_COULEUR.png',
            bg: 'dark',
            desc: 'Version couleur pour fond sombre.'
        },
        {
            title: 'Logo Complet - Couleur (Fond Noir)',
            file: 'LOGO_NOIR_COULEUR.png',
            bg: 'light',
            desc: 'Version couleur pour fond clair.'
        }
    ];

    const monograms = [
        {
            title: 'Monogramme - Blanc',
            file: 'MONOGRAMME_BLANC.png',
            bg: 'dark'
        },
        {
            title: 'Monogramme - Noir',
            file: 'MONOGRAMME_NOIR.png',
            bg: 'light'
        },
        {
            title: 'Monogramme - Couleur (Fond Blanc)',
            file: 'MONOGRAMME_COULEUR_FOND_BLANC.png',
            bg: 'light'
        },
        {
            title: 'Monogramme - Couleur (Fond Noir)',
            file: 'MONOGRAMME_COULEUR_FOND_NOIR.png',
            bg: 'dark'
        }
    ];

    const ASSET_PATH = '/assets/logos-typos/';

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">Nos Ressources Graphiques</h1>
                    <p className="page-subtitle">Logos, couleurs et typographies officiels de la communauté</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">

                    {/* Colors Section */}
                    <div className="brand-section mb-5">
                        <h2 className="section-title">1. Couleurs Officielles</h2>
                        <div className="colors-grid">
                            {brandColors.map((color) => (
                                <div key={color.name} className="color-card">
                                    <div className="color-swatch" style={{ backgroundColor: color.hex }}></div>
                                    <div className="color-info">
                                        <h3>{color.name}</h3>
                                        <code>{color.hex}</code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr style={{ margin: '60px 0', border: 'none', borderTop: '1px solid #eee' }} />

                    {/* Logos Section */}
                    <div className="brand-section mb-5">
                        <h2 className="section-title">2. Logos Complets</h2>
                        <div className="logos-grid">
                            {logos.map((logo, index) => (
                                <div key={index} className="logo-card">
                                    <div className={`logo-preview ${logo.bg === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                                        <img src={`${ASSET_PATH}${logo.file}`} alt={logo.title} />
                                    </div>
                                    <div className="logo-info">
                                        <h3>{logo.title}</h3>
                                        {logo.desc && <p>{logo.desc}</p>}
                                        <a href={`${ASSET_PATH}${logo.file}`} download className="btn-download">
                                            <i className="fas fa-download"></i> Télécharger (PNG)
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr style={{ margin: '60px 0', border: 'none', borderTop: '1px solid #eee' }} />

                    {/* Monograms Section */}
                    <div className="brand-section mb-5">
                        <h2 className="section-title">3. Monogrammes</h2>
                        <div className="logos-grid">
                            {monograms.map((logo, index) => (
                                <div key={index} className="logo-card">
                                    <div className={`logo-preview ${logo.bg === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                                        <img src={`${ASSET_PATH}${logo.file}`} alt={logo.title} style={{ maxHeight: '120px' }} />
                                    </div>
                                    <div className="logo-info">
                                        <h3>{logo.title}</h3>
                                        <a href={`${ASSET_PATH}${logo.file}`} download className="btn-download">
                                            <i className="fas fa-download"></i> Télécharger (PNG)
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr style={{ margin: '60px 0', border: 'none', borderTop: '1px solid #eee' }} />

                    {/* Typography Section */}
                    <div className="brand-section">
                        <h2 className="section-title">4. Typographie</h2>
                        <div className="typography-showcase">
                            <div className="font-card">
                                <h3 style={{ fontFamily: 'var(--font-logo)', fontSize: '2.5rem', marginBottom: '10px' }}>Walaweh</h3>
                                <p style={{ color: '#666', marginBottom: '20px' }}>Police de titres et logo</p>
                                <div className="font-ex" style={{ fontFamily: 'var(--font-logo)', fontSize: '1.5rem' }}>
                                    ABCDEFGHIJKLM<br />NOPQRSTUVWXYZ<br />0123456789
                                </div>
                            </div>
                            <div className="font-card">
                                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '2.5rem', marginBottom: '10px' }}>Arial / Sans-Serif</h3>
                                <p style={{ color: '#666', marginBottom: '20px' }}>Police de corps de texte</p>
                                <div className="font-ex" style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem' }}>
                                    Abcdefghijklm<br />nopqrstuvwxyz<br />0123456789
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <style>{`
                .colors-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 30px;
                }
                .color-card {
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                    background: white;
                }
                .color-swatch {
                    height: 100px;
                    width: 100%;
                }
                .color-info {
                    padding: 15px;
                    text-align: center;
                }
                .color-info h3 {
                    margin: 0 0 5px;
                    font-size: 1.1rem;
                }
                .color-info code {
                    background: #f5f5f5;
                    padding: 2px 5px;
                    border-radius: 4px;
                    font-size: 0.9rem;
                    color: #666;
                }

                .logos-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 30px;
                }
                .logo-card {
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                    background: white;
                    border: 1px solid #eee;
                    display: flex;
                    flex-direction: column;
                }
                .logo-preview {
                    padding: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 250px;
                }
                .bg-light {
                    background-color: #ffffff;
                    background-image: radial-gradient(#f0f0f0 1px, transparent 1px);
                    background-size: 20px 20px;
                }
                .bg-dark {
                    background-color: #222222;
                     background-image: radial-gradient(#333 1px, transparent 1px);
                    background-size: 20px 20px;
                }
                .logo-preview img {
                    max-width: 100%;
                    max-height: 180px;
                    object-fit: contain;
                }
                .logo-info {
                    padding: 20px;
                    border-top: 1px solid #eee;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
                .logo-info h3 {
                    margin: 0 0 10px;
                    font-size: 1.2rem;
                    font-family: var(--font-body);
                    font-weight: 600;
                }
                .logo-info p {
                    color: #666;
                    font-size: 0.9rem;
                    margin-bottom: 20px;
                }
                .btn-download {
                    margin-top: auto;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--color-light-gray);
                    color: var(--color-dark);
                    padding: 8px 15px;
                    border-radius: 20px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }
                .btn-download:hover {
                    background: var(--color-blue);
                    color: white;
                }

                .typography-showcase {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                }
                .font-card {
                    padding: 40px;
                    background: #f9f9f9;
                    border-radius: 12px;
                    border: 1px solid #eee;
                }
                .font-ex {
                    line-height: 1.5;
                    word-break: break-all;
                }
            `}</style>
        </>
    );
}
