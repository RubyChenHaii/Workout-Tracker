// 每次部署自動更新版本，避免舊快取殘留
const CACHE_NAME = 'gymreco-' + Date.now();
const STATIC_ASSETS = [
  '.',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './logo192.png',
  './logo512.png'
];

// 只快取同源請求，避免攔截到外部 API 請求
const isSameOrigin = (url) => new URL(url).origin === self.location.origin;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // 只處理 GET 請求且同源的資源
  if (event.request.method !== 'GET' || !isSameOrigin(event.request.url)) {
    return;
  }
  // 只快取靜態資源，不快取 API 請求（未來擴充用）
  const url = new URL(event.request.url);
  const isStaticAsset = url.pathname.match(/\.(js|css|png|ico|json|html)$/);
  const isAppRoot = url.pathname === '/' || url.pathname.endsWith('/workout-tracker') || url.pathname.endsWith('/workout-tracker/');

  if (!isStaticAsset && !isAppRoot) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // 只快取成功的回應
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        return response;
      });
    })
  );
});
