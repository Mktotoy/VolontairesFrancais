import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Volontaires français</h1>
            <p className="hero-subtitle">
              Rassembler, soutenir et valoriser tous les
              volontaires français ayant des missions lors des
              Jeux Olympiques et Paralympiques
            </p>
            <Link href="/adhesion" className="btn-primary">
              Rejoignez-nous
            </Link>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <h2 className="section-title">Notre Association</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                L'association "Volontaires français", fondée par des volontaires de Paris 2024, rassemble les volontaires ayant participé - ou participant prochainement - aux Jeux Olympiques et Paralympiques, été comme hiver.
              </p>
              <p>
                Que vous ayez été volontaire pour le COJO, le Club France ou une Ville Hôte, vous êtes ici chez vous : c'est la même famille.
              </p>
              <p>
                Cette association était un projet, c'est maintenant une réalité !
              </p>
              <p>
                Notre ambition : faire vivre cette communauté unique, partager nos expériences et soutenir les futurs volontaires.
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
                Créer une communauté active et solidaire de
                volontaires français des Jeux Olympiques et
                Paralympiques
              </p>
            </div>
            <div className="mission-card mission-card-yellow">
              <div className="mission-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3>Soutenir</h3>
              <p>
                Accompagner les volontaires dans leurs missions
                présentes et futures
              </p>
            </div>
            <div className="mission-card mission-card-green">
              <div className="mission-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Valoriser</h3>
              <p>
                Mettre en lumière vos expériences uniques et vos
                initiatives inspirantes
              </p>
            </div>
            <div className="mission-card mission-card-red">
              <div className="mission-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Partager</h3>
              <p>
                Favoriser les échanges et le partage
                d'expériences au sein de la communauté
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Rejoignez la famille des volontaires !</h2>
            <p>
              Pour ne rien manquer de nos événements, suivez-nous sur nos réseaux sociaux :
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
