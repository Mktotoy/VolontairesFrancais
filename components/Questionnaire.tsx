"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type QuestionType = 'select' | 'multi-select' | 'range' | 'text' | 'email' | 'info';

interface Question {
    id: string;
    type: QuestionType;
    label: string;
    section: string; // New: Group questions by section
    description?: string;
    options?: string[];
    min?: number;
    max?: number;
    step?: number;
    condition?: (answers: Record<string, any>) => boolean;
    required?: boolean;
    placeholder?: string;
}

const SECTIONS = [
    'Profil',
    'Rôle & Sites',
    'Vie aux Jeux',
    'Opérationnel',
    'Futur',
    'Divers'
];

const INTRO_MESSAGE = `Bonjour,
Les Jeux d'hiver de Milano Cortina se sont achevés ce dimanche 15 mars. En tant que Français(e) engagé(e) sur le terrain, vous avez eu l’honneur de vivre l'événement de l'intérieur.
Notre association Volontaires français lance une grande consultation auprès des 550 volontaires français mobilisés en Italie.

Pourquoi cette démarche ?
Dans quatre ans, la France accueillera les Jeux d'hiver (Alpes 2030). Les organisateurs vont bientôt concevoir le futur programme des volontaires. Pour s'assurer que les conditions d'accueil, d'hébergement et de mission soient optimales, nous avons besoin de nous appuyer sur votre réalité de terrain. Ce qui a fonctionné, ce qui a posé problème, et ce qu'il faut absolument éviter en France.

Nous avons préparé ce questionnaire de retour d'expérience (RETEX) complet. Vos réponses nous permettront de construire un bilan concret que nous porterons auprès des futurs organisateurs.
Cela vous prendra une dizaine de minutes.

À la fin de ce questionnaire, si vous souhaitez prolonger l'aventure et garder le lien avec notre communauté des volontaires pour de futurs événements, vous trouverez les informations pour rejoindre notre association.

Un grand merci par avance pour le temps que vous accorderez à cette enquête. Bon retour et bon repos !

Sportivement,
L'équipe de l'association Volontaires français`;

const QUESTIONS: Question[] = [
    // 1) Qui sont les volontaires ? (Profil)
    {
        id: 'age',
        type: 'select',
        section: 'Profil',
        label: 'Catégorie d’âge',
        options: ['18 – 25 ans', '26 – 35 ans', '36 – 45 ans', '46 – 55 ans', '56 – 65 ans', '+ 65 ans'],
        required: true
    },
    {
        id: 'genre',
        type: 'select',
        section: 'Profil',
        label: 'Genre',
        options: ['Femme', 'Homme', 'Non binaire'],
        required: true
    },
    {
        id: 'region',
        type: 'select',
        section: 'Profil',
        label: 'Zone géographique',
        options: [
            'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne', 'Centre-Val de Loire',
            'Corse', 'Grand Est', 'Hauts-de-France', 'Île-de-France', 'Normandie',
            'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte d’Azur',
            'Guadeloupe', 'Martinique', 'Guyane', 'La Réunion', 'Mayotte', 'Expatriés français (précisez le pays)'
        ],
        required: true
    },
    {
        id: 'region_expat',
        type: 'text',
        section: 'Profil',
        label: 'Précisez votre pays d’expatriation',
        condition: (a) => a.region?.includes('Expatriés'),
        required: true
    },
    {
        id: 'accompagnement',
        type: 'select',
        section: 'Profil',
        label: 'Aviez-vous besoin d’un accompagnement particulier durant votre mission ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'accompagnement_details',
        type: 'text',
        section: 'Profil',
        label: 'Si oui, lequel :',
        condition: (a) => a.accompagnement === 'Oui',
        required: true
    },
    {
        id: 'paris2024',
        type: 'select',
        section: 'Profil',
        label: 'Étiez-vous volontaire aux Jeux d’été de Paris 2024 ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'autres_jo',
        type: 'select',
        section: 'Profil',
        label: 'Aviez-vous participé à d’autres Jeux olympiques comme volontaire ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'autres_hiver',
        type: 'select',
        section: 'Profil',
        label: 'Aviez-vous déjà participé à d’autres Jeux d’hiver comme volontaire ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'benevole_hiver',
        type: 'select',
        section: 'Profil',
        label: 'Êtes-vous bénévole lors d’événements internationaux de sports d’hiver ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'reserviste',
        type: 'select',
        section: 'Profil',
        label: 'Étiez-vous réserviste avant d’obtenir une mission ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'adherent_vf',
        type: 'select',
        section: 'Profil',
        label: 'Êtes-vous adhérent de l’association Volontaires français ?',
        options: ['Oui', 'Non'],
        required: true
    },
    // 2) Quel rôle lors des Jeux ? (Rôle & Sites)
    {
        id: 'type_jeux',
        type: 'select',
        section: 'Rôle & Sites',
        label: 'Vous étiez missionné(e) :',
        options: ['Sur les Jeux Olympiques', 'Sur les Jeux Paralympiques', 'Sur les deux'],
        required: true
    },
    {
        id: 'sites_zones',
        type: 'multi-select',
        section: 'Rôle & Sites',
        label: 'Quel était votre site d’affectation ?',
        options: ['MILAN', 'CORTINA D’AMPEZZO', 'VERONA', 'VAL DI FIEMME', 'VALTELLINA', 'ANTERSELVA'],
        required: true
    },
    {
        id: 'milan_venues',
        type: 'multi-select',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à MILAN',
        condition: (a) => a.sites_zones?.includes('MILAN'),
        options: [
            'San Siro – Cérémonie d’ouverture',
            'Milano Speed Skating Stadium – Patinage de vitesse',
            'Milano Ice Hockey Arena Santa Giulia – Hockey sur glace (tournoi masculin et toutes les finales)',
            'Milano Rho Hockey Arena – Hockey sur glace (premiers matchs masculins), para hockey sur glace',
            'Ice Skating Arena – Patinage de vitesse sur piste courte / Patinage artistique',
            'Village olympique', 'Chauffeur', 'Game family assistant', 'Accréditations / Uniformes', 'Media Center',
            'Autres'
        ],
        required: true
    },
    {
        id: 'milan_venues_autres',
        type: 'text',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à MILAN (Autres)',
        placeholder: 'Décrivez votre site à Milan...',
        condition: (a) => a.sites_zones?.includes('MILAN') && a.milan_venues?.includes('Autres'),
        required: true
    },
    {
        id: 'cortina_venues',
        type: 'multi-select',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à CORTINA D’AMPEZZO',
        condition: (a) => a.sites_zones?.includes('CORTINA D’AMPEZZO'),
        options: [
            'Tofane Alpine Skiing Centre – Ski alpin / Para ski alpin / Para snowboard',
            'Cortina Sliding Centre – Bobsleigh / Skeleton / Luge',
            'Cortina Curling Olympic Stadium – Curling / Curling fauteuil',
            'Village olympique', 'Chauffeur', 'Game family assistant', 'Accréditations / Uniformes', 'Media Center',
            'Autres'
        ],
        required: true
    },
    {
        id: 'cortina_venues_autres',
        type: 'text',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à CORTINA D’AMPEZZO (Autres)',
        placeholder: 'Décrivez votre site à Cortina...',
        condition: (a) => a.sites_zones?.includes('CORTINA D’AMPEZZO') && a.cortina_venues?.includes('Autres'),
        required: true
    },
    {
        id: 'verona_venues',
        type: 'multi-select',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à VERONA',
        condition: (a) => a.sites_zones?.includes('VERONA'),
        options: ['Arènes de Vérone – Cérémonies clôture des Jeux Olympiques et ouverture des Jeux Paralympiques', 'Autres'],
        required: true
    },
    {
        id: 'verona_venues_autres',
        type: 'text',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à VERONA (Autres)',
        placeholder: 'Décrivez votre site à Verona...',
        condition: (a) => a.sites_zones?.includes('VERONA') && a.verona_venues?.includes('Autres'),
        required: true
    },
    {
        id: 'fiemme_venues',
        type: 'multi-select',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à VAL DI FIEMME',
        condition: (a) => a.sites_zones?.includes('VAL DI FIEMME'),
        options: [
            'Predazzo Ski Jumping Stadium – Saut à ski / Combiné nordique',
            'Tesero Cross-Country Skiing Stadium – Ski de fond / Combiné nordique / Para ski de fond / Para biathlon',
            'Village olympique', 'Chauffeur', 'Game family assistant', 'Accréditations / Uniformes', 'Media Center',
            'Autres'
        ],
        required: true
    },
    {
        id: 'fiemme_venues_autres',
        type: 'text',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à VAL DI FIEMME (Autres)',
        placeholder: 'Décrivez votre site à Val di Fiemme...',
        condition: (a) => a.sites_zones?.includes('VAL DI FIEMME') && a.fiemme_venues?.includes('Autres'),
        required: true
    },
    {
        id: 'valtellina_venues',
        type: 'multi-select',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à VALTELLINA',
        condition: (a) => a.sites_zones?.includes('VALTELLINA'),
        options: [
            'Livigno Aerials & Moguls – Ski freestyle',
            'Livigno Snow Park – Snowboard / Ski acrobatique',
            'Bormio Stelvio – Ski alpin / Ski alpinisme',
            'Village olympique', 'Chauffeur', 'Game family assistant', 'Accréditations / Uniformes', 'Media Center',
            'Autres'
        ],
        required: true
    },
    {
        id: 'valtellina_venues_autres',
        type: 'text',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à VALTELLINA (Autres)',
        placeholder: 'Décrivez votre site à Valtellina...',
        condition: (a) => a.sites_zones?.includes('VALTELLINA') && a.valtellina_venues?.includes('Autres'),
        required: true
    },
    {
        id: 'anterselva_venues',
        type: 'multi-select',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à ANTERSELVA',
        condition: (a) => a.sites_zones?.includes('ANTERSELVA'),
        options: [
            'Südtirol Arena (Anterselva / Antholz) – Biathlon',
            'Village olympique', 'Chauffeur', 'Game family assistant', 'Accréditations / Uniformes', 'Media Center',
            'Autres'
        ],
        required: true
    },
    {
        id: 'anterselva_venues_autres',
        type: 'text',
        section: 'Rôle & Sites',
        label: 'Précisez votre site à ANTERSELVA (Autres)',
        placeholder: 'Décrivez votre site à Anterselva...',
        condition: (a) => a.sites_zones?.includes('ANTERSELVA') && a.anterselva_venues?.includes('Autres'),
        required: true
    },
    {
        id: 'mission_principale',
        type: 'select',
        section: 'Rôle & Sites',
        label: 'Quelle était votre mission principale ?',
        options: ['EVS', 'Assistant Famille Olympique', 'Accréditations / Uniformes', 'Médias', 'Sports', 'Chauffeur', 'Fonction support', 'Autres'],
        required: true
    },
    {
        id: 'mission_autres',
        type: 'text',
        section: 'Rôle & Sites',
        label: 'Veuillez préciser votre mission',
        condition: (a) => a.mission_principale?.startsWith('Autres'),
        required: true
    },
    {
        id: 'redéployé',
        type: 'select',
        section: 'Rôle & Sites',
        label: 'Avez-vous été redéployé(e) sur une autre mission durant les Jeux ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'responsable_equipe',
        type: 'select',
        section: 'Rôle & Sites',
        label: 'Étiez-vous responsable d’une équipe durant votre mission ?',
        options: ['Oui', 'Non'],
        required: true
    },
    // 3) Vos Jeux (Vie aux Jeux)
    {
        id: 'satisfaction_globale',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'Êtes-vous satisfait(e) de votre expérience globale ?',
        description: '1 = Pas du tout | 10 = Tout à fait',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'satisfaction_integration',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'Êtes-vous satisfait(e) de votre intégration au sein des Jeux de Milano Cortina ?',
        description: '1 = Pas du tout | 10 = Tout à fait',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'satisfaction_gestion',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'Êtes-vous satisfait(e) de votre gestion par les équipes de Milano Cortina ?',
        description: '1 = Pas du tout | 10 = Tout à fait',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'satisfaction_attentes',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'Votre expérience a-t-elle répondu à vos attentes ?',
        description: '1 = Pas du tout | 10 = Tout à fait',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'difficulte_logement',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'Avez-vous eu des difficultés à trouver un logement ?',
        description: '1 = Pas du tout | 10 = Oui, tout à fait',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'prix_logement_nuit',
        type: 'select',
        section: 'Vie aux Jeux',
        label: 'Fourchette de prix par nuit de votre logement pour la période de mission :',
        options: ['1 - 50 €', '51 - 75 €', '76 - 100 €', '101 - 125 €', '126 - 150 €', '151 - 175 €', '176 - 200 €', '201 - 300 €', '+ 300 €', 'J’ai été logé gratuitement'],
        required: true
    },
    {
        id: 'prix_logement_global',
        type: 'select',
        section: 'Vie aux Jeux',
        label: 'Fourchette de prix du coût global de votre logement pour la période de mission :',
        options: ['1 – 500 €', '501 – 700 €', '701 – 1 000 €', '1 001 – 1 300 €', '1 301 – 1 500 €', '1 501 – 1 800 €', '1 801 – 2 000 €', '+ de 2 000 €', 'J’ai été logé(e) gratuitement'],
        required: true
    },
    {
        id: 'annulation_logement',
        type: 'select',
        section: 'Vie aux Jeux',
        label: 'Avez-vous été victime d’une annulation de location par le propriétaire ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'fraude_logement',
        type: 'select',
        section: 'Vie aux Jeux',
        label: 'Avez-vous été victime d’une location frauduleuse ou d’un logement insalubre ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'temps_transport',
        type: 'select',
        section: 'Vie aux Jeux',
        label: 'Temps moyen journalier pour rejoindre votre site (trajet aller) :',
        options: ['1 à 30 min', '31 à 45 min', '46 à 60 min', '61 à 75 min', '76 à 90 min', '+ de 90 min'],
        required: true
    },
    {
        id: 'transport_acceptable',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'Ce temps de transport était :',
        description: '1 = Pas du tout acceptable | 5 = Neutre | 10 = Très acceptable',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'satisfaction_transport',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'Comment jugez-vous l’offre de transport proposée par Milano Cortina ?',
        description: '1 = Pas du tout satisfait(e) | 5 = Neutre | 10 = Très satisfait(e)',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'importance_transport',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'Les facilités de transport offertes par un comité d’organisation sont, pour vous :',
        description: '1 = Pas du tout importantes | 5 = Neutre | 10 = Très importantes',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'importance_repas',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'La qualité des repas proposés est, pour vous :',
        description: '1 = Pas du tout importante | 5 = Neutre | 10 = Très importante',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'satisfaction_evenements',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'Comment jugez-vous les événements à destination des volontaires mis en place par le COJO ?',
        description: '1 = Pas du tout satisfait(e) | 5 = Neutre | 10 = Très satisfait(e)',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'importance_evenements',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'Les événements volontaires sont, pour vous :',
        description: '1 = Pas du tout importants | 5 = Neutre | 10 = Très importants',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'periode_role',
        type: 'select',
        section: 'Vie aux Jeux',
        label: 'À quelle période avez-vous reçu votre rôle ?',
        options: ['Avant septembre 2025', 'Septembre 2025', 'Octobre 2025', 'Novembre 2025', '1er au 15 décembre 2025', '16 au 31 décembre 2025', '1er au 15 janvier 2026', '16 au 31 janvier 2026', 'Février 2026', 'Je ne me souviens plus'],
        required: true
    },
    {
        id: 'periode_agenda',
        type: 'select',
        section: 'Vie aux Jeux',
        label: 'À quelle période avez-vous reçu votre planning ?',
        options: ['Avant décembre 2025', 'Décembre 2025', '1er au 15 janvier 2026', '16 au 31 janvier 2026', 'Février 2026', 'Je ne me souviens plus'],
        required: true
    },
    {
        id: 'difficulte_role_logement',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'La date d’obtention de votre rôle vous a-t-elle posé des difficultés pour trouver un logement ?',
        description: '1 = Pas du tout | 10 = Oui, tout à fait',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'difficulte_agenda_logement',
        type: 'range',
        section: 'Vie aux Jeux',
        label: 'La date d’obtention de votre planning vous a-t-elle posé des difficultés pour trouver un logement ?',
        description: '1 = Pas du tout | 10 = Oui, tout à fait',
        min: 1, max: 10, step: 1, required: true
    },
    // 4) En mission, d’un point de vue opérationnel
    {
        id: 'vst_training',
        type: 'select',
        section: 'Opérationnel',
        label: 'Au préalable, avez-vous pu assister à la "Venue Specific Training" sur site ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'satisfaction_checkin',
        type: 'select',
        section: 'Opérationnel',
        label: 'En mission, le check-in vous a-t-il satisfait (accueil, temps d’attente, fluidité au desk, cadeaux, bon repas…) ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'checkout_realise',
        type: 'select',
        section: 'Opérationnel',
        label: 'Avez-vous réalisé des check-out ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'centre_volontaire',
        type: 'select',
        section: 'Opérationnel',
        label: 'Disposiez-vous d’un centre volontaire avec un coordinateur volontaires ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'points_rdv_clairs',
        type: 'select',
        section: 'Opérationnel',
        label: 'Lors de vos prises de missions, les points de rendez-vous étaient-il clairs ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'superviseur_joignable',
        type: 'select',
        section: 'Opérationnel',
        label: 'Votre superviseur était-il facilement joignable en cas de difficulté ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'formation_evacuation',
        type: 'select',
        section: 'Opérationnel',
        label: 'Avez-vous été formé sur site aux cheminements d’évacuation / sorties de secours ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'intensite_mission',
        type: 'select',
        section: 'Opérationnel',
        label: 'Sur l’intensité de vos missions, étiez-vous ?',
        options: ['En sur-nombre', 'En sous-nombre', 'Au bon nombre'],
        required: true
    },
    {
        id: 'rotation_poste',
        type: 'select',
        section: 'Opérationnel',
        label: 'Une rotation de poste était-elle organisée sur vos missions ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'info_materiel',
        type: 'select',
        section: 'Opérationnel',
        label: 'En termes de communication, disposiez-vous des bonnes informations / du bon matériel pour effectuer vos missions ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'equipe_changeante',
        type: 'select',
        section: 'Opérationnel',
        label: 'La composition de votre équipe changeait-elle tous les jours ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'eloignement_degrade',
        type: 'select',
        section: 'Opérationnel',
        label: 'L’éloignement des sites les uns des autres a-t-il dégradé votre expérience ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'point_fort',
        type: 'text',
        section: 'Opérationnel',
        label: 'Selon vous, quel a été le point fort de l’organisation locale ?',
        required: false
    },
    {
        id: 'conseil_alpes2030',
        type: 'text',
        section: 'Opérationnel',
        label: 'Si vous deviez donner un conseil aux futurs organisateurs des Alpes 2030 concernant la gestion des volontaires, quel serait-il ?',
        required: false
    },
    // 5) Et demain ?
    {
        id: 'candidat_la2028',
        type: 'select',
        section: 'Futur',
        label: 'Serez-vous candidat(e) pour être volontaire aux Jeux d’été de Los Angeles 2028 ?',
        options: ['Oui', 'Non', 'Je réfléchis encore'],
        required: true
    },
    {
        id: 'candidat_alpes2030',
        type: 'select',
        section: 'Futur',
        label: 'Serez-vous candidat(e) pour être volontaire aux Jeux d’hiver des Alpes françaises 2030 ?',
        options: ['Oui', 'Non', 'Je réfléchis encore'],
        required: true
    },
    {
        id: 'candidat_brisbane2032',
        type: 'select',
        section: 'Futur',
        label: 'Serez-vous candidat(e) pour être volontaire aux Jeux d’été de Brisbane 2032 ?',
        options: ['Oui', 'Non', 'Je réfléchis encore'],
        required: true
    },
    {
        id: 'autres_elements',
        type: 'text',
        section: 'Futur',
        label: 'D’autres éléments à ajouter ?',
        placeholder: 'Espace libre d’expression...',
        required: false
    },
    // 6) Divers
    {
        id: 'connaissance_association',
        type: 'select',
        section: 'Divers',
        label: 'Connaissez-vous l’association Volontaires français, qui regroupe et accompagne les Français missionnés et réservistes sur les différentes olympiades ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'recevoir_resultats',
        type: 'select',
        section: 'Divers',
        label: 'Souhaitez-vous recevoir les résultats de cette enquête ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'email',
        type: 'email',
        section: 'Divers',
        label: 'Si oui, merci d’indiquer votre adresse e-mail :',
        condition: (a) => a.recevoir_resultats === 'Oui',
        required: true
    },
    {
        id: 'rejoindre_association',
        type: 'select',
        section: 'Divers',
        label: 'Je souhaite également recevoir des informations pour rejoindre l\'association Volontaires Français.',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'merci',
        type: 'info',
        section: 'Divers',
        label: 'Un grand merci !',
        description: 'Cliquez sur envoyer pour transmettre vos réponses. Bon retour et bon repos !',
    }
];

export default function Questionnaire({ onBack }: { onBack?: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    const visibleQuestions = QUESTIONS.filter(q => !q.condition || q.condition(answers));
    const currentQuestion = visibleQuestions[currentIndex];

    // UI Logic
    const percentage = Math.round(((currentIndex + 1) / visibleQuestions.length) * 100);
    const getNPSColor = (num: number) => {
        if (num <= 3) return '#eb2f50'; // Red
        if (num <= 6) return '#fcb133'; // Yellow/Orange
        if (num <= 8) return '#86c232'; // Light Green
        return '#07a459'; // Green
    };

    const [hasProgress, setHasProgress] = useState(false);
    const [startTime] = useState(Date.now());

    useEffect(() => {
        const savedAnswers = localStorage.getItem('retex_survey_v4_answers');
        const savedIndex = localStorage.getItem('retex_survey_v4_index');
        
        if (savedAnswers && savedIndex) {
            setAnswers(JSON.parse(savedAnswers));
            setCurrentIndex(parseInt(savedIndex, 10));
            setHasProgress(true);
        }

        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('retex_survey_v4_answers', JSON.stringify(answers));
            localStorage.setItem('retex_survey_v4_index', currentIndex.toString());
        }
    }, [answers, currentIndex, isLoaded]);

    const resetSurvey = () => {
        if (confirm("Voulez-vous recommencer l'enquête à zéro ?")) {
            localStorage.removeItem('retex_survey_v4_answers');
            localStorage.removeItem('retex_survey_v4_index');
            setAnswers({});
            setCurrentIndex(0);
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // CONFIGURATION: Remplacez cette URL par l'URL de votre application web Google Apps Script
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYDdn2KAYaWc-AwO6MYO6Tx7aFBvK-5BN4CuLiHdBQHLqhoE5e1PZ_PI1MGm97O8Fs/exec";

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        // Tracking metadata
        const metadata = {
            user_agent: navigator.userAgent,
            screen_res: `${window.screen.width}x${window.screen.height}`,
            window_size: `${window.innerWidth}x${window.innerHeight}`,
            duration_seconds: Math.floor((Date.now() - startTime) / 1000),
            submit_time: new Date().toISOString()
        };

        const finalData = {
            email: answers.email || null,
            answers: { ...answers, _metadata: metadata },
            version: 'V4'
        };

        try {
            const response = await fetch('/api/enquete/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData)
            });

            if (!response.ok) throw new Error('Failed to submit to database');

            // Also keep sending to Google Apps Script as backup
            try {
                await fetch(APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(finalData)
                });
            } catch (e) {
                console.warn("GAS submission backup failed:", e);
            }

            setIsSubmitted(true);
            localStorage.removeItem('retex_survey_v4_answers');
            localStorage.removeItem('retex_survey_v4_index');
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = useCallback(() => {
        if (currentIndex < visibleQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }, [currentIndex, visibleQuestions.length]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    }, [currentIndex]);

    const setValue = (val: any) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
    };

    const toggleMultiValue = (opt: string) => {
        const selected = answers[currentQuestion.id] || [];
        const isActive = selected.includes(opt);
        if (isActive) setValue(selected.filter((s: string) => s !== opt));
        else setValue([...selected, opt]);
    };

    const canGoNext = () => {
        if (!currentQuestion || currentQuestion.type === 'info') return true;
        if (!currentQuestion.required) return true;
        const answer = answers[currentQuestion.id];
        if (currentQuestion.type === 'multi-select') return Array.isArray(answer) && answer.length > 0;
        if (currentQuestion.type === 'range') return typeof answer === 'number';
        return !!answer;
    };

    if (!isLoaded) return null;


    return (
        <div className="survey-immersive">
            <div className="survey-content">
                <header className="survey-header">
                    <div className="header-top">
                        {onBack ? (
                            <button onClick={onBack} className="site-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                <i className="fas fa-chevron-left"></i> Retour
                            </button>
                        ) : (
                            <Link href="/" className="site-link">
                                <i className="fas fa-chevron-left"></i> Retour
                            </Link>
                        )}

                        <div className="section-stepper">
                            {SECTIONS.map((s, idx) => {
                                const isCurrent = currentQuestion.section === s;
                                const isPast = SECTIONS.indexOf(currentQuestion.section) > idx;
                                return (
                                    <div key={s} className={`section-dot-wrap ${isCurrent ? 'active' : ''} ${isPast ? 'past' : ''}`}>
                                        <div className="section-dot"></div>
                                        <span className="section-label">{s}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <button onClick={resetSurvey} className="reset-link" title="Recommencer à zéro">
                            <i className="fas fa-redo-alt"></i>
                            <span className="reset-hover-text">Reset</span>
                        </button>
                    </div>

                    <div className="progress-wrap">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span className="step-count">{percentage}%</span>
                    </div>
                </header>

                <main className="survey-question">
                    <div className="section-badge">{currentQuestion.section}</div>
                    <h1 className="label-text">{currentQuestion.label}</h1>
                    {currentQuestion.description && <p className="desc-text">{currentQuestion.description}</p>}

                    <div className="input-area">
                        {currentQuestion.type === 'select' && (
                            <div className="select-grid">
                                {currentQuestion.options?.map(opt => (
                                    <button
                                        key={opt}
                                        className={`bubble-btn ${answers[currentQuestion.id] === opt ? 'active' : ''}`}
                                        onClick={() => { setValue(opt); setTimeout(handleNext, 300); }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQuestion.type === 'multi-select' && (
                            <div className="select-grid">
                                {currentQuestion.options?.map(opt => {
                                    const selected = answers[currentQuestion.id] || [];
                                    const isActive = selected.includes(opt);
                                    return (
                                        <button
                                            key={opt}
                                            className={`bubble-btn multi ${isActive ? 'active' : ''}`}
                                            onClick={() => toggleMultiValue(opt)}
                                        >
                                            {opt}
                                            {isActive && <i className="fas fa-check-circle ml-2"></i>}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {currentQuestion.type === 'range' && (
                            <div className="nps-container">
                                <div className="nps-grid">
                                    {Array.from({ length: (currentQuestion.max || 10) - (currentQuestion.min || 1) + 1 }, (_, i) => (currentQuestion.min || 1) + i).map(num => (
                                        <button
                                            key={num}
                                            className={`nps-btn ${answers[currentQuestion.id] === num ? 'active' : ''}`}
                                            style={{
                                                '--hover-color': getNPSColor(num),
                                                borderColor: answers[currentQuestion.id] === num ? getNPSColor(num) : 'rgba(255,255,255,0.1)',
                                                backgroundColor: answers[currentQuestion.id] === num ? getNPSColor(num) : 'rgba(255,255,255,0.05)',
                                                color: answers[currentQuestion.id] === num ? '#fff' : '#fff'
                                            } as any}
                                            onClick={() => {
                                                setValue(num);
                                                setTimeout(handleNext, 400);
                                            }}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                <div className="nps-labels">
                                    <span>{currentQuestion.description?.split('|')[0] || 'Pas du tout'}</span>
                                    <span>{currentQuestion.description?.split('|')[1] || 'Tout à fait'}</span>
                                </div>
                            </div>
                        )}

                        {(currentQuestion.type === 'text' || currentQuestion.type === 'email') && (
                            <input
                                type={currentQuestion.type}
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder={currentQuestion.placeholder || '...'}
                                className="open-input"
                                autoFocus
                                onKeyDown={(e) => e.key === 'Enter' && canGoNext() && handleNext()}
                            />
                        )}

                        {currentQuestion.type === 'info' && (
                            <div className="info-decor">
                                <i className={`fas ${currentQuestion.id === 'merci' ? 'fa-check-circle' : 'fa-star'} fa-4x`}></i>
                                {currentQuestion.id === 'merci' && (
                                    <div className="submit-status">
                                        {isSubmitting && <p className="status-text loading"><i className="fas fa-spinner fa-spin"></i> Envoi en cours...</p>}
                                        {isSubmitted && (
                                            <div className="success-area">
                                                <p className="status-text success"><i className="fas fa-check"></i> Vos réponses ont été enregistrées !</p>
                                                <div className="finish-ctas">
                                                    <Link href="/" className="cta-box">
                                                        <i className="fas fa-search"></i>
                                                        <span>Découvrir l'association</span>
                                                    </Link>
                                                    <Link href="/adhesion" className="cta-box highlight">
                                                        <i className="fas fa-id-card"></i>
                                                        <span>Adhérer à l'association</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                        {submitError && <p className="status-text error"><i className="fas fa-exclamation-triangle"></i> {submitError}</p>}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>

                <footer className="survey-footer">
                    <div className="logo-area">
                        <img src="/assets/favicon.ico" alt="Logo" className="logo" />
                        <span className="logo-name">Volontaires français</span>
                    </div>

                    <div className="nav-area">
                        {currentIndex > 0 && !isSubmitted && (
                            <button onClick={handlePrev} className="nav-btn prev">Précédent</button>
                        )}
                        {currentIndex < visibleQuestions.length - 1 ? (
                            <button onClick={handleNext} disabled={!canGoNext()} className="nav-btn next">Suivant</button>
                        ) : (
                            <>
                                {!isSubmitted ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="nav-btn finish pulse"
                                    >
                                        {isSubmitting ? 'Envoi...' : 'Envoyer mes réponses'}
                                    </button>
                                ) : (
                                    <Link href="/" className="nav-btn site-back">Retour au site principal</Link>
                                )}
                            </>
                        )}
                    </div>
                </footer>
            </div>

            <style jsx global>{`
                .survey-immersive {
                    width: 100vw;
                    height: 100vh;
                    height: 100dvh;
                    display: flex;
                    flex-direction: column;
                    color: white;
                    font-family: Arial, sans-serif;
                    overflow: hidden;
                    background: linear-gradient(135deg, #067fcc 0%, #fcb133 100%);
                }
                .survey-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    max-width: 900px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    height: 100%;
                }
                .survey-header { 
                    padding: 1rem 0;
                    flex-shrink: 0;
                    display: flex; 
                    flex-direction: column; 
                    justify-content: center; 
                    gap: 15px; 
                }
                .header-top { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    width: 100%; 
                    gap: 10px;
                }
                .site-link { 
                    color: rgba(255,255,255,0.7); 
                    text-decoration: none; 
                    font-weight: bold; 
                    font-size: 0.8rem; 
                    transition: color 0.2s; 
                    display: flex; 
                    align-items: center; 
                    gap: 5px;
                    white-space: nowrap;
                }
                .site-link:hover { color: white; }
                .reset-link { 
                    background: none; 
                    border: none; 
                    color: rgba(255,255,255,0.5); 
                    font-size: 1rem; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    transition: color 0.2s; 
                    padding: 5px;
                }
                .reset-link:hover { color: #eb2f50; }
                .reset-hover-text {
                    font-size: 0.7rem;
                    font-weight: bold;
                    margin-left: 5px;
                    opacity: 0;
                    transform: translateX(-5px);
                    transition: all 0.2s;
                    pointer-events: none;
                }
                .reset-link:hover .reset-hover-text {
                    opacity: 0.7;
                    transform: translateX(0);
                }

                /* Section Stepper */
                .section-stepper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 6px;
                    flex: 1;
                }
                .section-dot-wrap {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }
                .section-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.2);
                    transition: all 0.3s ease;
                }
                .section-label {
                    position: absolute;
                    top: 15px;
                    font-size: 0.6rem;
                    font-weight: bold;
                    white-space: nowrap;
                    opacity: 0;
                    transform: translateY(5px);
                    transition: all 0.3s ease;
                    pointer-events: none;
                }
                .section-dot-wrap.active .section-dot {
                    background: #fcb133;
                    transform: scale(1.4);
                    box-shadow: 0 0 10px rgba(252, 177, 51, 0.5);
                }
                .section-dot-wrap.active .section-label {
                    opacity: 1;
                    transform: translateY(0);
                    color: #fcb133;
                }
                .section-dot-wrap.past .section-dot {
                    background: white;
                }
                
                .progress-wrap { width: 100%; display: flex; align-items: center; gap: 15px; margin-top: 5px; }
                .progress-bar { flex: 1; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; }
                .progress-fill { height: 100%; background: #fcb133; transition: width 0.5s ease; border-radius: 2px; }
                .step-count { font-size: 0.7rem; font-weight: bold; opacity: 0.6; min-width: 40px; text-align: right; }

                .survey-question { 
                    flex: 1; 
                    overflow-y: auto; 
                    padding: 1.5rem 0;
                    -webkit-overflow-scrolling: touch;
                }
                .section-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    background: rgba(252, 177, 51, 0.15);
                    color: #fcb133;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 1rem;
                }
                .label-text { font-size: 2.2rem; font-weight: 900; line-height: 1.1; margin-bottom: 0.8rem; }
                .desc-text { font-size: 1.1rem; opacity: 0.8; margin-bottom: 2rem; }

                .select-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
                .bubble-btn {
                    padding: 1rem;
                    background: rgba(255,255,255,0.05);
                    border: 2px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                }
                .bubble-btn:hover { background: rgba(255,255,255,0.1); border-color: white; }
                .bubble-btn.active { background: white; color: #067fcc; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }

                .nps-container { width: 100%; max-width: 600px; margin: 0 auto; }
                .nps-grid { display: flex; justify-content: space-between; gap: 6px; margin-bottom: 1rem; flex-wrap: wrap; }
                .nps-btn {
                    flex: 1;
                    min-width: 40px;
                    height: 55px;
                    background: rgba(255,255,255,0.05);
                    border: 2px solid rgba(255,255,255,0.1);
                    border-radius: 10px;
                    color: white;
                    font-size: 1.1rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .nps-btn:hover { border-color: var(--hover-color) !important; background: rgba(255,255,255,0.1); }
                .nps-btn.active { transform: scale(1.1); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
                .nps-labels { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; opacity: 0.7; color: white; text-transform: uppercase; letter-spacing: 0.5px; }

                .finish-ctas { display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap; }
                .cta-box {
                    flex: 1;
                    min-width: 160px;
                    padding: 1.2rem 1rem;
                    background: rgba(255,255,255,0.1);
                    border: 2px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: white;
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.2s;
                    font-weight: 700;
                    text-align: center;
                }
                .cta-box i { font-size: 1.3rem; }
                .cta-box span { font-size: 0.85rem; }
                .cta-box:hover { background: rgba(255,255,255,0.2); transform: translateY(-3px); border-color: white; }
                .cta-box.highlight { background: #fcb133; color: #333; border-color: #fcb133; }
                .cta-box.highlight:hover { background: #ffc25b; transform: translateY(-3px); }

                .open-input {
                    width: 100%;
                    padding: 0.8rem 0;
                    background: transparent;
                    border: none;
                    border-bottom: 3px solid rgba(255,255,255,0.2);
                    font-size: 1.8rem;
                    color: white;
                    font-weight: 700;
                    outline: none;
                }
                .open-input::placeholder { color: rgba(255,255,255,0.2); }
                .open-input:focus { border-color: #fcb133; }

                .survey-footer { 
                    height: 100px; 
                    flex-shrink: 0;
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between; 
                    border-top: 1px solid rgba(255,255,255,0.1); 
                }
                .logo-area { display: flex; align-items: center; gap: 10px; }
                .logo { height: 32px; }
                .logo-name { font-weight: 800; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; opacity: 0.7; }
                
                .nav-area { display: flex; gap: 10px; }
                .nav-btn {
                    padding: 0.7rem 1.4rem;
                    border-radius: 10px;
                    font-weight: 700;
                    border: 2px solid white;
                    background: transparent;
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                    font-size: 0.9rem;
                }
                .nav-btn.next, .nav-btn.finish { background: white; color: #067fcc; }
                .nav-btn.site-back { background: #07a459; color: white; border-color: #07a459; }
                .nav-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
                .nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }

                .pulse { animation: ripple 2s infinite; }
                @keyframes ripple {
                    0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
                    70% { box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
                }

                .submit-status { margin-top: 1.5rem; }
                .status-text { font-size: 1rem; font-weight: 600; }
                .status-text.loading { color: #fcb133; }
                .status-text.success { color: #07a459; }
                .status-text.error { color: #eb2f50; }

                @media (max-width: 600px) {
                    .survey-content { padding: 0 1rem; }
                    .header-nav .site-link span { display: none; }
                    .header-nav .site-link i { font-size: 1.2rem; }
                    
                    .survey-header { height: 80px; gap: 8px; }
                    .survey-footer { height: 90px; }
                    
                    .label-text { font-size: 1.6rem; margin-bottom: 0.6rem; }
                    .desc-text { font-size: 0.95rem; margin-bottom: 1.5rem; }
                    
                    .bubble-btn { padding: 0.8rem; font-size: 0.9rem; border-radius: 10px; }
                    .select-grid { grid-template-columns: 1fr; gap: 8px; }
                    
                    .nps-btn { height: 50px; min-width: 35px; font-size: 1rem; border-radius: 8px; }
                    .nps-labels { font-size: 0.7rem; }
                    
                    .open-input { font-size: 1.4rem; border-bottom-width: 2px; }
                    .logo-name { display: none; }
                    
                    .nav-btn { padding: 0.6rem 1.1rem; font-size: 0.85rem; }
                    
                    .finish-ctas { flex-direction: column; width: 100%; }
                    .cta-box { max-width: none; width: 100%; padding: 1rem; }
                }
            `}</style>
        </div>
    );
}
