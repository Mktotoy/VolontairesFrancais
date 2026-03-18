"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';

const REGION_COORDS: Record<string, [number, number]> = {
  "Auvergne-Rhône-Alpes": [45.75, 4.85],
  "Bourgogne-Franche-Comté": [47.28, 5.04],
  "Bretagne": [48.2, -2.93],
  "Centre-Val de Loire": [47.5, 1.75],
  "Corse": [42.15, 9.08],
  "Grand Est": [48.58, 7.75],
  "Hauts-de-France": [50.63, 3.06],
  "Île-de-France": [48.8566, 2.3522],
  "Normandie": [49.18, -0.37],
  "Nouvelle-Aquitaine": [44.83, -0.57],
  "Occitanie": [43.60, 1.44],
  "Pays de la Loire": [47.21, -1.55],
  "Provence-Alpes-Côte d’Azur": [43.3, 5.4],
  "Guadeloupe": [16.25, -61.58],
  "Martinique": [14.64, -61.02],
  "Guyane": [4.92, -52.33],
  "La Réunion": [-21.11, 55.53],
  "Mayotte": [-12.82, 45.16]
};

export default function OriginMap({ data }: { data: any[] }) {
  const markerData = useMemo(() => {
    const counts: Record<string, { coords: [number, number], count: number, label: string }> = {};

    data.forEach(resp => {
      const answers = resp.answers || {};
      const region = answers.region;

      if (region && REGION_COORDS[region]) {
        if (!counts[region]) counts[region] = { coords: REGION_COORDS[region], count: 0, label: region };
        counts[region].count++;
      }
    });

    return Object.values(counts);
  }, [data]);

  return (
    <div className="map-container-wrapper">
      <MapContainer 
        center={[46.603354, 1.888334]} 
        zoom={5} 
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
            radius={Math.sqrt(marker.count) * 6 + 4}
            fillColor="#fcb133"
            color="#fff"
            weight={2}
            opacity={1}
            fillOpacity={0.8}
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
