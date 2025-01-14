'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';

const SnackbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #323232;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
  z-index: 9999;
`;

const SnackbarMessage = styled.span`
  margin-right: 16px;
`;

const SnackbarAction = styled.button`
  border: none;
  background: transparent;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  text-transform: uppercase;
  font-size: 0.875rem;
`;

let waitingWorker: ServiceWorker | null = null;

export function onServiceWorkerUpdate(registration: ServiceWorkerRegistration) {
  waitingWorker = registration.waiting;
}

export default function UpdateNotification() {
  const [showReload, setShowReload] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('controllerchange', () => {
          if (showReload) {
            window.location.reload();
          }
        });
      });
    }
  }, [showReload]);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(true);
  };

  if (!waitingWorker) return null;

  return (
    <SnackbarContainer>
      <SnackbarMessage>New version available!</SnackbarMessage>
      <SnackbarAction onClick={reloadPage}>
        Reload
      </SnackbarAction>
    </SnackbarContainer>
  );
}