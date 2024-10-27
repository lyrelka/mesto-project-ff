import '../pages/index.css';
import {initialCards, deleteElement, likeElement, createCardElement} from './cards.js';
import {openModal, openImageModal, closeModal} from './modals.js';
import {profileFormSubmit, cardFormSubmit} from './submits.js';

const cardTemplate = document.querySelector('#card-template').content;

const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

const cardList = document.querySelector('.places__list');

const modal = document.querySelectorAll('.popup');
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

const editProfileButton = profileInfo.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');

const profileForm = document.forms.edit_profile;
const nameInput = profileForm.elements.name;
const descriptionInput = profileForm.elements.description;

const placeForm = document.forms.new_place;
const placeNameInput = placeForm.elements.place_name;
const placeLinkInput = placeForm.elements.link;

initialCards.forEach(function (item) {
  cardList.append(createCardElement(item, deleteElement, likeElement, openImageModal));
});
 
editProfileButton.addEventListener('click', function () { 
  openModal(editProfileModal);
}); 
 
addCardButton.addEventListener('click', function () { 
  openModal(addCardModal); 
}); 

closeButton.forEach(function(evt){ 
  evt.addEventListener('click', closeModal); 
}); 

modal.forEach(function(element){
  element.addEventListener('click', (evt) => { 
    if (evt.currentTarget === evt.target) {
      closeModal(element);
    } 
  });
});

function closeModalEsc(evt) { 
  if (evt.key === 'Escape') { 
    closeModal(); 
  } 
} 

nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

profileForm.addEventListener('submit', profileFormSubmit); 

placeForm.addEventListener('submit', cardFormSubmit);

export {
  cardTemplate, modal, imageModal, closeModalEsc, profileName, profileDescription, 
  nameInput, descriptionInput, placeNameInput, placeLinkInput,editProfileModal,
  addCardModal, cardList
};