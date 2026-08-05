import { Metadata } from 'next';

// Route cachee : pas de lien dans le nav/sitemap, partagee uniquement par email.
export const metadata: Metadata = {
  title: 'Élisez vos athlètes | Volontaires français',
  robots: { index: false, follow: false },
};

export default function VoteAthletesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
