// public/service-worker.js
// const CACHE_NAME = 'app-cache-{{BUILD_ID}}';
const CACHE_NAME = self.__WB_MANIFEST ? 
  `app-cache-${self.__WB_MANIFEST[0].url.split('/')[3]}` : 
  'app-cache-v1';


let cacheToDelete = null;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/favicon.ico',
        '/globalInput-512.png',
        '/globalInput-256.png',
        '/globalInput-144.png',
        '/globalInput-96.png',
        '/globalInput-48.png',
        '/globalInput-32.png',
        '/globalInput-16.png',
        '/offline.html'
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

const isNextJsStaticFile = (url) => {
  return url.includes('/_next/static/') || 
         url.includes('/_next/data/') ||
         url.includes('/_next/image');
};

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    (async () => {
      try {
        if (isNextJsStaticFile(event.request.url)) {
          return await fetch(event.request);
        }

        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;

        const response = await fetch(event.request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, response.clone());
        }
        return response;
      } catch (error) {
        if (event.request.mode === 'navigate') {
          const cache = await caches.open(CACHE_NAME);
          return cache.match('/offline.html');
        }
        throw error;
      }
    })()
  );
});