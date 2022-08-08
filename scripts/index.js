import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [{
  name: 'Порт Баркиз',
  link: 'https://images.unsplash.com/photo-1657030871212-95d863306bed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1889&q=80'
},
{
  name: 'Восход в горах',
  link: 'https://images.unsplash.com/photo-1657018982784-d7d573fe2745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
},
{
  name: 'Ночной самолет в синем небе',
  link: 'https://images.unsplash.com/photo-1657014826033-bbd8140711db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=754&q=80'
},
{
  name: 'Антарктида в цвете',
  link: 'https://images.unsplash.com/photo-1657010896979-c47163861598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
},
{
  name: 'Мадридские кусты',
  link: 'https://images.unsplash.com/photo-1657005649208-d1b11532e23f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
},
{
  name: 'Пальма?',
  link: 'https://images.unsplash.com/photo-1656143308904-47e95da8009e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80'
}
];

const profileFormConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_submit',
  submitButtonDisabledClass: 'button_disabled',
  formErrorMessageSelector: '.form__error-message',
  formErrorClass: 'form__error-message_active',
  inputErrorClass: 'input_error',
}
const popUpProfile = document.querySelector('.pop-up_profile');
const popUpProfileForm = popUpProfile.querySelector('.form_type_profile');
const enableProfileValidation = new FormValidator(profileFormConfig, popUpProfileForm);

const addFormConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_submit',
  submitButtonDisabledClass: 'button_disabled',
  formErrorMessageSelector: '.form__error-message',
  formErrorClass: 'form__error-message_active',
  inputErrorClass: 'input_error',
}
const popUpCard = document.querySelector('.pop-up_card');
const popUpCardForm = popUpCard.querySelector('.form_type_card');
const enableAddValidation = new FormValidator(addFormConfig, popUpCardForm);


const pageElement = document.querySelector('.page');
const templateCard = document.querySelector('#template-card');
const elementsList = document.querySelector('.elements__list');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

const profileEditButton = document.querySelector('.profile__edit');


const nameInput = popUpProfileForm.querySelector('.form__input_type_name');
const activityInput = popUpProfileForm.querySelector('.form__input_type_activity');

const cardAddButton = document.querySelector('.profile__add');


const placeInput = popUpCardForm.querySelector('.form__input_type_place');
const linkInput = popUpCardForm.querySelector('.form__input_type_link');

const popUpImg = document.querySelector('.pop-up_img');
const popUpText = popUpImg.querySelector('.pop-up__text');
const popUpFiqure = popUpImg.querySelector('.pop-up__fiqure');
const popUpPicture = popUpImg.querySelector('.pop-up__picture');


const renderInitialCards = () => {
  initialCards.forEach(item => {
    const cardTemplate = new Card(item, '#template-card');
    const card = cardTemplate.generateCard();
    elementsList.append(card);
  })
}
renderInitialCards();

function openPopUp(popUpName) {
  popUpName.classList.add('pop-up_opened');
  pageElement.classList.add('page_type_hidden');
  document.addEventListener('keydown', closePopUpByEscape);
  enableProfileValidation.enableValidation();
  enableAddValidation.enableValidation();
}

function closePopUp(popUpName) {
  popUpName.classList.remove('pop-up_opened');
  pageElement.classList.remove('page_type_hidden');
  document.removeEventListener('keydown', closePopUpByEscape);
}

function closePopUpByEscape(event) {
  const openedPopup = document.querySelector('.pop-up_opened');
  if (event.key === 'Escape') {
    closePopUp(openedPopup);
  }
}

function closeAnyPopUp() {
  const popUps = document.querySelectorAll('.pop-up');
  popUps.forEach(popUp => {
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
closeAnyPopUp();

/* PROFILE */

profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
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
  openPopUp(popUpCard);
  clearFormFields(popUpCardForm);
});

popUpCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const cardTemplate = new Card({
    name: placeInput.value,
    link: linkInput.value,
  }, '#template-card');
  elementsList.prepend(cardTemplate.generateCard());
  clearFormFields(popUpCardForm);
  closePopUp(popUpCard);
});

/* CLEAR FORM FILDS FUNC */

function clearFormFields(formName) {
  formName.reset();
}


