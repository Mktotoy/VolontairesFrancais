// Stockage des votes athlètes en fichiers JSON locaux (pas de BDD).
// 1 fichier par email (nom = sha256 de l'email normalisé) : dédup native.
// Limite connue : filesystem éphémère en déploiement cloudrun ; OK pour la
// V1 servie depuis le workspace dev. Backend durable à brancher plus tard.
import { createHash } from 'crypto';
import { mkdir, readdir, readFile, writeFile, access } from 'fs/promises';
import path from 'path';
import { CATEGORIES } from './athletes';

const VOTES_DIR = path.join(process.cwd(), 'data', 'athlete-votes');

export interface AthleteVote {
  email: string;
  votes: Record<string, string>;
  submittedAt: string;
}

function fileFor(email: string): string {
  const hash = createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
  return path.join(VOTES_DIR, `${hash}.json`);
}

export async function hasVoted(email: string): Promise<boolean> {
  try {
    await access(fileFor(email));
    return true;
  } catch {
    return false;
  }
}

export async function saveVote(vote: AthleteVote): Promise<void> {
  await mkdir(VOTES_DIR, { recursive: true });
  await writeFile(fileFor(vote.email), JSON.stringify(vote), 'utf8');
}

export interface CategoryTally {
  key: string;
  label: string;
  results: { name: string; votes: number }[];
}

export async function tallyVotes(): Promise<{ total: number; categories: CategoryTally[] }> {
  let files: string[] = [];
  try {
    files = (await readdir(VOTES_DIR)).filter((f) => f.endsWith('.json'));
  } catch {
    // dossier absent = aucun vote encore
  }

  const counts: Record<string, Record<string, number>> = {};
  for (const cat of CATEGORIES) counts[cat.key] = {};
  let total = 0;

  for (const file of files) {
    try {
      const vote = JSON.parse(await readFile(path.join(VOTES_DIR, file), 'utf8')) as AthleteVote;
      total += 1;
      for (const cat of CATEGORIES) {
        const choice = vote.votes?.[cat.key];
        if (choice && (cat.candidates as readonly string[]).includes(choice)) {
          counts[cat.key][choice] = (counts[cat.key][choice] || 0) + 1;
        }
      }
    } catch {
      // fichier corrompu : ignoré du décompte
    }
  }

  return {
    total,
    categories: CATEGORIES.map((cat) => ({
      key: cat.key,
      label: cat.label,
      results: cat.candidates
        .map((name) => ({ name, votes: counts[cat.key][name] || 0 }))
        .sort((a, b) => b.votes - a.votes),
    })),
  };
}
