import { NextRequest, NextResponse } from 'next/server';
import { loadAllVotes } from '@/lib/vote-store';
import { wpVotesEnabled, wpLoadAllVotes } from '@/lib/vote-backend';
import { tally } from '@/lib/vote-tally';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const expected = process.env.SURVEY_PASSWORD;
  if (!expected || authHeader !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const votes = wpVotesEnabled() ? await wpLoadAllVotes() : await loadAllVotes();
    return NextResponse.json({ ...tally(votes), backend: wpVotesEnabled() ? 'wordpress' : 'files' });
  } catch (error) {
    console.error('Athlete vote results error:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}
