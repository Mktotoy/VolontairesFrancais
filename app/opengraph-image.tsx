import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Volontaires français - Association des volontaires des Jeux Olympiques et Paralympiques';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
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
                    fontFamily: 'sans-serif',
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

                {/* Main content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 28,
                    padding: '0 80px',
                    textAlign: 'center',
                }}>
                    {/* Flag + rings */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: 56 }}>🇫🇷</span>
                        <span style={{ fontSize: 28, color: 'rgba(255,255,255,0.7)', fontWeight: 'bold' }}>|</span>
                        <span style={{ fontSize: 48 }}>🏅</span>
                    </div>

                    <div style={{
                        fontSize: 72,
                        fontWeight: 900,
                        color: 'white',
                        letterSpacing: '-1px',
                        lineHeight: 1.1,
                        display: 'flex',
                    }}>
                        Volontaires français
                    </div>

                    <div style={{
                        fontSize: 30,
                        color: 'rgba(255,255,255,0.88)',
                        fontWeight: 400,
                        lineHeight: 1.4,
                        maxWidth: 900,
                        display: 'flex',
                    }}>
                        L'association des volontaires français des Jeux Olympiques et Paralympiques
                    </div>

                    {/* Badge */}
                    <div style={{
                        marginTop: 8,
                        padding: '12px 36px',
                        background: 'rgba(255,255,255,0.18)',
                        border: '2px solid rgba(255,255,255,0.4)',
                        borderRadius: 50,
                        fontSize: 22,
                        color: 'white',
                        fontWeight: 600,
                        display: 'flex',
                    }}>
                        volontairesfrancais.fr
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
