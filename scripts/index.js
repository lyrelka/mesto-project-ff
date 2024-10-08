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

//скидываем стандартное обновление страницы кнопок типа submit
saveProfileButton.setAttribute('onclick', 'return false');
saveCardButton.setAttribute('onclick', 'return false');



//открываем попапы
function openPopup(openElement) {
  document.addEventListener('keydown', closePopupEsc); //захват клавиатуры
  openElement.classList.add('popup_is-opened');
}

editProfileButton.addEventListener('click', function () {
  openPopup(editProfilePopup);
});

addCardButton.addEventListener('click', function () {
  openPopup(addCardPopup);
});

function openImagePopup(item) {
  imagePopup.querySelector('.popup__image').setAttribute('src', item.link);
  imagePopup.querySelector('.popup__image').setAttribute('alt', item.name);
  imagePopup.querySelector('.popup__caption').textContent = item.name;

  openPopup(imagePopup);
}



//закрываем попапы
function closePopup(){
  document.removeEventListener('keydown', closePopupEsc); //не захватываем клавиатуру
  popup.forEach(function(popupElement){
    if (popupElement.classList.contains('popup_is-opened')) {
      popupElement.classList.remove('popup_is-opened');
    }
  });
};

closeButton.forEach(function(evt){
  evt.addEventListener('click', closePopup);
});



//закрытие на esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}



//закрытие кликом на оверлей
popup.forEach(function(popupElement){
  popupElement.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      popupElement.classList.remove('popup_is-opened');
    }
  })
});



//сохраняем изменения профиля
function editForm(nameValue, descriptionValue){
  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  editProfilePopup.classList.remove('popup_is-opened');
}

saveProfileButton.addEventListener('click', function (evt) {
  const name = editProfilePopup.querySelector('.popup__input_type_name');
  const description = editProfilePopup.querySelector('.popup__input_type_description');

  editForm(name.value, description.value);
});



//карточки
function createCardElement (cardItem) {
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
    evt.target.parentElement.remove();
    initialCards.splice(initialCards.indexOf(cardItem), 1);
  });  

  cardList.append(cardElement);
}

for (let i = 0; i < 6; i++) {
  createCardElement (initialCards[i]);
}



//добавляем карточку
function addForm(nameValue, linkValue){
  initialCards.push({name: nameValue, link: linkValue})

  addCardPopup.classList.remove('popup_is-opened');
}

saveCardButton.addEventListener('click', function (evt) {
  const name = addCardPopup.querySelector('.popup__input_type_card-name');
  const link = addCardPopup.querySelector('.popup__input_type_url');

  addForm(name.value, link.value);

  createCardElement (initialCards[initialCards.length - 1]);
});



//открываем карточеку
function findCardIndex (children) {
  const parent = children.parentElement();

  return cardList.indexOf(parent);
}