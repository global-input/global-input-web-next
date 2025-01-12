'use client';

import React, { useState, useEffect } from 'react';

type AvailableListener = (available: boolean) => void;
let waitingWorker: ServiceWorker | null = null;
const postSkipWaiting = () => {
  waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
};

let availableListener: AvailableListener | null = null;
let available = false;

export const onServiceWorkerUpdate = (
  registration: ServiceWorkerRegistration
) => {
  available = true;
  waitingWorker = registration.waiting;
  availableListener?.(available);
};

const reloadPage = () => {
  postSkipWaiting();
  window.location.reload();
};

type ReloadPage = () => void;

interface RenderReloaderProps {
  reloader: (needsToReload: boolean, reloadPage: ReloadPage) => React.ReactNode;
}

export const RenderReloader: React.FC<RenderReloaderProps> = ({ reloader }) => {
  const [needsToReload, setNeedsToReload] = useState<boolean>(available);

  useEffect(() => {
    availableListener = setNeedsToReload;
    
    return () => {
      availableListener = null;
    };
  }, []);

  return <>{reloader(needsToReload, reloadPage)}</>;
};