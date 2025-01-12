import { onServiceWorkerUpdate } from './RenderReloader';

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service Worker registered:', registration);

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          console.log('Service Worker state changed:', installingWorker.state);
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // New content is available
              console.log('New content is available');
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Content is cached for offline use
              console.log('Content is cached for offline use');
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

function isLocalhost(): boolean {
  return Boolean(
    window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );
}

export function register() {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    const swUrl = '/service-worker.js';
    
    if (isLocalhost()) {
      console.log('Running on localhost, checking service worker...');
      registerValidSW(swUrl, {
        onUpdate: onServiceWorkerUpdate,
      });
    } else {
      console.log('Registering service worker in production...');
      registerValidSW(swUrl, {
        onUpdate: onServiceWorkerUpdate,
      });
    }
  } else {
    console.log('Service Worker not registered (development or not supported)');
  }
}

export async function unregister() {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('ServiceWorker unregistered');
      }
    } catch (error) {
      console.error('Error unregistering service worker:', error);
    }
  }
}

// Helper function for development
export async function unregisterAndReload() {
  await unregister();
  window.location.reload();
}