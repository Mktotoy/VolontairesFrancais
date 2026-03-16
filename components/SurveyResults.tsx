"use client";

import { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import ExcelJS from 'exceljs';
import dynamic from 'next/dynamic';
import { 
  Download, Table, BarChart3, PieChart as PieIcon, RefreshCw, ChevronRight, 
  ChevronLeft, Search, ArrowUpDown, ArrowUp, ArrowDown, Map as MapIcon
} from 'lucide-react';

const SurveyMap = dynamic(() => import('./SurveyMap'), { 
  ssr: false,
  loading: () => <div className="map-loading">Chargement de la carte...</div>
});

interface SurveyResponse {
  id: number;
  email: string | null;
  answers: Record<string, any>;
  version: string;
  created_at: string;
}

const COLORS = ['#067fcc', '#fcb133', '#07a459', '#eb2f50', '#8884d8', '#82ca9d', '#ffc658', '#4b5563'];

export default function SurveyResults({ data }: { data: SurveyResponse[] }) {
  const [view, setView] = useState<'stats' | 'table' | 'map'>('stats');
  
  // Table state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = useMemo(() => {
    const counts: Record<string, Record<string, number>> = {};
    
    data.forEach(resp => {
      Object.entries(resp.answers).forEach(([key, val]) => {
        if (!counts[key]) counts[key] = {};
        if (Array.isArray(val)) {
          val.forEach(v => {
            const strVal = String(v);
            counts[key][strVal] = (counts[key][strVal] || 0) + 1;
          });
        } else {
          const strVal = String(val);
          counts[key][strVal] = (counts[key][strVal] || 0) + 1;
        }
      });
    });

    return counts;
  }, [data]);

  // Filter and Sort Data
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(resp => {
        const emailMatch = resp.email?.toLowerCase().includes(lowerSearch);
        const answersMatch = Object.values(resp.answers).some(val => 
          String(val).toLowerCase().includes(lowerSearch)
        );
        return emailMatch || answersMatch;
      });
    }

    // Sort
    result.sort((a, b) => {
      let valA: any, valB: any;
      
      if (sortKey === 'created_at' || sortKey === 'email') {
        valA = a[sortKey as keyof SurveyResponse];
        valB = b[sortKey as keyof SurveyResponse];
      } else {
        valA = a.answers[sortKey];
        valB = b.answers[sortKey];
      }

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      const factor = sortOrder === 'asc' ? 1 : -1;
      return valA < valB ? -1 * factor : 1 * factor;
    });

    return result;
  }, [data, searchTerm, sortKey, sortOrder]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (pageSize === -1) return filteredAndSortedData;
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedData.slice(start, start + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize]);

  const totalPages = pageSize === -1 ? 1 : Math.ceil(filteredAndSortedData.length / pageSize);

  // Reset pagination on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('RETEX Milano Cortina 2026');

    // Add a Title Row
    worksheet.mergeCells('A1:X1');
    const titleRow = worksheet.getRow(1);
    titleRow.values = ['RAPPORT DES RÉSULTATS - RETEX MILANO CORTINA 2026'];
    titleRow.font = { name: 'Arial Black', size: 16, color: { argb: 'FFFFFFFF' }, bold: true };
    titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF067FCC' } };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
    titleRow.height = 40;

    // Define column mapping and order
    const colMapping = [
      { header: 'Email', key: 'email', width: 35 },
      { header: 'Date Soumission', key: 'date', width: 22 },
      { header: 'Âge', key: 'age', width: 15 },
      { header: 'Genre', key: 'genre', width: 15 },
      { header: 'Région', key: 'region', width: 25 },
      { header: 'Paris 2024', key: 'paris2024', width: 12 },
      { header: 'Type Jeux', key: 'type_jeux', width: 15 },
      { header: 'Site (Zone)', key: 'sites_zones', width: 25 },
      { header: 'Site Précis (Sous-sites)', key: 'venues', width: 45 },
      { header: 'Mission Principale', key: 'mission_principale', width: 35 },
      { header: 'Redéployé', key: 'redéployé', width: 12 },
      { header: 'Responsable', key: 'responsable_equipe', width: 12 },
      { header: 'Satisfaction Globale', key: 'satisfaction_globale', width: 18 },
      { header: 'Intégration', key: 'satisfaction_integration', width: 15 },
      { header: 'Gestion Orga', key: 'satisfaction_gestion', width: 15 },
      { header: 'Prix Logement/nuit', key: 'prix_logement_nuit', width: 20 },
      { header: 'Logement Global', key: 'prix_logement_global', width: 25 },
      { header: 'Difficulté Logement', key: 'difficulte_logement', width: 18 },
      { header: 'Transport (temps)', key: 'temps_transport', width: 20 },
      { header: 'Transport (acceptability)', key: 'transport_acceptable', width: 20 },
      { header: 'LA 2028', key: 'candidat_la2028', width: 15 },
      { header: 'Alpes 2030', key: 'candidat_alpes2030', width: 15 },
      { header: 'Brisbane 2032', key: 'candidat_brisbane2032', width: 15 },
      { header: 'Rejoindre VF', key: 'rejoindre_association', width: 15 },
      { header: 'Navigateur', key: 'user_agent', width: 40 },
      { header: 'Résolution', key: 'screen_res', width: 15 },
      { header: 'Durée (s)', key: 'duration', width: 12 },
    ];

    // Set headers at row 2
    const headerRow = worksheet.getRow(2);
    headerRow.values = colMapping.map(c => c.header);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF333333' } };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 25;

    // Apply column metadata
    worksheet.columns = colMapping.map(c => ({ key: c.key, width: c.width }));

    // Add data rows
    data.forEach((resp, index) => {
      const tracking = (resp.answers as any)._metadata || {};
      const rowData: any = {
        email: resp.email || 'Anonyme',
        date: new Date(resp.created_at).toLocaleString(),
        age: resp.answers.age,
        genre: resp.answers.genre,
        region: resp.answers.region,
        paris2024: resp.answers.paris2024,
        type_jeux: resp.answers.type_jeux,
        sites_zones: Array.isArray(resp.answers.sites_zones) ? resp.answers.sites_zones.join(', ') : resp.answers.sites_zones,
        venues: [
          resp.answers.milan_venues ? `MILAN: ${Array.isArray(resp.answers.milan_venues) ? resp.answers.milan_venues.join('; ') : resp.answers.milan_venues}` : null,
          resp.answers.cortina_venues ? `CORTINA: ${Array.isArray(resp.answers.cortina_venues) ? resp.answers.cortina_venues.join('; ') : resp.answers.cortina_venues}` : null,
          resp.answers.verona_venues ? `VERONA: ${Array.isArray(resp.answers.verona_venues) ? resp.answers.verona_venues.join('; ') : resp.answers.verona_venues}` : null,
          resp.answers.fiemme_venues ? `VAL DI FIEMME: ${Array.isArray(resp.answers.fiemme_venues) ? resp.answers.fiemme_venues.join('; ') : resp.answers.fiemme_venues}` : null,
          resp.answers.valtellina_venues ? `VALTELLINA: ${Array.isArray(resp.answers.valtellina_venues) ? resp.answers.valtellina_venues.join('; ') : resp.answers.valtellina_venues}` : null,
          resp.answers.anterselva_venues ? `ANTERSELVA: ${Array.isArray(resp.answers.anterselva_venues) ? resp.answers.anterselva_venues.join('; ') : resp.answers.anterselva_venues}` : null
        ].filter(Boolean).join(' | '),
        mission_principale: resp.answers.mission_principale,
        redéployé: resp.answers.redéployé,
        responsable_equipe: resp.answers.responsable_equipe,
        satisfaction_globale: resp.answers.satisfaction_globale,
        satisfaction_integration: resp.answers.satisfaction_integration,
        satisfaction_gestion: resp.answers.satisfaction_gestion,
        prix_logement_nuit: resp.answers.prix_logement_nuit,
        prix_logement_global: resp.answers.prix_logement_global,
        difficulte_logement: resp.answers.difficulte_logement,
        temps_transport: resp.answers.temps_transport,
        transport_acceptable: resp.answers.transport_acceptable,
        candidat_la2028: resp.answers.candidat_la2028,
        candidat_alpes2030: resp.answers.candidat_alpes2030,
        candidat_brisbane2032: resp.answers.candidat_brisbane2032,
        rejoindre_association: resp.answers.rejoindre_association,
        user_agent: tracking.user_agent,
        screen_res: tracking.screen_res,
        duration: tracking.duration_seconds
      };

      const row = worksheet.addRow(rowData);
      
      // zebra stripes
      if (index % 2 === 0) {
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF9FAFB' } };
      }

      // Center numeric columns
      [3, 6, 11, 12, 13, 14, 15, 18, 20, 21, 22, 23, 24].forEach(colIdx => {
        row.getCell(colIdx).alignment = { horizontal: 'center' };
      });

      // Satisfaction highlighting
      const scoreCell = row.getCell(13); // Satisfaction Globale
      const score = Number(resp.answers.satisfaction_globale);
      if (score >= 8) scoreCell.font = { color: { argb: 'FF07A459' }, bold: true };
      else if (score < 5) scoreCell.font = { color: { argb: 'FFEB2F50' }, bold: true };
    });

    // Freeze panes: Header row and Email column
    worksheet.views = [
      { state: 'frozen', xSplit: 1, ySplit: 2 }
    ];

    // Add Borders
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFEEEEEE' } },
            left: { style: 'thin', color: { argb: 'FFEEEEEE' } },
            bottom: { style: 'thin', color: { argb: 'FFEEEEEE' } },
            right: { style: 'thin', color: { argb: 'FFEEEEEE' } }
          };
        });
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `RETEX_Milano_2026_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return <ArrowUpDown size={14} opacity={0.3} />;
    return sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const renderChart = (key: string, label: string) => {
    const rawData = stats[key] || {};
    const chartData = Object.entries(rawData)
      .map(([name, value]) => ({ name, value: Number(value) }))
      .sort((a, b) => b.value - a.value);
    
    if (chartData.length === 0) return null;

    const isYesNo = chartData.every(d => ['Oui', 'Non', 'Je réfléchis encore'].includes(d.name));

    return (
      <div className="chart-item" key={key}>
        <div className="chart-info">
          <h3>{label}</h3>
          <span className="total-responses">{Object.values(rawData).reduce((a: number, b: number) => a + b, 0)} réponses</span>
        </div>
        <div className="chart-wrapper">
          {chartData.length <= 3 || isYesNo ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: 'white' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={110} fontSize={10} stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: 'white' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <div className="header-info">
          <h1>Tableau de Bord RETEX V4</h1>
          <p className="subtitle">{data.length} réponses collectées · Milano Cortina 2026</p>
        </div>
        <div className="header-actions">
          <div className="view-switch">
            <button className={view === 'stats' ? 'active' : ''} onClick={() => setView('stats')}>
              <BarChart3 size={18} /> Statistiques
            </button>
            <button className={view === 'map' ? 'active' : ''} onClick={() => setView('map')}>
              <MapIcon size={18} /> Carte
            </button>
            <button className={view === 'table' ? 'active' : ''} onClick={() => setView('table')}>
              <Table size={18} /> Réponses
            </button>
          </div>
          <button onClick={exportToExcel} className="export-btn">
            <Download size={18} /> Exporter Excel
          </button>
        </div>
      </div>

      <div className="results-content">
        {view === 'stats' && (
          <div className="stats-layout">
            <div className="stats-grid-container">
              <section className="stats-section">
                <div className="section-title">
                  <div className="section-icon">1</div>
                  <h2>Profil des Volontaires</h2>
                </div>
                <div className="charts-grid">
                  {renderChart('age', 'Catégories d’âge')}
                  {renderChart('genre', 'Genre')}
                  {renderChart('region', 'Zones géographiques')}
                  {renderChart('paris2024', 'Anciens Paris 2024')}
                  {renderChart('adherent_vf', 'Adhérents VF')}
                  {renderChart('accompagnement', 'Besoin accompagnement')}
                </div>
              </section>

              <section className="stats-section">
                <div className="section-title">
                  <div className="section-icon">2</div>
                  <h2>Missions & Sites</h2>
                </div>
                <div className="charts-grid">
                  {renderChart('sites_zones', 'Zones d’affectation')}
                  {renderChart('mission_principale', 'Missions principales')}
                  {renderChart('redéployé', 'Redéploiement')}
                  {renderChart('responsable_equipe', 'Responsables équipe')}
                  {renderChart('type_jeux', 'Type de Jeux')}
                </div>
              </section>

              <section className="stats-section">
                <div className="section-title">
                  <div className="section-icon">3</div>
                  <h2>Satisfaction & Vie aux Jeux</h2>
                </div>
                <div className="charts-grid">
                  {renderChart('satisfaction_globale', 'Satisfaction Globale (/10)')}
                  {renderChart('satisfaction_integration', 'Intégration (/10)')}
                  {renderChart('satisfaction_gestion', 'Gestion par l’organisation (/10)')}
                  {renderChart('prix_logement_nuit', 'Prix/nuit logement')}
                  {renderChart('temps_transport', 'Temps de transport')}
                  {renderChart('satisfaction_transport', 'Satisfaction transports (/10)')}
                </div>
              </section>

              <section className="stats-section">
                <div className="section-title">
                  <div className="section-icon">4</div>
                  <h2>Futur & Alpes 2030</h2>
                </div>
                <div className="charts-grid">
                  {renderChart('candidat_la2028', 'Candidat LA 2028')}
                  {renderChart('candidat_alpes2030', 'Candidat Alpes 2030')}
                  {renderChart('candidat_brisbane2032', 'Candidat Brisbane 2032')}
                  {renderChart('rejoindre_association', 'Souhaitent rejoindre VF')}
                </div>
              </section>
            </div>
          </div>
        )}

        {view === 'map' && (
          <div className="map-view-container">
            <div className="table-card">
              <div className="table-header">
                <h3>Répartition Géographique</h3>
                <p>Visualisation des volontaires par site et sous-site</p>
              </div>
              <div className="map-wrapper-results">
                <SurveyMap data={data} />
              </div>
            </div>
          </div>
        )}

        {view === 'table' && (
          <div className="table-view-container">
            <div className="table-controls">
              <div className="search-bar">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Rechercher un email ou une réponse..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="page-settings">
                <span>Afficher</span>
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={-1}>Tout</option>
                </select>
                <span>par page</span>
              </div>
            </div>

            <div className="table-card">
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="sticky-col cursor-pointer" onClick={() => handleSort('email')}>
                        <div className="th-content">Email <SortIcon colKey="email" /></div>
                      </th>
                      <th className="cursor-pointer" onClick={() => handleSort('created_at')}>
                        <div className="th-content">Date <SortIcon colKey="created_at" /></div>
                      </th>
                      <th className="cursor-pointer" onClick={() => handleSort('age')}>
                        <div className="th-content">Âge <SortIcon colKey="age" /></div>
                      </th>
                      <th>Genre</th>
                      <th>Région</th>
                      <th>Paris 2024</th>
                      <th>Type Jeux</th>
                      <th className="cursor-pointer" onClick={() => handleSort('sites_zones')}>
                        <div className="th-content">Zone <SortIcon colKey="sites_zones" /></div>
                      </th>
                      <th>Site Précis (Sous-sites)</th>
                      <th className="cursor-pointer" onClick={() => handleSort('mission_principale')}>
                        <div className="th-content">Mission <SortIcon colKey="mission_principale" /></div>
                      </th>
                      <th>Redéployé</th>
                      <th>Responsable</th>
                      <th className="cursor-pointer" onClick={() => handleSort('satisfaction_globale')}>
                        <div className="th-content">Satisfaction <SortIcon colKey="satisfaction_globale" /></div>
                      </th>
                      <th>Intégration</th>
                      <th>Gestion</th>
                      <th>Logement €/nuit</th>
                      <th>Logement Global</th>
                      <th>Difficulté Logement</th>
                      <th>Transport (temps)</th>
                      <th>Transport (accept.)</th>
                      <th>LA 2028</th>
                      <th className="cursor-pointer" onClick={() => handleSort('candidat_alpes2030')}>
                        <div className="th-content">Alpes 2030 <SortIcon colKey="candidat_alpes2030" /></div>
                      </th>
                      <th>Brisbane 2032</th>
                      <th>Rejoindre VF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((resp: SurveyResponse) => (
                      <tr key={resp.id}>
                        <td className="sticky-col bold-email">{resp.email || 'Anonyme'}</td>
                        <td className="nowrap">{new Date(resp.created_at).toLocaleDateString()}</td>
                        <td>{resp.answers.age}</td>
                        <td>{resp.answers.genre}</td>
                        <td>{resp.answers.region}</td>
                        <td className="centered-cell">{resp.answers.paris2024 === 'Oui' ? '✅' : '❌'}</td>
                        <td>{resp.answers.type_jeux}</td>
                        <td className="tag-cell">
                          {Array.isArray(resp.answers.sites_zones) 
                            ? resp.answers.sites_zones.map((z: string) => <span key={z} className="tag zone">{z}</span>)
                            : <span className="tag zone">{resp.answers.sites_zones}</span>
                          }
                        </td>
                        <td className="venue-cell">
                          {[
                            resp.answers.milan_venues,
                            resp.answers.cortina_venues,
                            resp.answers.fiemme_venues,
                            resp.answers.valtellina_venues,
                            resp.answers.anterselva_venues
                          ].filter(Boolean).flat().join(', ')}
                        </td>
                        <td>{resp.answers.mission_principale}</td>
                        <td className="centered-cell">{resp.answers.redéployé === 'Oui' ? '🔄' : '-'}</td>
                        <td className="centered-cell">{resp.answers.responsable_equipe === 'Oui' ? '👑' : '-'}</td>
                        <td className="score-cell">
                          <span className="score-badge" style={{ background: (resp.answers.satisfaction_globale >= 8 ? '#07a459' : resp.answers.satisfaction_globale >= 5 ? '#fcb133' : '#eb2f50') }}>
                            {resp.answers.satisfaction_globale}/10
                          </span>
                        </td>
                        <td>{resp.answers.satisfaction_integration}/10</td>
                        <td>{resp.answers.satisfaction_gestion}/10</td>
                        <td>{resp.answers.prix_logement_nuit}</td>
                        <td>{resp.answers.prix_logement_global}</td>
                        <td>{resp.answers.difficulte_logement}/10</td>
                        <td>{resp.answers.temps_transport}</td>
                        <td>{resp.answers.transport_acceptable}/10</td>
                        <td>{resp.answers.candidat_la2028}</td>
                        <td className="futur-cell">
                          <span className={`status ${resp.answers.candidat_alpes2030 === 'Oui' ? 'yes' : resp.answers.candidat_alpes2030 === 'Non' ? 'no' : 'maybe'}`}>
                            {resp.answers.candidat_alpes2030}
                          </span>
                        </td>
                        <td>{resp.answers.candidat_brisbane2032}</td>
                        <td className="centered-cell">{resp.answers.rejoindre_association === 'Oui' ? '🤝' : 'Non'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {pageSize !== -1 && (
              <div className="pagination">
                <p>
                  Affichage de <strong>{Math.min(filteredAndSortedData.length, (currentPage - 1) * pageSize + 1)}</strong> à <strong>{Math.min(filteredAndSortedData.length, currentPage * pageSize)}</strong> sur <strong>{filteredAndSortedData.length}</strong> réponses
                </p>
                <div className="pagination-btns">
                  <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage((p: number) => p - 1)}
                    className="pagination-btn"
                  >
                    <ChevronLeft size={18} /> Précédent
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i} 
                      className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage((p: number) => p + 1)}
                    className="pagination-btn"
                  >
                    Suivant <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .results-container {
          padding: 3rem;
          color: white;
          max-width: 1600px;
          margin: 0 auto;
          font-family: inherit;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 2rem;
        }

        .header-info h1 { 
          margin: 0; 
          font-size: 3rem; 
          font-weight: 900; 
          color: #fcb133;
          letter-spacing: -1px;
        }
        .subtitle { 
          margin: 0.5rem 0 0; 
          opacity: 0.5; 
          font-size: 1.2rem; 
          font-weight: 500;
        }

        .header-actions { display: flex; gap: 1.5rem; align-items: center; }

        .view-switch { 
          display: flex; 
          background: rgba(255,255,255,0.03); 
          border-radius: 16px; 
          padding: 8px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .view-switch button {
          border: none;
          background: none;
          color: rgba(255,255,255,0.4);
          padding: 12px 24px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .view-switch button.active {
          background: #067fcc;
          color: white;
          box-shadow: 0 8px 20px rgba(6, 127, 204, 0.3);
        }

        .export-btn {
          background: transparent;
          color: #07a459;
          border: 2px solid #07a459;
          padding: 12px 28px;
          border-radius: 16px;
          cursor: pointer;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s;
        }
        .export-btn:hover { background: #07a459; color: white; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(7, 164, 89, 0.2); }

        .stats-layout { gap: 6rem; display: flex; flex-direction: column; }
        
        .stats-section {
          margin-bottom: 6rem;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .section-icon {
          width: 40px;
          height: 40px;
          background: #fcb133;
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.2rem;
        }
        .section-title h2 {
          font-size: 2rem;
          margin: 0;
          font-weight: 800;
          color: #fff;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
          gap: 2.5rem;
        }

        .chart-item {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 2.5rem;
          transition: all 0.4s;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .chart-item:hover { 
          transform: translateY(-8px); 
          background: rgba(255,255,255,0.04);
          border-color: rgba(252, 177, 51, 0.2);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .chart-info h3 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #fcb133; opacity: 0.9; }
        .total-responses { font-size: 0.85rem; opacity: 0.3; font-weight: 600; margin-top: 4px; display: block; }

        .map-loading {
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.02);
          border-radius: 24px;
          color: #fcb133;
          font-weight: 700;
        }
        .map-wrapper-results {
          padding: 0 2.5rem 2.5rem;
        }
        .map-view-container {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .table-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.05);
          padding: 12px 20px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          min-width: 400px;
        }
        .search-bar input {
          background: none;
          border: none;
          color: white;
          font-size: 1rem;
          width: 100%;
          outline: none;
        }
        .search-bar svg { opacity: 0.5; }

        .page-settings {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          opacity: 0.8;
        }
        .page-settings select {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          outline: none;
          cursor: pointer;
        }

        .table-card {
          background: rgba(0,0,0,0.2);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.05);
          overflow: hidden;
        }

        .table-responsive {
          overflow-x: auto;
          width: 100%;
          scrollbar-width: auto;
          scrollbar-color: #fcb133 rgba(255,255,255,0.05);
        }
        .table-responsive::-webkit-scrollbar { height: 12px; }
        .table-responsive::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 6px; }
        .table-responsive::-webkit-scrollbar-thumb { background: #fcb133; border-radius: 6px; border: 3px solid #0a0a0a; }

        table { width: 100%; border-collapse: collapse; min-width: 2500px; }
        th { 
          padding: 1.5rem 1rem; 
          text-align: left; 
          font-size: 0.75rem; 
          text-transform: uppercase; 
          letter-spacing: 1px; 
          color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.02);
          font-weight: 800;
          white-space: nowrap;
        }
        .cursor-pointer { cursor: pointer; }
        .cursor-pointer:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .th-content { display: flex; align-items: center; gap: 8px; }

        td { padding: 1.2rem 1rem; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.03); vertical-align: middle; white-space: nowrap; }
        .centered-cell { text-align: center; }
        tr:hover td { background: rgba(255,255,255,0.02); }

        .sticky-col { position: sticky; left: 0; background: #0a0a0a; z-index: 10; border-right: 1px solid rgba(255,255,255,0.05); }
        .bold-email { font-weight: 700; color: #067fcc; }

        .tag { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; margin-right: 5px; }
        .tag.zone { background: rgba(6, 127, 204, 0.1); color: #067fcc; border: 1px solid rgba(6, 127, 204, 0.2); }
        
        .score-badge { padding: 6px 12px; border-radius: 10px; font-weight: 900; font-size: 0.85rem; color: white; }
        .status { padding: 6px 14px; border-radius: 12px; font-weight: 800; font-size: 0.8rem; }
        .status.yes { background: rgba(7, 164, 89, 0.1); color: #07a459; }
        .status.no { background: rgba(235, 47, 80, 0.1); color: #eb2f50; }
        .status.maybe { background: rgba(252, 177, 51, 0.1); color: #fcb133; }

        .venue-cell { max-width: 250px; font-size: 0.8rem; opacity: 0.7; }

        .pagination {
          margin-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
        }
        .pagination p { font-size: 0.9rem; opacity: 0.6; }
        .pagination strong { color: #fcb133; }

        .pagination-btns { display: flex; gap: 8px; }
        .pagination-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 8px 16px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .pagination-btn:hover:not(:disabled) { background: rgba(255,255,255,0.1); transform: translateY(-2px); }
        .pagination-btn.active { background: #067fcc; color: white; border-color: #067fcc; }
        .pagination-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        @media (max-width: 1000px) {
          .charts-grid { grid-template-columns: 1fr; }
          .results-header { flex-direction: column; gap: 2rem; }
          .results-container { padding: 1.5rem; }
          .search-bar { min-width: 100%; }
          .pagination { flex-direction: column; gap: 1.5rem; text-align: center; }
        }
      `}</style>
    </div>
  );
}
