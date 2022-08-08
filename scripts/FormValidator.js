export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showErrorMessage(inputElement) {
    const error = this._formElement.querySelector(`.${inputElement.id}-error`);
    error.classList.add(this._config.formErrorClass);
    error.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideErrorMessage(inputElement) {
    const error = this._formElement.querySelector(`.${inputElement.id}-error`);
    error.classList.remove(this._config.formErrorClass);
    error.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _hasValidInput(inputlist) {
    return inputlist.some(input => {
      return !input.validity.valid
    })
  }

  _toggleButtonState(buttonElement, inputlist) {
    if (this._hasValidInput(inputlist)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._config.submitButtonDisabledClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._config.submitButtonDisabledClass);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorMessage(inputElement);
    } else {
      this._hideErrorMessage(inputElement);
    }
  }

  _resetImputsErrorMessage() {
    const errors = Array.from(this._formElement.querySelectorAll(this._config.formErrorMessageSelector));
    const inputlist = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(submitButton, inputlist);
    errors.forEach(error => {
      error.classList.remove(this._config.formErrorClass);
    });
    inputlist.forEach(input => {
      input.classList.remove(this._config.inputErrorClass);
    });
  }

  _setEvenetListeners() {
    const inputlist = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(submitButton, inputlist);
    inputlist.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(submitButton, inputlist);
      });
    });
  }

  enableValidation() {
    this._setEvenetListeners();
    this._resetImputsErrorMessage();
  }
}
