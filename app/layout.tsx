import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./styles/main.css";

export const metadata: Metadata = {
  title: "Volontaires français - Accueil",
  description: "Volontaires français - Association internationale des volontaires de Jeux olympiques et paralympiques",
  icons: {
    icon: '/assets/favicon.ico',
    shortcut: '/assets/favicon.ico',
    apple: '/assets/favicon.ico',
  },
  other: {
    rel: 'stylesheet',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
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
        {children}
      </body>
    </html>
  );
}
