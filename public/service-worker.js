self.addEventListener('install', (event) => {
    const assetsToCache = [
      '/',
      '/index.html',
      '/styles.css',
      '/script.js',
      '/offline.html',
    ];
  
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return Promise.allSettled(
          assetsToCache.map(asset =>
            fetch(asset).then(response => {
              if (response.ok) {
                return cache.put(asset, response);
              }
              console.warn(`Skipping caching for ${asset}:`, response.status);
            }).catch(err => {
              console.error(`Failed to fetch ${asset}:`, err);
            })
          )
        );
      })
    );
  });
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then(cacheNames => 
        Promise.all(
          cacheNames.map(cache => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        )
      )
    );
  });

const CACHE_NAME = 'v1';

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
  
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => 
          caches.match(event.request).then(response => 
            response || caches.match('/offline.html')
          )
        )
    );
  });