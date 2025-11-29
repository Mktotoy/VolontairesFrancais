import FaqItem from '@/components/FaqItem';

export default function FaqPage() {
    const faqs = [
        {
            question: "\"Volontaires Français\", c'est quoi exactement ?",
            answer: "<p>\"Volontaires Français\" est une association loi 1901 officiellement créée le 28 octobre 2025, qui rassemble tous les volontaires ayant participé ou s'apprêtant à participer aux Jeux Olympiques et Paralympiques, été comme hiver. Notre mission est de faire vivre cette communauté unique, de partager nos expériences, de promouvoir les valeurs du bénévolat et de soutenir les futurs volontaires.</p>"
        },
        {
            question: "Doit-on obligatoirement avoir été volontaire sur des JO pour rejoindre l'association ?",
            answer: "<p><b>Oui.</b> L'association \"Volontaires Français\" est spécifiquement destinée à \"rassembler les bénévoles ayant participé - ou participant prochainement - aux Jeux Olympiques et Paralympiques\", quelque soit l'édition. Que vous ayez été volontaire pour Paris 2024 (COJO), le Club France ou la Ville Hôte, vous êtes au bon endroit : c'est la même famille. C'est ce qui crée notre lien commun. Si vous n'avez pas encore été volontaire mais que le projet vous intéresse, nous vous invitons à suivre nos actualités publiques sur nos réseaux sociaux.</p>"
        },
        {
            question: "Je n'ai pas la nationalité française mais je souhaiterais rejoindre l'association. Est-ce possible ?",
            answer: "<p>L'association \"Volontaires Français\", comme son nom l'indique, a pour vocation première d'\"Identifier et rassembler les anciens volontaires Français\". Pour l'instant, l'adhésion est réservée aux volontaires de nationalité française. Nous vous invitons néanmoins à suivre nos réseaux sociaux où nous partagerons des informations publiques sur la vie de la communauté.</p>"
        },
        {
            question: "Pourquoi devrais-je adhérer ?",
            answer: "<p>Pour trois raisons principales :</p><ul><li><strong>RESTER CONNECTÉ</strong> : Pour retrouver la \"famille\" des volontaires lors de nos événements et rencontres, et ne pas laisser la flamme s'éteindre.</li><li><strong>SE PRÉPARER</strong> : Si vous êtes futur volontaire, pour bénéficier de conseils, de webinaires et des retours d'expérience des anciens.</li><li><strong>TRANSMETTRE</strong> : Si vous êtes un ancien volontaire, pour valoriser votre expérience et aider à préparer la relève.</li></ul>"
        },
        {
            question: "Je n'ai pas pour projet de candidater pour de futurs jeux. Puis-je néanmoins rejoindre l'association ?",
            answer: "<p>Oui, absolument. L'association n'est pas réservée qu'aux futurs candidats. Un de nos objectifs principaux est de rassembler les anciens volontaires et de \"faire vivre la communauté\". Si vous souhaitez \"rester connecté à la famille\", participer à nos événements, ou \"valoriser et transmettre votre expérience\", vous êtes au bon endroit.</p>"
        },
        {
            question: "Je n'ai participé qu'aux Jeux de Paris 2024, suis-je concerné ?",
            answer: "<p>Absolument ! Vous êtes le cœur de notre association. L'association a été fondée par des volontaires de Paris 2024 pour \"rassembler celles et ceux qui ont participé\" et prolonger cette aventure humaine.</p>"
        },
        {
            question: "Je veux être volontaire pour les prochains Jeux (ex: Milano Cortina 2026). Pouvez-vous m'aider ?",
            answer: "<p>Oui. C'est un de nos objectifs majeurs. En adhérant, vous aurez accès à un \"soutien et des conseils\", des webinaires de préparation et au partage d'expérience des anciens.</p>"
        },
        {
            question: "Est-ce que l'adhésion garantit ma sélection comme volontaire pour les prochains Jeux ?",
            answer: "<p><strong>NON.</strong> C'est un point très important. Nous sommes une association de soutien et de réseau, nous ne sommes pas le Comité d'Organisation des Jeux. La sélection des volontaires est la responsabilité exclusive de chaque Comité d'Organisation (ex: Milano Cortina 2026). Nous vous aidons à vous préparer, mais nous ne gérons ni le recrutement, ni les sélections.</p>"
        },
        {
            question: "Êtes-vous l'association \"officielle\" de Paris 2024 ou du CNOSF ?",
            answer: "<p>Nous sommes une association indépendante créée par des volontaires pour les volontaires. Nous travaillons en étroite collaboration avec le CNOSF et aspirons à intégrer la famille olympique, mais nous ne sommes pas une entité \"officielle\" de Paris 2024 (qui n'existe plus) ou du CNOSF.</p>"
        },
        {
            question: "J'ai un problème avec mon uniforme / mon certificat de Paris 2024. Pouvez-vous m'aider ?",
            answer: "<p><strong>NON.</strong> Malheureusement, nous ne pouvons pas vous aider sur ce point. Nous n'avons aucun accès à la logistique, aux outils ou aux stocks du Comité d'Organisation de Paris 2024. Notre association se tourne vers l'avenir pour construire la nouvelle communauté des volontaires.</p>"
        },
        {
            question: "L'adhésion est-elle gratuite ?",
            answer: "<p>Non. Pour financer nos actions (organisation d'événements, gestion du site web, animations, etc.) et assurer le fonctionnement de l'association, une cotisation annuelle sera demandée lors de l'ouverture des adhésions.</p>"
        }
    ];

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">FAQ</h1>
                    <p className="page-subtitle">Foire aux Questions</p>
                </div>
            </section>

            <section className="faq">
                <div className="container">
                    <div className="faq-intro">
                        <p>
                            Vous avez des questions sur Volontaires français ? Retrouvez ici
                            les réponses aux questions les plus fréquentes.
                        </p>
                    </div>

                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <FaqItem
                                key={index}
                                number={index + 1}
                                question={faq.question}
                                answer={faq.answer}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
