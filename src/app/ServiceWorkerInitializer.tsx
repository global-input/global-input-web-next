// src/app/ServiceWorkerInitializer.tsx
'use client';

import { useEffect } from 'react';

export function ServiceWorkerInitializer() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log("****ServiceWorker message", event.data);
        if (event.data.type === 'UPDATE_AVAILABLE') {
          const registration = navigator.serviceWorker.ready.then(registration => {
            if (registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          });
        }
      });
    }
  }, []);

  return null;
}