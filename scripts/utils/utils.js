const pageElement = document.querySelector('.page');

export const openPopUp = popUpName => {
  popUpName.classList.add('pop-up_opened');
  pageElement.classList.add('page_type_hidden');
  document.addEventListener('keydown', closePopUpByEscape);
}

export const closePopUp = popUpName => {
  popUpName.classList.remove('pop-up_opened');
  pageElement.classList.remove('page_type_hidden');
  document.removeEventListener('keydown', closePopUpByEscape);
}

const closePopUpByEscape = event => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.pop-up_opened');
    closePopUp(openedPopup);
  }
}
