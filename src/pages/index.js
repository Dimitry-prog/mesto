import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import { validationConfig, popUpProfileForm, popUpCardForm, elementsList, popUpProfile, initialProfileInputsValue, profileEditButton, popUpCard, cardAddButton, popUpImg, nameInput, activityInput, avatarEditButton, popUpAvatar, popUpAvatarForm, profileImg, popUpDelete, profileName, profileActivity } from '../scripts/utils/constants.js';
import '../pages/index.css';

const api = new Api();

const validatorEditProfileForm = new FormValidator(validationConfig, popUpProfileForm);

const validatorAddCardForm = new FormValidator(validationConfig, popUpCardForm);

const imgPopup = new PopupWithImage(popUpImg);
imgPopup.setEventListeners();

const handleCardClick = (name, link) => {
  imgPopup.open(name, link);
}

const handleConfirmCardDelete = (delCard) => {
  deleteFormPopup.open()
  console.log(delCard);
}

const createCard = (data, templateSelector, handleCardClick, handleConfirmCardDelete) => {
  const cardElement = new Card(data, templateSelector, handleCardClick, handleConfirmCardDelete);
  return cardElement.generateCard();
}

api.getInitCards()
  .then(res => {
    const renderInitialCards = new Section({
      items: res,
      renderer: (item) => {
        const card = createCard(item, '#template-card', handleCardClick, handleConfirmCardDelete);
        renderInitialCards.addItem(card)
      }
    }, elementsList);
    renderInitialCards.renderItems();
  })
  .catch(err => {
    console.log(err);
  });

/* PROFILE */

const profileValues = new UserInfo(initialProfileInputsValue);

profileEditButton.addEventListener('click', function () {
  const { name, about } = profileValues.getUserInfo();
  nameInput.value = name.textContent;
  activityInput.value = about.textContent;
  validatorEditProfileForm.resetImputsErrorMessage();
  profileFormPopup.open();
});

const profileFormPopup = new PopupWithForm(popUpProfile, {
  handleSubmit: (formValues) => {
    api.patchProfile(formValues)
      .then(res => {
        const data = {
          name: res.name,
          about: res.about,
        }
        profileValues.setUserInfo(data);
      })
      .catch(err => {
        console.log(err);
      });
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
    api.postNewCard(data)
      .then(res => {

      })
      .catch(err => {
        console.log(err);
      });
    const card = createCard(data, '#template-card', handleCardClick, handleConfirmCardDelete);
    elementsList.prepend(card);
  }
});
addCardFormPopup.setEventListeners();

validatorEditProfileForm.enableValidation();
validatorAddCardForm.enableValidation();

/* AVATAR */

const validatorAvatarForm = new FormValidator(validationConfig, popUpAvatarForm);
validatorAvatarForm.enableValidation();

const avatarFormPopup = new PopupWithForm(popUpAvatar, {
  handleSubmit: ({ avatar }) => {
    api.patchAvatar(avatar)
      .then(res => {

      })
      .catch(err => {
        console.log(err);
      });
    profileImg.src = avatar;
  }
});
avatarFormPopup.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  validatorAvatarForm.resetImputsErrorMessage();
  avatarFormPopup.open();
});

/* CARD DELETE */

const deleteFormPopup = new PopupWithForm(popUpDelete, {
  handleSubmit: () => {

  }, handleConfirmCardDelete: (carDel) => {
    carDel.remove()
  }
});
deleteFormPopup.setEventListeners();

api.getUsersInfo()
  .then(res => {
    const { name, about, avatar } = res;
    profileName.textContent = name;
    profileActivity.textContent = about;
    profileImg.src = avatar;
  })
  .catch(err => {
    console.log(err);
  });

api.getQuantityLikes()
  .then(res => {
    console.log(res);
    const cardQuantityLikes = document.querySelectorAll('.card__quantity');
    /*     cardQuantityLikes.forEach(elem => elem.textContent = res.likes.length) */
    console.log(cardQuantityLikes);
  })
  .catch(err => {
    console.log(err);
  });
