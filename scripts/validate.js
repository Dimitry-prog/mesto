function showErrorMessage(formElement, inputElement) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.classList.add('input__error-message_active');
  error.textContent = inputElement.validationMessage;
  inputElement.classList.add('input_error');
}

function hideErrorMessage(formElement, inputElement) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.classList.remove('input__error-message_active');
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
    buttonElement.classList.add('button_disabled');
  } else {
    buttonElement.classList.remove('button_disabled');
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
  const errors = Array.from(formElement.querySelectorAll('.input__error-message'));
  const inputlist = Array.from(formElement.querySelectorAll('.form__input'));
  const submitButton = formElement.querySelector('.button_type_submit');
  toggleButtonState(submitButton, inputlist);
  errors.forEach(error => {
    error.classList.remove('input__error-message_active');
  });
  inputlist.forEach(input => {
    input.classList.remove('input_error');
  })
}



function setEvenetListeners(formElement) {
  const inputlist = Array.from(formElement.querySelectorAll('.form__input'));
  const submitButton = formElement.querySelector('.button_type_submit');
  toggleButtonState(submitButton, inputlist);
  inputlist.forEach(input => {
    input.addEventListener('input', function() {
      checkInputValidity(formElement, input);
      toggleButtonState(submitButton, inputlist);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      setEvenetListeners(form);
    });
  })
}
enableValidation();
