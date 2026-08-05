"use client";

import { useState } from 'react';
import { CATEGORIES, VOTE_DEADLINE } from '@/lib/athletes';

export default function VoteAthletesPage() {
  const [email, setEmail] = useState('');
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const closed = new Date() > VOTE_DEADLINE;
  const allSelected = CATEGORIES.every((c) => votes[c.key]);

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
      setStatus('success');
    } catch {
      setErrorMsg('Erreur de connexion au serveur.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="vote-wrap">
        <div className="vote-card">
          <h1>Merci pour votre vote ! 🇫🇷❄️</h1>
          <p>Vos athlètes préférés seront mis à l&apos;honneur lors de l&apos;Assemblée générale du samedi 28 novembre.</p>
        </div>
        <style jsx>{voteStyles}</style>
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
        <style jsx>{voteStyles}</style>
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
            <div className="vote-category" key={category.key}>
              <label htmlFor={category.key}>{category.emoji} {category.label}</label>
              <select
                id={category.key}
                required
                value={votes[category.key] || ''}
                onChange={(e) => setVotes((v) => ({ ...v, [category.key]: e.target.value }))}
              >
                <option value="" disabled>Choisir un athlète</option>
                {category.candidates.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="vote-category">
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

          <button type="submit" disabled={!allSelected || !email || status === 'loading'}>
            {status === 'loading' ? 'Envoi en cours...' : 'À vos votes… Prêts ? Partez ! 🚀'}
          </button>
        </form>
      </div>
      <style jsx>{voteStyles}</style>
    </section>
  );
}

const voteStyles = `
  .vote-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: linear-gradient(135deg, #067fcc 0%, #07a459 100%);
  }
  .vote-card {
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 40px;
    max-width: 560px;
    width: 100%;
  }
  .vote-card h1 {
    font-family: var(--font-logo);
    font-size: 1.8rem;
    margin-bottom: 12px;
    color: var(--color-dark, #333);
  }
  .intro {
    color: var(--color-gray, #666);
    font-size: 0.95rem;
    margin-bottom: 28px;
    line-height: 1.6;
  }
  .vote-category {
    margin-bottom: 20px;
  }
  .vote-category label {
    display: block;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--color-dark, #333);
  }
  .vote-category select,
  .vote-category input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid #e0e0e0;
    font-size: 1rem;
    font-family: inherit;
  }
  .vote-category select:focus,
  .vote-category input:focus {
    outline: none;
    border-color: #067fcc;
  }
  .hint {
    font-size: 0.8rem;
    color: var(--color-gray, #666);
    margin-top: 6px;
  }
  .error-msg {
    color: #eb2f50;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
  button {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 30px;
    background: var(--color-blue, #067fcc);
    color: white;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
