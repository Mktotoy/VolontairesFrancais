import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageAnimations from "@/components/PageAnimations";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./styles/main.css";

export const metadata: Metadata = {
  title: "Volontaires français - Accueil",
  description: "Volontaires français - Association internationale des volontaires de Jeux olympiques et paralympiques",
  icons: {
    icon: '/assets/favicon.ico',
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
      <head suppressHydrationWarning>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <PageAnimations />
      </body>
    </html>
  );
}
