import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-logo">Volontaires français</h3>
                        <p>
                            Association des volontaires français des Jeux Olympiques et
                            Paralympiques
                        </p>
                    </div>
                    <div className="footer-section">
                        <h4>Liens rapides</h4>
                        <ul className="footer-links">
                            <li><Link href="/">Accueil</Link></li>
                            <li><Link href="/equipe">L'équipe</Link></li>
                            <li><Link href="/actu">Actualités</Link></li>
                            <li><Link href="/galerie">Galerie</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li>
                                <Link href="/mentions-legales">Mentions légales</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Adhérer</h4>
                        <ul className="footer-links">
                            <li>
                                <Link href="/adhesion" target="_blank">
                                    Adhésion 2025-2026
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Suivez-nous</h4>
                        <div className="footer-social">
                            <a
                                href="https://www.facebook.com/profile.php?id=61581761488412"
                                target="_blank"
                                className="footer-social-link"
                                aria-label="Facebook"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                                href="https://www.instagram.com/volontaires.francais/"
                                target="_blank"
                                className="footer-social-link"
                                aria-label="Instagram"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com/company/association-volontaire-fran%C3%A7ais/"
                                target="_blank"
                                class="footer-social-link"
                                aria-label="LinkedIn"
                            >
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; {currentYear} Volontaires français. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
