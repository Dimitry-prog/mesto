import Popup from "./Popup";

export default class PopupWithConfirmDelete extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }

  setSubmitActive(callBack) {
    this._handleSubmit = callBack
  }

  setEventListeners() {
    this._popupElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }

}
