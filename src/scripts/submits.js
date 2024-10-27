import {
  profileName, profileDescription, nameInput, descriptionInput, placeNameInput, 
  placeLinkInput, editProfileModal, addCardModal, cardList
} from './index.js'
import {initialCards, deleteElement, likeElement, createCardElement} from './cards.js';
import {openImageModal, closeModal} from './modals.js';

function profileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value; 
  profileDescription.textContent = descriptionInput.value; 
 
  closeModal(editProfileModal);
} 

function cardFormSubmit(evt) {
  evt.preventDefault();

  initialCards.unshift({name: placeNameInput.value, link: placeLinkInput.value});

  cardList.prepend(createCardElement(initialCards[0], deleteElement, likeElement, openImageModal));
 
  closeModal(addCardModal);

  placeNameInput.value = '';
  placeLinkInput.value = '';
} 

export {profileFormSubmit, cardFormSubmit};