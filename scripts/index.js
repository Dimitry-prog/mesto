import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { openPopUp, closePopUp } from './utils/utils.js';

const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_submit',
  submitButtonDisabledClass: 'button_disabled',
  formErrorMessageSelector: '.form__error-message',
  formErrorClass: 'form__error-message_active',
  inputErrorClass: 'input_error',
}

const popUpProfile = document.querySelector('.pop-up_profile');
const popUpProfileForm = popUpProfile.querySelector('.form_type_profile');
const enableProfileValidation = new FormValidator(validationConfig, popUpProfileForm);

const popUpCard = document.querySelector('.pop-up_card');
const popUpCardForm = popUpCard.querySelector('.form_type_card');
const enableAddValidation = new FormValidator(validationConfig, popUpCardForm);

const elementsList = document.querySelector('.elements__list');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

const profileEditButton = document.querySelector('.profile__edit');

const nameInput = popUpProfileForm.querySelector('.form__input_type_name');
const activityInput = popUpProfileForm.querySelector('.form__input_type_activity');

const cardAddButton = document.querySelector('.profile__add');

const placeInput = popUpCardForm.querySelector('.form__input_type_place');
const linkInput = popUpCardForm.querySelector('.form__input_type_link');

const allPopUps = document.querySelectorAll('.pop-up');

const createCard = (data, templateSelector) => {
  return new Card(data, templateSelector);
}

const resetInputsErrorAndButtonState = (element) => {
  element.resetImputsErrorMessage();
}

const renderInitialCards = () => {
  initialCards.forEach(item => {
    const cardElement = createCard(item, '#template-card');
    const card = cardElement.generateCard();
    elementsList.append(card);
  })
}
renderInitialCards();

function closePopupsByOverlayClick() {
  allPopUps.forEach(popUp => {
    popUp.addEventListener('mousedown', function (event) {
      if (event.target.classList.contains('pop-up_opened')) {
        closePopUp(popUp);
      }
      if (event.target.classList.contains('pop-up__close')) {
        closePopUp(popUp);
      }
    });
  });
}
closePopupsByOverlayClick();

/* PROFILE */

profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  resetInputsErrorAndButtonState(enableProfileValidation);
  openPopUp(popUpProfile);
});

popUpProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopUp(popUpProfile);
});

/* CARD */

cardAddButton.addEventListener('click', function () {
  resetInputsErrorAndButtonState(enableAddValidation);
  openPopUp(popUpCard);
  clearFormFields(popUpCardForm);
});

popUpCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const cardElement = createCard({
    name: placeInput.value,
    link: linkInput.value,
  }, '#template-card');
  elementsList.prepend(cardElement.generateCard());
  clearFormFields(popUpCardForm);
  closePopUp(popUpCard);
});

/* CLEAR FORM FILDS FUNC */

function clearFormFields(formName) {
  formName.reset();
}

enableProfileValidation.enableValidation();
enableAddValidation.enableValidation();
