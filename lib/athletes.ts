// Candidats du vote "Athlètes qui vous ont marqués, Milano Cortina 2026"
// Fin des votes : 2 septembre 2026

export const VOTE_DEADLINE = new Date('2026-09-02T23:59:59+02:00');

export const CATEGORIES = [
  {
    key: 'vote_olympique_femme',
    label: 'Athlète olympique féminine',
    emoji: '🏅',
    candidates: [
      'Lou Jeanmonnot',
      'Julia Simon',
      'Camille Bened',
      'Océane Michelon',
      'Emily Harrop',
      'Laurence Fournier Beaudry',
      'Romane Miradoli',
      'Perrine Laffont',
      'Léa Casta',
    ],
  },
  {
    key: 'vote_olympique_homme',
    label: 'Athlète olympique masculin',
    emoji: '🏅',
    candidates: [
      'Eric Perrot',
      'Quentin Fillon Maillet',
      'Fabien Claude',
      'Emilien Jacquelin',
      'Mathis Desloges',
      'Thibault Anselmet',
      'Guillaume Cizeron',
      'Hugo Lapalus',
      'Victor Lovera',
      'Loan Bozzolo',
    ],
  },
  {
    key: 'vote_paralympique_femme',
    label: 'Athlète paralympique féminine',
    emoji: '🏅',
    candidates: [
      'Cécile Hernandez',
      'Aurélie Richard',
    ],
  },
  {
    key: 'vote_paralympique_homme',
    label: 'Athlète paralympique masculin',
    emoji: '🏅',
    candidates: [
      'Arthur Bauchet',
      'Karl Tabouret',
      'Benjamin Daviet',
      'Jules Segers',
      'Anthony Chalençon et son guide Florian Michelon',
    ],
  },
] as const;

export type CategoryKey = typeof CATEGORIES[number]['key'];
