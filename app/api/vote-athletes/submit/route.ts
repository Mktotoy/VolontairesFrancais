import { NextRequest, NextResponse } from 'next/server';
import { CATEGORIES, VOTE_DEADLINE } from '@/lib/athletes';
import { hasVoted, saveVote } from '@/lib/vote-store';
import { wpVotesEnabled, wpSaveVote } from '@/lib/vote-backend';

export async function POST(req: NextRequest) {
  try {
    if (new Date() > VOTE_DEADLINE) {
      return NextResponse.json(
        { error: 'Les votes sont clos depuis le 2 septembre 2026.' },
        { status: 403 },
      );
    }

    const { email, votes } = await req.json();

    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }

    for (const cat of CATEGORIES) {
      const choice = votes?.[cat.key];
      if (typeof choice !== 'string' || !(cat.candidates as readonly string[]).includes(choice)) {
        return NextResponse.json(
          { error: `Choix manquant ou invalide pour « ${cat.label} ».` },
          { status: 400 },
        );
      }
    }

    const vote = {
      email: email.trim().toLowerCase(),
      votes: Object.fromEntries(CATEGORIES.map((c) => [c.key, votes[c.key]])),
      submittedAt: new Date().toISOString(),
    };

    if (wpVotesEnabled()) {
      const r = await wpSaveVote(vote);
      if (!r.ok) {
        const msg = r.status === 409
          ? 'Un vote a déjà été enregistré avec cette adresse email.'
          : r.error || "Erreur lors de l'enregistrement du vote.";
        return NextResponse.json({ error: msg }, { status: r.status >= 400 && r.status < 500 ? r.status : 500 });
      }
      return NextResponse.json({ ok: true });
    }

    if (await hasVoted(vote.email)) {
      return NextResponse.json(
        { error: 'Un vote a déjà été enregistré avec cette adresse email.' },
        { status: 409 },
      );
    }
    await saveVote(vote);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Athlete vote submission error:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement du vote." },
      { status: 500 },
    );
  }
}
