import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement, name, link) {
    super(popupElement);
    this._name = name;
    this._link = link;
  }

  open(picture, text) {
    picture.setAttribute('src', this._link);
    picture.setAttribute('alt', this._name);
    text.textContent = this._name;
    super.open();
  }
}
