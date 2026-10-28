const PRECACHE = ["/BalanceTonFlic/masque/assets/ibm-plex-mono-latin-400-normal-CvHOgSBP.woff","/BalanceTonFlic/masque/assets/ibm-plex-mono-latin-400-normal-DMJ8VG8y.woff2","/BalanceTonFlic/masque/assets/ibm-plex-mono-latin-700-normal-7sUh57Bg.woff2","/BalanceTonFlic/masque/assets/ibm-plex-mono-latin-700-normal-CNHXzs6v.woff","/BalanceTonFlic/masque/assets/index-DmwBcp-K.js","/BalanceTonFlic/masque/assets/index-m_f5_cR9.css","/BalanceTonFlic/masque/assets/offensive-Btk1oe7F.png","/BalanceTonFlic/masque/assets/ort-wasm-simd-threaded.jsep-CQxPUKcR.mjs","/BalanceTonFlic/masque/assets/ort-wasm-simd-threaded.jsep-MDYUKy93.wasm","/BalanceTonFlic/masque/assets/worker-BbEtE9s1.js","/BalanceTonFlic/masque/icon-180.png","/BalanceTonFlic/masque/icon-192.png","/BalanceTonFlic/masque/icon-512.png","/BalanceTonFlic/masque/icon.svg","/BalanceTonFlic/masque/","/BalanceTonFlic/masque/manifest.webmanifest","/BalanceTonFlic/masque/models/LICENSE-centerface","/BalanceTonFlic/masque/models/SHA256SUMS","/BalanceTonFlic/masque/models/centerface.onnx"];
const CACHE = `masque-${"ea312797a5c04f04"}`;
const sw = self;
sw.addEventListener("install", (e) => {
	e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
});
sw.addEventListener("activate", (e) => {
	e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("masque-") && k !== CACHE).map((k) => caches.delete(k)))));
});
sw.addEventListener("fetch", (e) => {
	const { request } = e;
	if (request.method !== "GET" || new URL(request.url).origin !== location.origin) return;
	// Single-page app: every navigation gets the cached shell, with its security headers.
	const key = request.mode === "navigate" ? new URL("./", sw.registration.scope).href : request;
	// Servers may send Vary: Origin, and module scripts are requested with an Origin header the precache lacked.
	e.respondWith(caches.open(CACHE).then(async (cache) => await cache.match(key, { ignoreVary: true }) ?? fetch(request)));
});
