export const pruebaDefault = () => {
	if (!window.Notification) {
		console.log('Este navegador no soporta notificaciones');
		return;
	}

	console.log('Soy prueba default');

	if (Notification.permission === 'granted') {
		new Notification('Holi desde una notificacion fea');
	} else if (
		Notification.permission !== 'denied' ||
		Notification.permission === 'default'
	) {
		Notification.requestPermission((permission) => {
			console.log(permission);
			if (permission === 'granted') {
				new Notification('Notificaciones activas para UNotes');
			}
		});
	}
};

export function permisoNotificacion(tareas, completas) {
	//Validacion del naveagador
	if (!window.Notification) {
		console.log('Este navegador no soporta notificaciones');
		return;
	}

	//Si tenemos permiso, enviamos
	if (Notification.permission === 'granted') {
		new Notification(
			`Felicidades! Haz completado ${completas + 1} tareas de ${tareas}. `
		);
	} else if (
		Notification.permission !== 'granted' ||
		Notification.permission === 'denied'
	) {
		console.log(
			`Los permisos de notificacion estan ${Notification.permission} para este sitio `
		);
		//Si no estan activas solicitamos permiso
		Notification.requestPermission((permission) => {
			//Imprimimos el permiso que tenemos
			if (permission === 'granted') {
				new Notification('Notificaciones activas para UNotes');
			}
		});
	}
}
