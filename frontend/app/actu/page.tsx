import NewsArticle from '@/components/NewsArticle';

export default function ActuPage() {
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">Actualités</h1>
                    <p className="page-subtitle">
                        Les dernières nouvelles de Volontaires français
                    </p>
                </div>
            </section>

            <section className="news">
                <div className="container">
                    <NewsArticle
                        title="🎂 1 MOIS... ET DÉJÀ 250 VOLONTAIRES !"
                        date="28 novembre 2025"
                        preview="<p>Il y a tout juste un mois, le 28 octobre, l'association « Volontaires français » voyait officiellement le jour...</p>"
                        fullContent={
                            <>
                                <p>
                                    Il y a tout juste un mois, le 28 octobre, l'association
                                    « Volontaires français » voyait officiellement le jour.
                                </p>
                                <p>
                                    Nous avions une conviction : l'élan de Paris 2024 ne
                                    devait pas s'éteindre. Aujourd'hui, vous nous apportez
                                    la preuve que nous avions raison.
                                </p>
                                <p>En seulement 30 jours :</p>
                                <p>
                                    ✅ 250 adhérents nous ont rejoints (merci !). <br />
                                    ✅ Une communauté active de missionnés et réservistes
                                    pour hashtag#MilanoCortina2026 s'est déjà formée. <br />
                                    ✅ L'esprit de famille est bel et bien là.
                                </p>
                                <p>
                                    Ce premier mois dépasse toutes nos espérances. Il
                                    confirme que cette association répond à un besoin réel :
                                    rassembler, soutenir et faire vivre l'héritage.
                                </p>
                                <p>
                                    Merci à nos 250 premiers pionniers pour votre confiance.
                                    🙏
                                </p>
                                <p>
                                    L'aventure ne fait que commencer. Si vous n'avez pas
                                    encore franchi le pas, rejoignez le mouvement pour
                                    écrire les prochains mois avec nous !
                                </p>
                            </>
                        }
                    />

                    <NewsArticle
                        title="🎉 Première action concrète : CHECK ! ✅"
                        date="20 novembre 2025"
                        image="/images/visio-milano-cortina-2026.jpg"
                        imageAlt="Première visioconférence de préparation pour Milano Cortina 2026"
                        preview="<p>Hier soir, l'association &quot;Volontaires français&quot; a animé sa toute première visioconférence de préparation destinée aux volontaires (missionnés et réservistes) partants pour les Jeux Olympiques et Paralympiques de Milano Cortina 2026.</p>"
                        fullContent={
                            <>
                                <p>
                                    Hier soir, l'association "Volontaires français" a animé
                                    sa toute première visioconférence de préparation
                                    destinée aux volontaires (missionnés et réservistes)
                                    partants pour les Jeux Olympiques et Paralympiques de
                                    Milano Cortina 2026.
                                </p>
                                <p>Au programme :</p>
                                <p>
                                    ✔ retours d'expérience inspirants<br />
                                    ✔ conseils logistiques pour anticiper l'aventure<br />
                                    ✔ un vrai moment de partage et d'entraide
                                </p>
                                <p>
                                    Un immense merci à tous les participants pour leur
                                    présence, leur énergie et leur engagement 🙌
                                </p>
                                <p>
                                    Cette première action illustre parfaitement la mission
                                    de notre association :<br />
                                    - FAIRE<br />
                                    - SOUTENIR
                                </p>
                                <p>Et la suite arrive très vite !</p>
                                <p>
                                    Pour rejoindre nos prochaines actions, accéder à nos
                                    contenus exclusifs et participer à notre premier grand
                                    événement physique le 6 décembre, c'est simple 👇
                                </p>
                                <div className="article-cta">
                                    <a
                                        href="https://www.helloasso.com/associations/volontaires-francais"
                                        target="_blank"
                                        className="btn-primary"
                                    >
                                        ➡️ Rejoignez la communauté !
                                    </a>
                                </div>
                            </>
                        }
                    />

                    <NewsArticle
                        title="C'est le moment ! 🚀 Les adhésions sont ouvertes !"
                        date="11 novembre 2025"
                        preview="<p><strong>Les adhésions à l'association « Volontaires français » sont officiellement ouvertes !</strong></p><p>Vous pouvez dès maintenant devenir membre et rejoindre le réseau national des volontaires olympiques et paralympiques via notre page HelloAsso sécurisée...</p>"
                        fullContent={
                            <>
                                <p>
                                    Vous pouvez dès maintenant devenir membre et rejoindre
                                    le réseau national des volontaires olympiques et
                                    paralympiques via notre page HelloAsso sécurisée :
                                </p>
                                <div className="article-cta">
                                    <a
                                        href="https://www.helloasso.com/associations/volontaires-francais/adhesions/adherez-a-volontaires-francais"
                                        target="_blank"
                                        className="btn-primary"
                                    >
                                        ➡️ Adhérer maintenant ⬅️
                                    </a>
                                </div>

                                <h3>Pour rappel, qui peut adhérer ?</h3>
                                <p>
                                    L'association est ouverte à tous les volontaires
                                    français, sous deux conditions :
                                </p>
                                <ol>
                                    <li><strong>Être de nationalité française.</strong></li>
                                    <li>
                                        <strong>ET</strong> remplir l'une de ces deux
                                        conditions :
                                        <ul>
                                            <li>
                                                Avoir été volontaire sur une Olympiade (été
                                                ou hiver).
                                                <em>(Que vous ayez été volontaire pour le
                                                    COJO, le Club France ou la Ville Hôte,
                                                    c'est la même famille !)</em>
                                            </li>
                                            <li>
                                                OU être titulaire d'une mission affectée ou
                                                réserviste pour Milano Cortina.
                                            </li>
                                        </ul>
                                    </li>
                                </ol>

                                <h3>En devenant membre aujourd'hui, vous :</h3>
                                <ul className="article-list">
                                    <li>
                                        ✅ Rejoignez officiellement la communauté pour nos
                                        prochains événements (dès le 6 décembre !).
                                    </li>
                                    <li>
                                        ✅ Accédez au soutien pour les futurs volontaires
                                        (notamment pour #MilanoCortina2026).
                                    </li>
                                    <li>
                                        ✅ Devenez un acteur de la transmission de
                                        l'héritage de Paris 2024.
                                    </li>
                                </ul>

                                <p>
                                    <strong>L'aventure continue, et elle commence ici.</strong>
                                </p>
                            </>
                        }
                    />

                    <NewsArticle
                        title="Pourquoi adhérer ?"
                        date="6 novembre 2025"
                        preview="<h3>🌟 WOW ! MERCI ! ❤️</h3><p>Nous sommes tous extrêmement heureux et agréablement surpris par l'enthousiasme incroyable partagé dans vos commentaires depuis le début de cette semaine. Franchement, ça nous fait chaud au cœur !</p>"
                        fullContent={
                            <>
                                <h3>🙌 Vous l'avez confirmé :</h3>
                                <p>
                                    La famille des volontaires est bien là…<br />
                                    et l'aventure ne fait que commencer !<br />
                                    Alors, on continue ! 💪
                                </p>

                                <h3>
                                    ❓ Vous nous avez demandé ce que l'association allait
                                    vous apporter concrètement.
                                </h3>

                                <p>
                                    Que vous soyez un ancien de Paris 2024 (ou d'une
                                    Olympiade précédente !)<br />
                                    ou un futur volontaire pour les prochaines échéances,<br />
                                    ➡️
                                    <strong>notre mission est de vous accompagner.</strong>
                                </p>

                                <h3>💬 Rejoindre Volontaires français, c'est...</h3>

                                <ul className="article-list">
                                    <li>
                                        ✅ Rester connecté à la famille des volontaires.
                                    </li>
                                    <li>✅ Préparer sereinement vos futures missions.</li>
                                    <li>
                                        ✅ Valoriser l'expérience incroyable que vous avez
                                        acquise.
                                    </li>
                                </ul>

                                <h3>🔥 D'ici là...</h3>

                                <p><strong>Parlez-en autour de vous</strong></p>
                            </>
                        }
                    />

                    <NewsArticle
                        title="La création"
                        date="28 octobre 2025"
                        preview="<p>Après de nombreux mois de travaux, nous avons le plaisir de vous annoncer la création de notre nouvelle association : <strong>&quot;Volontaires français&quot;</strong>.</p><p>Cette association était un projet, c'est maintenant une réalité !</p>"
                        fullContent={
                            <>
                                <p>
                                    Notre objectif est de rassembler, soutenir et valoriser
                                    tous les volontaires français ayant des missions lors
                                    des Jeux Olympiques et Paralympiques d'hier et de demain
                                    en créant une communauté active et solidaire autour de
                                    vos expériences uniques et de vos initiatives.
                                </p>

                                <p>
                                    Pour ne rien manquer et être parmi les premiers à
                                    découvrir le lancement de notre campagne d'adhésion,
                                    connectez-vous dès maintenant à nos réseaux sociaux :
                                </p>

                                <div className="article-social-links">
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61581761488412"
                                        target="_blank"
                                        className="article-social-link"
                                    >
                                        <i className="fab fa-facebook-f"></i> Facebook : Cliquez
                                        ici !
                                    </a>
                                    <a
                                        href="https://www.instagram.com/volontaires.francais/"
                                        target="_blank"
                                        className="article-social-link"
                                    >
                                        <i className="fab fa-instagram"></i> Instagram : Cliquez
                                        ici !
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/association-volontaire-fran%C3%A7ais/"
                                        target="_blank"
                                        className="article-social-link"
                                    >
                                        <i className="fab fa-linkedin-in"></i> LinkedIn :
                                        Cliquez ici !
                                    </a>
                                </div>

                                <p>
                                    Rejoignez-nous et soyez au cœur de l'actualité de
                                    l'association : partagez vos expériences, découvrez des
                                    initiatives inspirantes et restez connecté à cette belle
                                    communauté de volontaires.
                                </p>

                                <p>
                                    Merci pour votre engagement et à très bientôt sur nos
                                    réseaux !
                                </p>

                                <p className="article-signature">
                                    Chaleureusement,<br />L'équipe Volontaires français
                                </p>
                            </>
                        }
                    />
                </div>
            </section >
        </>
    );
}
