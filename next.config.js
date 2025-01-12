/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;