/** @type {import('next').NextConfig} */

// Origen real de las Cloud Functions (server-side; el navegador nunca lo ve).
// Si NEXT_PUBLIC_FUNCTIONS_BASE_URL apunta a una URL absoluta se usa tal cual;
// si es un path relativo (proxy), se usa FUNCTIONS_ORIGIN o el default de rundi-dev.
const envBase = (process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL || '').trim();
const functionsOrigin = (
  (process.env.FUNCTIONS_ORIGIN || '').trim() ||
  (envBase.startsWith('http') ? envBase : 'https://us-central1-rundi-dev.cloudfunctions.net')
).replace(/\/$/, '');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Sirve AVIF/WebP escalado por tamaño real de renderizado
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000, // 30 días
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000',
          },
          {
            // Preload de las caras de Satoshi usadas en el H1 (700 normal + itálica)
            key: 'Link',
            value:
              '</fonts/satoshi/satoshi-700.woff2>; rel=preload; as=font; type="font/woff2"; crossorigin="anonymous", ' +
              '</fonts/satoshi/satoshi-700i.woff2>; rel=preload; as=font; type="font/woff2"; crossorigin="anonymous"',
          },
        ],
      },
      {
        // Imágenes de marketing en /public/assets: cacheo largo del navegador
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
      {
        // Fuentes self-hosted: inmutables (el contenido nunca cambia)
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        // Proxy same-origin hacia Cloud Functions: evita CORS/preflight porque
        // el fetch real lo hace el servidor de Next, no el navegador.
        source: '/api/fn/:path*',
        destination: `${functionsOrigin}/:path*`,
      },
    ];
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Usar react-native-web para todos los imports de 'react-native'
      'react-native$': 'react-native-web',
    };

    return config;
  },
};

module.exports = nextConfig;
