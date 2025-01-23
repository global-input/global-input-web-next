// public/service-worker.js
const CACHE_NAME = 'app-cache-{{BUILD_ID}}';
let cacheToDelete = null;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/', '/manifest.json', '/favicon.ico',
        '/globalInput-512.png', '/globalInput-256.png',
        '/globalInput-144.png', '/globalInput-96.png',
        '/globalInput-48.png', '/globalInput-32.png',
        '/globalInput-16.png', '/offline.html',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(async (cacheNames) => {
      for (const cache of cacheNames) {
        if (cache !== CACHE_NAME) {
          cacheToDelete = cache;
          const clients = await self.clients.matchAll();
          clients.forEach(client => {
            client.postMessage({ type: 'UPDATE_AVAILABLE' });
          });
          break;
        }
      }
    })
  );
  self.clients.claim();
});

self.addEventListener('message', async (event) => {
  if (event.data.type === 'START_UPDATE' && cacheToDelete) {
    await caches.delete(cacheToDelete);
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({ type: 'CACHE_DELETED' });
    });
  }
  if (event.data.type === 'SKIP_WAITING') {
    await self.skipWaiting();
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({ type: 'VERSION_ACTIVATED' });
    });
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((networkResponse) => {
        if (networkResponse.ok) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      });
    })
  );
});