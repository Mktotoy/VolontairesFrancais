import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import ExcelJS from 'exceljs';
import { QUESTIONS, SECTIONS } from '@/lib/survey-questions';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const SECTION_COLORS: Record<string, string> = {
  'Profil': 'FF1B4F72',
  'Rôle & Sites': 'FF154360',
  'Vie aux Jeux': 'FF1A5276',
  'Opérationnel': 'FF0E6655',
  'Futur': 'FF6E2F7C',
  'Divers': 'FF784212',
};

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const password = (process.env.SURVEY_PASSWORD || '').replace(/"/g, '');

    if (!authHeader || authHeader.replace(/"/g, '') !== password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await pool.query('SELECT * FROM survey_responses ORDER BY created_at DESC');
    const rows = result.rows;

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Volontaires Français';
    workbook.created = new Date();

    // ─── Sheet 1 : Toutes les réponses ───────────────────────────────────────
    const ws = workbook.addWorksheet('Réponses complètes');

    const dataQuestions = QUESTIONS.filter(q => q.type !== 'info');

    const fixedCols = [
      { header: 'ID', key: '_id', width: 8 },
      { header: 'Email', key: '_email', width: 35 },
      { header: 'Date soumission', key: '_date', width: 22 },
      { header: 'Version', key: '_version', width: 10 },
    ];

    const questionCols = dataQuestions.map(q => ({
      header: q.label,
      key: q.id,
      width: q.type === 'text' ? 55 : q.type === 'multi-select' ? 40 : 28,
      section: q.section,
      type: q.type,
    }));

    const metaCols = [
      { header: 'Navigateur', key: '_user_agent', width: 45, section: '', type: '' },
      { header: 'Résolution écran', key: '_screen_res', width: 16, section: '', type: '' },
      { header: 'Durée remplissage (s)', key: '_duration', width: 20, section: '', type: '' },
    ];

    const allCols = [...fixedCols.map(c => ({ ...c, section: '', type: '' })), ...questionCols, ...metaCols];

    ws.columns = allCols.map(c => ({ key: c.key, width: c.width }));

    // Row 1 : Section headers (spans)
    const sectionRow = ws.getRow(1);
    sectionRow.height = 22;

    // Row 2 : Column labels
    const headerRow = ws.getRow(2);
    headerRow.height = 50;

    // Fill row 2 labels and colors
    allCols.forEach((col, idx) => {
      const cell = headerRow.getCell(idx + 1);
      cell.value = col.header;
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 9 };
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

      const bgColor = col.section ? (SECTION_COLORS[col.section] || 'FF333333') : 'FF1A1A2E';
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } };
    });

    // Row 1 : section name merged cells
    let sectionStart = fixedCols.length + 1;
    SECTIONS.forEach(section => {
      const sectionQs = questionCols.filter(q => q.section === section);
      if (sectionQs.length === 0) return;

      const sectionEnd = sectionStart + sectionQs.length - 1;

      if (sectionStart === sectionEnd) {
        const cell = sectionRow.getCell(sectionStart);
        cell.value = section;
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SECTION_COLORS[section] || 'FF333333' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else {
        ws.mergeCells(1, sectionStart, 1, sectionEnd);
        const cell = sectionRow.getCell(sectionStart);
        cell.value = section;
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SECTION_COLORS[section] || 'FF333333' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }

      sectionStart = sectionEnd + 1;
    });

    // Fixed cols header row 1 merged
    if (fixedCols.length > 1) {
      ws.mergeCells(1, 1, 1, fixedCols.length);
    }
    const fixedHeaderCell = sectionRow.getCell(1);
    fixedHeaderCell.value = 'Métadonnées';
    fixedHeaderCell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
    fixedHeaderCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0D1117' } };
    fixedHeaderCell.alignment = { vertical: 'middle', horizontal: 'center' };

    // Meta cols header
    const metaStart = fixedCols.length + questionCols.length + 1;
    const metaEnd = metaStart + metaCols.length - 1;
    if (metaEnd > metaStart) ws.mergeCells(1, metaStart, 1, metaEnd);
    const metaCell = sectionRow.getCell(metaStart);
    metaCell.value = 'Tracking technique';
    metaCell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
    metaCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1A2E' } };
    metaCell.alignment = { vertical: 'middle', horizontal: 'center' };

    // Freeze header rows
    ws.views = [{ state: 'frozen', xSplit: 2, ySplit: 2 }];

    // Data rows
    rows.forEach((resp, index) => {
      const tracking = (resp.answers as any)?._metadata || {};
      const rowValues: Record<string, any> = {
        _id: resp.id,
        _email: resp.email || 'Anonyme',
        _date: new Date(resp.created_at).toLocaleString('fr-FR'),
        _version: resp.version || 'V4',
        _user_agent: tracking.user_agent || '',
        _screen_res: tracking.screen_res || '',
        _duration: tracking.duration_seconds ?? '',
      };

      dataQuestions.forEach(q => {
        const val = resp.answers?.[q.id];
        if (val === null || val === undefined) {
          rowValues[q.id] = '';
        } else if (Array.isArray(val)) {
          rowValues[q.id] = val.join(', ');
        } else {
          rowValues[q.id] = val;
        }
      });

      const row = ws.addRow(rowValues);

      if (index % 2 === 0) {
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F8FF' } };
      }

      allCols.forEach((col, colIdx) => {
        const cell = row.getCell(colIdx + 1);
        const q = dataQuestions.find(dq => dq.id === col.key);
        if (q?.type === 'text') {
          cell.alignment = { wrapText: true, vertical: 'top' };
        } else {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        }
        if (q?.type === 'range') {
          const score = Number(cell.value);
          if (!isNaN(score) && score > 0) {
            if (score >= 8) cell.font = { color: { argb: 'FF07A459' }, bold: true };
            else if (score < 5) cell.font = { color: { argb: 'FFEB2F50' }, bold: true };
            else cell.font = { color: { argb: 'FFFCB133' } };
          }
        }
      });

      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
          left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
          bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
          right: { style: 'thin', color: { argb: 'FFDDDDDD' } },
        };
      });
    });

    // ─── Sheet 2 : Résumé statistiques ───────────────────────────────────────
    const wsSummary = workbook.addWorksheet('Résumé stats');
    wsSummary.columns = [
      { key: 'section', width: 20 },
      { key: 'question', width: 65 },
      { key: 'type', width: 14 },
      { key: 'reponses', width: 12 },
      { key: 'non_repondu', width: 14 },
      { key: 'taux', width: 14 },
      { key: 'moyenne', width: 12 },
    ];

    const summaryHeader = wsSummary.getRow(1);
    summaryHeader.values = ['Section', 'Question', 'Type', 'Nb réponses', 'Non répondu', 'Taux réponse', 'Moyenne (si note)'];
    summaryHeader.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    summaryHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF067FCC' } };
    summaryHeader.alignment = { vertical: 'middle', horizontal: 'center' };
    summaryHeader.height = 28;

    dataQuestions.forEach((q, i) => {
      const answered = rows.filter(r => {
        const v = r.answers?.[q.id];
        return v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0);
      });
      const count = answered.length;
      const missing = rows.length - count;
      const rate = rows.length > 0 ? `${Math.round((count / rows.length) * 100)}%` : '—';

      let avg: string | number = '—';
      if (q.type === 'range') {
        const nums = answered.map(r => Number(r.answers[q.id])).filter(n => !isNaN(n));
        avg = nums.length > 0 ? Number((nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2)) : '—';
      }

      const row = wsSummary.addRow({
        section: q.section,
        question: q.label,
        type: q.type,
        reponses: count,
        non_repondu: missing,
        taux: rate,
        moyenne: avg,
      });

      if (i % 2 === 0) {
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F7FF' } };
      }

      const sectionCell = row.getCell(1);
      const sectionColor = SECTION_COLORS[q.section];
      if (sectionColor) {
        sectionCell.font = { color: { argb: 'FF' + sectionColor.slice(2) }, bold: true };
      }
    });

    // ─── Sheet 3 : Réponses texte libre ──────────────────────────────────────
    const textQuestions = dataQuestions.filter(q => q.type === 'text');
    if (textQuestions.length > 0) {
      const wsText = workbook.addWorksheet('Réponses texte libre');
      wsText.columns = [
        { key: 'section', width: 18 },
        { key: 'question', width: 60 },
        { key: 'reponse', width: 80 },
        { key: 'email', width: 35 },
        { key: 'date', width: 20 },
      ];

      const textHeader = wsText.getRow(1);
      textHeader.values = ['Section', 'Question', 'Réponse', 'Email', 'Date'];
      textHeader.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
      textHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2C3E50' } };
      textHeader.alignment = { vertical: 'middle', horizontal: 'center' };
      textHeader.height = 28;

      let rowIdx = 0;
      textQuestions.forEach(q => {
        rows.forEach(resp => {
          const val = resp.answers?.[q.id];
          if (!val || String(val).trim() === '') return;

          const row = wsText.addRow({
            section: q.section,
            question: q.label,
            reponse: String(val),
            email: resp.email || 'Anonyme',
            date: new Date(resp.created_at).toLocaleString('fr-FR'),
          });

          row.getCell(3).alignment = { wrapText: true, vertical: 'top' };
          row.getCell(2).alignment = { wrapText: true, vertical: 'top' };

          if (rowIdx % 2 === 0) {
            row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8F9FA' } };
          }
          rowIdx++;
        });
      });
    }

    // Generate buffer and return as file download
    const buffer = await workbook.xlsx.writeBuffer();
    const uint8Array = new Uint8Array(buffer);

    const date = new Date().toISOString().split('T')[0];
    const filename = `RETEX_Milano_Cortina_2026_${date}.xlsx`;

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(uint8Array.byteLength),
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to generate export' }, { status: 500 });
  }
}
