"use client";

import { useState } from 'react';
import { ATHLETES_INFO } from '@/lib/athletes-info';

// Photo locale cachée : public/athletes/<slug>.webp (source equipedefrance.com).
// "X et son guide Y" (para) : slug et fiche portent sur l'athlète X seul.

export function athleteAge(birthdate: string | null): number | null {
  if (!birthdate) return null;
  const b = new Date(birthdate);
  const now = new Date();
  let a = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) a -= 1;
  return a;
}

export function medalsLine(m: { gold: number; silver: number; bronze: number }): string {
  const parts: string[] = [];
  if (m.gold) parts.push(`🥇 ${m.gold}`);
  if (m.silver) parts.push(`🥈 ${m.silver}`);
  if (m.bronze) parts.push(`🥉 ${m.bronze}`);
  return parts.join('  ');
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

interface Props {
  name: string;
  selected: boolean;
  onSelect: () => void;
  onInfo: () => void;
}

export default function AthleteCard({ name, selected, onSelect, onInfo }: Props) {
  const [imgOk, setImgOk] = useState(true);
  const info = ATHLETES_INFO[name];
  const slug = info?.slug ?? '';
  const age = athleteAge(info?.birthdate ?? null);
  const medals = info ? medalsLine(info.medals) : '';

  return (
    <div
      className={`athlete-card${selected ? ' selected' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className={`photo${imgOk && slug ? '' : ' no-img'}`}>
        {imgOk && slug ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/athletes/${slug}.webp`}
            alt={name}
            loading="lazy"
            onError={() => setImgOk(false)}
          />
        ) : (
          <span className="initials">{initials(name)}</span>
        )}
      </div>
      <div className="card-body">
        <span className="athlete-name">{name}</span>
        {info?.discipline && <span className="discipline">{info.discipline}</span>}
        <span className="meta">
          {age !== null && <span>{age} ans</span>}
          {info?.birthCity && <span> · {info.birthCity.replace(/\s*\(.*\)$/, '')}</span>}
        </span>
        {medals && <span className="medals">{medals}</span>}
        <div className="card-actions">
          <button
            type="button"
            className="btn-info"
            onClick={(e) => {
              e.stopPropagation();
              onInfo();
            }}
          >
            En savoir plus
          </button>
          <button
            type="button"
            className={`btn-vote${selected ? ' voted' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            {selected ? '✓ Choisi' : 'Voter'}
          </button>
        </div>
      </div>
      {selected && <span className="badge">✓</span>}
    </div>
  );
}
