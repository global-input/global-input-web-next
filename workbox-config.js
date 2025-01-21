module.exports = {
  globDirectory: 'out/',
  globPatterns: [
    '**/*.{js,css,html,png,jpg,jpeg,gif,svg,ico,json}',
    '_next/static/**/*'
  ],
  globIgnores: ['**/api/**/*'],
  swDest: 'out/sw.js', // Keep it in the out directory for S3 deployment
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      // Cache Next.js static assets
      urlPattern: /\/_next\/static\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      // Cache images
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        }
      }
    },
    {
      // Cache main chunks
      urlPattern: /\/_next\/static\/chunks\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'chunks',
        expiration: {
          maxAgeSeconds: 24 * 60 * 60
        },
        networkTimeoutSeconds: 10
      }
    },
    {
      // Cache CSS
      urlPattern: /\/_next\/static\/css\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'css-cache'
      }
    },
    {
      // Cache page data
      urlPattern: /\/_next\/data\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'next-data',
        expiration: {
          maxAgeSeconds: 24 * 60 * 60
        }
      }
    }
  ]
}