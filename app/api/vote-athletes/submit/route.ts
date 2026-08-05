import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { CATEGORIES, VOTE_DEADLINE } from '@/lib/athletes';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    if (new Date() > VOTE_DEADLINE) {
      return NextResponse.json({ error: 'Les votes sont clos.' }, { status: 403 });
    }

    const data = await req.json();
    const { email, votes } = data as { email?: string; votes?: Record<string, string> };

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    if (!votes) {
      return NextResponse.json({ error: 'Votes manquants.' }, { status: 400 });
    }

    // Validation stricte : chaque choix doit venir de la liste officielle des candidats,
    // jamais de texte libre insere par le client.
    for (const category of CATEGORIES) {
      const choice = votes[category.key];
      if (!choice || !(category.candidates as readonly string[]).includes(choice)) {
        return NextResponse.json(
          { error: `Choix invalide pour la categorie "${category.label}".` },
          { status: 400 }
        );
      }
    }

    const values = [
      votes['vote_olympique_femme'],
      votes['vote_olympique_homme'],
      votes['vote_paralympique_femme'],
      votes['vote_paralympique_homme'],
      email.trim().toLowerCase(),
    ];

    const result = await pool.query(
      `INSERT INTO athlete_votes
         (vote_olympique_femme, vote_olympique_homme, vote_paralympique_femme, vote_paralympique_homme, email)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      values
    );

    return NextResponse.json({ success: true, id: result.rows[0].id }, { status: 201 });
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === '23505') {
      return NextResponse.json(
        { error: 'Un vote a deja ete enregistre avec cet email.' },
        { status: 409 }
      );
    }
    console.error('Athlete vote submission error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'enregistrement du vote.' }, { status: 500 });
  }
}
