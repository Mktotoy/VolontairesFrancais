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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": null
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
    "handicap": "Sclérose en plaque"
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
    "handicap": null
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
    "handicap": "Paraparésie Spastique"
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
    "handicap": null
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
    "handicap": null
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
    "handicap": "physique"
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
    "handicap": "Déficient visuel"
  }
};
