export default function AdhesionPage() {
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">Pourquoi adhérer</h1>
                    <p className="page-subtitle">
                        Rejoignez la famille des volontaires français
                    </p>
                </div>
            </section>

            <section className="membership">
                <div className="container">
                    <div className="membership-intro">
                        <h2 className="section-title">Pourquoi adhérer ?</h2>
                        <p className="intro-text">
                            L'élan exceptionnel des Jeux de Paris 2024 a fait de cette
                            communauté une véritable famille. L'aventure continue : nous
                            serons encore des centaines aux prochains Jeux !
                        </p>
                        <p className="intro-text">
                            Que vous soyez un ancien de Paris 2024, d'une Olympiade
                            précédente, ou un futur volontaire pour les prochaines
                            échéances, notre mission est de vous accompagner.
                        </p>
                    </div>

                    <div className="benefits">
                        <div className="benefit-card benefit-blue">
                            <div className="benefit-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3>Rester connecté</h3>
                            <p>
                                Rester connecté à la famille des volontaires et faire vivre
                                notre réseau unique
                            </p>
                        </div>
                        <div className="benefit-card benefit-yellow">
                            <div className="benefit-icon">
                                <i className="fas fa-calendar-check"></i>
                            </div>
                            <h3>Préparer vos missions</h3>
                            <p>
                                Préparer sereinement vos futures missions olympiques et
                                paralympiques
                            </p>
                        </div>
                        <div className="benefit-card benefit-green">
                            <div className="benefit-icon">
                                <i className="fas fa-star"></i>
                            </div>
                            <h3>Valoriser votre expérience</h3>
                            <p>Valoriser l'expérience incroyable que vous avez acquise</p>
                        </div>
                    </div>

                    <div className="membership-conditions">
                        <h2 className="section-title">Conditions d'adhésion</h2>

                        <div className="conditions-content">
                            <div className="price-box">
                                <div className="price-label">Prix de l'adhésion</div>
                                <div className="price-amount">15€ <span>par an</span></div>
                            </div>

                            <div className="eligibility-section">
                                <h3>Qui peut adhérer ?</h3>
                                <p>
                                    L'association est ouverte à tous les volontaires
                                    français, sous deux conditions :
                                </p>

                                <div className="conditions-list">
                                    <div className="condition-item">
                                        <div className="condition-number">1</div>
                                        <div className="condition-text">
                                            <strong>Être de nationalité française.</strong>
                                        </div>
                                    </div>
                                    <div className="condition-item">
                                        <div className="condition-number">2</div>
                                        <div className="condition-text">
                                            <strong>ET</strong> remplir l'une de ces deux
                                            conditions :
                                            <ul>
                                                <li>
                                                    <strong>Avoir été volontaire sur une Olympiade</strong> (été ou hiver).
                                                    <em>(Que vous ayez été volontaire pour le COJO, le Club France ou la Ville Hôte, c'est la même famille !)</em>
                                                </li>
                                                <li>
                                                    <strong>OU être titulaire d'une mission affectée ou réserviste pour Milano Cortina.</strong>
                                                    <em>(prépare ton accréditation ou ordre de mission)</em>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="important-notice">
                                    <div className="notice-icon">
                                        <i className="fas fa-exclamation-circle"></i>
                                    </div>
                                    <div className="notice-content">
                                        <strong>Important :</strong> Adhérer à Volontaires
                                        français ne te garantit pas une acceptation par les
                                        différents programmes volontaires des futures
                                        olympiades. Ce choix reste la seule prérogative de
                                        chaque comité d'organisation des Jeux.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="membership-details">
                        <h2 className="section-title">
                            Ce que l'association vous apporte concrètement
                        </h2>
                        <div className="details-grid">
                            <div className="detail-item">
                                <div className="detail-number">1</div>
                                <h3>Animer la communauté</h3>
                                <p>
                                    Depuis 1992, à chaque Olympiade, des centaines de
                                    volontaires français s'engagent. Notre mission : faire
                                    en sorte que cet élan ne retombe pas.
                                </p>
                            </div>
                            <div className="detail-item">
                                <div className="detail-number">2</div>
                                <h3>Partager vos expériences</h3>
                                <p>
                                    Échanger avec d'autres volontaires, partager vos
                                    souvenirs et créer de nouveaux liens au sein de cette
                                    grande famille.
                                </p>
                            </div>
                            <div className="detail-item">
                                <div className="detail-number">3</div>
                                <h3>Soutenir les futurs volontaires</h3>
                                <p>
                                    Appuyer et conseiller les volontaires qui se préparent
                                    pour les prochains Jeux, comme Milano Cortina et
                                    au-delà.
                                </p>
                            </div>
                            <div className="detail-item">
                                <div className="detail-number">4</div>
                                <h3>Profiter d'avantages exclusifs</h3>
                                <p>
                                    Accéder à des événements, des rencontres et des
                                    opportunités réservées aux membres de l'association.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="widget-section">
                        <h2 className="section-title">Formulaire d'adhésion</h2>
                        <div className="widget-container">
                            <iframe
                                id="haWidget"
                                allowTransparency={true}
                                src="https://www.helloasso.com/associations/volontaires-francais/adhesions/adherez-a-volontaires-francais/widget"
                                style={{ width: '100%', height: '1500px', border: 'none' }}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
