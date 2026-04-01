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
  ChevronLeft, Search, ArrowUpDown, ArrowUp, ArrowDown, Map as MapIcon,
  HelpCircle
} from 'lucide-react';
import { QUESTIONS, SECTIONS } from '@/lib/survey-questions';

const SurveyMap = dynamic(() => import('./SurveyMap'), { 
  ssr: false,
  loading: () => <div className="map-loading">Chargement de la carte...</div>
});

const OriginMap = dynamic(() => import('./OriginMap'), { 
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
  const [serverExporting, setServerExporting] = useState(false);

  // Table state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const exportFromServer = async () => {
    setServerExporting(true);
    try {
      const pass = sessionStorage.getItem('survey_auth') || '';
      const res = await fetch('/api/enquete/export', {
        headers: { 'Authorization': pass }
      });
      if (!res.ok) throw new Error('Unauthorized');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const date = new Date().toISOString().split('T')[0];
      a.download = `RETEX_Milano_Cortina_2026_${date}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      alert('Erreur lors du téléchargement.');
    } finally {
      setServerExporting(false);
    }
  };

  const stats = useMemo(() => {
    const counts: Record<string, Record<string, number>> = {};
    const averages: Record<string, { sum: number, count: number }> = {};
    
    data.forEach(resp => {
      Object.entries(resp.answers).forEach(([key, val]) => {
        // Categorical counts
        if (!counts[key]) counts[key] = {};
        if (Array.isArray(val)) {
          val.forEach(v => {
            const strVal = String(v);
            counts[key][strVal] = (counts[key][strVal] || 0) + 1;
          });
        } else if (val !== null && val !== undefined) {
          const strVal = String(val);
          counts[key][strVal] = (counts[key][strVal] || 0) + 1;
        }

        // Numeric averages (only for values that are numbers and in a reasonable range, or defined as range)
        if (typeof val === 'number' || (typeof val === 'string' && val !== '' && !isNaN(Number(val)))) {
          if (!averages[key]) averages[key] = { sum: 0, count: 0 };
          averages[key].sum += Number(val);
          averages[key].count += 1;
        }
      });
    });

    return { counts, averages };
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

    // Build dynamic column mapping from all QUESTIONS (exclude 'info' type)
    const dataQuestions = QUESTIONS.filter(q => q.type !== 'info');

    // Fixed columns first
    const fixedCols = [
      { header: 'ID', key: '_id', width: 8 },
      { header: 'Email', key: '_email', width: 35 },
      { header: 'Date Soumission', key: '_date', width: 22 },
      { header: 'Version', key: '_version', width: 10 },
    ];

    // One column per question
    const questionCols = dataQuestions.map(q => ({
      header: q.label,
      key: q.id,
      width: q.type === 'text' ? 50 : q.type === 'multi-select' ? 40 : 25,
    }));

    // Tracking/metadata cols
    const metaCols = [
      { header: 'Navigateur', key: '_user_agent', width: 40 },
      { header: 'Résolution écran', key: '_screen_res', width: 16 },
      { header: 'Durée (s)', key: '_duration', width: 12 },
    ];

    const allCols = [...fixedCols, ...questionCols, ...metaCols];
    const totalCols = allCols.length;

    // Apply column metadata (widths) FIRST so letters are available
    worksheet.columns = allCols.map(c => ({ key: c.key, width: c.width }));

    // Title row spanning all columns
    worksheet.mergeCells(1, 1, 1, totalCols);
    const titleRow = worksheet.getRow(1);
    titleRow.values = ['RAPPORT DES RÉSULTATS - RETEX MILANO CORTINA 2026'];
    titleRow.font = { name: 'Arial Black', size: 16, color: { argb: 'FFFFFFFF' }, bold: true };
    titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF067FCC' } };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };
    titleRow.height = 40;

    // Header row at row 2
    const headerRow = worksheet.getRow(2);
    headerRow.values = allCols.map(c => c.header);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1A2E' } };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    headerRow.height = 45;

    // Section color header groups
    const sectionColors: Record<string, string> = {
      'Profil': 'FF1B4F72',
      'Rôle & Sites': 'FF154360',
      'Vie aux Jeux': 'FF1A5276',
      'Opérationnel': 'FF0E6655',
      'Futur': 'FF6E2F7C',
      'Divers': 'FF784212',
    };

    // Color the question header cells by section
    dataQuestions.forEach((q, idx) => {
      const colIdx = fixedCols.length + idx + 1; // 1-based
      const cell = headerRow.getCell(colIdx);
      const color = sectionColors[q.section] || 'FF333333';
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
    });

    // Add data rows
    data.forEach((resp, index) => {
      const tracking = (resp.answers as any)._metadata || {};
      const rowValues: any = {
        _id: resp.id,
        _email: resp.email || 'Anonyme',
        _date: new Date(resp.created_at).toLocaleString('fr-FR'),
        _version: resp.version || 'V4',
        _user_agent: tracking.user_agent || '',
        _screen_res: tracking.screen_res || '',
        _duration: tracking.duration_seconds || '',
      };

      // Fill in all question answers
      dataQuestions.forEach(q => {
        const val = resp.answers[q.id];
        if (val === null || val === undefined) {
          rowValues[q.id] = '';
        } else if (Array.isArray(val)) {
          rowValues[q.id] = val.join(', ');
        } else {
          rowValues[q.id] = val;
        }
      });

      const row = worksheet.addRow(rowValues);

      // Zebra stripes
      if (index % 2 === 0) {
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F8FF' } };
      }

      // Wrap text for text columns and center others
      allCols.forEach((col, colIdx) => {
        const cell = row.getCell(colIdx + 1);
        const q = dataQuestions.find(dq => dq.id === col.key);
        if (q?.type === 'text') {
          cell.alignment = { wrapText: true, vertical: 'top' };
        } else {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        }

        // Highlight satisfaction scores
        if (q?.type === 'range') {
          const score = Number(cell.value);
          if (!isNaN(score)) {
            if (score >= 8) cell.font = { color: { argb: 'FF07A459' }, bold: true };
            else if (score < 5) cell.font = { color: { argb: 'FFEB2F50' }, bold: true };
            else cell.font = { color: { argb: 'FFFCB133' } };
          }
        }
      });
    });

    // Freeze panes: Header rows and first col
    worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 2 }];

    // Add borders
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
            right: { style: 'thin', color: { argb: 'FFDDDDDD' } }
          };
        });
      }
    });

    // Add a second sheet: Résumé par section
    const summarySheet = workbook.addWorksheet('Résumé Questions');
    summarySheet.columns = [
      { header: 'Section', key: 'section', width: 20 },
      { header: 'Question', key: 'question', width: 60 },
      { header: 'Type', key: 'type', width: 15 },
      { header: 'Nb réponses', key: 'count', width: 12 },
    ];
    const summaryHeader = summarySheet.getRow(1);
    summaryHeader.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    summaryHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF067FCC' } };
    summaryHeader.height = 25;

    dataQuestions.forEach(q => {
      const answers = data.map(r => r.answers[q.id]).filter(v => v !== null && v !== undefined && v !== '');
      summarySheet.addRow({
        section: q.section,
        question: q.label,
        type: q.type,
        count: answers.length,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `RETEX_Milano_2026_Complet_${new Date().toISOString().split('T')[0]}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return <ArrowUpDown size={14} opacity={0.3} />;
    return sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const renderTextAnswers = (key: string, label: string) => {
    const answers = data
      .map(r => r.answers[key])
      .filter(v => v && String(v).trim() !== '');
    
    if (answers.length === 0) return null;

    return (
      <div className="text-answers-item" key={key}>
        <div className="chart-info">
          <h3>{label}</h3>
          <span className="total-responses">{answers.length} réponses</span>
        </div>
        <div className="text-answers-list">
          {answers.map((ans, i) => (
            <div key={i} className="text-answer-entry">
              <span className="text-answer-num">{i + 1}</span>
              <p className="text-answer-text">{String(ans)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChart = (key: string, label: string, isRange: boolean = false) => {
    const rawData = stats.counts[key] || {};
    const avgData = stats.averages[key];
    
    const chartData = Object.entries(rawData)
      .map(([name, value]) => ({ name, value: Number(value) }))
      .sort((a, b) => {
        // Sort numeric scales naturally
        if (!isNaN(Number(a.name)) && !isNaN(Number(b.name))) {
          return Number(a.name) - Number(b.name);
        }
        return b.value - a.value;
      });
    
    if (chartData.length === 0) return null;

    const isYesNo = chartData.every(d => ['Oui', 'Non', 'Je réfléchis encore', 'Je ne souhaite pas répondre'].includes(d.name));
    const averageVal = (isRange || key.startsWith('satisfaction') || key.includes('importance')) && avgData && avgData.count > 0 
      ? Number((avgData.sum / avgData.count).toFixed(1)) 
      : null;

    const getScoreColor = (score: number) => {
      if (score >= 8) return '#07a459'; // Green
      if (score >= 6) return '#86c232'; // Light Green
      if (score >= 4) return '#fcb133'; // Orange
      return '#eb2f50'; // Red
    };

    return (
      <div className="chart-item" key={key}>
        <div className="chart-info-flex">
          <div className="chart-info">
            <h3>{label}</h3>
            <span className="total-responses">{Object.values(rawData).reduce((a: number, b: number) => a + b, 0)} réponses</span>
          </div>
          {averageVal !== null && (
            <div className="average-visual" style={{ borderColor: getScoreColor(averageVal) }}>
              <div className="avg-circle-bg">
                <svg viewBox="0 0 36 36" className="circular-chart" width="48" height="48" fill="none">
                  <path className="circle-bg"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle"
                    fill="none"
                    strokeDasharray={`${averageVal * 10}, 100`}
                    style={{ stroke: getScoreColor(averageVal) }}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="avg-text">
                  <span className="avg-val">{averageVal.toString()}</span>
                  <span className="avg-unit">/10</span>
                </div>
              </div>
              <span className="avg-label-bottom">Moyenne</span>
            </div>
          )}
        </div>
        <div className="chart-wrapper">
          {chartData.length <= 4 || isYesNo || isRange ? (
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
          <button onClick={exportFromServer} className="export-btn server-export-btn" disabled={serverExporting}>
            <Download size={18} /> {serverExporting ? 'Génération…' : 'Télécharger Excel (complet)'}
          </button>
        </div>
      </div>

      <div className="results-content">
        {view === 'stats' && (
          <div className="stats-layout">
            <div className="stats-grid-container">
              {SECTIONS.map((section, sectionIdx) => {
                const sectionLabel = section === 'Profil' ? 'Profil des Volontaires' 
                  : section === 'Rôle & Sites' ? 'Missions & Sites' 
                  : section === 'Vie aux Jeux' ? 'Satisfaction & Vie aux Jeux' 
                  : section === 'Opérationnel' ? 'Opérationnel' 
                  : section === 'Futur' ? 'Futur & Alpes 2030' 
                  : section;
                const chartQuestions = QUESTIONS.filter(q => q.section === section && q.type !== 'text' && q.type !== 'email' && q.type !== 'info');
                const textQuestions = QUESTIONS.filter(q => q.section === section && q.type === 'text');
                return (
                  <section className="stats-section" key={section}>
                    <div className="section-title">
                      <div className="section-icon">{sectionIdx + 1}</div>
                      <h2>{sectionLabel}</h2>
                    </div>
                    {chartQuestions.length > 0 && (
                      <div className="charts-grid">
                        {chartQuestions.map(q => renderChart(q.id, q.label, q.type === 'range'))}
                      </div>
                    )}
                    {textQuestions.length > 0 && (
                      <div className="text-questions-section">
                        <h3 className="text-questions-title">Réponses texte libres</h3>
                        <div className="text-questions-grid">
                          {textQuestions.map(q => renderTextAnswers(q.id, q.label))}
                        </div>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </div>
        )}

        {view === 'map' && (
          <div className="map-view-container">
            <div className="maps-grid">
              <div className="table-card">
                <div className="table-header">
                  <h3>Lieux d'origine (Régions)</h3>
                  <p>Provenance géographique des volontaires français</p>
                </div>
                <div className="map-wrapper-results">
                  <OriginMap data={data} />
                </div>
              </div>

              <div className="table-card">
                <div className="table-header">
                  <h3>Lieux de mission (Italie)</h3>
                  <p>Visualisation des volontaires par site et sous-site d'affectation</p>
                </div>
                <div className="map-wrapper-results">
                  <SurveyMap data={data} />
                </div>
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
                      {QUESTIONS.filter(q => q.type !== 'info').map(q => (
                        <th key={q.id} className="cursor-pointer" onClick={() => handleSort(q.id)}>
                          <div className="th-content">{q.label} <SortIcon colKey={q.id} /></div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((resp: SurveyResponse) => (
                      <tr key={resp.id}>
                        <td className="sticky-col bold-email">{resp.email || 'Anonyme'}</td>
                        <td className="nowrap">{new Date(resp.created_at).toLocaleDateString()}</td>
                        {QUESTIONS.filter(q => q.type !== 'info').map(q => {
                          const val = resp.answers[q.id];
                          if (q.type === 'range') {
                            return (
                              <td key={q.id} className="score-cell">
                                <span className="score-badge" style={{ background: (val >= 8 ? '#07a459' : val >= 5 ? '#fcb133' : '#eb2f50') }}>
                                  {val}/10
                                </span>
                              </td>
                            );
                          }
                          if (q.id === 'email') return <td key={q.id}>{val || '-'}</td>;
                          if (Array.isArray(val)) {
                            return (
                              <td key={q.id} className="tag-cell">
                                {val.map((v: string) => <span key={v} className="tag zone">{v}</span>)}
                              </td>
                            );
                          }
                          if (val === 'Oui') return <td key={q.id} className="centered-cell">✅</td>;
                          if (val === 'Non') return <td key={q.id} className="centered-cell">❌</td>;
                          return <td key={q.id} className={q.type === 'text' ? 'venue-cell' : ''}>{val || '-'}</td>;
                        })}
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
        .export-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

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

        .chart-info-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .chart-info h3 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #fcb133; opacity: 0.9; }
        .total-responses { font-size: 0.85rem; opacity: 0.3; font-weight: 600; margin-top: 4px; display: block; }
        
        .average-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.05);
          padding: 12px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.1);
          width: 80px;
          height: 90px;
          flex-shrink: 0;
          justify-content: center;
          margin-left: 1rem;
          overflow: hidden;
          max-width: 80px;
        }
        .avg-circle-bg {
          position: relative;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }
        .circular-chart {
          display: block;
          margin: 0 auto;
          width: 48px;
          height: 48px;
        }
        .circle-bg {
          fill: none;
          stroke: rgba(255,255,255,0.1);
          stroke-width: 3.5;
        }
        .circle {
          fill: none;
          stroke-width: 3.5;
          stroke-linecap: round;
          transition: stroke-dasharray 0.3s ease;
        }
        .avg-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 1;
          z-index: 5;
        }
        .avg-val {
          font-size: 1.1rem;
          font-weight: 900;
          color: #fff;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .avg-unit {
          font-size: 0.45rem;
          opacity: 0.6;
          font-weight: 800;
          margin-top: -2px;
        }
        .avg-label-bottom {
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 900;
          opacity: 0.5;
        }

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
        @media (min-width: 1024px) {
          .maps-grid {
            display: flex;
            gap: 2rem;
          }
          .maps-grid > * {
            flex: 1;
            min-width: 0;
          }
        }
        @media (max-width: 1023px) {
          .maps-grid {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
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

        .text-questions-section {
          margin-top: 3rem;
        }
        .text-questions-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0 0 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .text-questions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
          gap: 2.5rem;
        }
        .text-answers-item {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .text-answers-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 400px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #fcb133 rgba(255,255,255,0.05);
          padding-right: 0.5rem;
        }
        .text-answers-list::-webkit-scrollbar { width: 6px; }
        .text-answers-list::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 3px; }
        .text-answers-list::-webkit-scrollbar-thumb { background: #fcb133; border-radius: 3px; }
        .text-answer-entry {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          border-left: 3px solid rgba(252, 177, 51, 0.3);
        }
        .text-answer-num {
          font-size: 0.7rem;
          font-weight: 900;
          color: #fcb133;
          opacity: 0.6;
          min-width: 20px;
          padding-top: 2px;
        }
        .text-answer-text {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.8);
        }

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
