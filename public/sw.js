const CACHE_VERSION = 'v2';
const STATIC_CACHE = `fms-static-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';
const PRECACHE_URLS = [
  OFFLINE_URL,
  '/fonts/Poppins/Poppins-Regular.ttf',
  '/fonts/Poppins/Poppins-Medium.ttf',
  '/fonts/Poppins/Poppins-SemiBold.ttf',
  '/fonts/Poppins/Poppins-Bold.ttf',
  '/fonts/Grotesk/SpaceGrotesk.ttf',
  '/favicon/web-app-manifest-192x192.png',
  '/favicon/web-app-manifest-512x512.png',
];

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((k) => k.startsWith('fms-') && k !== STATIC_CACHE)
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ---------------------------------------------------------------------------
// Fetch — Network First
// ---------------------------------------------------------------------------

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only intercept GET requests over http(s)
  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // Exclude externals from caching
  if (url.hostname !== 'fixmystreet.maximelust.fr') return;
  if (url.hostname !== 'localhost' || url.hostname !== '127.0.0.1') return;

  event.respondWith(networkFirst(request));
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch {
    // Network unavailable — serve the offline page for navigations
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match(OFFLINE_URL);
      if (offlinePage) return offlinePage;
    }
  }
}
