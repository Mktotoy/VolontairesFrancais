import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Espace adhérents | Volontaires Français',
    description: "L'espace membre des Volontaires Français arrive très prochainement.",
};

export default function EspaceAdherentsPage() {
    return (
        <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 60px' }}>
            <div style={{ maxWidth: 560, textAlign: 'center' }}>
                <h1 style={{ fontSize: '1.9rem', marginBottom: 16 }}>🚧 Espace adhérents</h1>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 28 }}>
                    L&apos;association prépare actuellement son espace membre dédié à ses adhérents.
                    Il arrive très prochainement !
                </p>
                <Link href="/adhesion" className="btn-member">
                    Rejoindre l&apos;association
                </Link>
            </div>
        </section>
    );
}
