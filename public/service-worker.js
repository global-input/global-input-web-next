const BUILD_ID = '{{BUILD_ID}}';
const CACHE_NAME = self.__WB_MANIFEST ? 
  `app-cache-${self.__WB_MANIFEST[0].url.split('/')[3]}-${BUILD_ID}` : 
  `app-cache-v1-${BUILD_ID}`;



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
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({ type: 'UPDATE_AVAILABLE' });
    });
    self.clients.claim();
  })());
});

self.addEventListener('message', async (event) => {  
  if (event.data.type === 'START_UPDATE') {
    console.log("START_UPDATE is received by the service worker");
    caches.keys().then(async (cacheNames) => {
      for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
      }
    })        
    console.log("Caches are deleted");
    const clients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
    console.log("looping through clients: ", clients);
    clients.forEach(client => {
      console.log("Sending CACHE_DELETED to the application...");
      client.postMessage({ type: 'CACHE_DELETED' });
    });
  }
  if (event.data.type === 'SKIP_WAITING') {
    console.log("SKIP_WAITING is received by the service worker");
    await self.skipWaiting();
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      console.log("Sending VERSION_ACTIVATED to the application...");
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
  if (event.request.method !== 'GET' || event.request.url.endsWith('service-worker.js')) return;

  event.respondWith(
    (async () => {
      try {
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