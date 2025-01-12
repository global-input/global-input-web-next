/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  sw: 'service-worker.js',
  buildExcludes: [/middleware-manifest\.json$/],
  // Remove buildId and use cacheId if needed
  cacheId: 'global-input-web'
})

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  
  // Minimal image config for static export
  images: {
    unoptimized: true, // Required for static export
  },

  // Webpack configuration for global-input-react
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];
    return config;
  },
};

module.exports = withPWA(nextConfig);