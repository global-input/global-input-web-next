const CACHE_NAME = 'app-cache-{{BUILD_ID}}';


// Install event - Cache the static assets
self.addEventListener('install', (event) => {
    console.log("installing service worker");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/', // Ensure these paths match your app's assets
        '/manifest.json',
        '/favicon.ico',
        '/globalInput-512.png',
        '/globalInput-256.png',
        '/globalInput-144.png',
        '/globalInput-96.png',
        '/globalInput-48.png',
        '/globalInput-32.png',
        '/globalInput-16.png',
        '/offline.html',
      ]);
    })
  );
  self.skipWaiting();
});

// Activate event - Cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log(`Deleting old cache: ${cache}`);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event - Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    //console.log("fetching service worker:"+event.request.url);
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok) {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse;
        })
      );
    })
  );
});

// Listen for skipWaiting messages
self.addEventListener('message', (event) => {
    console.log("message service worker:"+event.data.type);
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});