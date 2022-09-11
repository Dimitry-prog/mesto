import { handleCardDelete } from "../../pages";


export default class Card {
  constructor(data, templateSelector, handleCardClick, handleConfirmCardDelete, getId, ownerId, cardId, handlePutCardLike, handleRemoveCardLike, handleQuantityCardLikes, likesArr) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmCardDelete = handleConfirmCardDelete;
    this._cardId = cardId;
    this._ownerId = ownerId;
    this._handlePutCardLike = handlePutCardLike;
    this._handleRemoveCardLike = handleRemoveCardLike;
    this._handleQuantityCardLikes = handleQuantityCardLikes;
    this._getId = getId;
    this._likesArr = likesArr;
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

  cardAddLike() {
    this._likeButton.classList.add('card__like_active');
  }

  cardDeleteLike() {
    this._likeButton.classList.remove('card__like_active');
  }

  showQuantityCardLikes() {
    this._quantityCardLike.textContent = this._likesArr.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (!this._likeButton.classList.contains('card__like_active')) {
        this._handlePutCardLike(this._cardId, this.cardAddLike());
        this._handleQuantityCardLikes(this.showQuantityCardLikes(), this.cardAddLike());
      } else {
        this._handleRemoveCardLike(this._cardId, this.cardDeleteLike());
        this._handleQuantityCardLikes(this.showQuantityCardLikes(), this.cardDeleteLike());
      }
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleConfirmCardDelete();
      handleCardDelete(this._cardId);
    });

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplateCardElement();

    this._likeButton = this._element.querySelector('.card__like');

    this._cardDeleteButton = this._element.querySelector('.card__delete');

    if (this._ownerId !== this._getId()) {
      this._cardDeleteButton.remove()
    }

    this._quantityCardLike = this._element.querySelector('.card__quantity');

    this._cardImg = this._element.querySelector('.card__img');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}


