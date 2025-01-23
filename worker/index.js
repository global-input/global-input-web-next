self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then(cache => 
        cache.addAll([])
      )
    );
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
  });
  
  self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
  
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then(response => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open('v1').then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
    );
  });