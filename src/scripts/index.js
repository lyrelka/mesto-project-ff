import '../pages/index.css';
import {deleteCardElement, likeCardElement, createCardElement} from './card.js';
import {openModal, openImageModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {
  getInitialCards, getUserInfo, editUserInfo, editUserAvatar,
  addNewCard, putLikeServer, deleteLikeServer, deleteCardServer
} from './api.js';

const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileAvatar = profile.querySelector('.profile__image');

const cardList = document.querySelector('.places__list');

const modals = document.querySelectorAll('.popup');
const editProfileModal = document.querySelector('.popup_type_edit');
const editAvatarModal = document.querySelector('.popup_type_edit-avatar');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

const editProfileButton = profileInfo.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const profileForm = document.forms.edit_profile;
const nameInput = profileForm.elements.name;
const descriptionInput = profileForm.elements.description;

const avatarForm = document.forms.edit_avatar;
const avatarInput = avatarForm.elements.avatar;

const placeForm = document.forms.new_place;
const placeNameInput = placeForm.elements.place_name;
const placeLinkInput = placeForm.elements.link;

//модальные окна
editProfileButton.addEventListener('click', () =>{
  getUserInfo().then((info) => {
    nameInput.value = info.name;
    descriptionInput.value = info.about;
  });
  
  openModal(editProfileModal, clearValidation);
}); 

profileAvatar.addEventListener('click', () =>{
  avatarInput.value = '';
  
  openModal(editAvatarModal, clearValidation);
}); 
 
addCardButton.addEventListener('click', () =>{ 
  placeNameInput.value = '';
  placeLinkInput.value = '';

  openModal(addCardModal, clearValidation); 
}); 

function openImageElement (image) { 
  imageModal.querySelector('.popup__image').setAttribute('src', image.link); 
  imageModal.querySelector('.popup__image').setAttribute('alt', image.name); 
  imageModal.querySelector('.popup__caption').textContent = image.name; 
 
  openImageModal(imageModal); 
} 

//слушатель модальных окон
closeButtons.forEach((evt) => {
  const popup = evt.closest(".popup");
  evt.addEventListener('click',() => {
    closeModal(popup);
  });  
});

modals.forEach((element) => {
  element.classList.add('popup_is-animated');

  element.addEventListener('click', (evt) => { 
    if (evt.currentTarget === evt.target) {
      closeModal(element);
    } 
  });  
});

//профиль
getUserInfo().then((info) => {
  profileName.textContent = info.name;
  profileDescription.textContent = info.about;
});

function profileFormSubmit (evt) {
  evt.preventDefault();

  editProfileModal.querySelector('.popup__button').textContent = 'Сохранение...';
  
  editUserInfo (nameInput.value, descriptionInput.value).then((info) => {
    profileName.textContent = info.name; 
    profileDescription.textContent = info.about;
    closeModal(editProfileModal);
    editProfileModal.querySelector('.popup__button').textContent = 'Сохранить';
  });
} 

profileForm.addEventListener('submit', profileFormSubmit);

//аватар
getUserInfo().then((info) => {
  profileAvatar.style.backgroundImage = `url(${info.avatar})`;
});

function avatarFormSubmit (evt) {
  evt.preventDefault();

  editAvatarModal.querySelector('.popup__button').textContent = 'Сохранение...';
  
  editUserAvatar (avatarInput.value).then((info) => {
    profileAvatar.style.backgroundImage = `url(${info.avatar})`;
    closeModal(editAvatarModal);
    editAvatarModal.querySelector('.popup__button').textContent = 'Сохранить';
  });
} 

avatarForm.addEventListener('submit', avatarFormSubmit);

//карточки
Promise.all([getInitialCards(), getUserInfo()]).then((res) => {
  res[0].forEach((element) => {
    cardList.append(createCardElement(
      element, 
      res[1]._id, {
        likeCardElement, 
        deleteCardElement, 
        deleteCardServer,
        openImageElement
      }, {
        putLikeServer,
        deleteLikeServer
      }))
  });
});

function cardFormSubmit (evt) {
  evt.preventDefault();
  
  addCardModal.querySelector('.popup__button').textContent = 'Сохранение...';

  Promise.all([addNewCard(placeNameInput.value, placeLinkInput.value), getUserInfo()]).then((res) => {
    cardList.prepend(createCardElement(
      res[0], 
      res[1], {
        likeCardElement, 
        deleteCardElement, 
        deleteCardServer,
        openImageElement
      }, {
        putLikeServer,
        deleteLikeServer
      }))
    
    closeModal(addCardModal);
    
    placeNameInput.value = '';
    placeLinkInput.value = '';
    addCardModal.querySelector('.popup__button').textContent = 'Сохранить';
  });
} 

placeForm.addEventListener('submit', cardFormSubmit);

//валидация
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 