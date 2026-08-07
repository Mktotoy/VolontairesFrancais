"use client";

import { useEffect } from 'react';
import { ATHLETES_INFO } from '@/lib/athletes-info';
import { athleteAge, medalsLine } from './AthleteCard';

interface Props {
  name: string;
  selected: boolean;
  onSelect: () => void;
  onClose: () => void;
}

export default function AthleteModal({ name, selected, onSelect, onClose }: Props) {
  const info = ATHLETES_INFO[name];
  const age = athleteAge(info?.birthdate ?? null);
  const medals = info ? medalsLine(info.medals) : '';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!info) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={name}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>
        <div className="modal-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/athletes/${info.slug}.webp`} alt={name} />
        </div>
        <div className="modal-body">
          <h3>{name}</h3>
          {info.discipline && <p className="discipline">{info.discipline}</p>}
          <p className="meta">
            {age !== null && `${age} ans`}
            {info.birthCity && ` · Né(e) à ${info.birthCity}`}
          </p>
          {info.handicap && <p className="meta">{info.handicap}</p>}
          {medals && <p className="medals">{medals}</p>}
          {info.bio && (
            <div className="bio">
              {info.bio.brief.length > 0 && (
                <ul className="bio-brief">
                  {info.bio.brief.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
              {info.bio.paragraphs.map((par, i) => <p key={i}>{par}</p>)}
            </div>
          )}
          {info.palmares.length > 0 && (
            <div className="results-block">
              <h4>Palmarès aux Jeux</h4>
              <ul>
                {info.palmares.map((p, i) => (
                  <li key={i}>
                    <span className="pos">
                      {p.medal === 'Or' ? '🥇' : p.medal === 'Argent' ? '🥈' : '🥉'} {p.medal}
                    </span>
                    <span className="event">{p.event}</span>
                    <span className="score">{p.year !== 2026 ? `${p.games} ${p.year}` : p.games}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {info.results.length > 0 && (
            <div className="results-block">
              <h4>Résultats Milano Cortina 2026</h4>
              <ul>
                {info.results.map((r, i) => (
                  <li key={i}>
                    {r.position && <span className="pos">#{r.position}</span>}
                    <span className="event">{r.event}</span>
                    {r.score && <span className="score">{r.score}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="modal-actions">
            <a
              className="fiche-link"
              href={`https://www.equipedefrance.com/athlete/${info.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fiche Équipe de France ↗
            </a>
            <button
              type="button"
              className={`btn-vote${selected ? ' voted' : ''}`}
              onClick={() => {
                onSelect();
                onClose();
              }}
            >
              {selected ? '✓ Choisi' : `Voter pour ${name.split(' ')[0]}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
