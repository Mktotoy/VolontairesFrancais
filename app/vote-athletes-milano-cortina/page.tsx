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
        <h1>Élisez vos athlètes préférés de Milano Cortina 2026 ! 🏅</h1>
        <div className="intro">
          <p>
            Les Jeux d&apos;hiver de Milano Cortina nous ont fait vibrer en début d&apos;année !
            Il est maintenant temps de désigner vos athlètes coups de cœur de cette édition.
            Les gagnants de cette élection seront dévoilés lors de notre Assemblée Générale
            du 28 novembre prochain.
          </p>
          <p>
            Le principe est simple : pour valider votre participation, vous devez exprimer
            4 choix au total. Redécouvrez les profils de nos champions et sélectionnez votre
            athlète favori dans chacune des catégories suivantes :
          </p>
          <ul className="intro-list">
            <li>1 Athlète Olympique (Femme)</li>
            <li>1 Athlète Olympique (Homme)</li>
            <li>1 Athlète Paralympique (Femme)</li>
            <li>1 Athlète Paralympique (Homme)</li>
          </ul>
          <p>
            Faites vos choix en cliquant sur le bouton « Voter » sous l&apos;athlète de votre
            choix dans chaque section, renseignez votre e-mail en bas de page, puis validez.
          </p>
          <p><strong>À vous de jouer pour célébrer ceux qui vous ont le plus inspirés !</strong></p>
        </div>
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
                  feminine={category.key.includes('femme')}
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
          feminine={modal.catKey.includes('femme')}
          selected={votes[modal.catKey] === modal.name}
          onSelect={() => selectAthlete(modal.catKey, modal.name)}
          onClose={() => setModal(null)}
        />
      )}

      <p className="credit">
        L&apos;ensemble des textes, photos et informations athlètes (biographies, palmarès,
        résultats) proviennent du site officiel equipedefrance.com (CNOSF) et de
        resultats.equipedefrance.com (données Milano Cortina 2026). Ils sont reproduits
        sans aucune modification.
      </p>
      {styleTag}
    </main>
  );
}
