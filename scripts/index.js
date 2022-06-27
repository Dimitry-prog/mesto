const editButton = document.querySelector('.profile__edit');
const popUp = document.querySelector('.pop-up');
const popUpOverlay = document.querySelector('.pop-up__overlay');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const editName = document.querySelector('.form__input_type_name');
const editActivity = document.querySelector('.form__input_type_activity');
const saveButton = document.querySelector('.form__input_type_save');
const pageElement = document.querySelector('.page');
const closePopUpButton = document.querySelector('.pop-up__close');

function closePopUp() {
  popUp.classList.toggle('pop-up_opened');
  popUpOverlay.classList.toggle('pop-up__overlay_opened');
  pageElement.classList.toggle('page_type_hidden');
}

editButton.addEventListener('click', function() {
  editName.value = profileName.textContent;
  editActivity.value = profileActivity.textContent;
  closePopUp();
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
