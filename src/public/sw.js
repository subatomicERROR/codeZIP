self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("codezip-v1").then((cache) =>
      cache.addAll(["/", "/codezip", "/about", "/jszip.min.js", "/index.html"])
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
