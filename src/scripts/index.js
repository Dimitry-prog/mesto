import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import { initialCards, validationConfig, popUpProfileForm, popUpCardForm, elementsList, allPopUps, popUpProfile, profileName, profileActivity, profileEditButton, popUpCard, cardAddButton, popUpImg, nameInput, activityInput, popUpPicture, popUpText } from './utils/constants.js';
import '../pages/index.css';

const validatorEditProfileForm = new FormValidator(validationConfig, popUpProfileForm);

const validatorAddCardForm = new FormValidator(validationConfig, popUpCardForm);

const handleCardClick = (name, link) => {
  const imgPopup = new PopupWithImage(popUpImg, name, link);
  imgPopup.open(popUpPicture, popUpText);
}

const createCard = (data, templateSelector, handleCardClick) => {
  return new Card(data, templateSelector, handleCardClick);
}

const renderInitialCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item, '#template-card', handleCardClick);
    const card = cardElement.generateCard();
    renderInitialCards.addItem(card)
  }
}, elementsList);
renderInitialCards.renderItems();

const closePopupsByOverlayClick = () => {
  allPopUps.forEach(popUp => {
    const popupElement = new Popup(popUp);
    popupElement.setEventListeners();
  });
}
closePopupsByOverlayClick();

/* PROFILE */

const profilePopup = new Popup(popUpProfile);

const profileInputsValue = {
  name: profileName,
  activity: profileActivity
}

const profileValues = new UserInfo(profileInputsValue);

profileEditButton.addEventListener('click', function () {
  const { name, activity } = profileValues.getUserInfo();
  nameInput.value = name.textContent;
  activityInput.value = activity.textContent;
  validatorEditProfileForm.resetImputsErrorMessage();
  profilePopup.open();
});

const profileFormPopup = new PopupWithForm(popUpProfile, {
  handleSubmit: (values) => {
    const { name, activity } = profileValues.setUserInfo(values);
    profileName.textContent = name;
    profileActivity.textContent = activity;
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
    const cardElement = createCard(data, '#template-card', handleCardClick);
    elementsList.prepend(cardElement.generateCard());
  }
});
addCardFormPopup.setEventListeners();

validatorEditProfileForm.enableValidation();
validatorAddCardForm.enableValidation();

