import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, version, answers } = data;

    const query = `
      INSERT INTO survey_responses (email, answers, version)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    
    const values = [
      email || null,
      JSON.stringify(answers),
      version || 'V4'
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({ 
      success: true, 
      id: result.rows[0].id 
    }, { status: 201 });

  } catch (error) {
    console.error('Survey submission error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to store survey response' 
    }, { status: 500 });
  }
}
