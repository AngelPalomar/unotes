// Utilidades para grabar PouchDB
const db = new PouchDB('mensajes');

function guardarMensaje(mensaje) {
	mensaje._id = new Date().toISOString();

	return db.put(mensaje).then(() => {
		self.registration.sync.register('nuevo-post');

		const newResp = { ok: true, offline: true };

		return new Response(JSON.stringify(newResp));
	});
}

// Postear mensajes a la API
function postearMensajes() {
	const posteos = [];

	return db.allDocs({ include_docs: true }).then((docs) => {
		docs.rows.forEach((row) => {
			const doc = row.doc;
			//console.log(row.doc);

			let apiUrl;
			let metodo;

			switch (row.doc.act) {
				case 'add':
					apiUrl = '/api/create-tarea';
					metodo = 'POST';
					break;
				case 'del':
					apiUrl = '/api/delete-tarea';
					metodo = 'DELETE';
					break;
				case 'upd':
					apiUrl = '/api/complete-tarea';
					metodo = 'PUT';
					break;

				default:
					apiUrl = '/api';
					metodo = 'GET';

					break;
			}

			const fetchPom = fetch(apiUrl, {
				method: metodo,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(doc),
			}).then((res) => {
				return db.remove(doc);
			});

			posteos.push(fetchPom);
		}); // fin del foreach

		return Promise.all(posteos);
	});
}
