import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0a0f',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div style={{ position: 'absolute', top: -100, left: '50%', width: 600, height: 500, background: 'radial-gradient(ellipse, rgba(124,92,252,0.3) 0%, transparent 70%)', borderRadius: '50%', transform: 'translateX(-50%)', display: 'flex' }} />

        {/* Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(124,92,252,0.15)', border: '1px solid rgba(124,92,252,0.3)', borderRadius: 100, padding: '8px 20px', fontSize: 16, color: '#a78bfa', fontWeight: 600, marginBottom: 28 }}>
          ✦ Made in Australia, for Australian tradies
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, letterSpacing: '-3px', marginBottom: 24 }}>
          <span style={{ color: '#fff' }}>Bill</span>
          <span style={{ color: '#7c5cfc' }}>Mate</span>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 36, color: '#9ca3af', fontWeight: 500, textAlign: 'center', maxWidth: 700, lineHeight: 1.5, display: 'flex' }}>
          Free invoicing for Australian tradies.
        </div>

        {/* Sub */}
        <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
          {['30s to invoice', 'GST auto-calculated', 'Free forever'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280', fontSize: 18 }}>
              <span style={{ color: '#7c5cfc', fontWeight: 700 }}>✓</span> {item}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: 32, color: '#374151', fontSize: 16, display: 'flex' }}>
          bill-mate.com.au
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
