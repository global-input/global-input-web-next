import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

skipWaiting();
clientsClaim();

// Force service worker to check for updates frequently
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  // Force update check on activation
  event.waitUntil(
    fetch(self.registration.scope + 'service-worker.js', {
      headers: { 'Service-Worker': 'script' }
    }).then(response => {
      if (response.status === 200) {
        return self.registration.update();
      }
    })
  );
});

// Add periodic update checks
setInterval(() => {
  self.registration.update();
}, 60 * 60 * 1000); // Check every hour

// Pre-cache all assets
precacheAndRoute(self.__WB_MANIFEST);

// Runtime caching
registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new NetworkFirst({
    cacheName: 'images'
  })
);