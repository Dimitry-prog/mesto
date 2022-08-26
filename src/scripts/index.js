import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import { initialCards, validationConfig, popUpProfileForm, popUpCardForm, elementsList, popUpProfile, initialProfileInputsValue, profileEditButton, popUpCard, cardAddButton, popUpImg, nameInput, activityInput, popUpPicture, popUpText } from './utils/constants.js';
import '../pages/index.css';

const validatorEditProfileForm = new FormValidator(validationConfig, popUpProfileForm);

const validatorAddCardForm = new FormValidator(validationConfig, popUpCardForm);

const handleCardClick = (name, link) => {
  const imgPopup = new PopupWithImage(popUpImg, name, link);
  imgPopup.open(popUpPicture, popUpText);
}

const createCard = (data, templateSelector, handleCardClick) => {
  const cardElement = new Card(data, templateSelector, handleCardClick);
  return cardElement.generateCard();
}

const renderInitialCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item, '#template-card', handleCardClick);
    renderInitialCards.addItem(card)
  }
}, elementsList);
renderInitialCards.renderItems();

/* PROFILE */

const profilePopup = new Popup(popUpProfile);

const profileValues = new UserInfo(initialProfileInputsValue);

profileEditButton.addEventListener('click', function () {
  const { name, activity } = profileValues.getUserInfo();
  nameInput.value = name.textContent;
  activityInput.value = activity.textContent;
  validatorEditProfileForm.resetImputsErrorMessage();
  profilePopup.open();
});

const profileFormPopup = new PopupWithForm(popUpProfile, {
  handleSubmit: (values) => {
    profileValues.setUserInfo(values);
  }
});
profileFormPopup.setEventListeners();

/* CARD */

const addCardPopup = new Popup(popUpCard);

cardAddButton.addEventListener('click', function () {
  validatorAddCardForm.resetImputsErrorMessage();
  addCardPopup.open();
  addCardFormPopup.resetForm();
});

const addCardFormPopup = new PopupWithForm(popUpCard, {
  handleSubmit: (values) => {
    const { place, link } = values;
    const data = {
      name: place,
      link,
    }
    const card = createCard(data, '#template-card', handleCardClick);
    elementsList.prepend(card);
  }
});
addCardFormPopup.setEventListeners();

validatorEditProfileForm.enableValidation();
validatorAddCardForm.enableValidation();

