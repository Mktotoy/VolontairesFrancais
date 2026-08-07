// Cache local des infos athlètes, sources equipedefrance.com (générées hors-ligne) :
// - data/drupal-athletes.json (identité, bio, discipline)
// - data/widget-resultat-athlete-<id>.json (résultats Milano Cortina 2026)
// - pages /athlete/<slug>, tableau "Palmarès aux jeux" (parse structurel <tr> :
//   année en rowspan héritée, classe medal--*). Le champ olympicMedals du drupal
//   JSON est figé pré-Milano, ne pas s'y fier.
// medals = décompte 2026 uniquement (contexte du vote). palmares = tous les Jeux.
// Textes reproduits sans modification depuis le site officiel.
export interface AthleteResult {
  event: string | null;
  position: string | null;
  score: string | null;
  date: string;
  status: string | null;
}

export interface PalmaresEntry {
  year: number;
  games: string | null;
  medal: 'Or' | 'Argent' | 'Bronze';
  event: string | null;
}

export interface AthleteBio {
  brief: string[];
  paragraphs: string[];
}

export interface AthleteInfo {
  slug: string;
  discipline: string | null;
  medals: { gold: number; silver: number; bronze: number };
  birthdate: string | null;
  birthCity: string | null;
  handicap: string | null;
  bio: AthleteBio | null;
  results: AthleteResult[];
  palmares: PalmaresEntry[];
}

export const ATHLETES_INFO: Record<string, AthleteInfo> = {
  "Lou Jeanmonnot": {
    "slug": "lou-jeanmonnot",
    "discipline": "Biathlon",
    "medals": {
      "gold": 2,
      "silver": 1,
      "bronze": 1
    },
    "birthdate": "1998-10-28",
    "birthCity": "Pontarlier (Doubs)",
    "handicap": null,
    "bio": {
      "brief": [
        "4 titres mondiaux en relais",
        "43 podiums en Coupes du monde dont 23 victoires",
        "118 départs en Coupes du monde",
        "Membre de l'Armée des Champions"
      ],
      "paragraphs": [
        "Avant d'être la biathlète reconnue par ses pairs, Lou Jeanmonnot a longtemps hésité entre sa future discipline et le VTT. Mais à l'âge de 16 ans, il fallait faire un choix et l'adolescente originaire de Pontarlier a décidé, grand bien lui fasse, d'opter pour les skis après avoir débuté le biathlon en 2012. Elle participe à sa première compétition internationale en 2015 avec le Festival Olympique de la Jeunesse Européenne à Bürserberg (Autriche), remportant la médaille d'or sur la poursuite. Cette épreuve de la poursuite semble être dessinée pour ses qualités puisqu'elle remportait également une belle médaille de bronze lors des Jeux olympiques de la jeunesse à Lillehammer en 2016.",
        "Amoureuse du tir, c'est armé de la même carabine depuis ses 14 ans que la Française fait ses classes jusqu'à faire ses débuts en Coupe du monde en mars 2021 sur la manche de Nové Mestro en République Tchèque. En 2022-2023, pour sa première saison complète chez les seniors en Coupe du monde, Lou Jeanmonnot parvient à monter sur la boite à deux reprises à Ruhpolding et Östersund, bien qu'elle ait déjà remporté plusieurs courses en relais avec l'équipe de France féminine. Mais c'est bien la saison 2023-2024 qui va la faire entrer dans une toute nouvelle dimension : avec 4 victoires individuelles en poche, la Française se lance à l'assaut du classement général en alignant notamment 6 podiums sur les 9 dernières courses de la saison. Elle viendra s'échouer à quelques encablures de l'Italienne Lisa Vitozzi, vainqueur du général.",
        "Loin d'être abattue, c'est avec une ambitionne débordante que Lou Jeanmonnot entend vivre la saison 2024-2025 et c'est exactement ce qu'il va se passer ! 8 victoires en individuel (record pour une Française), une domination presque outrageuse sur les épreuves de poursuite (4 victoires en 6 courses) et un duel au sommet lors de la dernière course de la saison contre l'Allemande Franziska Preuss, seule adversaire à suivre le rythme cet hiver. Le classement général se jouera dans les 800 derniers mètres de l'ultime course de la saison, la mass start d'Oslo : l'Allemande place une accélération avant un virage serré et la Française, à la corde, part à la faute et doit laisser filer son concurrente juste avant la dernière ligne droite. C'est une nouvelle place de dauphine qui lui alors réservée au classement général, pour la seconde année de sute."
      ]
    },
    "results": [
      {
        "event": "Relais mixte 4 x 6km (H+F)",
        "position": "1",
        "score": "1:04:15.5",
        "date": "2026-02-08",
        "status": "Terminé"
      },
      {
        "event": "15 km individuel femmes",
        "position": "2",
        "score": "42:08.7",
        "date": "2026-02-11",
        "status": "Terminé"
      },
      {
        "event": "7,5 km sprint femmes",
        "position": "3",
        "score": "21:04.5",
        "date": "2026-02-14",
        "status": "Terminé"
      },
      {
        "event": "10 km poursuite femmes",
        "position": "4",
        "score": "31:01.2",
        "date": "2026-02-15",
        "status": "Terminé"
      },
      {
        "event": "Relais 4 x 6 km femmes",
        "position": "1",
        "score": "1:10:22.7",
        "date": "2026-02-18",
        "status": "Terminé"
      },
      {
        "event": "12,5 km départ groupé femmes",
        "position": "16",
        "score": "38:47.7",
        "date": "2026-02-21",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Individuel 15km (Femmes)"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Bronze",
        "event": "Sprint 7,5km (Femmes)"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais mixte"
      }
    ]
  },
  "Julia Simon": {
    "slug": "julia-simon",
    "discipline": "Biathlon",
    "medals": {
      "gold": 3,
      "silver": 1,
      "bronze": 0
    },
    "birthdate": "1996-10-09",
    "birthCity": "Albertville (Savoie)",
    "handicap": null,
    "bio": {
      "brief": [
        "Vice-championne olympique de relais mixte en 2022",
        "10 titres de championnes du monde et 23 victoires en Coupe du monde",
        "Un globe de cristal remporté en 2022",
        "Membre de l'équipe de France Douane"
      ],
      "paragraphs": [
        "Née à Albertville, Julia Simon chausse très rapidement les skis en débutant par le ski alpin et le ski de fond. Très vite, elle décide de consacrer au nordique et de s'orienter vers le biathlon. Elle débute la compétition en 2013 en junior et devient championne de France de mass start et championne du monde en relais.",
        "L'année suivante, elle intègre l'IBU cup, deuxième circuit mondial. où elle décroche ses premiers podiums. Sa première victoire lui permet d'accéder au circuit de la Coupe du monde où elle marque ses premiers points. Elle ne quittera plus le circuit. Elle s'envole pour les Jeux Olympiques de Pyongchang en 2018 en tant que remplaçante.",
        "Son premier podium en coupe du monde se révèle être à Hochfilzen en 2018 en relais avec une belle médaille de bronze. La première victoire arrive quelques semaines plus tard sur l'étape de Ruhpolding, toujours en relais, en compagnie d'Anaïs Bescond, Justine Braisaz et Anaïs Chevalier. L'abnégation paie. Julia Simon remporte sa première étape en coupe du monde en mars 2020 lors de la poursuite de Kontiolahti avec un magnifique dernier tir debout. Aux championnats du monde de Pokljuka en 2021, elle décroche son premier titre mondial en relais mixte simple (épreuve non-olympique)."
      ]
    },
    "results": [
      {
        "event": "Relais mixte 4 x 6km (H+F)",
        "position": "1",
        "score": "1:04:15.5",
        "date": "2026-02-08",
        "status": "Terminé"
      },
      {
        "event": "15 km individuel femmes",
        "position": "1",
        "score": "41:15.6",
        "date": "2026-02-11",
        "status": "Terminé"
      },
      {
        "event": "7,5 km sprint femmes",
        "position": "34",
        "score": "22:36.6",
        "date": "2026-02-14",
        "status": "Terminé"
      },
      {
        "event": "10 km poursuite femmes",
        "position": null,
        "score": "N'a pas participé",
        "date": "2026-02-15",
        "status": "Terminé"
      },
      {
        "event": "Relais 4 x 6 km femmes",
        "position": "1",
        "score": "1:10:22.7",
        "date": "2026-02-18",
        "status": "Terminé"
      },
      {
        "event": "12,5 km départ groupé femmes",
        "position": "2",
        "score": "37:24.7",
        "date": "2026-02-21",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais mixte"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Individuel 15km (Femmes)"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Mass-start 12,5km (Femmes)"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Argent",
        "event": "Relais mixte"
      }
    ]
  },
  "Camille Bened": {
    "slug": "camille-bened",
    "discipline": "Biathlon",
    "medals": {
      "gold": 1,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "2000-09-06",
    "birthCity": "Evian-les-Bains (Haute-Savoie)",
    "handicap": null,
    "bio": {
      "brief": [
        "Début en Coupe du monde en 2025",
        "3 podiums en Coupes du monde",
        "Vainqueur du classement général de l'IBU Cup en 2024/2025"
      ],
      "paragraphs": [
        "Camille Bened commence le ski à l'âge de 4 ans, poussé par ses parents. Avec sa sœur Chloé, de deux ans sa cadette, l'amour pour le ski les pousse à choisir entre le ski alpin et le ski nordique : plus ludique, c'est cette dernière discipline qui remportera les suffrages familiaux.",
        "La jeune Française s'était déjà faite remarquer en faisant partie, quatre années de suite, du relais féminin champion du monde junior entre 2018 et 2021. Cette dernière année, elle en profite enfin pour chiper son premier titre mondial sur l'épreuve de l'individuel, tandis qu'elle échoue au pied du podium sur le sprint et la poursuite. Mais c'est bien lors de la saison 2020-2021 que sa carrière prend un nouveau virage puisqu'elle débute en IBU Cup, l'antichambre du plus haut niveau mondial. Lors de sa deuxième course dans cette catégorie, aux côtés de ses compatriotes Lou Jeanmonnot et Gilonne Guigonnat, elle connait son premier podium sur le sprint à Arber le 16 janvier 2021. Au cours des trois saisons suivantes, Camille Bened montera sur 8 podiums (2 victoires) pour progressivement atteindre son meilleur rendement lors de la saison 2024-2025 : avec 9 podiums, elle remporte le classement général de l'IBU Cup, ainsi que les petits globes sur la poursuite et la mass-start.",
        "Cette saison prolifique lui ouvre les portes de l'équipe de France A féminine et elle porte son premier dossard en Coupe du monde le 21 mars 2025. Son premier podium intervient en relais mixte simple avec Fabien Claude lors de la première course de cette saison, avant de monter sur son premier podium individuel quelques jours plus tard lors de l'individuel grâce à un 19/20 au tir. Avec 7 Top 10 sur 10 courses disputées sur ce début de saison, Camille Bened profite de l'émulation qui règne au sein du collectif féminin, sûrement le plus dense sur la scène mondiale. Dans une interview avec Ski-nordique.net datant de 2020, la jeune Camille Bened, alors âgée de 20 ans, se projetait sur ses objectifs à long terme : \" Comme tous jeunes athlètes de haut niveau, mon objectif serait de faire partie de l’équipe de France A, de performer en Coupe du monde. Mais mon plus grand rêve serait de participer aux Jeux Olympiques\". Cinq ans plus tard, une progression linéaire et des objectifs atteints un à un, la voici sélectionnée pour les Jeux Olympiques de Milan-Cortina 2026... où la chance sourit souvent aux audacieux."
      ]
    },
    "results": [
      {
        "event": "15 km individuel femmes",
        "position": "6",
        "score": "42:52.3",
        "date": "2026-02-11",
        "status": "Terminé"
      },
      {
        "event": "Relais 4 x 6 km femmes",
        "position": "1",
        "score": "1:10:22.7",
        "date": "2026-02-18",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais"
      }
    ]
  },
  "Océane Michelon": {
    "slug": "oceane-michelon",
    "discipline": "Biathlon",
    "medals": {
      "gold": 2,
      "silver": 1,
      "bronze": 0
    },
    "birthdate": "2002-03-04",
    "birthCity": "Chambéry (Savoie)",
    "handicap": null,
    "bio": {
      "brief": [
        "Doublée médaillée aux championnats du monde 2025",
        "Meilleure jeune de la Coupe du monde 2024-2025",
        "43 départs en Coupe du monde",
        "Membre de l'Armée des Champions"
      ],
      "paragraphs": [
        "Comment expliquer la notion de \"saison de la révélation\" à quelqu'un ? Il suffit de revenir sur la saison 2024-2025 d'Océane Michelon ! Avant cela, la Chambérienne a construit sa carrière à l'aide d'une progression constante : triple médaillée aux championnats du monde juniors entre 2020 et 2022, elle avance prudemment. Lors de la saison 2023-2024, son potentiel tape dans l'œil des observateurs puisqu'avec 7 podiums glanés, elle s'adjuge le classement général femmes de l'IBU Cup (mais aussi les petits globes de spécialité en sprint et poursuite), le circuit \"antichambre\" du biathlon international.",
        "Dès lors, après avoir pris le pouls des Coupes du monde senior d'Oberhof et Ruhpolding lors de ses premières sélections en janvier 2024, la jeune Française intègre le groupe A de l'équipe de France féminine et parvient, lors de la première course individuelle de la saison 2024-2025, à décrocher une 7 ème place, signe que les espoirs placés en elle étaient bien fondés jusqu'à présent ! Tout au long de l'année, elle montera sur 7 podiums et parviendra à décrocher ses deux premières victoires avec le relais féminin, au-dessus de lot cette année par rapport à leurs concurrentes.",
        "Mais enfin, c'est au moment des championnats du monde de Lenzerheide en Suisse que le grand public fera sa connaissance. D'entrée, elle devient championne du monde pour la première fois de sa carrière aux côtés de Justine Braisaz-Bouchet, Lou Jeanmonnot et Julia Simon sur le relais devant la Norvège et la Suède. Puis elle parviendra à décrocher sa première individuelle, une médaille d'argent sur l'épreuve reine de la mass-start, démontrant s'il le fallait encore toute sa détermination à se faire une place parmi les \"grandes. Sa saison exceptionnelle se terminera à la 5 ème place du classement général de la Coupe du monde et elle parviendra à remporter le dossard bleu récompensant la meilleure jeunes de moins de 23 ans."
      ]
    },
    "results": [
      {
        "event": "7,5 km sprint femmes",
        "position": "2",
        "score": "20:44.6",
        "date": "2026-02-14",
        "status": "Terminé"
      },
      {
        "event": "10 km poursuite femmes",
        "position": "5",
        "score": "31:08.9",
        "date": "2026-02-15",
        "status": "Terminé"
      },
      {
        "event": "Relais 4 x 6 km femmes",
        "position": "1",
        "score": "1:10:22.7",
        "date": "2026-02-18",
        "status": "Terminé"
      },
      {
        "event": "12,5 km départ groupé femmes",
        "position": "1",
        "score": "37:18.1",
        "date": "2026-02-21",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Mass-start 12,5km (Femmes)"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Sprint 7,5km (Femmes)"
      }
    ]
  },
  "Emily Harrop": {
    "slug": "emily-harrop",
    "discipline": "Ski-alpinisme",
    "medals": {
      "gold": 1,
      "silver": 1,
      "bronze": 0
    },
    "birthdate": "1997-09-27",
    "birthCity": "Bourg-Saint-Maurice (Savoie)",
    "handicap": null,
    "bio": {
      "brief": [
        "Médaillée d'argent sur le sprint aux Jeux Olympiques de Milan-Cortina 2026",
        "Méthodique",
        "Explosive",
        "Membre de l'Armée des Champions"
      ],
      "paragraphs": [
        "Au cœur de la Tarentaise, Emily Harrop a grandi dans un décor façonné par la neige et les sommets. Cette vallée savoyarde, qui avait accueilli les Jeux Olympiques d’hiver d’Albertville en 1992, a vu éclore une athlète appelée à marquer l’histoire d’un sport en pleine révolution : le ski-alpinisme, désormais discipline olympique aux Jeux d’hiver de Milan-Cortina.",
        "Issue d’une famille britannique installée dans les Alpes françaises, Emily Harrop découvre très tôt la montagne. Adolescente, elle s’oriente d’abord vers le ski alpin, où elle obtient d'excellents résultats nationaux, notamment un titre de championne de France junior de descente. Mais une blessure vient freiner sa progression et bouleverser sa trajectoire sportive. Ce coup d’arrêt devient un tournant décisif. À 20 ans, elle se réinvente et se consacre pleinement au ski-alpinisme, discipline exigeante mêlant endurance, explosivité, technique et sens tactique.",
        "Emily Harrop découvre la Coupe du monde lors de la saison 2019-2020. Son adaptation est immédiate. Très vite, elle s’installe parmi l’élite mondiale, collectionne les podiums et révèle une affinité particulière avec le sprint, format nerveux et spectaculaire où chaque erreur se paie comptant. Le 16 décembre 2021, elle remporte à Adamello, en Italie, sa première victoire en Coupe du monde, précisément dans cette spécialité qui deviendra sa marque de fabrique."
      ]
    },
    "results": [
      {
        "event": "Sprint classique femmes",
        "position": "2",
        "score": "3:02.15",
        "date": "2026-02-19",
        "status": "Terminé"
      },
      {
        "event": "Sprint classique femmes",
        "position": "1",
        "score": "3:06.57",
        "date": "2026-02-19",
        "status": "Terminé"
      },
      {
        "event": "Sprint classique femmes",
        "position": "1",
        "score": "3:03.34",
        "date": "2026-02-19",
        "status": "Terminé"
      },
      {
        "event": "Relais mixte",
        "position": "1",
        "score": "26:57.44",
        "date": "2026-02-21",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Ski-alpinisme - Sprint (femmes)"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Ski-alpinisme - Relais par équipes mixtes"
      }
    ]
  },
  "Laurence Fournier Beaudry": {
    "slug": "laurence-fournier-beaudry",
    "discipline": "Patinage Artistique",
    "medals": {
      "gold": 1,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1992-07-18",
    "birthCity": "LaSalle (Canada)",
    "handicap": null,
    "bio": {
      "brief": [
        "Singulière",
        "Résiliente",
        "Inspirante"
      ],
      "paragraphs": [
        "Laurence Fournier Beaudry est une patineuse artistique spécialisée en danse sur glace. Son parcours s’inscrit dans une discipline où l’exigence technique ne vaut que si elle sert la ligne, la musicalité et l’émotion. Elle s'est d'abord concentrée sur la gymnastique, lorsqu'elle était enfant, et a commencé le patinage en 2001, à l'âge de neuf ans, à la demande de ses parents, qui étaient des patineurs amateurs. Sur la glace, elle se distingue par un patinage précis et une présence raffinée, au service d’un style qui privilégie la justesse du mouvement et la clarté du récit.",
        "Fait rare à ce niveau, elle a représenté trois nations au cours de sa carrière : le Canada, le Danemark, puis la France. Avec son ancien partenaire Nikolaj Sørensen, elle s’est construite une solide réputation internationale et s’est imposée sur plusieurs scènes majeures, avec notamment trois titres de championne du Danemark, puis un titre de championne du Canada en 2023, jalons importants d’une trajectoire au plus haut niveau de la danse sur glace.",
        "Elle a également participé aux Jeux Olympiques d’hiver de Pékin 2022, et a pris part à de grands rendez-vous internationaux, dont les championnats du monde 2024 à Montréal, à domicile pour elle. En 2025, Laurence Fournier Beaudry a décidé de s'associer à Guillaume Cizeron, son ami de longue date, pour représenter la France et donner un nouvel élan à sa carrière. Ce nouveau duo s’inscrit dans une dynamique ambitieuse, tournée vers les grandes échéances, avec une volonté claire : conjuguer l’exigence du très haut niveau à l’élégance propre à la danse sur glace, et porter ce projet vers l’objectif Olympique de Milan-Cortina 2026."
      ]
    },
    "results": [
      {
        "event": "Épreuve par équipes",
        "position": "2",
        "score": "89.98",
        "date": "2026-02-06",
        "status": "Terminé"
      },
      {
        "event": "Danse sur glace",
        "position": "1",
        "score": "90.18",
        "date": "2026-02-09",
        "status": "Terminé"
      },
      {
        "event": "Danse sur glace",
        "position": "1",
        "score": "225.82",
        "date": "2026-02-11",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Danse sur glace mixte"
      }
    ]
  },
  "Romane Miradoli": {
    "slug": "romane-miradoli",
    "discipline": "Ski Alpin",
    "medals": {
      "gold": 0,
      "silver": 1,
      "bronze": 0
    },
    "birthdate": "1994-03-10",
    "birthCity": "Bonneville (Haute-Savoie)",
    "handicap": null,
    "bio": {
      "brief": [
        "Médaillée d'argent en super-G aux Jeux Olympiques de Milan-Cortina 2026.",
        "Régulière",
        "Ambitieuse",
        "Membre de l'Armée des Champions"
      ],
      "paragraphs": [
        "Spécialiste des disciplines de vitesse, Romane Miradoli est devenue, au fil des saisons, la principale chance française de médaille chez les femmes lors des grandes compétitions internationales. En descente comme en super-G, elle a bâti un palmarès fondé sur la régularité et la répétition des performances, avec quatorze top 5 en Coupe du monde, dont la grande majorité en super-G, discipline dans laquelle elle s’est installée durablement parmi les meilleures mondiales.",
        "Le tournant de sa carrière est intervenu à l’hiver 2021-2022, lorsqu’elle a remporté son premier succès en Coupe du monde lors du super-G de Lenzerheide, en Suisse. Cette victoire a ouvert une nouvelle séquence, marquée par une confiance renforcée et une meilleure régularité. Depuis, elle a ajouté quatre autres podiums, tous en super-G, à Saint-Moritz, Cortina d’Ampezzo, La Thuile et de nouveau Saint-Moritz, portant son total à cinq podiums internationaux, un chiffre record pour une Française dans cette spécialité ces dernières années.",
        "Ses saisons récentes ont confirmé cette montée en puissance. En 2022-2023 puis en 2023-2024, elle a signé à chaque fois un podium et plusieurs top 10 en super-G, tout en restant compétitive en descente. L’hiver 2024-2025 a marqué un nouveau cap, avec un podium et quatre top 10 en super-G, preuve d’une régularité désormais installée au plus haut niveau. Cette constance s’est traduit par une présence quasi-systématique dans le haut du panier, quelles que soient les conditions."
      ]
    },
    "results": [
      {
        "event": "Descente femmes",
        "position": "16",
        "score": "1:38.10",
        "date": "2026-02-08",
        "status": "Terminé"
      },
      {
        "event": "Combiné alpin par équipes femmes",
        "position": null,
        "score": "N'a pas terminé",
        "date": "2026-02-10",
        "status": "Terminé"
      },
      {
        "event": "Combiné alpin par équipes femmes",
        "position": "8",
        "score": "1:37.37",
        "date": "2026-02-10",
        "status": "Terminé"
      },
      {
        "event": "Super-G femmes",
        "position": "2",
        "score": "1:23.82",
        "date": "2026-02-12",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Super-G"
      }
    ]
  },
  "Perrine Laffont": {
    "slug": "perrine-laffont",
    "discipline": "Ski Freestyle",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 1
    },
    "birthdate": "1998-10-18",
    "birthCity": "Lavelanet (Ariège)",
    "handicap": null,
    "bio": {
      "brief": [
        "Championne olympique en 2018 et médaillée de bronze en 2026",
        "6 titres de championne du monde",
        "Membre de l'Armée des Champions"
      ],
      "paragraphs": [
        "Perrine Laffont est la première Française à avoir obtenu une médaille d’or olympique dans l’épreuve des bosses. L’exploit s’est produit à Pyeongchang en 2018, alors qu’elle était tout juste âgée de 19 ans. Depuis, elle a été sacrée championne du monde de la même discipline à Almaty en 2021, à Bakuriani en 2023 et à Engadin en 2025, après avoir été titrée en bosses parallèles en 2017, en 2019 et en 2023.",
        "La skieuse ariégeoise a également remporté la Coupe du monde des bosses à quatre reprises en 2018, 2019, 2020 et 2021 sans compter deux gros globes. Originaire de Lavelanet, « Pépette » (surnom donné par ses proches) s’est formée auprès de ses parents dans la station des Monts-d’Olmes. Perrine Laffont est très vite sortie du lot, s’imposant aux championnats du monde juniors en 2013, à l’âge de 14 ans, avant de récidiver en 2015 et en 2016.",
        "Sa première participation aux Jeux Olympiques remonte à 2014, à Sotchi. Alors âgée de 15 ans, Perrine Laffont se qualifie pour la finale et finit 14 e des bosses. C’est quatre ans plus tard, à Pyeongchang, que la Française réalise un sans-faute et finit 1 re de la finale avec 9 centièmes d’avance sur la Canadienne Justine Dufour-Lapointe, la tenante du titre. Elle apporte une deuxième médaille féminine à la France dans cette épreuve, 12 ans après Sandra Laoura à Turin. Rappelons qu’Edgar Grospiron avait été sacré chez les messieurs en 1992 à Albertville."
      ]
    },
    "results": [
      {
        "event": "Bosses femmes",
        "position": "4",
        "score": "79.47",
        "date": "2026-02-10",
        "status": "Terminé"
      },
      {
        "event": "Bosses femmes",
        "position": "3",
        "score": "78.00",
        "date": "2026-02-11",
        "status": "Terminé"
      },
      {
        "event": "Bosses femmes",
        "position": "8",
        "score": "76.21",
        "date": "2026-02-11",
        "status": "Terminé"
      },
      {
        "event": "Bosses en parallèle femmes",
        "position": "2",
        "score": "17",
        "date": "2026-02-14",
        "status": "Terminé"
      },
      {
        "event": "Bosses en parallèle femmes",
        "position": null,
        "score": "N'a pas terminé",
        "date": "2026-02-14",
        "status": "Terminé"
      },
      {
        "event": "Bosses en parallèle femmes",
        "position": "1",
        "score": "18",
        "date": "2026-02-14",
        "status": "Terminé"
      },
      {
        "event": "Bosses en parallèle femmes",
        "position": "1",
        "score": "21",
        "date": "2026-02-14",
        "status": "Terminé"
      },
      {
        "event": "Bosses en parallèle femmes",
        "position": "1",
        "score": "29",
        "date": "2026-02-14",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Bronze",
        "event": "Bosses"
      },
      {
        "year": 2023,
        "games": null,
        "medal": "Argent",
        "event": "Bosses"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Or",
        "event": "Bosses"
      }
    ]
  },
  "Léa Casta": {
    "slug": "lea-casta",
    "discipline": "Snowboard",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 1
    },
    "birthdate": "2006-02-10",
    "birthCity": "Thonon-les-Bains (Haute-Savoie)",
    "handicap": null,
    "bio": {
      "brief": [
        "Précoce",
        "Dominatrice",
        "Solide",
        "Membre de l'Armée des Champions"
      ],
      "paragraphs": [
        "À seulement 19 ans, Léa Casta a déjà changé de statut dans le monde du snowboard cross. Depuis décembre 2024, la rideuse française s’est imposée comme l’une des figures majeures du snowboard cross mondial, avec cinq victoires en Coupe du monde et treize podiums à son actif sur le circuit. Son premier succès est intervenu à Cervinia lors de l’ouverture de la saison 2024-2025, point de départ d’une ascension fulgurante qui l’a conduite, quelques mois plus tard, au sommet du classement général.",
        "En effet, elle a été dominatrice sur l’ensemble de l’hiver en accumulant neuf podiums dont quatre victoires en dix courses, creusant un écart significatif au classement général. Elle a terminé avec 183 points d’avance sur Charlotte Bankes et 331 sur Julia Nirani-Pereira, scellant l’obtention du gros globe de cristal dès sa deuxième saison complète au plus haut niveau.",
        "Une régularité rare à cet âge, qui a placé la Française dans une catégorie à part. Cette dynamique s’est prolongée sur l’exercice en cours. Déjà victorieuse à Cervinia en 2025-2026, elle a confirmé sa capacité à s’imposer dans des contextes variés, après avoir également gagné à Montafon puis signé un doublé à Mont-Sainte-Anne au printemps précédent. Après trois manches cette saison, elle occupe provisoirement la sixième place du classement général, un positionnement qui ne reflète qu’en partie son potentiel, tant son niveau de performance reste élevé sur chaque sortie."
      ]
    },
    "results": [
      {
        "event": "Snowboard cross femmes",
        "position": "2",
        "score": "1:12.79",
        "date": "2026-02-13",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Bronze",
        "event": "Snowboard cross par équipes mixtes"
      }
    ]
  },
  "Eric Perrot": {
    "slug": "eric-perrot",
    "discipline": "Biathlon",
    "medals": {
      "gold": 2,
      "silver": 1,
      "bronze": 0
    },
    "birthdate": "2001-06-29",
    "birthCity": "Bourg-Saint-Maurice (73)",
    "handicap": null,
    "bio": {
      "brief": [
        "Triple champion du monde",
        "12 victoires en Coupe du monde",
        "127 départs en Coupe du monde"
      ],
      "paragraphs": [
        "Eric Perrot a de qui tenir. Il est le fils de deux anciens biathlètes, Franck Perrot et son épouse norvégienne, Tone Marit Oftedal qui ont été tous les deux champions du monde chez les juniors, Tone Marit en relais et Franck en individuel. Eric Perrot possède ainsi la double nationalité mais il a choisi les couleurs de la France, le pays où il vit. Originaire d’Aime-la-Plagne, il s’est essayé au ski alpin puis a très vite opté pour le biathlon et le club de Peisey Vallandry. Il a fait sa scolarité à Aime avant de passer un an en Norvège. Après avoir obtenu un bac scientifique, Eric Perrot étudie en STAPS à l’Université de Grenoble Alpes dans un programme aménagé pour les sportifs de haut-niveau.",
        "Ses débuts internationaux ont eu lieu lors des championnats du monde juniors 2020 à Lenzerheide où il se classe 15 ème du sprint, 14 ème de la poursuite et 5 ème du relais. Sa première course en Coupe du monde s’est déroulée à Östersund en mars 2021. Entre temps, il revient d'Obertilliach et des championnats du monde juniors 2021 avec deux médailles : l'argent de la poursuite, et l'or en relais avec Oscar Lombardot, Sébastien Mahon et Emilien Claude.",
        "A seulement 20 ans, Eric Perrot obtient son premier top 10 en Coupe du monde, en se classant 8 ème du sprint gagné par son coéquipier Quentin Fillon Maillet à Ruhpolding en janvier 2022, avec un sans-faute au tir. Il se trouve dans les temps de passage de Martin Fourcade qui avait éclos au plus haut niveau au même âge. Antonin Guigonnat dit de lui : ‘’ On a dix ans d’écart. Et à son âge, j’étais loin d’être à ce niveau, j’étais juste dans les rangs juniors. C’est un gamin mais il a de l’ambition. Il a envie d’atteindre le plus haut niveau. »."
      ]
    },
    "results": [
      {
        "event": "Relais mixte 4 x 6km (H+F)",
        "position": "1",
        "score": "1:04:15.5",
        "date": "2026-02-08",
        "status": "Terminé"
      },
      {
        "event": "20 km individuel hommes",
        "position": "2",
        "score": "51:46.3",
        "date": "2026-02-10",
        "status": "Terminé"
      },
      {
        "event": "10 km sprint hommes",
        "position": "9",
        "score": "23:55.2",
        "date": "2026-02-13",
        "status": "Terminé"
      },
      {
        "event": "12,5 km poursuite hommes",
        "position": "4",
        "score": "31:51.4",
        "date": "2026-02-15",
        "status": "Terminé"
      },
      {
        "event": "Relais 4 x 7,5 km hommes",
        "position": "1",
        "score": "1:19:55.2",
        "date": "2026-02-17",
        "status": "Terminé"
      },
      {
        "event": "15 km départ groupé hommes",
        "position": "20",
        "score": "43:01.5",
        "date": "2026-02-20",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais mixte"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Individuel 20km (Hommes)"
      }
    ]
  },
  "Quentin Fillon Maillet": {
    "slug": "quentin-fillon-maillet",
    "discipline": "Biathlon",
    "medals": {
      "gold": 3,
      "silver": 0,
      "bronze": 1
    },
    "birthdate": "1992-08-16",
    "birthCity": "Champagnole (Jura)",
    "handicap": null,
    "bio": {
      "brief": [
        "5 quintuple médaillé olympique à Pékin en 2022",
        "31 victoires en Coupe du monde",
        "Un globe de cristal remporté en 2022",
        "Membre de l'équipe de France Douane"
      ],
      "paragraphs": [
        "Petit, dans sa commune jurassienne de Champagnole, Quentin Fillon Maillet est fan de Guillaume Tell, il se construit un arc et des flèches et joue avec, tout en pratiquant assidument le ski de fond en famille. C'est en regardant à la télévision les épreuves de biathlon des Jeux de Salt Lake City 2002 qu'il tombe amoureux de ce sport. Après des passages remarqués chez les jeunes et les juniors, Quentin Fillon Maillet intègre l'équipe de France en Coupe du monde lors de la saison 20134-2014 et obtient son premier podium individuel la saison suivante, 2 ème de la mass-start de Ruhpolding. Rapide sur les skis, excellent dans les moments de confrontation directe sur le pas de tir, il obtient sa première victoire à l'arrivée de la mass-start d'Anterselva lors de la saison 2018-2019.",
        "N°3 mondial trois saisons consécutivement (2019, 2020, 2021) Quentin Fillon Maillet ne se fixe plus aucune limite. Ayant ajouté cinq médailles mondiales à son palmarès depuis les Jeux 2018, accumulant les podiums en Coupe du monde, membre régulier des relais, champion du monde du relais mixte en 2016 et du relais hommes en 2020, il enregistre chaque saison des victoires individuelles.",
        "La saison 2021/2022 est pour lui une consécration. Après s'être partagé le dossard jaune avec son compatriote Emilien Jacquelin en janvier, il part aux Jeux Olympiques de Pékin avec la position de leader au classement général. C'est lors de ces Jeux d'hiver que Quentin Fillon Maillet va s'illustrer. Il remporte sa première médaille lors de la première épreuve, le relais mixte, en décrochant l'argent en compagnie d'Anaïs Chevalier-Bouchet, Julia Simon et Emilien Jacquelin. Trois jours plus tard il remporte l'individuel et apporte la première médaille d'or à l'Equipe de France à Pékin. Au total, Quentin Fillon Maillet repart avec 5 médailles dont 2 en or et devient le premier athlète français et le premier biathlète à gagner cinq médailles dans une même édition des Jeux Olympiques d'hiver. Pour clôturer cette belle saison, il remporte le gros globe de cristal lors de l'avant dernière étape de Coupe du monde à Otepäa et le petit globe du sprint à Oslo."
      ]
    },
    "results": [
      {
        "event": "Relais mixte 4 x 6km (H+F)",
        "position": "1",
        "score": "1:04:15.5",
        "date": "2026-02-08",
        "status": "Terminé"
      },
      {
        "event": "20 km individuel hommes",
        "position": "8",
        "score": "54:20.9",
        "date": "2026-02-10",
        "status": "Terminé"
      },
      {
        "event": "10 km sprint hommes",
        "position": "1",
        "score": "22:53.1",
        "date": "2026-02-13",
        "status": "Terminé"
      },
      {
        "event": "12,5 km poursuite hommes",
        "position": "7",
        "score": "32:25.4",
        "date": "2026-02-15",
        "status": "Terminé"
      },
      {
        "event": "Relais 4 x 7,5 km hommes",
        "position": "1",
        "score": "1:19:55.2",
        "date": "2026-02-17",
        "status": "Terminé"
      },
      {
        "event": "15 km départ groupé hommes",
        "position": "3",
        "score": "39:42.7",
        "date": "2026-02-20",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Sprint 10km (Hommes)"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Bronze",
        "event": "Mass-start 15km (Hommes)"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais mixte"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Argent",
        "event": "Relais mixte"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Or",
        "event": "Individuel 20km (Hommes)"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Argent",
        "event": "Sprint 10km (Hommes)"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Or",
        "event": "Poursuite 12,5km (Hommes)"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Argent",
        "event": "Relais"
      }
    ]
  },
  "Fabien Claude": {
    "slug": "fabien-claude",
    "discipline": "Biathlon",
    "medals": {
      "gold": 1,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1994-12-22",
    "birthCity": "Epinal (88)",
    "handicap": null,
    "bio": {
      "brief": [
        "Vice-champion olympique de relais en 2022",
        "1 titre de championnes du monde et 9 victoires en Coupe du monde",
        "217 départs en Coupe du monde",
        "Membre de l'Armée des Champions"
      ],
      "paragraphs": [
        "Dans la famille Claude, prenez Fabien, qui court en Coupe du monde depuis la saison 2016-2017. La famille est originaire de la région vosgienne d'Epinal. Son frère ainé Florent porte désormais le maillot de l'équipe de Belgique et le benjamin Emilien est un espoir tricolore. Ils se sont formés au club de Basse-sur-le-Rupt. Sur un plan international, Fabien Claude dispute les premiers Jeux Olympiques de la Jeunesse à Innsbruck en 2012 où il gagne une médaille de bronze dans le relais mixte, avant de briller dans les Mondiaux juniors : médaille d'or du sprint en 2013, puis de la poursuite en 2014. Il sacré ensuite champion d'Europe du sprint en 2015.",
        "Dans sa progression, il débute par des allers-retours entre l'IBU Cup (quatre victoires entre 2016 et 2019) et la Coupe du monde où il devient une présence permanente en équipe de France à partir de la saison 2019-2020, avec un premier podium individuel lors de l'individuel de Pokljuka le 23 janvier 2020.",
        "La saison suivante, Fabien Claude obtient deux nouveaux podiums individuels, et fait partie du relais (avec Emilien Jacquelin, Quentin Fillon Maillet et Antonin Guigonnat) qui s'impose à Anterselva en janvier 2021, puis obtient deux 2 ème places au début de la saison 2021-2022 (avec Emilien Jacquelin, Quentin Fillon Maillet et Simon Desthieux). Il s'affirme au fur et à mesure des saisons avec deux nouveaux podiums individuels en Coupe du monde et des Top 10 de références sur les championnats du monde. A Milan-Cortina, le Spinalien cherchera à remporte sa première individuelle et aussi, à apporter sa pierre à l'édifice des relais, épreuves qu'ils lui réussissent si bien."
      ]
    },
    "results": [
      {
        "event": "20 km individuel hommes",
        "position": "17",
        "score": "55:46.9",
        "date": "2026-02-10",
        "status": "Terminé"
      },
      {
        "event": "10 km sprint hommes",
        "position": "41",
        "score": "25:23.2",
        "date": "2026-02-13",
        "status": "Terminé"
      },
      {
        "event": "12,5 km poursuite hommes",
        "position": "24",
        "score": "34:22.4",
        "date": "2026-02-15",
        "status": "Terminé"
      },
      {
        "event": "Relais 4 x 7,5 km hommes",
        "position": "1",
        "score": "1:19:55.2",
        "date": "2026-02-17",
        "status": "Terminé"
      },
      {
        "event": "15 km départ groupé hommes",
        "position": "27",
        "score": "45:13.7",
        "date": "2026-02-20",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Argent",
        "event": "Relais"
      }
    ]
  },
  "Emilien Jacquelin": {
    "slug": "emilien-jacquelin",
    "discipline": "Biathlon",
    "medals": {
      "gold": 1,
      "silver": 0,
      "bronze": 1
    },
    "birthdate": "1995-07-11",
    "birthCity": "Grenoble (Isère)",
    "handicap": null,
    "bio": {
      "brief": [
        "Double vice-champion olympique en 2022",
        "5 titres de champion du monde et 14 victoires en Coupe du monde",
        "244 départs en Coupe du monde",
        "Membre de l'équipe de France Douane"
      ],
      "paragraphs": [
        "Émilien Jacquelin a rêvé de devenir champion cycliste dans son enfance, et plus particulièrement de courir le Tour de France. Il part en sports-études à Grenoble dans cette perspective. Mais il contracte une mononucléose et doit changer ses plans. Né dans les montagnes, il intègre le pôle espoir de Villard de Lans en ski de fond, mais il choisit finalement le biathlon tout en restant un grand amoureux du cyclisme. Il gravit tous les échelons, médaillé de bronze de l'Individuel aux championnats du monde jeune 2014, médaille d'argent de la poursuite au Mondial junior 2016, podiums et victoires sur le circuit IBU Cup, avant de rejoindre l'équipe de France pour débuter en Coupe du monde lors de la saison 2017-2018, où il se fait suffisamment remarquer pour partir disputer les Jeux de PyeongChang.",
        "Par la suite, Emilien Jacquelin atteint un incroyable sommet lors des championnats du monde d'Anterselva 2020, où il remporte la médaille d'or de la poursuite en prenant le meilleur sur Johannes Boe, et où il monte sur quatre podiums : encore champion du monde avec le relais masculin tricolore, en bronze dans la mass-start, et dans le relais mixte simple avec Anaïs Bescond. Lors des Mondiaux suivant à Pokljuka 2021, il est en bronze sur le sprint puis... conserve son titre de la poursuite ! Le double champion du monde signe enfin sa première victoire lors d'une saison régulière de Coupe du monde en s'imposant dans la mass-start du Grand Bornand le 19 décembre 2021, il porte pour la première fois le dossard jaune de leader du classement général après cette victoire. A 26 ans, sa progression est régulière, son tir (notamment debout) s'améliore et de grandes choses restent à venir.",
        "Sa saison 2021/2022 commence bien ! Après trois podiums, Emilien Jacquelin remporte sa première victoire à la maison au Grand Bornand sur la mass starrt et s'empare ainsi du dossard jaune qu'il lèguera à son compatriote, Quentin Fillon-Maillet après la Coupe du monde à Oberhof. Il remporte ses deux premières médailles olympiques lors des Jeux de Pékin en 2022."
      ]
    },
    "results": [
      {
        "event": "20 km individuel hommes",
        "position": "55",
        "score": "58:59.4",
        "date": "2026-02-10",
        "status": "Terminé"
      },
      {
        "event": "10 km sprint hommes",
        "position": "4",
        "score": "23:09.2",
        "date": "2026-02-13",
        "status": "Terminé"
      },
      {
        "event": "12,5 km poursuite hommes",
        "position": "3",
        "score": "31:41.6",
        "date": "2026-02-15",
        "status": "Terminé"
      },
      {
        "event": "Relais 4 x 7,5 km hommes",
        "position": "1",
        "score": "1:19:55.2",
        "date": "2026-02-17",
        "status": "Terminé"
      },
      {
        "event": "15 km départ groupé hommes",
        "position": "12",
        "score": "41:56.7",
        "date": "2026-02-20",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Relais"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Bronze",
        "event": "Poursuite 12,5km (Hommes)"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Argent",
        "event": "Relais mixte"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Argent",
        "event": "Relais"
      }
    ]
  },
  "Mathis Desloges": {
    "slug": "mathis-desloges",
    "discipline": "Ski de Fond",
    "medals": {
      "gold": 0,
      "silver": 3,
      "bronze": 0
    },
    "birthdate": "2002-05-01",
    "birthCity": "Saint-Martin-d'Hères (Isère)",
    "handicap": null,
    "bio": {
      "brief": [
        "Triple médaillé d'argent aux Jeux Olympiques de Milan-Cortina 2026",
        "Précautionneux",
        "Constant",
        "Membre de l'équipe de la police nationale"
      ],
      "paragraphs": [
        "Né à Saint-Martin-d’Hères et formé sur les pistes du Vercors, Mathis Desloges a grandi dans un environnement où le ski de fond faisait partie du quotidien. Installé très tôt à Villard-de-Lans, il découvre l’effort long au fil des saisons, sur des terrains exigeants qui ont façonné son rapport à l’entraînement. Il privilégie le plaisir de l’endurance, la répétition des sorties et le contact permanent avec la nature. Cette relation au ski le conduit à s’orienter naturellement vers les formats distance, tout en conservant une polyvalence devenue essentielle dans le fond moderne.",
        "Chez les catégories jeunes, il a rapidement confirmé son potentiel. En février 2024, à Planica, en Slovénie, il devient champion du monde U23 du 20 kilomètres, au terme d’une course maîtrisée dans des conditions difficiles. Ce titre constitue un moment déterminant dans sa carrière. Il confirme quelques semaines plus tard sur le circuit continental, en s’imposant comme l’un des fondeurs espoirs les plus réguliers de sa génération. Cette réussite lui permet d’intégrer durablement le groupe Coupe du monde et de franchir une étape décisive vers le très haut niveau.",
        "La saison suivante a marqué son entrée dans la cour des grands. Pour ses premiers championnats du monde élites en 2025 à Trondheim, il prend la 6ᵉ place du skiathlon, au contact direct des meilleurs spécialistes mondiaux, avant de contribuer à la 4ᵉ place du relais français. Cette saison, il a signé sa meilleure performance en Coupe du monde avec une 6ᵉ place sur le 20 kilomètres de Ruka, puis un top 10 à Davos sur le 10 kilomètres libre. Ces résultats confirment sa capacité à soutenir un rythme élevé sur des courses longues, face à des pelotons très denses."
      ]
    },
    "results": [
      {
        "event": "Skiathlon 10 km + 10 km hommes",
        "position": "2",
        "score": "46:13.0",
        "date": "2026-02-08",
        "status": "Terminé"
      },
      {
        "event": "Individuel 10 km libre hommes",
        "position": "2",
        "score": "20:41.1",
        "date": "2026-02-13",
        "status": "Terminé"
      },
      {
        "event": "Relais 4 x 7,5 km hommes",
        "position": "2",
        "score": "1:04:46.7",
        "date": "2026-02-15",
        "status": "Terminé"
      },
      {
        "event": "Sprint libre par équipes hommes",
        "position": "12",
        "score": "18:47.87",
        "date": "2026-02-18",
        "status": "Terminé"
      },
      {
        "event": "Sprint libre par équipes hommes",
        "position": "6",
        "score": "5:52.67",
        "date": "2026-02-18",
        "status": "Terminé"
      },
      {
        "event": "50 km classique départ en ligne hommes",
        "position": "33",
        "score": "2:22:53.6",
        "date": "2026-02-21",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Individuel 10 km libre (Hommes)"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Relais"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Skiathlon - 10 km + 10 km (Hommes)"
      }
    ]
  },
  "Thibault Anselmet": {
    "slug": "thibault-anselmet",
    "discipline": "Ski-alpinisme",
    "medals": {
      "gold": 1,
      "silver": 0,
      "bronze": 1
    },
    "birthdate": "1997-11-02",
    "birthCity": "Chambéry (Savoie)",
    "handicap": null,
    "bio": {
      "brief": [
        "Médaillé de bronze sur le sprint aux Jeux Olympiques de Milan-Cortina 2026",
        "Lucide",
        "Tacticien",
        "Membre de l'Armée des Champions"
      ],
      "paragraphs": [
        "Thibault Anselmet a grandi au pied du col de l’Iseran et il découvre très tôt le ski-alpinisme, une discipline alors confidentielle, devenue aujourd’hui olympique. Chez les Anselmet, le ski-alpinisme est une affaire de famille : son père Fabien, ancien membre de l’équipe de France, lui transmet la passion et la culture de la montagne, tandis que son frère cadet Jérémy évolue lui aussi sur le circuit mondial.",
        "Formé d’abord en ski alpin, Thibault bifurque à 11 ans vers le ski-alpinisme. Longtemps, il ne se projette pas dans une carrière de haut niveau. Le véritable déclic survient à 19 ans, lorsqu’il porte pour la première fois la combinaison de l’équipe de France grâce au Bataillon de Joinville. Il comprend alors qu’il possède le potentiel pour jouer les premiers rôles. Inspiré par des références comme Kilian Jornet ou Robert Antonioli, il débute en Coupe du monde à 23 ans et s’impose immédiatement parmi l’élite.",
        "Dès la saison 2021, le passionné de photographie animale termine deuxième du classement général mondial et remporte le globe de la Vertical. Frustré par ces places d’honneur, il apprend à mieux gérer la pression et à ajuster son approche mentale. Ce travail de fond porte ses fruits en 2023, lorsqu’il décroche son premier gros globe de cristal, avant de confirmer avec trois globes consécutifs (2023, 2024, 2025), symbole d’une régularité exceptionnelle au plus haut niveau."
      ]
    },
    "results": [
      {
        "event": "Sprint classique hommes",
        "position": "3",
        "score": "2:36.34",
        "date": "2026-02-19",
        "status": "Terminé"
      },
      {
        "event": "Sprint classique hommes",
        "position": "3",
        "score": "2:37.17",
        "date": "2026-02-19",
        "status": "Terminé"
      },
      {
        "event": "Sprint classique hommes",
        "position": "2",
        "score": "2:46.98",
        "date": "2026-02-19",
        "status": "Terminé"
      },
      {
        "event": "Relais mixte",
        "position": "1",
        "score": "26:57.44",
        "date": "2026-02-21",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Bronze",
        "event": "Ski-alpinisme - Sprint (hommes)"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Ski-alpinisme - Relais par équipes mixtes"
      }
    ]
  },
  "Guillaume Cizeron": {
    "slug": "guillaume-cizeron",
    "discipline": "Patinage Artistique",
    "medals": {
      "gold": 1,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1994-11-12",
    "birthCity": "Montbrison (Loire)",
    "handicap": null,
    "bio": {
      "brief": [
        "Double champion olympique en 2022 et 2026",
        "Visionnaire",
        "Légende"
      ],
      "paragraphs": [
        "Guillaume Cizeron s’impose comme l’une des grandes figures du sport français contemporain. Issu d’un milieu où l’art occupe une place centrale, avec une mère enseignante de danse, un père engagé dans le développement du patinage sur glace, il grandit à la croisée de la rigueur sportive et de la création artistique. Très tôt, il conçoit le patinage non seulement comme une discipline de performance, mais comme un langage, un moyen d’expression destiné à émouvoir, attaché à \"donner du sens\" au mouvement.",
        "Cette vision trouve un écho exceptionnel dans le partenariat formé dès l’enfance avec Gabriella Papadakis. Ensemble, ils gravissent les échelons à une vitesse inédite et bouleversent les codes de la danse sur glace. Champions du monde dès 2015, pour leur deuxième saison seulement chez les seniors, ils imposent un style épuré, fluide et profondément musical, qui redéfinit les standards de la discipline. Leur domination s’inscrit dans la durée malgré les obstacles : blessures, saisons écourtées, pression médiatique et rivalité intense avec les Canadiens Tessa Virtue et Scott Moir.",
        "L’épisode des Jeux olympiques de Pyeongchang en 2018, marqué par une médaille d’argent frustrante, agit comme un tournant. Loin de s’enfermer dans la déception, le duo transforme cette expérience en moteur. Quatre ans plus tard, à Pékin, Papadakis et Cizeron atteignent leur sommet en décrochant le titre olympique, avant de conclure leur aventure commune par un cinquième sacre mondial à Montpellier, devant le public français. Un accomplissement historique, qui fait d’eux les danseurs sur glace les plus titrés de l’histoire du patinage français."
      ]
    },
    "results": [
      {
        "event": "Épreuve par équipes",
        "position": "2",
        "score": "89.98",
        "date": "2026-02-06",
        "status": "Terminé"
      },
      {
        "event": "Danse sur glace",
        "position": "1",
        "score": "90.18",
        "date": "2026-02-09",
        "status": "Terminé"
      },
      {
        "event": "Danse sur glace",
        "position": "1",
        "score": "225.82",
        "date": "2026-02-11",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Danse sur glace mixte"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Or",
        "event": "Danse sur glace mixte"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Argent",
        "event": "Danse sur glace mixte"
      }
    ]
  },
  "Hugo Lapalus": {
    "slug": "hugo-lapalus",
    "discipline": "Ski de Fond",
    "medals": {
      "gold": 0,
      "silver": 1,
      "bronze": 0
    },
    "birthdate": "1998-07-09",
    "birthCity": "Annecy (Haute-Savoie)",
    "handicap": null,
    "bio": {
      "brief": [
        "Endurant",
        "Régulier",
        "Compétiteur",
        "Membre de l'Armée des Champions"
      ],
      "paragraphs": [
        "Spécialiste confirmé des courses de distance, Hugo Lapalus a construit sa carrière autour d’un choix clair : s’exprimer sur les formats exigeants de 10 à 50 kilomètres, où la résistance à l’effort, la gestion de course et la solidité mentale sont déterminantes. Il a progressivement orienté son travail vers une maîtrise complète des deux techniques, classique et skating, en accordant une attention constante à la qualité gestuelle autant qu’au volume d’entraînement. Cette approche lui a permis de s’installer durablement en Coupe du monde, avec une présence régulière aux avant-postes sur les épreuves de fond.",
        "Son parcours chez les jeunes a rapidement confirmé ce potentiel. Il est double médaillé de bronze aux Championnats du monde juniors, à chaque fois en relais, un indicateur précoce de sa capacité à tenir un rôle précis dans un cadre collectif. Ces résultats se sont accompagnés de performances individuelles solides, qui l’ont progressivement conduit vers le circuit senior sans rupture majeure dans sa progression.",
        "La saison 2020-2021 a marqué une étape déterminante. Très visible sur le Tour de Ski, épreuve reine du ski de fond par l’enchaînement des formats et des difficultés, Hugo Lapalus a terminé l’épreuve dans le top 10 du classement général, démontrant sa capacité à encaisser les efforts répétés sur plusieurs jours. Il a ensuite remporté le titre de champion du monde U23 du 15 km libre à Vuokatti, en Finlande, confirmant son statut parmi les meilleurs de sa génération sur les formats de distance."
      ]
    },
    "results": [
      {
        "event": "Skiathlon 10 km + 10 km hommes",
        "position": "5",
        "score": "46:15.3",
        "date": "2026-02-08",
        "status": "Terminé"
      },
      {
        "event": "Individuel 10 km libre hommes",
        "position": "8",
        "score": "21:27.3",
        "date": "2026-02-13",
        "status": "Terminé"
      },
      {
        "event": "Relais 4 x 7,5 km hommes",
        "position": "2",
        "score": "1:04:46.7",
        "date": "2026-02-15",
        "status": "Terminé"
      },
      {
        "event": "50 km classique départ en ligne hommes",
        "position": "34",
        "score": "2:22:53.6",
        "date": "2026-02-21",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Relais"
      }
    ]
  },
  "Victor Lovera": {
    "slug": "victor-lovera",
    "discipline": "Ski de Fond",
    "medals": {
      "gold": 0,
      "silver": 1,
      "bronze": 0
    },
    "birthdate": "2000-06-05",
    "birthCity": "Sappey (Isère)",
    "handicap": null,
    "bio": {
      "brief": [
        "Endurant",
        "Rigoureux",
        "Déterminé",
        "Membre de l'équipe de France Douane"
      ],
      "paragraphs": [
        "S’imposer durablement en Coupe du monde tout en menant des études d’ingénieur de haut niveau représente un défi rare, que Victor Lovera a choisi d’embrasser pleinement. À l’aube de la saison 2025-2026, première qu’il dispute dans son intégralité parmi l’élite mondiale, le fondeur français a décidé d'avancer avec une ligne claire et une vision assumée de la performance, fondée sur la constance, la réflexion et le temps long.",
        "Pendant longtemps, il a été peu attiré par la compétition puis Victor Lovera a développé à l’adolescence un attachement progressif à l’entraînement et au travail quotidien. À partir de 15 ans, il a décidé de s’y consacrer pleinement, un engagement qui l’a amené au Pôle Espoir de Villard-de-Lans puis à un premier jalon majeur avec le titre de champion de France junior en 2017. La suite de son parcours a confirmé son potentiel sur la scène internationale junior, marquée notamment par une huitième place aux Championnats du monde juniors 2020, avant qu’une blessure sérieuse au dos en 2021 ne freine brutalement son ascension.",
        "Cette épreuve a ouvert une phase de reconstruction patiente et exigeante. En rejoignant le Team Vercors Isère, Victor Lovera a retrouvé progressivement son meilleur niveau et a su se redonner les moyens d’exister au plus haut niveau. Dès 2023, il a découvert la Coupe du monde, puis il a franchi un cap lors de la saison 2024-2025, particulièrement sur le 10 km skate, distance sur laquelle il a su se montrer le plus performant. Sa septième place aux Rousses, meilleur résultat français de la saison sur ce format, suivie d’une treizième place à Cogne et de plusieurs top 20, l'a installé parmi les athlètes compétitifs du circuit. Ces performances lui ont permis de disputer les Championnats du monde 2025 à Trondheim, conclus par une vingt-et-unième place sur le 50 km."
      ]
    },
    "results": [
      {
        "event": "Skiathlon 10 km + 10 km hommes",
        "position": "15",
        "score": "47:23.1",
        "date": "2026-02-08",
        "status": "Terminé"
      },
      {
        "event": "Individuel 10 km libre hommes",
        "position": "10",
        "score": "21:32.4",
        "date": "2026-02-13",
        "status": "Terminé"
      },
      {
        "event": "Relais 4 x 7,5 km hommes",
        "position": "2",
        "score": "1:04:46.7",
        "date": "2026-02-15",
        "status": "Terminé"
      },
      {
        "event": "50 km classique départ en ligne hommes",
        "position": "8",
        "score": "2:11:29.9",
        "date": "2026-02-21",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Relais"
      }
    ]
  },
  "Loan Bozzolo": {
    "slug": "loan-bozzolo",
    "discipline": "Snowboard",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 1
    },
    "birthdate": "1999-05-04",
    "birthCity": "Sallanches (Haute-Savoie)",
    "handicap": null,
    "bio": {
      "brief": [
        "Médaillée de bronze par équipes mixtes aux Jeux Olympiques de Milan-Cortina 2026 avec Léa Casta",
        "Trois participations aux Jeux d'hiver : PyeongChang 2018, Pékin 2022 et Milan-Cortina 2026.",
        "Vice-champion du monde individuel et champion du monde par équipes en mars 2025",
        "Son surnom : Turbozz"
      ],
      "paragraphs": [
        "Surnommé « Turbozz », Loan Bozzolo a commencé le snowboard à l'âge de 5 ans. Tellement pressé, il avait même confondu les chaussures de ski et les bottes de snow avant de monter sur la planche. Le rider de Saint Gervais est resté assez longtemps un polyvalent participant aux championnats de France en halfpipe et en slopestyle. Il a été champion de France de snowboard cross en 2017 mais s’est véritablement révélé en 2019 lors des championnats du monde juniors de Reiteralm en Autriche, où il s’était adjugé deux médailles d’or, l’une en individuel et l’autre par équipes avec Chloë Passerat. Cette année-là, il avait aussi multiplié les victoires en Coupe d’Europe. En 2021, le Haut-Savoyard s’est régulièrement classé parmi les 20 meilleurs en Coupe du monde.",
        "En mars 2025, à un an des Jeux de Milan, il avait remporté l’épreuve de Coupe du monde de Montafon (Autriche), sa deuxième victoire après celle décrochée en décembre 2022 à Cervinia (Italie). Une semaine plus tard, le natif de Sallanches est devenu vice-champion du monde à Saint-Moritz, soit la première médaille mondiale française individuelle depuis le titre de Pierre Vaultier en 2017 dans la discipline. Sur ces mêmes championnats, il avait remporté le titre de champion du monde par équipes à Engadin.",
        "Suivi par un fan-club très actif le « Turbozz Fan Club », Loan Bozzolo est l'un des leaders de l'équipe de France de snowboard cross. Le 18 janvier 2025, lors de la dernière étape de Coupe du monde avant les Jeux Olympiques de Milan-Cortina, sur la piste chinoise de Dongbeiya, il s'est hissé à deux reprises en petite finale (7 e et 8 e )."
      ]
    },
    "results": [
      {
        "event": "Snowboard cross hommes",
        "position": "5",
        "score": "1:08.22",
        "date": "2026-02-12",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Bronze",
        "event": "Snowboard cross par équipes mixtes"
      }
    ]
  },
  "Cécile Hernandez": {
    "slug": "cecile-hernandez",
    "discipline": "Para Snowboard",
    "medals": {
      "gold": 2,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1974-06-19",
    "birthCity": "Perpignan (Pyrénnées-Orientales)",
    "handicap": "Sclérose en plaque",
    "bio": {
      "brief": [],
      "paragraphs": [
        "Cécile Hernandez pratique le BMX dès l’âge de 10 ans, et participe aux plus grandes compétitions au niveau européen. Lors de ses études de journalisme à Montpellier, elle découvre le snowboard et a immédiatement un coup de cœur pour cette discipline.",
        "En 2002, elle est diagnostiquée d’une sclérose en plaque mais poursuit ses projets professionnels. C’est par le journalisme qu’elle entre dans le monde du parasport. En 2013, à la suite d’une rencontre avec Patrice Baraterro, para snowboardeur en équipe de France, l’encourage à essayer le para snowboard. Elle progresse très rapidement, intègre l’équipe de France et participe à ses premières coupes du monde.",
        "Aux Jeux Paralympiques de Sotchi 2014, elle décroche une médaille d’argent en snowboard cross. Quatre ans plus tard, elle remporte la médaille de bronze aux Jeux de PyeongChang 2018. À la suite de la suppression de sa catégorie de handicap (LL1), Cécile mène un long combat pour participer aux Jeux de Pékin 2022 dans une catégorie avec des athlètes dont le handicap est moins lourd. L’autorisation lui est accordé deux semaines avant le départ des Jeux. Une bataille qui en valait la peine, puis qu’elle devient championne paralympique, à l’âge de 47 ans !"
      ]
    },
    "results": [
      {
        "event": "Snowboard Cross Femmes SB-LL2",
        "position": "2",
        "score": "57.91",
        "date": "2026-03-07",
        "status": "Terminé"
      },
      {
        "event": "Snowboard Cross Femmes SB-LL2",
        "position": "2",
        "score": "59.08",
        "date": "2026-03-07",
        "status": "Terminé"
      },
      {
        "event": "Banked slalom Femmes SB-LL2",
        "position": "4",
        "score": "1:04.63",
        "date": "2026-03-13",
        "status": "Terminé"
      },
      {
        "event": "Banked slalom Femmes SB-LL2",
        "position": "3",
        "score": "1:04.50",
        "date": "2026-03-13",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Snowboard Cross SB-LL2 (Femmes)"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Snowboard cross par équipes mixtes"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Or",
        "event": "Snowboard Cross SB-LL2 (Femmes)"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Bronze",
        "event": "Snowboard Cross SB-LL1 (Femmes)"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Argent",
        "event": "Banked Slalom SB-LL1 (Femmes)"
      },
      {
        "year": 2014,
        "games": null,
        "medal": "Argent",
        "event": "Snowboard Cross SB-LL1 (Femmes)"
      }
    ]
  },
  "Aurélie Richard": {
    "slug": "aurelie-richard",
    "discipline": "Para Ski Alpin",
    "medals": {
      "gold": 0,
      "silver": 3,
      "bronze": 1
    },
    "birthdate": "2005-06-15",
    "birthCity": "Gap (Hautes-Alpes)",
    "handicap": null,
    "bio": {
      "brief": [],
      "paragraphs": [
        "Aurélie Richard découvre le ski à l’âge de 2 ans et demi. Elle débute dans le club de Queyras à 5 ans et demi avant de rejoindre le club handisport de Briançon. En 2019, à seulement 13 ans, elle intègre l’équipe de France de para ski alpin et dispute ses premières compétitions internationales en coupes d’Europe. Deux ans plus tard, elle participe aux Jeux Européens Paralympiques de la Jeunesse, où elle remporte deux médailles d’or, en slalom et en géant.",
        "Son ascension est rapide, mais freinée par deux blessures majeures. En 2021, une première blessure la prive des Jeux Paralympiques de Pékin 2022. Elle revient sur les pistes en 2023 et réalise une saison remarquable marquée par deux titres de vice-championne du monde et un globe de cristal. En 2024, Aurélie subit une nouvelle blessure mais parvient malgré tout à terminer 3ème du classement général de la coupe du monde en 2025. Elle confirme son niveau à l’international en remportant deux médailles d’or aux Jeux Mondiaux Universitaires d’Hiver.",
        "En parallèle à sa carrière sportive, la jeune femme est étudiante en licence STAPS à l’université de Grenoble et bénéficie d’un aménagement lui permettant de concilier sport de haut niveau et études."
      ]
    },
    "results": [
      {
        "event": "Descente Femmes Debout",
        "position": "2",
        "score": "1:23.71",
        "date": "2026-03-07",
        "status": "Terminé"
      },
      {
        "event": "Super G Femmes Debout",
        "position": "2",
        "score": "1:17.56",
        "date": "2026-03-09",
        "status": "Terminé"
      },
      {
        "event": "Combiné Alpin Debout femmes",
        "position": "2",
        "score": "2:07.18",
        "date": "2026-03-10",
        "status": "Terminé"
      },
      {
        "event": "Combiné Alpin Debout femmes",
        "position": "2",
        "score": "1:17.90",
        "date": "2026-03-10",
        "status": "Terminé"
      },
      {
        "event": "Slalom géant Femmes Debout",
        "position": "3",
        "score": "2:27.04",
        "date": "2026-03-12",
        "status": "Terminé"
      },
      {
        "event": "Slalom géant Femmes Debout",
        "position": "3",
        "score": "1:12.22",
        "date": "2026-03-12",
        "status": "Terminé"
      },
      {
        "event": "Slalom Femmes Debout",
        "position": "5",
        "score": "1:29.47",
        "date": "2026-03-14",
        "status": "Terminé"
      },
      {
        "event": "Slalom Femmes Debout",
        "position": "5",
        "score": "44.30",
        "date": "2026-03-14",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Descente debout - LW1 à LW9"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Super G debout - LW1 à LW9"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Combiné alpin debout - LW1 à LW9"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Bronze",
        "event": "Slalom géant debout - LW1 à LW9"
      }
    ]
  },
  "Arthur Bauchet": {
    "slug": "arthur-bauchet",
    "discipline": "Para Ski Alpin",
    "medals": {
      "gold": 2,
      "silver": 1,
      "bronze": 0
    },
    "birthdate": "2000-10-10",
    "birthCity": "Saint-Tropez (Var)",
    "handicap": "Paraparésie Spastique",
    "bio": {
      "brief": [],
      "paragraphs": [
        "Né non loin de la mer, dans le Golfe de Saint-Tropez, c’est pourtant pour les montagnes et le ski alpin qu’Arthur Bauchet va avoir un coup de cœur. Après de multiples week-ends passés à dévaler les pistes, il commence rapidement la compétition en valide, avant que n’apparaissent les premiers symptômes de sa maladie, à l’âge de 10 ans.",
        "Désormais, Arthur s’illustre au plus haut niveau de para ski alpin. Il a ainsi remporté, à 17 ans, quatre titres de vice-champion paralympique aux Jeux de PyeongChang, en 2018. Depuis, il a remporté trois gros globes de cristal d’affilés. Les Jeux de Pékin 2022 sont la consécration : il y remporte 3 médailles d'or et une belle médaille de bronze.",
        "En parallèle de sa carrière de sportif de haut-niveau, Arthur est étudiant en licence de physique-chimie."
      ]
    },
    "results": [
      {
        "event": "Descente Hommes Debout",
        "position": "2",
        "score": "1:18.40",
        "date": "2026-03-07",
        "status": "Terminé"
      },
      {
        "event": "Super G Hommes Debout",
        "position": null,
        "score": "N'a pas terminé",
        "date": "2026-03-09",
        "status": "Terminé"
      },
      {
        "event": "Combiné Alpin Debout hommes",
        "position": "1",
        "score": "1:58.17",
        "date": "2026-03-10",
        "status": "Terminé"
      },
      {
        "event": "Combiné Alpin Debout hommes",
        "position": "5",
        "score": "1:15.25",
        "date": "2026-03-10",
        "status": "Terminé"
      },
      {
        "event": "Slalom géant Hommes Debout",
        "position": "1",
        "score": "2:07.76",
        "date": "2026-03-13",
        "status": "Terminé"
      },
      {
        "event": "Slalom géant Hommes Debout",
        "position": "1",
        "score": "1:04.07",
        "date": "2026-03-13",
        "status": "Terminé"
      },
      {
        "event": "Slalom Hommes Debout",
        "position": "11",
        "score": "1:37.90",
        "date": "2026-03-15",
        "status": "Terminé"
      },
      {
        "event": "Slalom Hommes Debout",
        "position": "20",
        "score": "56.09",
        "date": "2026-03-15",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Descente debout - LW1 à LW9"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Combiné alpin debout - LW1 à LW9"
      },
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "Slalom géant debout - LW1 à LW9"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Or",
        "event": "Descente debout - LW1 à LW9"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Or",
        "event": "Combiné alpin debout - LW1 à LW9"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Bronze",
        "event": "Slalom géant debout - LW1 à LW9"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Or",
        "event": "Slalom debout - LW1 à LW9"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Argent",
        "event": "Slalom debout - LW1 à LW9"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Argent",
        "event": "Descente debout - LW1 à LW9"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Argent",
        "event": "Super G debout - LW1 à LW9"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Argent",
        "event": "Combiné alpin debout - LW1 à LW9"
      }
    ]
  },
  "Karl Tabouret": {
    "slug": "karl-tabouret",
    "discipline": "Para Ski de Fond",
    "medals": {
      "gold": 1,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "2003-05-03",
    "birthCity": "Albertville (Savoie)",
    "handicap": null,
    "bio": {
      "brief": [],
      "paragraphs": [
        "Karl Tabouret pratique le para ski nordique depuis l'âge de 8 ans. A seulement 17 ans, il est repéré par l’équipe de France handisport et rejoint le groupe Jeunes à Potentiel. En 2020, il débute les compétitions internationales et s’impose en remportant trois médailles d’or (biathlon, sprint, classique) aux Jeux Européens Paralympiques de la Jeunesse en Pologne.",
        "En 2024, il rejoint la cour des grands et participe aux circuits des coupes du monde. Il finit la saison avec la victoire de l'étape en para ski de fond en sprint classique et 5km free à Beitostølen en Norvège. Lors de la saison 2025, Karl devient champion du monde en sprint classique et décroche également le titre de vice-champion du monde sur le 10km classique.",
        "Espoir de la discipline, Karl fait partie de la nouvelle génération du para ski nordique. Ambitieux, il est prêt à tout donner lors de sa première participation aux Jeux Paralympiques de Milan-Cortina 2026."
      ]
    },
    "results": [
      {
        "event": "Sprint Hommes Debout",
        "position": "12",
        "score": "19:24.4",
        "date": "2026-03-07",
        "status": "Terminé"
      },
      {
        "event": "Sprint Hommes Style libre Debout",
        "position": "4",
        "score": "2:54.4",
        "date": "2026-03-10",
        "status": "Terminé"
      },
      {
        "event": "Sprint Hommes Style libre Debout",
        "position": "4",
        "score": "2:28.91",
        "date": "2026-03-10",
        "status": "Terminé"
      },
      {
        "event": "10 km Individuel Classique Debout hommes",
        "position": "1",
        "score": "27:10.7",
        "date": "2026-03-11",
        "status": "Terminé"
      },
      {
        "event": "Sprint Poursuite Debout hommes",
        "position": "11",
        "score": "12:55.8",
        "date": "2026-03-13",
        "status": "Terminé"
      },
      {
        "event": "Sprint Poursuite Debout hommes",
        "position": "9",
        "score": "10:34.2",
        "date": "2026-03-13",
        "status": "Terminé"
      },
      {
        "event": "Relais 4x2,5 km Open",
        "position": "6",
        "score": "23:47.6",
        "date": "2026-03-14",
        "status": "Terminé"
      },
      {
        "event": "20 km Individuel Libre Debout hommes",
        "position": "11",
        "score": "45:20.2",
        "date": "2026-03-15",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Or",
        "event": "10km debout - LW2 à LW9"
      }
    ]
  },
  "Benjamin Daviet": {
    "slug": "benjamin-daviet",
    "discipline": "Para Ski de Fond",
    "medals": {
      "gold": 0,
      "silver": 1,
      "bronze": 0
    },
    "birthdate": "1989-06-16",
    "birthCity": "Annecy (Haute-Savoie)",
    "handicap": null,
    "bio": {
      "brief": [],
      "paragraphs": [
        "Originaire de la vallée du Bouchet, Benjamin Daviet pratique plusieurs sports dont le football et le ski de fond, avant qu’un accident à l’adolescence bouleverse son parcours. Après une longue convalescence, en 2010, à l’âge de 21 ans, il décide de se reprendre en main et de rechausser les skis, d’abord avec son oncle, puis avec le ski club du Grand Bornand. Six mois plus tard, en mars 2011, il intègre le collectif France.",
        "Depuis, Benjamin devient la tête d'affiche du para ski nordique français en remportant de nombreux titres et médailles. Depuis sa première participation aux Jeux Paralympiques à Sotchi 2014, il compte 10 médailles (5 or, 4 argent, 1 bronze), mais est également 9 fois champions du monde en para ski de fond et para biathlon.",
        "Porte-drapeau de la cérémonie de clôture des Jeux de PyeongChang 2018, il est désigné porte-drapeau de la cérémonie d’ouverture des Jeux de Pékin 2022."
      ]
    },
    "results": [
      {
        "event": "Sprint Hommes Debout",
        "position": "7",
        "score": "18:33.1",
        "date": "2026-03-07",
        "status": "Terminé"
      },
      {
        "event": "Individuel Hommes Debout",
        "position": "8",
        "score": "33:15.6",
        "date": "2026-03-08",
        "status": "Terminé"
      },
      {
        "event": "Sprint Hommes Style libre Debout",
        "position": "3",
        "score": "2:42.2",
        "date": "2026-03-10",
        "status": "Terminé"
      },
      {
        "event": "Sprint Hommes Style libre Debout",
        "position": "3",
        "score": "2:53.3",
        "date": "2026-03-10",
        "status": "Terminé"
      },
      {
        "event": "Sprint Hommes Style libre Debout",
        "position": "9",
        "score": "2:34.30",
        "date": "2026-03-10",
        "status": "Terminé"
      },
      {
        "event": "Sprint Poursuite Debout hommes",
        "position": "6",
        "score": "12:05.0",
        "date": "2026-03-13",
        "status": "Terminé"
      },
      {
        "event": "Sprint Poursuite Debout hommes",
        "position": "6",
        "score": "10:17.5",
        "date": "2026-03-13",
        "status": "Terminé"
      },
      {
        "event": "Relais 4x2,5 km Open",
        "position": "6",
        "score": "23:47.6",
        "date": "2026-03-14",
        "status": "Terminé"
      },
      {
        "event": "Relais 4x2,5 km Open",
        "position": "6",
        "score": "23:47.6",
        "date": "2026-03-14",
        "status": "Terminé"
      },
      {
        "event": "20 km Individuel Libre Debout hommes",
        "position": "12",
        "score": "45:48.3",
        "date": "2026-03-15",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Argent",
        "event": "Sprint 10km (Hommes)"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Argent",
        "event": "Moyenne distance 12,5km (Hommes) - LW2 à LW9"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Or",
        "event": "Sprint debout - LW2 à LW9"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Or",
        "event": "Individuel 15km (Hommes) - LW2 à LW9"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Argent",
        "event": "Relais open debout - LW2 à LW9"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Or",
        "event": "Relais open debout - LW2 à LW9"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Argent",
        "event": "20km debout - LW2 à LW9"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Or",
        "event": "Sprint 7,5km (Hommes) - LW2 à LW9"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Or",
        "event": "Moyenne distance 12,5km (Hommes) - LW2 à LW9"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Argent",
        "event": "Individuel 15km (Hommes) - LW2 à LW9"
      },
      {
        "year": 2014,
        "games": null,
        "medal": "Bronze",
        "event": "Relais open debout - LW2 à LW9"
      }
    ]
  },
  "Jules Segers": {
    "slug": "jules-segers",
    "discipline": "Para Ski Alpin",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 1
    },
    "birthdate": "2002-11-18",
    "birthCity": "Ambilly (Haute-Savoie)",
    "handicap": "physique",
    "bio": {
      "brief": [],
      "paragraphs": [
        "Originaire de la station des Gets, en Haute-Savoie, Jules Segers chausse ses premiers skis dès l’âge de 3 ans. Issu d’une famille de sportifs, le goût pour la compétition et le dépassement de soi sont inscrits dans ses gènes, il intègre rapidement le ski club de compétition des Gets.",
        "En 2017, il rejoint le groupe relève de l’équipe de France de para ski alpin. Trois ans plus tard, en 2020, il participe aux Jeux Européens Paralympiques de la Jeunesse en Pologne et y décroche une médaille d’argent en géant. En 2021, il accède au groupe élite et se qualifie à ses premiers Jeux Paralympiques à Pékin 2022, à seulement 19 ans.",
        "Depuis, il enchaine les performances au plus haut niveau, multipliant les podiums en coupe du monde et aux championnats du monde, avec notamment deux médailles de bronze aux mondiaux de Maribor en 2025."
      ]
    },
    "results": [
      {
        "event": "Super G Hommes Debout",
        "position": "3",
        "score": "1:13.59",
        "date": "2026-03-09",
        "status": "Terminé"
      },
      {
        "event": "Combiné Alpin Debout hommes",
        "position": null,
        "score": "N'a pas terminé",
        "date": "2026-03-10",
        "status": "Terminé"
      },
      {
        "event": "Combiné Alpin Debout hommes",
        "position": "7",
        "score": "1:15.69",
        "date": "2026-03-10",
        "status": "Terminé"
      },
      {
        "event": "Slalom géant Hommes Debout",
        "position": "5",
        "score": "2:13.49",
        "date": "2026-03-13",
        "status": "Terminé"
      },
      {
        "event": "Slalom géant Hommes Debout",
        "position": "6",
        "score": "1:06.62",
        "date": "2026-03-13",
        "status": "Terminé"
      },
      {
        "event": "Slalom Hommes Debout",
        "position": "4",
        "score": "1:32.29",
        "date": "2026-03-15",
        "status": "Terminé"
      },
      {
        "event": "Slalom Hommes Debout",
        "position": "3",
        "score": "47.40",
        "date": "2026-03-15",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Bronze",
        "event": "Super G debout - LW1 à LW9"
      }
    ]
  },
  "Anthony Chalençon et son guide Florian Michelon": {
    "slug": "anthony-chalencon",
    "discipline": "Para Ski de Fond",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 1
    },
    "birthdate": "1990-08-13",
    "birthCity": "Evian (Haute-Savoie)",
    "handicap": "Déficient visuel",
    "bio": {
      "brief": [],
      "paragraphs": [
        "Ancien para skieur alpin ayant participé aux Jeux Paralympiques de Vancouver en 2010, Anthony Chalençon évolue aujourd’hui sur le circuit international de para ski nordique. Originaire de Morzine-Avoriaz, il dispute les épreuves de para biathlon et para ski de fond.",
        "Aux Jeux de PyeongChang 2018, accompagné de son guide Simon Valverde, Anthony réalise une performance exceptionnelle en décrochant une médaille de bronze en para biathlon longue distance 15km, malgré une concurrence dominée par les skieurs ukrainiens. Emmené avec détermination et cohésion par le tempo de Simon, il confirme sa constante progression et le duo conclut ces Jeux avec deux médailles, une de bronze en individuel et une en or lors de l’incroyable relais de l’équipe de France.",
        "L’année suivante, aux championnats du monde, Anthony s’offre le bronze en biathlon middle style libre et l’argent sur le relais Open. 4 ans plus tard, aux Jeux Paralympiques de Pékin 2022, il remporte une nouvelle médaille d’argent sur le relais avec Benjamin Daviet et ses deux guides, Brice Ottonello et Alexandre Pouyé. En 2024, il fait équipe avec Florian Michelon et décroche une médaille de bronze aux championnats du monde sur le sprint 7,5km. Un résultat qu’ils réitèrent l’année suivante."
      ]
    },
    "results": [
      {
        "event": "Sprint Hommes Déficients visuels",
        "position": "10",
        "score": "20:40.4",
        "date": "2026-03-07",
        "status": "Terminé"
      },
      {
        "event": "Individuel Hommes Déficients visuels",
        "position": "9",
        "score": "39:45.7",
        "date": "2026-03-08",
        "status": "Terminé"
      },
      {
        "event": "Sprint Poursuite Déficient Visuel hommes",
        "position": "9",
        "score": "15:53.0",
        "date": "2026-03-13",
        "status": "Terminé"
      },
      {
        "event": "Sprint Poursuite Déficient Visuel hommes",
        "position": "10",
        "score": "12:18.9",
        "date": "2026-03-13",
        "status": "Terminé"
      },
      {
        "event": "Relais 4x2,5 km Open",
        "position": "6",
        "score": "23:47.6",
        "date": "2026-03-14",
        "status": "Terminé"
      },
      {
        "event": "20 km Individuel Libre Déficient Visuel hommes",
        "position": "3",
        "score": "43:21.9",
        "date": "2026-03-15",
        "status": "Terminé"
      }
    ],
    "palmares": [
      {
        "year": 2026,
        "games": null,
        "medal": "Bronze",
        "event": "20km - B1, B2, B3"
      },
      {
        "year": 2022,
        "games": null,
        "medal": "Argent",
        "event": "Relais open - B1, B2, B3"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Or",
        "event": "Relais open - B1, B2, B3"
      },
      {
        "year": 2018,
        "games": null,
        "medal": "Bronze",
        "event": "Individuel 15 km (Hommes) - B1, B2, B3"
      }
    ]
  }
};
