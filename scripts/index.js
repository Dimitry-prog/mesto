const editButton = document.querySelector('.profile__edit');
const popUp = document.querySelector('.pop-up');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const editName = document.querySelector('.form__input_type_name');
const editActivity = document.querySelector('.form__input_type_activity');
const saveButton = document.querySelector('.form__input_type_save');
const pageElement = document.querySelector('.page');
const closePopUpButton = document.querySelector('.pop-up__close');

function closePopUp() {
  popUp.classList.remove('pop-up_opened');
  pageElement.classList.remove('page_type_hidden');
}

editButton.addEventListener('click', function() {
  popUp.classList.add('pop-up_opened');
  pageElement.classList.add('page_type_hidden');
  editName.value = profileName.textContent;
  editActivity.value = profileActivity.textContent;
});

saveButton.addEventListener('click', function(event) {
  event.preventDefault();
  profileName.textContent = editName.value;
  profileActivity.textContent = editActivity.value;
  closePopUp();
});

closePopUpButton.addEventListener('click', closePopUp);

popUp.addEventListener('click', function(event) {
  if (event.target === popUp) {
    closePopUp();
  }
});
