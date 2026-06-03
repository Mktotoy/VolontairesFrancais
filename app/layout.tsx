import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import FontAwesomeLoader from "@/components/FontAwesomeLoader";
import "./styles/main.css";

export const metadata: Metadata = {
  title: "Volontaires français - Accueil",
  description: "Volontaires français - Association internationale des volontaires de Jeux olympiques et paralympiques",
  icons: {
    icon: '/assets/favicon.ico',
    shortcut: '/assets/favicon.ico',
    apple: '/assets/favicon.ico',
  },
  metadataBase: new URL('https://volontairesfrancais.fr'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        <FontAwesomeLoader />
        {children}
      </body>
    </html>
  );
}
