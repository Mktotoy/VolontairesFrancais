"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';

// Coordinates for the sites
const SITE_COORDS: Record<string, [number, number]> = {
  // Milan
  "San Siro – Cérémonie d’ouverture": [45.4781, 9.1240],
  "Milano Speed Skating Stadium – Patinage de vitesse": [45.478, 9.12],
  "Milano Ice Hockey Arena Santa Giulia – Hockey sur glace (tournoi masculin et toutes les finales)": [45.437, 9.245],
  "Milano Rho Hockey Arena – Hockey sur glace (premiers matchs masculins), para hockey sur glace": [45.521, 9.059],
  "Ice Skating Arena – Patinage de vitesse sur piste courte / Patinage artistique": [45.402, 9.141],
  "Milano Rho Fiera – Patinage de vitesse / Centre TV et Presse": [45.521, 9.059],
  "Mediolanum Forum – Patinage artistique et Short track": [45.402, 9.141],

  // Cortina
  "Tofane Alpine Skiing Centre – Ski alpin / Para ski alpin / Para snowboard": [46.54, 12.11],
  "Cortina Sliding Centre – Bobsleigh / Skeleton / Luge": [46.548, 12.128],
  "Cortina Curling Olympic Stadium – Curling / Curling fauteuil": [46.544, 12.133],

  // Verona
  "Arènes de Vérone – Cérémonies clôture des Jeux Olympiques et ouverture des Jeux Paralympiques": [45.4398, 10.9945],

  // Val di Fiemme
  "Predazzo Ski Jumping Stadium – Saut à ski / Combiné nordique": [46.313, 11.603],
  "Tesero Cross-Country Skiing Stadium – Ski de fond / Combiné nordique / Para ski de fond / Para biathlon": [46.286, 11.513],

  // Valtellina
  "Bormio Stelvio – Ski alpin / Ski alpinisme": [46.468, 10.375],
  "Livigno Aerials & Moguls – Ski freestyle": [46.538, 10.136],
  "Livigno Snow Park – Snowboard / Ski acrobatique": [46.52, 10.12],

  // Anterselva
  "Südtirol Arena (Anterselva / Antholz) – Biathlon": [46.886, 12.152]
};

// Generic coordinates for zones if specific site is missing
const ZONE_COORDS: Record<string, [number, number]> = {
  "MILAN": [45.4642, 9.1899],
  "CORTINA D’AMPEZZO": [46.5376, 12.1332],
  "VERONA": [45.4398, 10.9945],
  "VAL DI FIEMME": [46.3, 11.55],
  "VALTELLINA": [46.5, 10.25],
  "ANTERSELVA": [46.7860, 12.1384],
  "AUTRE": [45.0, 9.0]
};

export default function SurveyMap({ data }: { data: any[] }) {
  const markerData = useMemo(() => {
    const counts: Record<string, { coords: [number, number], count: number, label: string }> = {};

    data.forEach(resp => {
      const answers = resp.answers || {};
      
      // Try to find specific sites first
      const venues = [
        ...(Array.isArray(answers.milan_venues) ? answers.milan_venues : []),
        ...(Array.isArray(answers.cortina_venues) ? answers.cortina_venues : []),
        ...(Array.isArray(answers.fiemme_venues) ? answers.fiemme_venues : []),
        ...(Array.isArray(answers.valtellina_venues) ? answers.valtellina_venues : []),
        ...(Array.isArray(answers.anterselva_venues) ? answers.anterselva_venues : [])
      ];

      if (venues.length > 0) {
        venues.forEach(v => {
          if (SITE_COORDS[v]) {
            if (!counts[v]) counts[v] = { coords: SITE_COORDS[v], count: 0, label: v };
            counts[v].count++;
          }
        });
      } else {
        // Fallback to zones
        const zones = Array.isArray(answers.sites_zones) ? answers.sites_zones : [answers.sites_zones];
        zones.forEach((z: string) => {
          if (ZONE_COORDS[z]) {
            if (!counts[z]) counts[z] = { coords: ZONE_COORDS[z], count: 0, label: z };
            counts[z].count++;
          }
        });
      }
    });

    return Object.values(counts);
  }, [data]);

  return (
    <div className="map-container-wrapper">
      <MapContainer 
        center={[46.0, 11.0]} 
        zoom={7} 
        style={{ height: '450px', width: '100%', borderRadius: '24px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerData.map((marker, idx) => (
          <CircleMarker
            key={idx}
            center={marker.coords}
            radius={Math.sqrt(marker.count) * 8 + 5}
            fillColor="#067fcc"
            color="#fff"
            weight={2}
            opacity={1}
            fillOpacity={0.7}
          >
            <Popup>
              <div className="map-popup">
                <strong>{marker.label}</strong><br />
                {marker.count} volontaires
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <style jsx global>{`
        .leaflet-container {
          background: #0a0a0a !important;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .map-popup {
          color: #000;
          font-family: inherit;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 5px;
        }
      `}</style>
    </div>
  );
}
