import Link from "next/link";
import { fetchLatestPosts } from '@/lib/data';
import { getAssetUrl } from '@/lib/assets';

export const revalidate = 60; // revalidate every 1 minute

async function getPosts() {
  return await fetchLatestPosts(3);
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(dateStr));
}

export const metadata = {
  title: 'Volontaires français | Accueil',
  description: 'L\'association qui rassemble, soutient et valorise les volontaires français des Jeux Olympiques et Paralympiques.',
  openGraph: {
    title: 'Volontaires français | Accueil',
    description: 'Rejoignez la communauté des volontaires français des JOP !',
    type: 'website',
    locale: 'fr_FR',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Volontaires français',
  url: 'https://volontairesfrancais.fr',
  logo: 'https://volontairesfrancais.fr/assets/favicon.ico',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61581761488412',
    'https://www.instagram.com/volontaires.francais/',
    'https://www.linkedin.com/company/association-volontaire-fran%C3%A7ais/',
    'https://www.youtube.com/@VolontairesFran%C3%A7ais'
  ],
  description: 'Association internationale des volontaires des Jeux olympiques et paralympiques'
};

export default async function Home() {
  const posts = await getPosts();
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const recentPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Volontaires français</h1>
            <p className="hero-subtitle">
              Rassembler, soutenir et valoriser tous les volontaires français
              ayant des missions lors des Jeux Olympiques et Paralympiques
            </p>
            <Link href="/adhesion" className="btn-primary">
              Rejoignez-nous
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      {featuredPost && (
        <section className="featured-news section-padding" style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
          <div className="container">
            <h2 className="section-title">À la une</h2>
            <div className="featured-card" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}>
              {featuredPost.featured_picture && (
                <div className="featured-image" style={{ position: 'relative', minHeight: '300px' }}>
                  <img
                    src={getAssetUrl(featuredPost.featured_picture) || ''}
                    alt={featuredPost.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                  />
                </div>
              )}
              <div className="featured-content" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="date" style={{ color: '#666', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  {formatDate(featuredPost.published_at)}
                </div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#1a1a1a' }}>
                  <Link href={`/actu/${featuredPost.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {featuredPost.title}
                  </Link>
                </h3>
                <div style={{ marginBottom: '1.5rem', color: '#4a4a4a', lineHeight: '1.6' }}
                  dangerouslySetInnerHTML={{ __html: featuredPost.excerpt || (featuredPost.content ? `${featuredPost.content.slice(0, 150)}...` : '') }}
                />
                <Link href={`/actu/${featuredPost.slug}`} className="btn-text" style={{
                  color: '#0056b3',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: 'auto'
                }}>
                  Lire l'article <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Recent Posts Grid */}
            {recentPosts.length > 0 && (
              <div className="recent-news-grid" style={{
                marginTop: '3rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {recentPosts.map(post => (
                  <article key={post.id} className="news-card" style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {post.featured_picture && (
                      <div className="card-image" style={{ height: '200px', overflow: 'hidden' }}>
                        <img
                          src={getAssetUrl(post.featured_picture) || ''}
                          alt={post.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div className="card-content" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>
                        {formatDate(post.published_at)}
                      </div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>
                        <Link href={`/actu/${post.slug}`} style={{ textDecoration: 'none', color: '#1a1a1a' }}>
                          {post.title}
                        </Link>
                      </h4>
                      <Link href={`/actu/${post.slug}`} style={{ color: '#0056b3', fontSize: '0.9rem', fontWeight: 600, marginTop: 'auto' }}>
                        Lire la suite
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/actu" className="btn-primary">
                Toute l'actualité
                <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="about">
        <div className="container">
          <h2 className="section-title">Notre Association</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                L'association "Volontaires français", fondée par des volontaires
                de Paris 2024, rassemble les volontaires ayant participé - ou
                participant prochainement - aux Jeux Olympiques et
                Paralympiques, été comme hiver.
              </p>
              <p>
                Que vous ayez été volontaire pour le COJO, le Club France ou une
                Ville Hôte, vous êtes ici chez vous : c'est la même famille.
              </p>
              <p>
                Cette association était un projet, c'est maintenant une réalité
                !
              </p>
              <p>
                Notre ambition : faire vivre cette communauté unique, partager
                nos expériences et soutenir les futurs volontaires.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container">
          <h2 className="section-title">Notre Mission</h2>
          <div className="mission-grid">
            <div className="mission-card mission-card-blue">
              <div className="mission-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Rassembler</h3>
              <p>
                Créer une communauté active et solidaire de volontaires français
                des Jeux Olympiques et Paralympiques
              </p>
            </div>
            <div className="mission-card mission-card-yellow">
              <div className="mission-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3>Soutenir</h3>
              <p>
                Accompagner les volontaires dans leurs missions présentes et
                futures
              </p>
            </div>
            <div className="mission-card mission-card-green">
              <div className="mission-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Valoriser</h3>
              <p>
                Mettre en lumière vos expériences uniques et vos initiatives
                inspirantes
              </p>
            </div>
            <div className="mission-card mission-card-red">
              <div className="mission-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Partager</h3>
              <p>
                Favoriser les échanges et le partage d'expériences au sein de la
                communauté
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <div className="contact-content">
            <h2 className="section-title">Nous contacter</h2>
            <p>Une question ? Une suggestion ? N'hésitez pas à nous écrire !</p>
            <p>
              <strong>volontairesfrancais@gmail.com</strong>
            </p>
            <a
              href="mailto:volontairesfrancais@gmail.com"
              className="btn-primary contact-btn"
            >
              <i className="fas fa-envelope"></i>
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Rejoignez la famille des volontaires !</h2>
            <p>
              Pour ne rien manquer de nos événements, suivez-nous sur nos
              réseaux sociaux :
            </p>
            <div className="social-links">
              <a
                href="https://www.facebook.com/profile.php?id=61581761488412"
                target="_blank"
                className="social-link social-facebook"
              >
                <i className="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/volontaires.francais/"
                target="_blank"
                className="social-link social-instagram"
              >
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/association-volontaire-fran%C3%A7ais/"
                target="_blank"
                className="social-link social-linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.youtube.com/@VolontairesFran%C3%A7ais"
                target="_blank"
                className="social-link social-youtube"
                aria-label="Youtube"
              >
                <i className="fab fa-youtube"></i>
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
