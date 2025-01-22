// ServiceWorkerInitializer.tsx
'use client'
import React from "react";

export function ServiceWorkerInitializer() {
  React.useEffect(() => {
    console.log("Page loaded, checking service worker...");
    if ('serviceWorker' in navigator) {
      console.log("Service Worker API is available");
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        console.log("Found registrations:", registrations);
      });
    } else {
      console.log("Service Worker API is not available");
    }
  }, []);

  return null;
}