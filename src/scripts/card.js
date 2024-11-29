const cardTemplate = document.querySelector('#card-template').content;

function deleteCardElement (deleteButton, id, request) {
  request('cards', id)
  .then(deleteButton.closest(".card").remove())
  .catch((err) => {
    console.log(err);
  });
}

function likeCardElement (likeButton, id, counter, request) {
  function likeRequest (id) {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      return request.delete('cards/likes', id);
    } else {
      return request.add('cards/likes', id);
    }
  }

  likeRequest(id).then((res) => {
    likeButton.classList.toggle('card__like-button_is-active');
    counter.textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err); 
  })
}

function createCardElement (card, userId, cardFunction, request) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  cardTitle.textContent = card.name;
  likeCounter.textContent = card.likes.length;

  if (card.likes.some(element => element._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
  likeButton.addEventListener('click', function () {
    cardFunction.likeCardElement(likeButton, card._id, likeCounter, request);
  }); 

  if (card.owner._id !== userId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener('click', function () {
    cardFunction.deleteCardElement(deleteButton, card._id, request.delete);
  }); 

  cardImage.addEventListener('click', () => {
    cardFunction.openCardElement(card);
  });

  return cardElement;
}

export {deleteCardElement, likeCardElement, createCardElement};