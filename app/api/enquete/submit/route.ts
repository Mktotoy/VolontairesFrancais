import { NextRequest, NextResponse } from 'next/server';

const VF_API_BASE = process.env.VF_API_BASE || 'https://espace.volontairesfrancais.fr/wp-json/vf/v1';
const VF_UA = 'Mozilla/5.0 (compatible; VolontairesFrancaisNextApp/1.0)';


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const res = await fetch(`${VF_API_BASE}/survey/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': VF_UA },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch (error) {
    console.error('Survey submission error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to store survey response',
    }, { status: 500 });
  }
}
