function showErrorMessage(formElement, inputElement) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.classList.add('form__error-message_active');
  error.textContent = inputElement.validationMessage;
  inputElement.classList.add('input_error');
}

function hideErrorMessage(formElement, inputElement) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.classList.remove('form__error-message_active');
  error.textContent = '';
  inputElement.classList.remove('input_error');
}

function hasValidInput(inputlist) {
  return inputlist.some(input => {
    return !input.validity.valid
  })
}

function toggleButtonState(buttonElement, inputlist) {
  if (hasValidInput(inputlist)) {
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.removeAttribute('disabled');
  }
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showErrorMessage(formElement, inputElement);
  } else {
    hideErrorMessage(formElement, inputElement);
  }
}

function resetImputsErrorMessage(formElement) {
  const errors = Array.from(formElement.querySelectorAll('.form__error-message'));
  errors.forEach(error => {
    error.classList.remove('form__error-message_active');
  });

  getInputListAndSubmitButton(formElement);

  getInputListAndSubmitButton(formElement).inputlist.forEach(input => {
    input.classList.remove('input_error');
  })
}

function setEvenetListeners(formElement) {
  getInputListAndSubmitButton(formElement);

  getInputListAndSubmitButton(formElement).inputlist.forEach(input => {
    input.addEventListener('input', function() {
      checkInputValidity(formElement, input);
      getInputListAndSubmitButton(formElement).toggleButtonState(getInputListAndSubmitButton(formElement).submitButton, getInputListAndSubmitButton(formElement).inputlist);
    });
  });
}


function getInputListAndSubmitButton(formElement) {
  const inputlist = Array.from(formElement.querySelectorAll('.form__input'));
  const submitButton = formElement.querySelector('.button_type_submit');
  toggleButtonState(submitButton, inputlist);
  return {
    inputlist,
    submitButton,
    toggleButtonState,
  }
}
