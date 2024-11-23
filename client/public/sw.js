const CACHE_NAME = "my-cache-v1"; // اسم کش
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/", // صفحه اصلی
        "/index.html", // فایل اصلی HTML
        OFFLINE_URL, // صفحه آفلاین
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // مستثنی کردن فایل‌های خاص
  if (url.pathname === "/manifest.json") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).catch(() => {
        // فقط صفحات HTML به آفلاین هدایت شوند
        if (event.request.headers.get("accept")?.includes("text/html")) {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});

// مرحله Activate: کش قدیمی رو پاک می‌کنه
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
