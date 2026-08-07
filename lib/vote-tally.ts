// Agrégation des votes (indépendante du backend : fichiers locaux ou WordPress MySQL).
import { CATEGORIES } from './athletes';
import type { AthleteVote } from './vote-store';

export interface CategoryTally {
  key: string;
  label: string;
  results: { name: string; votes: number; pct: number }[];
}

export interface VoteTally {
  total: number;
  firstVoteAt: string | null;
  lastVoteAt: string | null;
  categories: CategoryTally[];
  entries: { email: string; submittedAt: string; votes: Record<string, string> }[];
}

export function tally(votes: AthleteVote[]): VoteTally {
  const counts: Record<string, Record<string, number>> = {};
  for (const cat of CATEGORIES) counts[cat.key] = {};

  const dates = votes.map((v) => v.submittedAt).filter(Boolean).sort();

  for (const vote of votes) {
    for (const cat of CATEGORIES) {
      const choice = vote.votes?.[cat.key];
      if (choice && (cat.candidates as readonly string[]).includes(choice)) {
        counts[cat.key][choice] = (counts[cat.key][choice] || 0) + 1;
      }
    }
  }

  const total = votes.length;
  return {
    total,
    firstVoteAt: dates[0] ?? null,
    lastVoteAt: dates[dates.length - 1] ?? null,
    categories: CATEGORIES.map((cat) => ({
      key: cat.key,
      label: cat.label,
      results: cat.candidates
        .map((name) => {
          const n = counts[cat.key][name] || 0;
          return { name, votes: n, pct: total ? Math.round((n / total) * 100) : 0 };
        })
        .sort((a, b) => b.votes - a.votes),
    })),
    entries: votes.map((v) => ({ email: v.email, submittedAt: v.submittedAt, votes: v.votes })),
  };
}
