'use client';

import { useEffect, useState } from 'react';

export default function PWAUpdatePrompt() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [showReload, setShowReload] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/'
          });

          registration.addEventListener('waiting', event => {
            if (registration.waiting) {
              setWaitingWorker(registration.waiting);
              setShowReload(true);
            }
          });

          // Handle updates
          registration.addEventListener('controlling', event => {
            window.location.reload();
          });

          // Check if there's an existing waiting worker
          if (registration.waiting) {
            setWaitingWorker(registration.waiting);
            setShowReload(true);
          }
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      };

      registerServiceWorker();
    }
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload();
  };

  return showReload ? (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white p-4 flex justify-between items-center">
      <p>A new version is available!</p>
      <button
        onClick={reloadPage}
        className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100"
      >
        Reload
      </button>
    </div>
  ) : null;
}