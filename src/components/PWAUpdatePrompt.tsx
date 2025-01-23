// src/components/PWAUpdatePrompt.tsx
'use client';

import { useEffect, useState } from 'react';

export default function PWAUpdatePrompt() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [showReload, setShowReload] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      waitingWorker?.postMessage({ type: 'START_UPDATE' });
    } catch (error) {
      console.error('Failed to start update:', error);
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/'
          });

          if (registration.waiting) {
            setWaitingWorker(registration.waiting);
            setShowReload(true);
          }

          registration.addEventListener('waiting', event => {
            if (registration.waiting) {
              setWaitingWorker(registration.waiting);
              setShowReload(true);
            }
          });
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      };

      registerServiceWorker();

      navigator.serviceWorker.addEventListener('message', (event) => {
        switch(event.data.type) {
          case 'UPDATE_AVAILABLE':
            navigator.serviceWorker.ready.then(registration => {
              if (registration.waiting) {
                setWaitingWorker(registration.waiting);
                setShowReload(true);
              }
            });
            break;
          case 'CACHE_DELETED':
            waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
            break;
          case 'VERSION_ACTIVATED':
            setShowReload(false);
            window.location.reload();
            break;
        }
      });
    }
  }, [waitingWorker]);

  return showReload ? (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white p-4 flex justify-between items-center">
      <p>A new version is available!</p>
      <button
        onClick={handleUpdate}
        disabled={isUpdating}
        className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 disabled:opacity-50"
      >
        {isUpdating ? 'Updating...' : 'Update'}
      </button>
    </div>
  ) : null;
}