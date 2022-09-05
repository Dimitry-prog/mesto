export default class Card {
  constructor(data, templateSelector, handleCardClick, handleConfirmCardDelete) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmCardDelete = handleConfirmCardDelete;
  }

  _getTemplateCardElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  _handleToggleLikeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleDeleteCard() {
    this._element.remove()
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleToggleLikeCard();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleConfirmCardDelete(this._element);
      //this._handleDeleteCard();
    });
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplateCardElement();

    this._cardImg = this._element.querySelector('.card__img');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}


