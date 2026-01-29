"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path: string) => pathname === path ? 'active' : '';

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <Link href="/">
                            <img
                                src="/images/LOGO_NOIR_COULEUR_1.png"
                                alt="Volontaires français"
                                className="logo-img logo-desktop"
                            />
                            <img
                                src="/images/MONOGRAMME_COULEUR_FOND_BLANC.png"
                                alt="Volontaires français"
                                className="logo-img logo-mobile"
                            />
                        </Link>
                    </div>
                    <nav className={`nav ${isMenuOpen ? 'active' : ''}`} id="nav">
                        <ul className="nav-list">
                            <li>
                                <Link href="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/equipe" className={`nav-link ${isActive('/equipe')}`} onClick={() => setIsMenuOpen(false)}>
                                    L'équipe
                                </Link>
                            </li>
                            <li>
                                <Link href="/actu" className={`nav-link ${isActive('/actu')}`} onClick={() => setIsMenuOpen(false)}>
                                    Actu
                                </Link>
                            </li>
                            <li>
                                <Link href="/on-parle-de-nous" className={`nav-link ${isActive('/on-parle-de-nous')}`} onClick={() => setIsMenuOpen(false)}>
                                    On parle de nous
                                </Link>
                            </li>
                            <li style={{ margin: '15px 0' }}>
                                <Link href="/milano-cortina" className={`nav-link ${isActive('/milano-cortina')}`} onClick={() => setIsMenuOpen(false)}>
                                    Milano Cortina ❄️
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className={`nav-link ${isActive('/faq')}`} onClick={() => setIsMenuOpen(false)}>
                                    FAQ
                                </Link>
                            </li>
                            <li className="nav-member-mobile">
                                <Link href="/adhesion" target="_blank" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Adhérer
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-actions">
                        <Link href="/adhesion" className="btn-member">
                            Adhérer
                        </Link>
                    </div>
                    <button
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        id="hamburger"
                        onClick={toggleMenu}
                        aria-label="Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}
