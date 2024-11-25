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

function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err); 
  });
}

function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err); 
  });
}

function editUserInfo (name, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err); 
  });
}

function editUserAvatar (avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(handleResponse)
  .catch((err) => {
    console.log(err); 
  });
}

function addNewCard (placeName, placeLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: placeLink
    })
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err); 
  });
}

function putLikeServer (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err); 
  });
}

function deleteLikeServer (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err); 
  });
}

function deleteCardServer (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err); 
  });
}

export {
  getInitialCards, getUserInfo, editUserInfo, editUserAvatar, 
  addNewCard, putLikeServer, deleteLikeServer, deleteCardServer
}; 