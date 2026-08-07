import { NextRequest, NextResponse } from 'next/server';

const VF_API_BASE = process.env.VF_API_BASE || 'https://espace.volontairesfrancais.fr/wp-json/vf/v1';
const VF_UA = 'Mozilla/5.0 (compatible; VolontairesFrancaisNextApp/1.0)';


export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const res = await fetch(`${VF_API_BASE}/survey/results`, {
      headers: { 'Authorization': authHeader, 'User-Agent': VF_UA },
    });
    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch (error) {
    console.error('Fetch results error:', error);
    return NextResponse.json({
      error: 'Failed to fetch survey results',
    }, { status: 500 });
  }
}
