// Backend durable des votes : WordPress espace.volontairesfrancais.fr
// (mu-plugin vf-athlete-votes.php, table MySQL wp_vf_athlete_votes).
// Actif si VF_VOTES_TOKEN est défini ; sinon les routes retombent sur le
// stockage fichiers local (dev, cf. vote-store.ts).
import type { AthleteVote } from './vote-store';

const WP_BASE = process.env.VF_API_BASE || 'https://espace.volontairesfrancais.fr/wp-json/vf/v1';
const TOKEN = process.env.VF_VOTES_TOKEN;

export function wpVotesEnabled(): boolean {
  return !!TOKEN;
}

async function wpFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${WP_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'X-VF-Token': TOKEN as string,
      'User-Agent': 'VolontairesFrancaisNextApp/1.0',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });
}

export async function wpSaveVote(vote: AthleteVote): Promise<{ ok: boolean; status: number; error?: string }> {
  const res = await wpFetch('/votes/submit', {
    method: 'POST',
    body: JSON.stringify({ email: vote.email, votes: vote.votes }),
  });
  if (res.ok) return { ok: true, status: 200 };
  const data = await res.json().catch(() => ({} as { message?: string }));
  return { ok: false, status: res.status, error: (data as { message?: string }).message };
}

export async function wpLoadAllVotes(): Promise<AthleteVote[]> {
  const res = await wpFetch('/votes/results');
  if (!res.ok) throw new Error(`WP votes results HTTP ${res.status}`);
  return (await res.json()) as AthleteVote[];
}
