"use client";

import { useEffect, useSyncExternalStore } from "react";
import InstallPrompt from "./InstallPrompt";

async function registerServiceWorker() {
  navigator.serviceWorker.register("/sw.js", {
    scope: "/",
    updateViaCache: "none",
  });
}

function getIsStandalone() {
  if (typeof window === "undefined") return false;
  // Standard APIs - Installed PWA report standalone
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  // iOS Safari (pre-15.4 or fallback)
  if ((navigator as Navigator & { standalone?: boolean }).standalone)
    return true;
  return false;
}

function subscribeStandalone(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(display-mode: standalone)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export default function PwaInstallGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getIsStandalone,
    () => false,
  );

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      registerServiceWorker();
    }
  });

  if (isStandalone) {
    return children;
  }

  return <InstallPrompt />;
}
