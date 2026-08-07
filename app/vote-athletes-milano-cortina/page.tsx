"use client";

import { useEffect, useState } from 'react';
import { CATEGORIES, VOTE_DEADLINE } from '@/lib/athletes';
import AthleteCard from '@/components/AthleteCard';
import AthleteModal from '@/components/AthleteModal';
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
  const [modal, setModal] = useState<{ catKey: string; name: string } | null>(null);

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
  const selectedCount = CATEGORIES.filter((c) => votes[c.key]).length;
  const allSelected = selectedCount === CATEGORIES.length;
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
      <section className="status-wrap">
        <div className="status-card">
          <h1>Merci pour votre vote ! 🇫🇷❄️</h1>
          <p>Vos athlètes préférés seront mis à l&apos;honneur lors de l&apos;Assemblée générale du samedi 28 novembre.</p>
        </div>
        {styleTag}
      </section>
    );
  }

  if (closed) {
    return (
      <section className="status-wrap">
        <div className="status-card">
          <h1>Les votes sont clos</h1>
          <p>La période de vote s&apos;est terminée le 2 septembre 2026. Merci de votre participation !</p>
        </div>
        {styleTag}
      </section>
    );
  }

  return (
    <main className="vote-page">
      <header className="vote-header">
        <h1>Élisez vos athlètes préférés 🏅</h1>
        <p className="intro">
          Les athlètes qui vous ont le plus marqués lors des Jeux Olympiques et Paralympiques
          d&apos;hiver de Milano Cortina 2026. Résultats mis à l&apos;honneur lors de l&apos;Assemblée
          générale du samedi 28 novembre. Fin des votes : <strong>2 septembre 2026</strong>.
        </p>
      </header>

      <form className="vote-form" onSubmit={handleSubmit}>
        {CATEGORIES.map((category, i) => (
          <fieldset className="vote-category" key={category.key} style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
            <legend>
              {category.emoji} {category.label}
              {votes[category.key] && <span className="cat-done">✓ {votes[category.key]}</span>}
            </legend>
            <div className="athlete-grid">
              {category.candidates.map((name) => (
                <AthleteCard
                  key={name}
                  name={name}
                  selected={votes[category.key] === name}
                  onSelect={() => selectAthlete(category.key, name)}
                  onInfo={() => setModal({ catKey: category.key, name })}
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

        <div className="submit-bar">
          <span className="progress">{selectedCount}/{CATEGORIES.length} choix</span>
          <button type="submit" className="submit-btn" disabled={!allSelected || status === 'loading'}>
            {status === 'loading' ? 'Envoi en cours...' : 'Voter 🚀'}
          </button>
        </div>
      </form>

      {modal && (
        <AthleteModal
          name={modal.name}
          selected={votes[modal.catKey] === modal.name}
          onSelect={() => selectAthlete(modal.catKey, modal.name)}
          onClose={() => setModal(null)}
        />
      )}

      <p className="credit">
        Photos, fiches et informations athlètes © CNOSF, equipedefrance.com
        (données Milano Cortina 2026, resultats.equipedefrance.com).
      </p>
      {styleTag}
    </main>
  );
}
