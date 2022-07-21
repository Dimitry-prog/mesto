/* enableValidation({
  formSelector: '.popup__form',
  submitButtonSelector: '.popup__button',
  inputSelector: '.popup__input',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); */




function showErrorMessage(formElement, inputElement) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.classList.add('input__error-message_active');
  inputElement.classList.add('input_error');
  error.textContent = inputElement.validationMessage;
}

function hideErrorMessage(formElement, inputElement) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.classList.remove('input__error-message_active');
  inputElement.classList.remove('input_error');
  error.textContent = '';
}


/* function isValidInputs(formElement) {
  const inputs = Array.from(formElement.querySelectorAll('form__input'));

  inputs.forEach(input => {
    if (input.value.valid) hideErrorMessage(formElement, input);
    else showErrorMessage(formElement, input);
  });
} */

function isValidInput(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showErrorMessage(formElement, inputElement);
  } else {
    hideErrorMessage(formElement, inputElement);
  }
}

function toggleButtonState(formElement) {
  const submitButton = formElement.querySelector('.button_type_submit');
  submitButton.classList.toggle('button_disabled');
}


function setEvenetListeners(formElement) {
  const inputs = Array.from(formElement.querySelectorAll('.form__input'));
  console.log(inputs);
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      isValidInput(formElement, input);
      console.log('popo');
      console.log(input.validity.valid);
    });
  });
}
const popUpProfileForm2 = document.querySelector('.form_type_profile')
setEvenetListeners(popUpProfileForm2);

const popUpProfileForm3 = document.querySelector('.form_type_card')
setEvenetListeners(popUpProfileForm3);
