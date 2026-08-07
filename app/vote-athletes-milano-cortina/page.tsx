"use client";

import { useEffect, useState } from 'react';
import { CATEGORIES, VOTE_DEADLINE } from '@/lib/athletes';
import AthleteCard from '@/components/AthleteCard';
import { voteStyles } from './vote-styles';

const DRAFT_KEY = 'athlete-vote-draft';

function loadDraft(): Record<string, string> {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    const valid: Record<string, string> = {};
    for (const cat of CATEGORIES) {
      const v = parsed[cat.key];
      if (typeof v === 'string' && (cat.candidates as readonly string[]).includes(v)) {
        valid[cat.key] = v;
      }
    }
    return valid;
  } catch {
    return {};
  }
}

export default function VoteAthletesPage() {
  const [email, setEmail] = useState('');
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const draft = loadDraft();
    if (Object.keys(draft).length) setVotes(draft);
  }, []);

  const selectAthlete = (categoryKey: string, name: string) => {
    setVotes((v) => {
      const next = { ...v, [categoryKey]: name };
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      } catch {
        // stockage indisponible (navigation privée) : sélection en mémoire seulement
      }
      return next;
    });
  };

  const closed = new Date() > VOTE_DEADLINE;
  const allSelected = CATEGORIES.every((c) => votes[c.key]);
  const styleTag = <style dangerouslySetInnerHTML={{ __html: voteStyles }} />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/vote-athletes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, votes }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Une erreur est survenue.');
        setStatus('error');
        return;
      }
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // ignore
      }
      setStatus('success');
    } catch {
      setErrorMsg('Erreur de connexion au serveur.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="vote-wrap">
        <div className="vote-card success-card">
          <h1>Merci pour votre vote ! 🇫🇷❄️</h1>
          <p>Vos athlètes préférés seront mis à l&apos;honneur lors de l&apos;Assemblée générale du samedi 28 novembre.</p>
        </div>
        {styleTag}
      </section>
    );
  }

  if (closed) {
    return (
      <section className="vote-wrap">
        <div className="vote-card">
          <h1>Les votes sont clos</h1>
          <p>La période de vote s&apos;est terminée le 2 septembre 2026. Merci de votre participation !</p>
        </div>
        {styleTag}
      </section>
    );
  }

  return (
    <section className="vote-wrap">
      <div className="vote-card">
        <h1>Élisez vos athlètes préférés 🏅</h1>
        <p className="intro">
          Les athlètes qui vous ont le plus marqués lors des Jeux Olympiques et Paralympiques
          d&apos;hiver de Milano Cortina 2026. Résultats mis à l&apos;honneur lors de l&apos;Assemblée
          générale du samedi 28 novembre. Fin des votes : <strong>2 septembre 2026</strong>.
        </p>

        <form onSubmit={handleSubmit}>
          {CATEGORIES.map((category) => (
            <fieldset className="vote-category" key={category.key}>
              <legend>{category.emoji} {category.label}</legend>
              <div className="athlete-grid">
                {category.candidates.map((name) => (
                  <AthleteCard
                    key={name}
                    name={name}
                    selected={votes[category.key] === name}
                    onSelect={() => selectAthlete(category.key, name)}
                  />
                ))}
              </div>
            </fieldset>
          ))}

          <div className="email-block">
            <label htmlFor="email">Votre email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="prenom.nom@exemple.fr"
              autoComplete="email"
            />
            <p className="hint">Un seul vote par adresse email.</p>
          </div>

          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          <button type="submit" className="submit-btn" disabled={!allSelected || !email || status === 'loading'}>
            {status === 'loading' ? 'Envoi en cours...' : 'À vos votes… Prêts ? Partez ! 🚀'}
          </button>
        </form>
        <p className="credit">
          Photos, fiches et informations athlètes © CNOSF, equipedefrance.com
          (données Milano Cortina 2026, resultats.equipedefrance.com).
        </p>
      </div>
      {styleTag}
    </section>
  );
}
