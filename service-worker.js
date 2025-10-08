console.log("SW loaded dek be:::::");

self.importScripts(
  "https://client-version.cf.emarsys.net/web-emarsys-sdk-v4/latest/web-emarsys-service-worker.js"
);
self.addEventListener("install", (event) => {
  console.log("Service Worker Installed!");
});
// http://127.0.0.1:5500/service-worker.js?cache_clean=1ea3b8da-5a41-43e2-a1e8-9c400f706aaf

// http://127.0.0.1:5500/test/service-worker.js
