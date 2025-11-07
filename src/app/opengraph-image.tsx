import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Epic Landing Page - Create stunning landing pages';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Epic Landing Page
          </h1>
          <p
            style={{
              fontSize: 36,
              color: '#cbd5e1',
              margin: 0,
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            Create stunning landing pages that convert visitors into customers
          </p>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '9999px',
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              Get Started Free
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
