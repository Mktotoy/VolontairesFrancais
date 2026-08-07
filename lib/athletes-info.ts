// Cache local des infos athlètes, extrait de
// https://resultats.equipedefrance.com/milano-cortina-2026/data/drupal-athletes.json
// (généré hors-ligne, aucune dépendance runtime au site externe).
export interface AthleteInfo {
  slug: string;
  discipline: string | null;
  medals: { gold: number; silver: number; bronze: number };
  birthdate: string | null;
  birthCity: string | null;
  handicap: string | null;
  bio: string | null;
}

export const ATHLETES_INFO: Record<string, AthleteInfo> = {
  "Lou Jeanmonnot": {
    "slug": "lou-jeanmonnot",
    "discipline": "Biathlon",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1998-10-28",
    "birthCity": "Pontarlier (Doubs)",
    "handicap": null,
    "bio": "4 titres mondiaux en relais 43 podiums en Coupes du monde dont 23 victoires 118 départs en Coupes du monde Membre de l'Armée des Champions Avant d'être la biathlète reconnue par ses pairs, Lou Jeanmonnot a longtemps hésité entre sa future discipline et le VTT. Mais à l'âge de 16 ans, il fallait faire un choix et l'adolescente originaire de Pontarlier a décidé, grand bien lui fasse, d'opter pour les skis après avoir débuté le biathlon en 2012."
  },
  "Julia Simon": {
    "slug": "julia-simon",
    "discipline": "Biathlon",
    "medals": {
      "gold": 0,
      "silver": 1,
      "bronze": 0
    },
    "birthdate": "1996-10-09",
    "birthCity": "Albertville (Savoie)",
    "handicap": null,
    "bio": "Vice-championne olympique de relais mixte en 2022 10 titres de championnes du monde et 23 victoires en Coupe du monde Un globe de cristal remporté en 2022 Membre de l'équipe de France Douane Née à Albertville, Julia Simon chausse très rapidement les skis en débutant par le ski alpin et le ski de fond. Très vite, elle décide de consacrer au nordique et de s'orienter vers le biathlon. Elle débute la compétition en 2013 en junior et devient championne de France de mass start et championne du monde en relais."
  },
  "Camille Bened": {
    "slug": "camille-bened",
    "discipline": "Biathlon",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "2000-09-06",
    "birthCity": "Evian-les-Bains (Haute-Savoie)",
    "handicap": null,
    "bio": "Début en Coupe du monde en 2025 3 podiums en Coupes du monde Vainqueur du classement général de l'IBU Cup en 2024/2025 Camille Bened commence le ski à l'âge de 4 ans, poussé par ses parents. Avec sa sœur Chloé, de deux ans sa cadette, l'amour pour le ski les pousse à choisir entre le ski alpin et le ski nordique : plus ludique, c'est cette dernière discipline qui remportera les suffrages familiaux."
  },
  "Océane Michelon": {
    "slug": "oceane-michelon",
    "discipline": "Biathlon",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "2002-03-04",
    "birthCity": "Chambéry (Savoie)",
    "handicap": null,
    "bio": "Doublée médaillée aux championnats du monde 2025 Meilleure jeune de la Coupe du monde 2024-2025 43 départs en Coupe du monde Membre de l'Armée des Champions Comment expliquer la notion de \"saison de la révélation\" à quelqu'un ? Il suffit de revenir sur la saison 2024-2025 d'Océane Michelon ! Avant cela, la Chambérienne a construit sa carrière à l'aide d'une progression constante : triple médaillée aux championnats du monde juniors entre 2020 et 2022, elle avance prudemment."
  },
  "Emily Harrop": {
    "slug": "emily-harrop",
    "discipline": "Ski-alpinisme",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1997-09-27",
    "birthCity": "Bourg-Saint-Maurice (Savoie)",
    "handicap": null,
    "bio": "Médaillée d'argent sur le sprint aux Jeux Olympiques de Milan-Cortina 2026 Méthodique Explosive Membre de l'Armée des Champions Au cœur de la Tarentaise, Emily Harrop a grandi dans un décor façonné par la neige et les sommets. Cette vallée savoyarde, qui avait accueilli les Jeux Olympiques d’hiver d’Albertville en 1992, a vu éclore une athlète appelée à marquer l’histoire d’un sport en pleine révolution : le ski-alpinisme, désormais discipline olympique aux Jeux d’hiver de Milan-Cortina."
  },
  "Laurence Fournier Beaudry": {
    "slug": "laurence-fournier-beaudry",
    "discipline": "Patinage Artistique",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1992-07-18",
    "birthCity": "LaSalle (Canada)",
    "handicap": null,
    "bio": "Singulière Résiliente Inspirante Laurence Fournier Beaudry est une patineuse artistique spécialisée en danse sur glace. Son parcours s’inscrit dans une discipline où l’exigence technique ne vaut que si elle sert la ligne, la musicalité et l’émotion. Elle s'est d'abord concentrée sur la gymnastique, lorsqu'elle était enfant, et a commencé le patinage en 2001, à l'âge de neuf ans, à la demande de ses parents, qui étaient des patineurs amateurs."
  },
  "Romane Miradoli": {
    "slug": "romane-miradoli",
    "discipline": "Ski Alpin",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1994-03-10",
    "birthCity": "Bonneville (Haute-Savoie)",
    "handicap": null,
    "bio": "Médaillée d'argent en super-G aux Jeux Olympiques de Milan-Cortina 2026. Régulière Ambitieuse Membre de l'Armée des Champions Spécialiste des disciplines de vitesse, Romane Miradoli est devenue, au fil des saisons, la principale chance française de médaille chez les femmes lors des grandes compétitions internationales."
  },
  "Perrine Laffont": {
    "slug": "perrine-laffont",
    "discipline": "Ski Freestyle",
    "medals": {
      "gold": 1,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1998-10-18",
    "birthCity": "Lavelanet (Ariège)",
    "handicap": null,
    "bio": "Championne olympique en 2018 et médaillée de bronze en 2026 6 titres de championne du monde Membre de l'Armée des Champions Perrine Laffont est la première Française à avoir obtenu une médaille d’or olympique dans l’épreuve des bosses. L’exploit s’est produit à Pyeongchang en 2018, alors qu’elle était tout juste âgée de 19 ans. Depuis, elle a été sacrée championne du monde de la même discipline à Almaty en 2021, à Bakuriani en 2023 et à Engadin en 2025, après avoir été titrée en bosses parallèles en 2017, en 2019 et en 2023."
  },
  "Léa Casta": {
    "slug": "lea-casta",
    "discipline": "Snowboard",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "2006-02-10",
    "birthCity": "Thonon-les-Bains (Haute-Savoie)",
    "handicap": null,
    "bio": "Précoce Dominatrice Solide Membre de l'Armée des Champions À seulement 19 ans, Léa Casta a déjà changé de statut dans le monde du snowboard cross. Depuis décembre 2024, la rideuse française s’est imposée comme l’une des figures majeures du snowboard cross mondial, avec cinq victoires en Coupe du monde et treize podiums à son actif sur le circuit."
  },
  "Eric Perrot": {
    "slug": "eric-perrot",
    "discipline": "Biathlon",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "2001-06-29",
    "birthCity": "Bourg-Saint-Maurice (73)",
    "handicap": null,
    "bio": "Triple champion du monde 12 victoires en Coupe du monde 127 départs en Coupe du monde Eric Perrot a de qui tenir. Il est le fils de deux anciens biathlètes, Franck Perrot et son épouse norvégienne, Tone Marit Oftedal qui ont été tous les deux champions du monde chez les juniors, Tone Marit en relais et Franck en individuel. Eric Perrot possède ainsi la double nationalité mais il a choisi les couleurs de la France, le pays où il vit."
  },
  "Quentin Fillon Maillet": {
    "slug": "quentin-fillon-maillet",
    "discipline": "Biathlon",
    "medals": {
      "gold": 2,
      "silver": 3,
      "bronze": 0
    },
    "birthdate": "1992-08-16",
    "birthCity": "Champagnole (Jura)",
    "handicap": null,
    "bio": "5 quintuple médaillé olympique à Pékin en 2022 31 victoires en Coupe du monde Un globe de cristal remporté en 2022 Membre de l'équipe de France Douane Petit, dans sa commune jurassienne de Champagnole, Quentin Fillon Maillet est fan de Guillaume Tell, il se construit un arc et des flèches et joue avec, tout en pratiquant assidument le ski de fond en famille. C'est en regardant à la télévision les épreuves de biathlon des Jeux de Salt Lake City 2002 qu'il tombe amoureux de ce sport."
  },
  "Fabien Claude": {
    "slug": "fabien-claude",
    "discipline": "Biathlon",
    "medals": {
      "gold": 0,
      "silver": 1,
      "bronze": 0
    },
    "birthdate": "1994-12-22",
    "birthCity": "Epinal (88)",
    "handicap": null,
    "bio": "Vice-champion olympique de relais en 2022 1 titre de championnes du monde et 9 victoires en Coupe du monde 217 départs en Coupe du monde Membre de l'Armée des Champions Dans la famille Claude, prenez Fabien, qui court en Coupe du monde depuis la saison 2016-2017. La famille est originaire de la région vosgienne d'Epinal. Son frère ainé Florent porte désormais le maillot de l'équipe de Belgique et le benjamin Emilien est un espoir tricolore. Ils se sont formés au club de Basse-sur-le-Rupt."
  },
  "Emilien Jacquelin": {
    "slug": "emilien-jacquelin",
    "discipline": "Biathlon",
    "medals": {
      "gold": 0,
      "silver": 2,
      "bronze": 0
    },
    "birthdate": "1995-07-11",
    "birthCity": "Grenoble (Isère)",
    "handicap": null,
    "bio": "Double vice-champion olympique en 2022 5 titres de champion du monde et 14 victoires en Coupe du monde 244 départs en Coupe du monde Membre de l'équipe de France Douane Émilien Jacquelin a rêvé de devenir champion cycliste dans son enfance, et plus particulièrement de courir le Tour de France. Il part en sports-études à Grenoble dans cette perspective. Mais il contracte une mononucléose et doit changer ses plans."
  },
  "Mathis Desloges": {
    "slug": "mathis-desloges",
    "discipline": "Ski de Fond",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "2002-05-01",
    "birthCity": "Saint-Martin-d'Hères (Isère)",
    "handicap": null,
    "bio": "Triple médaillé d'argent aux Jeux Olympiques de Milan-Cortina 2026 Précautionneux Constant Membre de l'équipe de la police nationale Né à Saint-Martin-d’Hères et formé sur les pistes du Vercors, Mathis Desloges a grandi dans un environnement où le ski de fond faisait partie du quotidien. Installé très tôt à Villard-de-Lans, il découvre l’effort long au fil des saisons, sur des terrains exigeants qui ont façonné son rapport à l’entraînement."
  },
  "Thibault Anselmet": {
    "slug": "thibault-anselmet",
    "discipline": "Ski-alpinisme",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1997-11-02",
    "birthCity": "Chambéry (Savoie)",
    "handicap": null,
    "bio": "Médaillé de bronze sur le sprint aux Jeux Olympiques de Milan-Cortina 2026 Lucide Tacticien Membre de l'Armée des Champions Thibault Anselmet a grandi au pied du col de l’Iseran et il découvre très tôt le ski-alpinisme, une discipline alors confidentielle, devenue aujourd’hui olympique. Chez les Anselmet, le ski-alpinisme est une affaire de famille : son père Fabien, ancien membre de l’équipe de France, lui transmet la passion et la culture de la montagne, tandis que son frère cadet Jérémy évolue lui aussi sur le circuit mondial."
  },
  "Guillaume Cizeron": {
    "slug": "guillaume-cizeron",
    "discipline": "Patinage Artistique",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1994-11-12",
    "birthCity": "Montbrison (Loire)",
    "handicap": null,
    "bio": "Double champion olympique en 2022 et 2026 Visionnaire Légende Guillaume Cizeron s’impose comme l’une des grandes figures du sport français contemporain. Issu d’un milieu où l’art occupe une place centrale, avec une mère enseignante de danse, un père engagé dans le développement du patinage sur glace, il grandit à la croisée de la rigueur sportive et de la création artistique."
  },
  "Hugo Lapalus": {
    "slug": "hugo-lapalus",
    "discipline": "Ski de Fond",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1998-07-09",
    "birthCity": "Annecy (Haute-Savoie)",
    "handicap": null,
    "bio": "Endurant Régulier Compétiteur Membre de l'Armée des Champions Spécialiste confirmé des courses de distance, Hugo Lapalus a construit sa carrière autour d’un choix clair : s’exprimer sur les formats exigeants de 10 à 50 kilomètres, où la résistance à l’effort, la gestion de course et la solidité mentale sont déterminantes. Il a progressivement orienté son travail vers une maîtrise complète des deux techniques, classique et skating, en accordant une attention constante à la qualité gestuelle autant qu’au volume d’entraînement."
  },
  "Victor Lovera": {
    "slug": "victor-lovera",
    "discipline": "Ski de Fond",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "2000-06-05",
    "birthCity": "Sappey (Isère)",
    "handicap": null,
    "bio": "Endurant Rigoureux Déterminé Membre de l'équipe de France Douane S’imposer durablement en Coupe du monde tout en menant des études d’ingénieur de haut niveau représente un défi rare, que Victor Lovera a choisi d’embrasser pleinement. À l’aube de la saison 2025-2026, première qu’il dispute dans son intégralité parmi l’élite mondiale, le fondeur français a décidé d'avancer avec une ligne claire et une vision assumée de la performance, fondée sur la constance, la réflexion et le temps long."
  },
  "Loan Bozzolo": {
    "slug": "loan-bozzolo",
    "discipline": "Snowboard",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "1999-05-04",
    "birthCity": "Sallanches (Haute-Savoie)",
    "handicap": null,
    "bio": "En bref Médaillée de bronze par équipes mixtes aux Jeux Olympiques de Milan-Cortina 2026 avec Léa Casta Trois participations aux Jeux d'hiver : PyeongChang 2018, Pékin 2022 et Milan-Cortina 2026. Vice-champion du monde individuel et champion du monde par équipes en mars 2025 Son surnom : Turbozz Surnommé « Turbozz », Loan Bozzolo a commencé le snowboard à l'âge de 5 ans. Tellement pressé, il avait même confondu les chaussures de ski et les bottes de snow avant de monter sur la planche."
  },
  "Cécile Hernandez": {
    "slug": "cecile-hernandez",
    "discipline": "Para Snowboard",
    "medals": {
      "gold": 1,
      "silver": 2,
      "bronze": 1
    },
    "birthdate": "1974-06-19",
    "birthCity": "Perpignan (Pyrénnées-Orientales)",
    "handicap": "Sclérose en plaque",
    "bio": "Cécile Hernandez pratique le BMX dès l’âge de 10 ans, et participe aux plus grandes compétitions au niveau européen. Lors de ses études de journalisme à Montpellier, elle découvre le snowboard et a immédiatement un coup de cœur pour cette discipline. En 2002, elle est diagnostiquée d’une sclérose en plaque mais poursuit ses projets professionnels. C’est par le journalisme qu’elle entre dans le monde du parasport."
  },
  "Aurélie Richard": {
    "slug": "aurelie-richard",
    "discipline": "Para Ski Alpin",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "2005-06-15",
    "birthCity": "Gap (Hautes-Alpes)",
    "handicap": null,
    "bio": "Aurélie Richard découvre le ski à l’âge de 2 ans et demi. Elle débute dans le club de Queyras à 5 ans et demi avant de rejoindre le club handisport de Briançon. En 2019, à seulement 13 ans, elle intègre l’équipe de France de para ski alpin et dispute ses premières compétitions internationales en coupes d’Europe. Deux ans plus tard, elle participe aux Jeux Européens Paralympiques de la Jeunesse, où elle remporte deux médailles d’or, en slalom et en géant. Son ascension est rapide, mais freinée par deux blessures majeures."
  },
  "Arthur Bauchet": {
    "slug": "arthur-bauchet",
    "discipline": "Para Ski Alpin",
    "medals": {
      "gold": 3,
      "silver": 4,
      "bronze": 1
    },
    "birthdate": "2000-10-10",
    "birthCity": "Saint-Tropez (Var)",
    "handicap": "Paraparésie Spastique",
    "bio": "Né non loin de la mer, dans le Golfe de Saint-Tropez, c’est pourtant pour les montagnes et le ski alpin qu’Arthur Bauchet va avoir un coup de cœur. Après de multiples week-ends passés à dévaler les pistes, il commence rapidement la compétition en valide, avant que n’apparaissent les premiers symptômes de sa maladie, à l’âge de 10 ans. Désormais, Arthur s’illustre au plus haut niveau de para ski alpin. Il a ainsi remporté, à 17 ans, quatre titres de vice-champion paralympique aux Jeux de PyeongChang, en 2018."
  },
  "Karl Tabouret": {
    "slug": "karl-tabouret",
    "discipline": "Para Ski de Fond",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "2003-05-03",
    "birthCity": "Albertville (Savoie)",
    "handicap": null,
    "bio": "Karl Tabouret pratique le para ski nordique depuis l'âge de 8 ans. A seulement 17 ans, il est repéré par l’équipe de France handisport et rejoint le groupe Jeunes à Potentiel. En 2020, il débute les compétitions internationales et s’impose en remportant trois médailles d’or (biathlon, sprint, classique) aux Jeux Européens Paralympiques de la Jeunesse en Pologne. En 2024, il rejoint la cour des grands et participe aux circuits des coupes du monde."
  },
  "Benjamin Daviet": {
    "slug": "benjamin-daviet",
    "discipline": "Para Ski de Fond",
    "medals": {
      "gold": 5,
      "silver": 4,
      "bronze": 1
    },
    "birthdate": "1989-06-16",
    "birthCity": "Annecy (Haute-Savoie)",
    "handicap": null,
    "bio": "Originaire de la vallée du Bouchet, Benjamin Daviet pratique plusieurs sports dont le football et le ski de fond, avant qu’un accident à l’adolescence bouleverse son parcours. Après une longue convalescence, en 2010, à l’âge de 21 ans, il décide de se reprendre en main et de rechausser les skis, d’abord avec son oncle, puis avec le ski club du Grand Bornand. Six mois plus tard, en mars 2011, il intègre le collectif France. Depuis, Benjamin devient la tête d'affiche du para ski nordique français en remportant de nombreux titres et médailles."
  },
  "Jules Segers": {
    "slug": "jules-segers",
    "discipline": "Para Ski Alpin",
    "medals": {
      "gold": 0,
      "silver": 0,
      "bronze": 0
    },
    "birthdate": "2002-11-18",
    "birthCity": "Ambilly (Haute-Savoie)",
    "handicap": "physique",
    "bio": "Originaire de la station des Gets, en Haute-Savoie, Jules Segers chausse ses premiers skis dès l’âge de 3 ans. Issu d’une famille de sportifs, le goût pour la compétition et le dépassement de soi sont inscrits dans ses gènes, il intègre rapidement le ski club de compétition des Gets. En 2017, il rejoint le groupe relève de l’équipe de France de para ski alpin. Trois ans plus tard, en 2020, il participe aux Jeux Européens Paralympiques de la Jeunesse en Pologne et y décroche une médaille d’argent en géant."
  },
  "Anthony Chalençon et son guide Florian Michelon": {
    "slug": "anthony-chalencon",
    "discipline": "Para Ski de Fond",
    "medals": {
      "gold": 1,
      "silver": 1,
      "bronze": 1
    },
    "birthdate": "1990-08-13",
    "birthCity": "Evian (Haute-Savoie)",
    "handicap": "Déficient visuel",
    "bio": "Ancien para skieur alpin ayant participé aux Jeux Paralympiques de Vancouver en 2010, Anthony Chalençon évolue aujourd’hui sur le circuit international de para ski nordique. Originaire de Morzine-Avoriaz, il dispute les épreuves de para biathlon et para ski de fond. Aux Jeux de PyeongChang 2018, accompagné de son guide Simon Valverde, Anthony réalise une performance exceptionnelle en décrochant une médaille de bronze en para biathlon longue distance 15km, malgré une concurrence dominée par les skieurs ukrainiens."
  }
};
