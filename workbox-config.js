// workbox-config.js
module.exports = {
  globDirectory: 'out/', // Next.js static export directory
  globPatterns: [
    '**/*.{js,css,html,png,jpg,jpeg,gif,svg,ico,json}',
    '_next/static/**/*' // Include Next.js static assets
  ],
  // Exclude API routes and data files
  globIgnores: ['**/api/**/*'],
  swDest: 'out/service-worker.js',
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        },
      },
    }    
  ],
}