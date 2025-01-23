// src/components/PWAUpdatePrompt.tsx
'use client';

import { useEffect, useState } from 'react';

export default function PWAUpdatePrompt() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [showReload, setShowReload] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setError(null);
    try {
      console.log("PWAUpdatePrompt: handleUpdate: sending START_UPDATE to waitingWorker");
      waitingWorker?.postMessage({ type: 'START_UPDATE' });
    } catch (err) {
      setError('Failed to update. Please refresh the page.');
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
            console.log("UPDATE_AVAILABLE is received by the application");
            navigator.serviceWorker.ready.then(registration => {
              if (registration.waiting) {
                setWaitingWorker(registration.waiting);
                setShowReload(true);
              }
            });
            break;
          case 'CACHE_DELETED':
            console.log("application received CACHE_DELETED message");
            setIsUpdating(false);
            console.log("PWAUpdatePrompt: CACHE_DELETED: sending SKIP_WAITING to waitingWorker");
            waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
            break;
          case 'VERSION_ACTIVATED':
            console.log("application received VERSION_ACTIVATED message");
            window.location.reload();
            break;
        }
      });
    }
  }, [waitingWorker]);

  return showReload ? (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white p-4 flex justify-between items-center">
      <div>
        <p>A new version is available!</p>
        {error && <p className="text-red-200 text-sm mt-1">{error}</p>}
      </div>
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
