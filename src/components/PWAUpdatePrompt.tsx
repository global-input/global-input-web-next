'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const UpdateButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #323232;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  border: none;
  cursor: pointer;
  z-index: 9999;
  
  &:hover {
    background: #424242;
  }
`;

export function PWAUpdatePrompt() {
  const [showReload, setShowReload] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/'
          });
          console.log('Service Worker registered successfully');
          
          setRegistration(registration);

          // Check for existing waiting service worker
          if (registration.waiting) {
            setShowReload(true);
          }

          // Listen for new updates
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setShowReload(true);
                }
              });
            }
          });

        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      };

      registerSW();

      // Handle controller change (when skipWaiting is called)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (showReload) {
          window.location.reload();
        }
      });
    }
  }, [showReload]);

  const reloadPage = () => {
    if (registration?.waiting) {
      // Notify the waiting Service Worker to take control
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  if (!showReload) return null;

  return (
    <UpdateButton onClick={reloadPage}>
      Update available
    </UpdateButton>
  );
}