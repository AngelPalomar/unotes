/* eslint-disable no-restricted-globals */
// imports
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js');

importScripts('pwa/sw-db.js');
importScripts('pwa/sw-utils.js');

//Estrategias de cache
//APP SHEL
const CACHE_DYNAMIC = 'dinamyc-unotes-uteq-pwa';
const CACHE_STATIC = 'static-unotes-uteq-pwa';
const CACHE_INMUTABLE = 'inmutable-unotes-uteq-pwa';

const APP_SHELL_INMUTABLE = [
	'https://fonts.googleapis.com/css2?family=Nunito&display=swap',
	'https://fonts.gstatic.com/s/nunito/v25/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshdTQ3jw.woff2',
	'https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js',
];
//'static/js/main.f0f1d1fb.js',

self.addEventListener('install', (event) => {
	const cacheStatico = caches.open(CACHE_STATIC).then((cache) => {
		return cache.addAll([
			'/',
			'index.html',
			'pwa/config.js',
			'favicon.ico',
			'pwa/sw-db.js',
			'pwa/sw-utils.js',
			'static/css/main.e6c13ad2.css',
		]);
	});
	const cacheInmutable = caches.open(CACHE_INMUTABLE).then((cache) => {
		return cache.addAll(APP_SHELL_INMUTABLE);
	});
	event.waitUntil(Promise.all([cacheStatico, cacheInmutable]));
	console.log(cacheStatico);
	console.log(cacheInmutable);
});

//Estrategia de cache
self.addEventListener('fetch', (event) => {
	let respuesta;
	//Cambio en estrategia de cache
	if (event.request.url.includes('/api')) {
		//Tenemos que enviar una respuesta
		respuesta = manejoApi(CACHE_DYNAMIC, event.request);
	} else {
		respuesta = caches.match(event.request).then((res) => {
			if (res) {
				actualizaCacheStatico(CACHE_STATIC, event.request, APP_SHELL_INMUTABLE);
				return res;
			} else {
				return fetch(event.request).then((newRes) => {
					return actualizaCacheDinamico(CACHE_DYNAMIC, event.request, newRes);
				});
			}
		});
	}

	event.respondWith(respuesta);
});

// tareas asíncronas
self.addEventListener('sync', (event) => {
	console.log('SW: Sync');

	if (event.tag === 'nuevo-post') {
		// postear a BD cuando hay conexión
		const respuesta = postearMensajes();

		event.waitUntil(respuesta);
	}
});
