function openModal (openElement, clearValidation) { 
  clearValidation(openElement, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });

  document.addEventListener('keydown', closeModalEsc); //захват клавиатуры
  openElement.classList.add('popup_is-opened');
}

function openImageModal (openElement) {
  document.addEventListener('keydown', closeModalEsc); //захват клавиатуры
  openElement.classList.add('popup_is-opened');
}

function closeModal (closeElement) {  
  closeElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc); //не захватываем клавиатуру
  closeElement.querySelector('.popup__button').textContent = 'Сохранить';
}

function closeModalEsc (evt) { 
  if (evt.key === 'Escape') { 
    closeModal(document.querySelector('.popup_is-opened'));
  } 
} 

export {openModal, openImageModal, closeModal};