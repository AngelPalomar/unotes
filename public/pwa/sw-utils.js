function limpiarCache(cacheName, numeroItem) {
	//Agregar función debajo del put en dynamic  -> limpiarCache(CACHE_DYNAMIC,5)
	caches.open(cacheName).then((cache) => {
		return cache.keys().then((keys) => {
			if (keys.length > numeroItem) {
				cache.delete(keys[0]).then(limpiarCache(cacheName, numeroItem));
			}
		});
	});
}

// Guardar  en el cache dinamico
function actualizaCacheDinamico(cacheDinamico, req, res) {
	if (res.ok) {
		return caches.open(cacheDinamico).then((cache) => {
			cache.put(req, res.clone());

			return res.clone();
		});
	} else {
		return res;
	}
}
// Cache with network update
function actualizaCacheStatico(estaticoCache, req, APP_SHELL_INMUTABLE) {
	if (APP_SHELL_INMUTABLE.includes(req.url)) {
		// No hace falta actualizar el inmutable
	} else {
		return fetch(req).then((res) => {
			return actualizaCacheDinamico(estaticoCache, req, res);
		});
	}
}

//Estrategia de cache Red y actualización de cache

function manejoApi(cacheName, req) {
	if (req.clone().method === 'POST' || req.clone().method === 'PUT') {
		if (self.registration.sync) {
			return req
				.clone()
				.text()
				.then((body) => {
					const bodyObj = JSON.parse(body);
					return guardarMensaje(bodyObj);
				});
		} else {
			return fetch(req);
		}
	} else {
		return fetch(req)
			.then((res) => {
				if (res.ok) {
					actualizaCacheDinamico(cacheName, req, res.clone());
					return res.clone();
				} else {
					return caches.match(req);
				}
			})
			.catch((err) => {
				return caches.match(req);
			});
	}
}
