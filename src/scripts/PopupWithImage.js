import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }

  open(picture, text, name, link) {
    this._name = name;
    this._link = link;
    picture.setAttribute('src', this._link);
    picture.setAttribute('alt', this._name);
    text.textContent = this._name;
    super.open();
  }
}
