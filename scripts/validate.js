const profileFormConfig = {
  formSelector: '.form_type_profile',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_submit',
  submitButtonDisabledClass: 'button_disabled',
  formErrorMessageSelector: '.form__error-message',
  formErrorClass: 'form__error-message_active',
  inputErrorClass: 'input_error',
}

const addFormConfig = {
  formSelector: '.form_type_card',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_submit',
  submitButtonDisabledClass: 'button_disabled',
  formErrorMessageSelector: '.form__error-message',
  formErrorClass: 'form__error-message_active',
  inputErrorClass: 'input_error',
}

function showErrorMessage(formElement, inputElement, config) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.classList.add(config.formErrorClass);
  error.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideErrorMessage(formElement, inputElement, config) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.classList.remove(config.formErrorClass);
  error.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}

function hasValidInput(inputlist) {
  return inputlist.some(input => {
    return !input.validity.valid
  })
}

function toggleButtonState(buttonElement, inputlist, config) {
  if (hasValidInput(inputlist)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(config.submitButtonDisabledClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(config.submitButtonDisabledClass);
  }
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showErrorMessage(formElement, inputElement, config);
  } else {
    hideErrorMessage(formElement, inputElement, config);
  }
}

function resetImputsErrorMessage(formElement, config) {
  const errors = Array.from(formElement.querySelectorAll(config.formErrorMessageSelector));
  errors.forEach(error => {
    error.classList.remove(config.formErrorClass);
  });

  getInputListAndSubmitButton(formElement, config);

  getInputListAndSubmitButton(formElement, config).inputlist.forEach(input => {
    input.classList.remove(config.inputErrorClass);
  })
}

function setEvenetListeners(formElement, config) {
  getInputListAndSubmitButton(formElement, config);

  getInputListAndSubmitButton(formElement, config).inputlist.forEach(input => {
    input.addEventListener('input', function() {
      checkInputValidity(formElement, input, config);
      getInputListAndSubmitButton(formElement, config).toggleButtonState(getInputListAndSubmitButton(formElement, config).submitButton, getInputListAndSubmitButton(formElement, config).inputlist, config);
    });
  });
}

function getInputListAndSubmitButton(formElement, config) {
  const inputlist = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(submitButton, inputlist, config);
  return {
    inputlist,
    submitButton,
    toggleButtonState,
  }
}

function enableFormValidation(config) {
  const form = document.querySelector(config.formSelector);
  setEvenetListeners(form, config);
}
