import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const password = (process.env.SURVEY_PASSWORD || "").replace(/"/g, '');

    if (!authHeader || authHeader.replace(/"/g, '') !== password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await pool.query('SELECT * FROM survey_responses ORDER BY created_at DESC');

    return NextResponse.json(result.rows);

  } catch (error) {
    console.error('Fetch results error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch survey results' 
    }, { status: 500 });
  }
}
