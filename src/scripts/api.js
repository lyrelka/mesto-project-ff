const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
  headers: {
    authorization: 'abf0fec9-b620-43ba-94e6-fe1b7c727ff0',
    'Content-Type': 'application/json'
  }
}

function handleResponse (res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

function getTemplate (urn) {
  return fetch(`${config.baseUrl}/${urn}`, {
    headers: config.headers,
    }).then(handleResponse)
}

function postTemplate (urn, method, body) {
  return fetch(`${config.baseUrl}/${urn}`, {
    method: method,
    headers: config.headers,
    body: JSON.stringify(body)
    }).then(handleResponse)
}

function putTemplate (urn, id, method) {
  return fetch(`${config.baseUrl}/${urn}/${id}`, {
    method: method,
    headers: config.headers,
    }).then(handleResponse)
}

const request = {
  get: getTemplate, 
  create: (urn, body) => postTemplate(urn, 'POST', body), 
  update: (urn, body) => postTemplate(urn, 'PATCH', body),
  add: (urn, id) => putTemplate (urn, id, 'PUT'),
  delete:  (urn, id) => putTemplate (urn, id, 'DELETE')
};

export {request}; 