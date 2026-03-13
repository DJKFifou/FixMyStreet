'use client';

import { useSyncExternalStore } from 'react';
import InstallPrompt from './InstallPrompt';

function getIsStandalone() {
  if (typeof window === 'undefined') return false;
  // Standard APIs - Installed PWA report standalone
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  // iOS Safari (pre-15.4 or fallback)
  if ((navigator as Navigator & { standalone?: boolean }).standalone) return true;
  return false;
}

function subscribeStandalone(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(display-mode: standalone)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

export default function PwaInstallGate({ children }: { children: React.ReactNode }) {
  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getIsStandalone,
    () => false
  );

  if (isStandalone) {
    return children;
  }

  return <InstallPrompt />;
}
