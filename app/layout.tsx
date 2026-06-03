import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import FontAwesomeLoader from "@/components/FontAwesomeLoader";
import "./styles/main.css";

export const metadata: Metadata = {
  title: "Volontaires français | Association internationale des bénévoles olympiques",
  description: "Volontaires français rassemble, soutient et valorise les bénévoles des Jeux Olympiques et Paralympiques, été comme hiver. Rejoignez la communauté !",
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
      <head>
        <meta property="og:image" content="https://volontairesfrancais.fr/opengraph-image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Volontaires français - Association des volontaires des Jeux Olympiques et Paralympiques" />
        <meta property="og:logo" content="https://volontairesfrancais.fr/images/LOGO_BLANC_COULEUR_1.png" />
      </head>
      <body suppressHydrationWarning>
        <GoogleAnalytics />
        <FontAwesomeLoader />
        {children}
      </body>
    </html>
  );
}
