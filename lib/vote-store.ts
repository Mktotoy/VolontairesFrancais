// Stockage local des votes en fichiers JSON (fallback dev, sans BDD).
// 1 fichier par email (nom = sha256 de l'email normalisé) : dédup native.
// Backend durable de prod = WordPress MySQL, cf. vote-backend.ts.
import { createHash } from 'crypto';
import { mkdir, readdir, readFile, writeFile, access } from 'fs/promises';
import path from 'path';

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

export async function loadAllVotes(): Promise<AthleteVote[]> {
  let files: string[] = [];
  try {
    files = (await readdir(VOTES_DIR)).filter((f) => f.endsWith('.json'));
  } catch {
    return [];
  }
  const votes: AthleteVote[] = [];
  for (const file of files) {
    try {
      votes.push(JSON.parse(await readFile(path.join(VOTES_DIR, file), 'utf8')) as AthleteVote);
    } catch {
      // fichier corrompu : ignoré
    }
  }
  return votes.sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));
}
