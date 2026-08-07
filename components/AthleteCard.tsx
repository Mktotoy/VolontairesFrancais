"use client";

import { useState } from 'react';

// Fiche + photo officielles equipedefrance.com (CNOSF).
// Photo locale : public/athletes/<slug>.webp ; fallback = initiales.
// "X et son guide Y" (para) : slug et fiche portent sur l'athlète X seul.
function baseName(name: string): string {
  return name.split(/ et son guide /i)[0];
}

function slugify(name: string): string {
  return baseName(name)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function initials(name: string): string {
  return baseName(name)
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

interface Props {
  name: string;
  selected: boolean;
  onSelect: () => void;
}

export default function AthleteCard({ name, selected, onSelect }: Props) {
  const [imgOk, setImgOk] = useState(true);
  const slug = slugify(name);

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
      <div className="photo">
        {imgOk ? (
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
      <span className="athlete-name">{name}</span>
      <a
        className="fiche-link"
        href={`https://www.equipedefrance.com/athlete/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Voir la fiche ↗
      </a>
      {selected && <span className="badge">✓ Choisi</span>}
    </div>
  );
}
