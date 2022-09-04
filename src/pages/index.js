import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { initialCards, validationConfig, popUpProfileForm, popUpCardForm, elementsList, popUpProfile, initialProfileInputsValue, profileEditButton, popUpCard, cardAddButton, popUpImg, nameInput, activityInput } from '../scripts/utils/constants.js';
import '../pages/index.css';

const validatorEditProfileForm = new FormValidator(validationConfig, popUpProfileForm);

const validatorAddCardForm = new FormValidator(validationConfig, popUpCardForm);

const imgPopup = new PopupWithImage(popUpImg);
imgPopup.setEventListeners();

const handleCardClick = (name, link) => {
  imgPopup.open(name, link);
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

const profileValues = new UserInfo(initialProfileInputsValue);

profileEditButton.addEventListener('click', function () {
  const { name, activity } = profileValues.getUserInfo();
  nameInput.value = name.textContent;
  activityInput.value = activity.textContent;
  validatorEditProfileForm.resetImputsErrorMessage();
  profileFormPopup.open();
});

const profileFormPopup = new PopupWithForm(popUpProfile, {
  handleSubmit: (formValues) => {
    profileValues.setUserInfo(formValues);
  }
});
profileFormPopup.setEventListeners();

/* CARD */

cardAddButton.addEventListener('click', function () {
  validatorAddCardForm.resetImputsErrorMessage();
  addCardFormPopup.open();
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

