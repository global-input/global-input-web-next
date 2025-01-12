'use client';

import React, { useEffect } from 'react';
import { RenderReloader } from './RenderReloader';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

export function UpdateNotification() {
  useEffect(() => {
    serviceWorkerRegistration.register();
    return () => {
      serviceWorkerRegistration.unregister();
    };
  }, []);

  return (
    <RenderReloader
      reloader={(needsToReload, reload) => 
        needsToReload ? (
          <div className="fixed bottom-4 right-4 z-50">
            <button 
              onClick={reload}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-200 ease-in-out"
              aria-label="Update application"
            >
              Update available
            </button>
          </div>
        ) : <></>
      }
    />
  );
}