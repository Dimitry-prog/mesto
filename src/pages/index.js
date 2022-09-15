import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import { validationConfig, popUpProfileForm, popUpCardForm, elementsList, popUpProfile, initialProfileInputsValue, profileEditButton, popUpCard, cardAddButton, popUpImg, nameInput, activityInput, avatarEditButton, popUpAvatar, popUpAvatarForm, popUpDelete, } from '../scripts/utils/constants.js';
import '../pages/index.css';
import PopupWithConfirmDelete from '../scripts/components/PopupWithConfirmDelete.js';

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: 'aaaf8a01-66a7-402b-b4c7-63b2ef616c45',
    'Content-Type': 'application/json'
  }
});

const validatorEditProfileForm = new FormValidator(validationConfig, popUpProfileForm);

const validatorAddCardForm = new FormValidator(validationConfig, popUpCardForm);

const imgPopup = new PopupWithImage(popUpImg);
imgPopup.setEventListeners();

const profileValues = new UserInfo(initialProfileInputsValue);

const createCard = (cardData) => {
  const cardElement = new Card({
    data: { ...cardData, myId: profileValues.getMyId() },

    handleCardClick: () => {
      imgPopup.open(data.name, data.link);
    },
    handleConfirmCardDelete: () => {
      deleteFormPopup.open();
    },
    handlePutCardLike: () => {
      api.putLikeCard(cardElement.getCardId())
        .then(res => {
          cardElement.cardAddLike();
          cardElement.showQuantityCardLikes(res.likes.length);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRemoveCardLike: () => {
      api.removeLikeCard(cardElement.getCardId())
        .then(res => {
          cardElement.cardDeleteLike();
          cardElement.showQuantityCardLikes(res.likes.length);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, '#template-card');
  return cardElement.generateCard();
}

const cardsContainer = new Section({
  renderer: (item) => {
    cardsContainer.addItem(createCard(item));
  }
}, elementsList);

const getCards = () => {
  api.getInitCards()
    .then(res => {
      console.log(res);
      cardsContainer.renderItems(res);
    })
    .catch(err => {
      console.log(err);
    });
}

const getUsersInfo = () => {
  api.getUsersInfo()
    .then(res => {
      const { name, about, avatar, _id } = res;

      profileValues.setUserInfo(name, about);
      profileValues.setUserAvatar(avatar);
      profileValues.setMyId(_id);
    })
    .catch(err => {
      console.log(err);
    });
}

const getInitialData = () => {
  Promise.all([getCards(), getUsersInfo()])
    .catch(err => {
      console.log(err);
    });
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
        profileFormPopup.close();
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
        cardsContainer.addItemAtTheBeginning(createCard(res));
        addCardFormPopup.close();
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
        avatarFormPopup.close();
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
    .then(res => {

    })
    .catch(err => {
      console.log(err);
    });
}

const deleteFormPopup = new PopupWithConfirmDelete(popUpDelete, {
  handleCardDelete: handleCardDelete
});
deleteFormPopup.setEventListeners();




