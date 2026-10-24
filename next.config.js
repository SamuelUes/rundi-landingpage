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
