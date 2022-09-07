import Popup from "./Popup";

export default class PopupWithConfirmDelete extends Popup {
  constructor(popupElement, { handleCardDelete }) {
    super(popupElement);
    this._handleCardDelete = handleCardDelete;
  }

  setEventListeners() {
    this._handleCardDelete();
    super.setEventListeners();
  }

}
