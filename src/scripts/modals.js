import {modal, imageModal, closeModalEsc} from './index.js';

function openModal(openElement) { 
  document.addEventListener('keydown', closeModalEsc); //захват клавиатуры
  openElement.classList.add('popup_is-opened');
  openElement.classList.remove('popup_is-animated');
}

function openImageModal(item) { 
  imageModal.querySelector('.popup__image').setAttribute('src', item.link); 
  imageModal.querySelector('.popup__image').setAttribute('alt', item.name); 
  imageModal.querySelector('.popup__caption').textContent = item.name; 
 
  openModal(imageModal); 
} 

function closeModal(){  
  modal.forEach(function(popupElement){ 
    if (popupElement.classList.contains('popup_is-opened')) {
      popupElement.classList.add('popup_is-animated'); 
      popupElement.classList.remove('popup_is-opened');
    } 
  }); 

  document.removeEventListener('keydown', closeModalEsc); //не захватываем клавиатуру
}

export {openModal, openImageModal, closeModal};