"use client";

import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

interface CategoryTally {
  key: string;
  label: string;
  results: { name: string; votes: number }[];
}
interface Tally {
  total: number;
  categories: CategoryTally[];
}

export default function VoteResultsPage() {
  const [password, setPassword] = useState('');
  const [data, setData] = useState<Tally | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (passToTry: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/vote-athletes/results', {
        headers: { Authorization: passToTry },
      });
      if (res.ok) {
        setData(await res.json());
        sessionStorage.setItem('athlete_vote_auth', passToTry);
      } else {
        setError('Mot de passe incorrect');
        sessionStorage.removeItem('athlete_vote_auth');
      }
    } catch {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('athlete_vote_auth');
    if (saved) handleAuth(saved);
  }, []);

  if (!data) {
    return (
      <section className="wrap">
        <div className="card auth">
          <Lock size={40} color="#fcb133" />
          <h1>Accès réservé</h1>
          <p>Mot de passe requis pour consulter les résultats du vote athlètes.</p>
          <form onSubmit={(e) => { e.preventDefault(); handleAuth(password); }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              autoFocus
              autoComplete="current-password"
              suppressHydrationWarning
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Vérification...' : 'Accéder aux résultats'}
            </button>
            {error && <p className="error-msg">{error}</p>}
          </form>
        </div>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </section>
    );
  }

  return (
    <section className="wrap">
      <div className="card">
        <h1>Résultats, vote athlètes Milano Cortina 2026 🏅</h1>
        <p className="total">{data.total} vote{data.total > 1 ? 's' : ''} enregistré{data.total > 1 ? 's' : ''}</p>
        {data.categories.map((cat) => {
          const max = Math.max(1, ...cat.results.map((r) => r.votes));
          return (
            <div className="category" key={cat.key}>
              <h2>{cat.label}</h2>
              {cat.results.map((r) => (
                <div className="row" key={r.name}>
                  <span className="name">{r.name}</span>
                  <div className="bar-track">
                    <div className="bar" style={{ width: `${(r.votes / max) * 100}%` }} />
                  </div>
                  <span className="count">{r.votes}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </section>
  );
}

const styles = `
  .wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: linear-gradient(135deg, #067fcc 0%, #07a459 100%);
  }
  .card {
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 40px;
    max-width: 640px;
    width: 100%;
  }
  .card.auth { text-align: center; max-width: 420px; }
  .card h1 { font-size: 1.5rem; margin: 12px 0; color: #333; }
  .card.auth p { color: #666; font-size: 0.95rem; margin-bottom: 20px; }
  .total { color: #666; margin-bottom: 24px; }
  .category { margin-bottom: 28px; }
  .category h2 { font-size: 1.05rem; color: #067fcc; margin-bottom: 10px; }
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }
  .name { flex: 0 0 220px; font-size: 0.9rem; color: #333; }
  .bar-track { flex: 1; background: #f0f0f0; border-radius: 6px; height: 14px; }
  .bar { background: #07a459; height: 100%; border-radius: 6px; min-width: 2px; transition: width 0.3s; }
  .count { flex: 0 0 30px; text-align: right; font-weight: 700; font-size: 0.9rem; color: #333; }
  input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid #e0e0e0;
    font-size: 1rem;
    margin-bottom: 12px;
  }
  input:focus { outline: none; border-color: #067fcc; }
  button {
    width: 100%;
    padding: 13px;
    border: none;
    border-radius: 30px;
    background: #067fcc;
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
  }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
  .error-msg { color: #eb2f50; font-weight: 600; margin-top: 12px; }
`;
