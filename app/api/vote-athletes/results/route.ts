import { NextRequest, NextResponse } from 'next/server';
import { tallyVotes } from '@/lib/vote-store';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const expected = process.env.SURVEY_PASSWORD;
  if (!expected || authHeader !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    return NextResponse.json(await tallyVotes());
  } catch (error) {
    console.error('Athlete vote results error:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}
