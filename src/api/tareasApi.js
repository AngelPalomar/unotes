const basePath = 'http://localhost:3001';

export function getTareasApi() {
  const url = `${basePath}/api`;
  const params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /**Petición fetch */
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function createTareaApi(data) {
  const url = `${basePath}/api/create-tarea`;
  const params = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /**Petición fetch */
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function updateTareaApi(index, data) {
  const url = `${basePath}/api/complete-tarea`;
  const params = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /**Petición fetch */
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function deleteTareaApi(data) {
  const url = `${basePath}/api/delete-tarea`;
  const params = {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /**Petición fetch */
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
