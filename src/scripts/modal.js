function openModal(openElement) { 
  document.addEventListener('keydown', closeModalEsc); //захват клавиатуры
  openElement.classList.add('popup_is-opened');
}

function closeModal(closeElement){  
  closeElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc); //не захватываем клавиатуру
}

function closeModalEsc(evt) { 
  if (evt.key === 'Escape') { 
    closeModal(document.querySelector('.popup_is-opened'));
  } 
} 

export {openModal, closeModal};