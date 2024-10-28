const cardTemplate = document.querySelector('#card-template').content;

function deleteElement(evt) {
  evt.target.parentElement.remove();
}

function likeElement(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function createCardElement (cardItem, deleteCard, likeCard, openCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.setAttribute('src', cardItem.link);
  cardImage.setAttribute('alt', cardItem.name);
  cardTitle.textContent = cardItem.name;

  likeButton.addEventListener('click', likeCard);  

  deleteButton.addEventListener('click', deleteCard);
  
  cardImage.addEventListener('click', function(){
    openCard(cardItem);
  });

  return cardElement;
}

export {deleteElement, likeElement, createCardElement};