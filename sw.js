
const CACHE_NAME = 'gesture-app-v11';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './suara_jokowi.mp3',
  './lagu_kita.mp3',
  './video_pikiran.mp4',
  './jumpscare.mp4',
  './heart_media_1.jpg',
  './heart_media_2.jpg',
  './heart_media_3.jpg',
  './heart_media_4.jpg',
  './heart_media_5.jpg',
  './heart_media_6.jpg',
  './heart_media_7.jpg',
  './heart_media_8.jpg',
  './heart_media_9.jpg',
  './heart_media_besar.mp4'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pakai per-file catch (bukan cache.addAll polos) supaya kalau ada
      // file opsional yang BELUM kamu isi (mis. jumpscare.mp4 atau salah
      // satu heart_media_*), instalasi service worker tidak gagal total.
      return Promise.all(
        urlsToCache.map((url) => cache.add(url).catch((err) => console.warn('Gagal cache (opsional):', url, err)))
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

