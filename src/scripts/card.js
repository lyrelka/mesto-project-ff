const cardTemplate = document.querySelector('#card-template').content;

function deleteCardElement (deleteButton, id, deleteCardServer) {
  deleteButton.closest(".card").remove();
  deleteCardServer(id);
}

function likeCardElement (likeButton, id, counter, likeFunction) {
  function likeRequest (id) {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      return likeFunction.deleteLikeServer(id);
    } else {
      return likeFunction.putLikeServer(id);
    }
  }

  likeRequest(id).then((res) => {
    likeButton.classList.toggle('card__like-button_is-active');
    counter.textContent = res.likes.length;
  })
}

function createCardElement (card, myId, cardFunction, likeFunction) {
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

  if (card.likes.some(element => element._id === myId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
  likeButton.addEventListener('click', function () {
    cardFunction.likeCardElement(likeButton, card._id, likeCounter, likeFunction);
  }); 

  if (card.owner._id !== myId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener('click', function () {
    cardFunction.deleteCardElement(deleteButton, card._id, cardFunction.deleteCardServer);
  }); 

  cardImage.addEventListener('click', () => {
    cardFunction.openImageElement(card);
  });

  return cardElement;
}

export {deleteCardElement, likeCardElement, createCardElement};