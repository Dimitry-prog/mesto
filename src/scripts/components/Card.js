import { api, getQuantityLikes } from "../../pages";
import { myId } from "../utils/constants";

export default class Card {
  constructor(data, templateSelector, handleCardClick, handleConfirmCardDelete, cardId, ownerId) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmCardDelete = handleConfirmCardDelete;
    this._cardId = cardId;
    this._ownerId = ownerId;
  }

  _getTemplateCardElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard() {
    this._element.remove()
  }

  _cardAddLike() {
    this._likeButton.classList.add('card__like_active');
  }
  _cardDeleteLike() {
    this._likeButton.classList.remove('card__like_active');
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (!this._likeButton.classList.contains('card__like_active')) {
        api.putLikeCard(this._cardId)
          .then(res => {
            getQuantityLikes();
          })
          .catch(err => {
            console.log(err);
          });
        this._cardAddLike();
      } else {
        api.removeLikeCard(this._cardId)
          .then(res => {
            getQuantityLikes();
          })
          .catch(err => {
            console.log(err);
          });
        this._cardDeleteLike();
      }
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleConfirmCardDelete(this._element);
      //this._handleDeleteCard();
    });

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplateCardElement();

    this._likeButton = this._element.querySelector('.card__like');

    this._cardDeleteButton = this._element.querySelector('.card__delete');
    if (this._ownerId !== myId) {
      this._cardDeleteButton.remove()
    }

    this._cardImg = this._element.querySelector('.card__img');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}


