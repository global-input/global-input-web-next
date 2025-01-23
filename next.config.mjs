import withPWA from 'next-pwa';
/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',  // For static site generation
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true // Required for static export
  }  
}


export default withPWA({
  dest: 'out',
  sw: 'service-worker.js', 
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /\.html$/, // Match HTML files
      handler: 'NetworkFirst',
      options: {
        cacheName: 'html-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
        networkTimeoutSeconds: 10, // Fallback to cache if no response within 10 seconds
      },
    },
    {
      urlPattern: /\.(?:js|css)$/, // Cache JS and CSS files
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-js-css-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/, // Cache images
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      urlPattern: /.*/, // Cache everything else (fallback)
      handler: 'NetworkFirst',
      options: {
        cacheName: 'fallback-cache',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
  ],
  buildExcludes: [
    /\/_next\/app-build-manifest\.json$/, // Exclude app-build-manifest.json
    /\/_next\/build-manifest\.json$/, // Exclude build-manifest.json
    /\/_next\/static\/development\/.*/, // Exclude development-specific files
  ],
})(nextConfig);


