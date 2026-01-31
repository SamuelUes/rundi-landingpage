/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
