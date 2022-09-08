import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import { validationConfig, popUpProfileForm, popUpCardForm, elementsList, popUpProfile, initialProfileInputsValue, profileEditButton, popUpCard, cardAddButton, popUpImg, nameInput, activityInput, avatarEditButton, popUpAvatar, popUpAvatarForm, profileImg, popUpDelete, profileName, profileActivity, myId } from '../scripts/utils/constants.js';
import '../pages/index.css';
import PopupWithConfirmDelete from '../scripts/components/PopupWithConfirmDelete.js';

export const api = new Api();

const validatorEditProfileForm = new FormValidator(validationConfig, popUpProfileForm);

const validatorAddCardForm = new FormValidator(validationConfig, popUpCardForm);

const imgPopup = new PopupWithImage(popUpImg);
imgPopup.setEventListeners();

const handleCardClick = (name, link) => {
  imgPopup.open(name, link);
}

const handleConfirmCardDelete = () => {
  deleteFormPopup.open()
}

const createCard = (data, templateSelector, handleCardClick, handleConfirmCardDelete, cardId, ownerId) => {
  const cardElement = new Card(data, templateSelector, handleCardClick, handleConfirmCardDelete, cardId, ownerId);
  return cardElement.generateCard();
}

const cardsContainer = new Section({
  renderer: (item) => {
    const card = createCard(item, '#template-card', handleCardClick, handleConfirmCardDelete, item._id, item.owner._id);
    cardsContainer.addItem(card);
  }
}, elementsList);

const getCards = () => {
  api.getInitCards()
    .then(res => {
      cardsContainer.renderItems(res);
    })
    .catch(err => {
      console.log(err);
    });
}

const profileValues = new UserInfo(initialProfileInputsValue);

const getUsersInfo = () => {
  api.getUsersInfo()
    .then(res => {
      const { name, about, avatar, _id } = res;

      profileValues.setUserInfo(name, about);
      profileValues.setUserAvatar(avatar);
      profileValues.setUserId(_id);
    })
    .catch(err => {
      console.log(err);
    });
}
const getInitialData = () => {
  return Promise.all([getCards(), getUsersInfo()]);
}
getInitialData();

/* PROFILE */

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
        const { name, about } = res;

        profileValues.setUserInfo(name, about);
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
        const card = createCard(data, '#template-card', handleCardClick, handleConfirmCardDelete);
        cardsContainer.addItem(card);
      })
      .catch(err => {
        console.log(err);
      });
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
        const { avatar } = res;

        profileValues.setUserAvatar(avatar);
      })
      .catch(err => {
        console.log(err);
      });
  }
});
avatarFormPopup.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  validatorAvatarForm.resetImputsErrorMessage();
  avatarFormPopup.open();
});

/* CARD DELETE */

export const handleCardDelete = (id) => {
  api.deleteCard(id)
    .catch(err => {
      console.log(err);
    });
}

const deleteFormPopup = new PopupWithConfirmDelete(popUpDelete, {
  handleCardDelete: handleCardDelete
});
deleteFormPopup.setEventListeners();

export const getQuantityLikes = () => {
  api.getQuantityLikes()
    .then(res => {
      console.log(res);
      const cardQuantityLikes = document.querySelectorAll('.card__quantity');
      const buttonLikes = document.querySelectorAll('.card__like');
      const cardLikes = res.map(elem => elem.likes);

      cardLikes.forEach((elem, index) => {
        cardQuantityLikes[index].textContent = elem.length;

        elem.forEach(item => {
          if (item._id === myId) {
            buttonLikes[index].classList.add('card__like_active');
          }
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
}
getQuantityLikes();


