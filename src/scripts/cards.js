import {cardTemplate} from './index.js';

const initialCards = [
    {
      name: "Норвегия",
      link: "https://plus.unsplash.com/premium_photo-1661930056117-ac74ba06716a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Непал",
      link: "https://images.unsplash.com/photo-1716437788554-f5245d0ce2d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Исландия",
      link: "https://images.unsplash.com/photo-1721551456002-6a9404e5e804?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Пуэрто-Рико",
      link: "https://images.unsplash.com/photo-1612214827065-c16505567204?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Египет",
      link: "https://plus.unsplash.com/premium_photo-1674657644175-2e4099e3aa14?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Альпы",
      link: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=2172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
];

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

export {initialCards, deleteElement, likeElement, createCardElement};