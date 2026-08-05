import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const password = (process.env.SURVEY_PASSWORD || '').replace(/"/g, '');

    if (!authHeader || authHeader.replace(/"/g, '') !== password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const totalResult = await pool.query('SELECT COUNT(*) FROM athlete_votes');

    const tallyResult = await pool.query(`
      SELECT 'vote_olympique_femme' AS category, vote_olympique_femme AS candidate, COUNT(*) AS votes
        FROM athlete_votes GROUP BY vote_olympique_femme
      UNION ALL
      SELECT 'vote_olympique_homme', vote_olympique_homme, COUNT(*)
        FROM athlete_votes GROUP BY vote_olympique_homme
      UNION ALL
      SELECT 'vote_paralympique_femme', vote_paralympique_femme, COUNT(*)
        FROM athlete_votes GROUP BY vote_paralympique_femme
      UNION ALL
      SELECT 'vote_paralympique_homme', vote_paralympique_homme, COUNT(*)
        FROM athlete_votes GROUP BY vote_paralympique_homme
      ORDER BY category, votes DESC
    `);

    return NextResponse.json({
      total: parseInt(totalResult.rows[0].count, 10),
      tally: tallyResult.rows,
    });
  } catch (error) {
    console.error('Athlete vote results error:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}
