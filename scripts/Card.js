export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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

  _handlePopUpBigImg() {
    const popUpImg = document.querySelector('.pop-up_img');
    const popUpPicture = popUpImg.querySelector('.pop-up__picture');
    const popUpText = popUpImg.querySelector('.pop-up__text');

    popUpPicture.setAttribute('src', this._link);
    popUpPicture.setAttribute('alt', this._name);
    popUpText.textContent = this._name;
    popUpImg.classList.add('pop-up_opened');
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleToggleLikeCard();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._handlePopUpBigImg();
    });
  }

  generateCard() {
    this._element = this._getTemplateCardElement();
    this._setEventListeners();

    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}


