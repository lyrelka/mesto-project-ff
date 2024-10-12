///темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//контейнер
const content = document.querySelector('.content');

//профиль
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

//контент
const cardList = content.querySelector('.places__list');

//попапы
const popup = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

//кнопки
const editProfileButton = profileInfo.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');
const saveProfileButton = editProfilePopup.querySelector('.popup__button');
const saveCardButton = addCardPopup.querySelector('.popup__button');

//карточки
function deleteElement(el) {
  el.remove();
}

function createCardElement (cardItem, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.setAttribute('src', cardItem.link);
  cardImage.setAttribute('alt', cardItem.name);
  cardTitle.textContent = cardItem.name;

  cardImage.addEventListener('click', function() {
    openImagePopup(cardItem);
  });

  likeButton.addEventListener('click', function(){
    likeButton.classList.toggle('card__like-button_is-active');
  });  

  deleteButton.addEventListener('click', function(evt){
    deleteCard(evt.target.parentElement);
  });  

  return cardElement;
}

initialCards.forEach(function (item) {
  cardList.append(createCardElement(item, deleteElement));
});