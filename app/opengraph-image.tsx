import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Volontaires français - Association des volontaires des Jeux Olympiques et Paralympiques';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadRighteousFont(): Promise<ArrayBuffer | null> {
    try {
        // Use an older user agent to get woff (not woff2) — satori only supports woff
        const css = await fetch(
            'https://fonts.googleapis.com/css?family=Righteous',
            { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko' } }
        ).then(r => r.text());

        const match = css.match(/url\((.+?)\)/);
        if (!match?.[1]) return null;

        return fetch(match[1]).then(r => r.arrayBuffer());
    } catch {
        return null;
    }
}

export default async function OgImage() {
    const fontData = await loadRighteousFont();

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0056b3 0%, #067fcc 60%, #fcb133 100%)',
                    fontFamily: fontData ? 'Righteous' : 'sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Decorative circles */}
                <div style={{
                    position: 'absolute',
                    top: -80,
                    right: -80,
                    width: 360,
                    height: 360,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: -120,
                    left: -60,
                    width: 440,
                    height: 440,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex',
                }} />

                {/* Tricolor bar */}
                <div style={{ display: 'flex', marginBottom: 36, gap: 0, borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{ width: 48, height: 12, background: '#002395', display: 'flex' }} />
                    <div style={{ width: 48, height: 12, background: 'white', display: 'flex' }} />
                    <div style={{ width: 48, height: 12, background: '#ED2939', display: 'flex' }} />
                </div>

                {/* Main content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 24,
                    padding: '0 80px',
                    textAlign: 'center',
                }}>
                    <div style={{
                        fontSize: 76,
                        fontWeight: 400,
                        color: 'white',
                        letterSpacing: '0px',
                        lineHeight: 1.1,
                        display: 'flex',
                    }}>
                        Volontaires francais
                    </div>

                    <div style={{
                        fontSize: 28,
                        color: 'rgba(255,255,255,0.88)',
                        fontWeight: 400,
                        lineHeight: 1.4,
                        maxWidth: 860,
                        display: 'flex',
                    }}>
                        Association des benevoles des Jeux Olympiques et Paralympiques
                    </div>

                    {/* Badge */}
                    <div style={{
                        marginTop: 8,
                        padding: '12px 40px',
                        background: 'rgba(255,255,255,0.18)',
                        border: '2px solid rgba(255,255,255,0.4)',
                        borderRadius: 50,
                        fontSize: 22,
                        color: 'white',
                        fontWeight: 400,
                        display: 'flex',
                    }}>
                        volontairesfrancais.fr
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: fontData
                ? [{ name: 'Righteous', data: fontData, style: 'normal', weight: 400 }]
                : [],
        }
    );
}
