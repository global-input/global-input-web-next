/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static exports for S3

  // Image optimization
  images: {
    unoptimized: true, // Required for static export
    domains: ['media.iterativesolution.co.uk'], // Add any specific domains you're using
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Optimize for common screen sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Optimize for thumbnail sizes
    formats: ['image/webp'], // Use WebP for better compression
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
    dangerouslyAllowSVG: true, // Allow SVG if you're using them
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Asset optimization
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  generateEtags: true, // Generate ETags for caching

  // Webpack configuration
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];  // Required for global-input-react
    
    // Optimize CSS
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    };

    return config;
  },

  // Headers for CloudFront
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },

  // Environment configuration
  env: {
    NEXT_PUBLIC_CLOUDFRONT_DOMAIN: process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN,
  },
};

module.exports = nextConfig;