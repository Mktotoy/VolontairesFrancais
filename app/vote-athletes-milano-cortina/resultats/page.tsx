"use client";

import { useEffect, useState, useCallback } from 'react';
import { Lock } from 'lucide-react';
import { ATHLETES_INFO } from '@/lib/athletes-info';
import { CATEGORIES } from '@/lib/athletes';

interface CategoryTally {
  key: string;
  label: string;
  results: { name: string; votes: number; pct: number }[];
}
interface Tally {
  total: number;
  firstVoteAt: string | null;
  lastVoteAt: string | null;
  categories: CategoryTally[];
  entries: { email: string; submittedAt: string; votes: Record<string, string> }[];
  backend: string;
}

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso.endsWith('Z') || iso.includes('+') ? iso : iso + 'Z').toLocaleString('fr-FR', {
    dateStyle: 'short', timeStyle: 'short',
  }) : '—';

export default function VoteResultsPage() {
  const [password, setPassword] = useState('');
  const [data, setData] = useState<Tally | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = useCallback(async (passToTry: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/vote-athletes/results', {
        headers: { Authorization: passToTry },
        cache: 'no-store',
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
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem('athlete_vote_auth');
    if (saved) handleAuth(saved);
  }, [handleAuth]);

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
            <button type="submit" className="btn-main" disabled={loading}>
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
    <section className="wrap top">
      <div className="dash">
        <header className="dash-head">
          <h1>Vote athlètes Milano Cortina 2026, résultats</h1>
          <button type="button" className="btn-refresh" onClick={() => handleAuth(sessionStorage.getItem('athlete_vote_auth') || '')} disabled={loading}>
            {loading ? '...' : '↻ Actualiser'}
          </button>
        </header>

        <div className="tiles">
          <div className="tile"><span className="tile-num">{data.total}</span><span className="tile-label">vote{data.total > 1 ? 's' : ''}</span></div>
          <div className="tile"><span className="tile-num">{fmtDate(data.firstVoteAt)}</span><span className="tile-label">premier vote</span></div>
          <div className="tile"><span className="tile-num">{fmtDate(data.lastVoteAt)}</span><span className="tile-label">dernier vote</span></div>
          <div className="tile"><span className="tile-num">{data.backend === 'wordpress' ? 'MySQL WP' : 'fichiers dev'}</span><span className="tile-label">stockage</span></div>
        </div>

        {data.categories.map((cat) => {
          const winner = cat.results[0];
          const winnerInfo = winner && winner.votes > 0 ? ATHLETES_INFO[winner.name] : null;
          return (
            <div className="category" key={cat.key}>
              <h2>{cat.label}</h2>
              {winnerInfo && (
                <div className="winner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/athletes/${winnerInfo.slug}.webp`} alt={winner.name} />
                  <div>
                    <span className="winner-name">🏆 {winner.name}</span>
                    <span className="winner-votes">{winner.votes} vote{winner.votes > 1 ? 's' : ''} · {winner.pct}%</span>
                  </div>
                </div>
              )}
              {cat.results.map((r, i) => (
                <div className="row" key={r.name}>
                  <span className="rank">{r.votes > 0 && i < 3 ? ['🥇', '🥈', '🥉'][i] : `${i + 1}`}</span>
                  <span className="name">{r.name}</span>
                  <div className="bar-track">
                    <div className="bar" style={{ width: `${Math.max(1, r.pct)}%` }} />
                  </div>
                  <span className="count">{r.votes} · {r.pct}%</span>
                </div>
              ))}
            </div>
          );
        })}

        <div className="category">
          <h2>Votes individuels ({data.entries.length})</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Email</th>
                  {CATEGORIES.map((c) => <th key={c.key}>{c.label.replace('Athlète ', '')}</th>)}
                </tr>
              </thead>
              <tbody>
                {[...data.entries].reverse().map((e, i) => (
                  <tr key={i}>
                    <td>{fmtDate(e.submittedAt)}</td>
                    <td>{e.email}</td>
                    {CATEGORIES.map((c) => <td key={c.key}>{e.votes[c.key] || '—'}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
    background: linear-gradient(160deg, #067fcc 0%, #07a459 100%);
  }
  .wrap.top { align-items: flex-start; }
  .card {
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 40px;
    max-width: 420px;
    width: 100%;
    text-align: center;
    color: #333;
  }
  .card h1 { font-size: 1.4rem; margin: 12px 0; }
  .card p { color: #666; font-size: 0.95rem; margin-bottom: 20px; }
  .dash {
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 28px;
    max-width: 1100px;
    width: 100%;
    color: #333;
  }
  .dash-head {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .dash-head h1 { font-size: 1.4rem; color: #222; }
  .btn-refresh {
    border: 1.5px solid #067fcc;
    background: transparent;
    color: #067fcc;
    font-weight: 700;
    border-radius: 20px;
    padding: 8px 16px;
    cursor: pointer;
  }
  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
    margin-bottom: 28px;
  }
  .tile {
    background: #f4f8fb;
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: center;
  }
  .tile-num { font-size: 1.15rem; font-weight: 800; color: #067fcc; }
  .tile-label { font-size: 0.75rem; color: #666; text-transform: uppercase; letter-spacing: 0.04em; }
  .category { margin-bottom: 30px; }
  .category h2 { font-size: 1.1rem; color: #067fcc; margin-bottom: 12px; }
  .winner {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #f0faf4;
    border: 1.5px solid #07a459;
    border-radius: 12px;
    padding: 10px 14px;
    margin-bottom: 12px;
  }
  .winner img { width: 56px; height: 56px; object-fit: cover; object-position: top center; border-radius: 10px; }
  .winner-name { display: block; font-weight: 800; color: #222; }
  .winner-votes { font-size: 0.85rem; color: #07a459; font-weight: 700; }
  .row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
  .rank { flex: 0 0 26px; text-align: center; font-size: 0.85rem; color: #888; }
  .name { flex: 0 0 200px; font-size: 0.88rem; color: #333; }
  .bar-track { flex: 1; background: #f0f0f0; border-radius: 6px; height: 14px; }
  .bar { background: #07a459; height: 100%; border-radius: 6px; transition: width 0.3s; }
  .count { flex: 0 0 76px; text-align: right; font-weight: 700; font-size: 0.85rem; color: #333; }
  .table-scroll { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
  th, td { text-align: left; padding: 7px 10px; border-bottom: 1px solid #eee; white-space: nowrap; }
  th { color: #067fcc; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.03em; }
  input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid #e0e0e0;
    font-size: 1rem;
    margin-bottom: 12px;
  }
  input:focus { outline: none; border-color: #067fcc; }
  .btn-main {
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
  .btn-main:disabled { opacity: 0.5; }
  .error-msg { color: #eb2f50; font-weight: 600; margin-top: 12px; }
  @media (max-width: 640px) {
    .name { flex-basis: 120px; font-size: 0.8rem; }
    .dash { padding: 18px; }
  }
`;
