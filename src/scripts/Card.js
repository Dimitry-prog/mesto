export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleToggleLikeCard();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplateCardElement();

    this._cardImg = this._element.querySelector('.card__img');
    cardImg.src = this._link;
    cardImg.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}


