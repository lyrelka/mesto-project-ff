import '../pages/index.css';
import {deleteCardElement, likeCardElement, createCardElement} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {request} from './api.js';

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
const cardModal = document.querySelector('.popup_type_image');

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

const cardModalImage = cardModal.querySelector('.popup__image');
const cardModalCaption = cardModal.querySelector('.popup__caption');

let userId;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//модальные окна
editProfileButton.addEventListener('click', () =>{
  nameInput.value =  profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  
  clearValidation(profileForm, validationConfig);
  openModal(editProfileModal, clearValidation);
}); 

profileAvatar.addEventListener('click', () =>{
  avatarForm.reset();
  
  clearValidation(avatarForm, validationConfig);
  openModal(editAvatarModal, clearValidation);
}); 
 
addCardButton.addEventListener('click', () =>{ 
  profileForm.reset();

  clearValidation(placeForm, validationConfig);
  openModal(addCardModal, clearValidation); 
}); 

function openCardElement (image) { 
  cardModalImage.setAttribute('src', image.link); 
  cardModalImage.setAttribute('alt', image.name); 
  cardModalCaption.textContent = image.name; 
 
  openModal(cardModal); 
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

//загрузка формы
function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  
  renderLoading(true, submitButton, initialText, loadingText);

  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

//профиль
function profileFormSubmit (evt) {
  function makeRequest () {
    return request.update ('users/me', {
      name: nameInput.value, 
      about:descriptionInput.value
    }).then((info) => {
      profileName.textContent = info.name; 
      profileDescription.textContent = info.about;
      closeModal(editProfileModal);
      editProfileModal.querySelector('.popup__button').textContent = 'Сохранить';
    })
  }

  handleSubmit (makeRequest, evt);
} 

profileForm.addEventListener('submit', profileFormSubmit);

//аватар
function avatarFormSubmit (evt) {
  function makeRequest () {
    return request.update ('users/me/avatar', {
      avatar: avatarInput.value
    }).then((info) => {
      profileAvatar.style.backgroundImage = `url(${info.avatar})`;
      closeModal(editAvatarModal);
      editAvatarModal.querySelector('.popup__button').textContent = 'Сохранить';
    })
  }

  handleSubmit (makeRequest, evt);
} 

avatarForm.addEventListener('submit', avatarFormSubmit);

//карточки
function renderCard(item, method) {
  const cardElement = createCardElement(item, userId, {
    likeCardElement, 
    deleteCardElement,
    openCardElement
  }, request);

  cardList[ method ](cardElement);
}

Promise.all([request.get('cards'), request.get('users/me')]).then(([cards, info]) => {
  profileName.textContent = info.name; 
  profileDescription.textContent = info.about;
  profileAvatar.style.backgroundImage = `url(${info.avatar})`;
  userId = info._id; 

  cards.forEach((element) => {
    renderCard(element, 'append');
  });
}).catch((err) => {
  console.log(err);
});

function cardFormSubmit (evt) {
  function makeRequest () {
    return request.create ('cards', {
      name: placeNameInput.value, 
      link: placeLinkInput.value
    }).then((card) => {
      renderCard(card, 'prepend');
      
      closeModal(addCardModal);
      
      placeForm.reset();
  
      addCardModal.querySelector('.popup__button').textContent = 'Сохранить';
    })
  }

  handleSubmit (makeRequest, evt);
} 

placeForm.addEventListener('submit', cardFormSubmit);

//валидация
enableValidation(validationConfig); 