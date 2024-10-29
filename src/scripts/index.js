import '../pages/index.css';
import {initialCards} from './cards.js';
import {deleteElement, likeElement, createCardElement} from './card.js';
import {openModal, closeModal} from './modal.js';

const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

const cardList = document.querySelector('.places__list');

const modals = document.querySelectorAll('.popup');
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

const editProfileButton = profileInfo.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

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
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}); 
 
addCardButton.addEventListener('click', function () { 
  openModal(addCardModal); 
}); 

closeButtons.forEach(function(evt){
  const popup = evt.closest(".popup");
  evt.addEventListener('click', function(){
    closeModal(popup);
  });  
});

modals.forEach(function(element){
  element.classList.add('popup_is-animated');

  element.addEventListener('click', (evt) => { 
    if (evt.currentTarget === evt.target) {
      closeModal(element);
    } 
  });  
});

function openImageModal(item) { 
  imageModal.querySelector('.popup__image').setAttribute('src', item.link); 
  imageModal.querySelector('.popup__image').setAttribute('alt', item.name); 
  imageModal.querySelector('.popup__caption').textContent = item.name; 
 
  openModal(imageModal); 
} 

function profileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value; 
  profileDescription.textContent = descriptionInput.value; 
 
  closeModal(editProfileModal);
} 

profileForm.addEventListener('submit', profileFormSubmit); 

function cardFormSubmit(evt) {
  evt.preventDefault();

  cardList.prepend(createCardElement({
    name: placeNameInput.value, 
    link: placeLinkInput.value
  }, deleteElement, likeElement, openImageModal));
 
  closeModal(addCardModal);

  placeNameInput.value = '';
  placeLinkInput.value = '';
} 

placeForm.addEventListener('submit', cardFormSubmit);