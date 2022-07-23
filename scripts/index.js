const profileEditButton = document.querySelector('.profile__edit');
const popUpProfile = document.querySelector('.pop-up_profile');
const popUpOverlay = document.querySelector('.pop-up__overlay');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const pageElement = document.querySelector('.page');
const popUpCard = document.querySelector('.pop-up_card');
const cardAddButton = document.querySelector('.profile__add');
const popUpImg = document.querySelector('.pop-up_img');
const popUpProfileForm = popUpProfile.querySelector('.form_type_profile');
const nameInput = popUpProfileForm.querySelector('.form__input_type_name');
const activityInput = popUpProfileForm.querySelector('.form__input_type_activity');
const popUpCardForm = popUpCard.querySelector('.form_type_card');
const placeInput = popUpCardForm.querySelector('.form__input_type_place');
const linkInput = popUpCardForm.querySelector('.form__input_type_link');
const popUpText = popUpImg.querySelector('.pop-up__text');
const popUpFiqure = popUpImg.querySelector('.pop-up__fiqure');
const popUpPicture = popUpImg.querySelector('.pop-up__picture');
const templateCard = document.querySelector('#template-card').content;
const elementsList = document.querySelector('.elements__list');

/* FUNCTION FOR POP UP */

function openPopUp(popUpName) {
  popUpName.classList.add('pop-up_opened');
  pageElement.classList.add('page_type_hidden');
  document.addEventListener('keydown', closePopUpByEscape);
}

function closePopUp(popUpName) {
  popUpName.classList.remove('pop-up_opened');
  pageElement.classList.remove('page_type_hidden');
  document.removeEventListener('keydown', closePopUpByEscape);
}

function closePopUpByEscape(event) {
  const openedPopup = document.querySelector('.pop-up_opened');
  if (event.key === 'Escape') {
    closePopUp(openedPopup);
  }
}

/* PROFILE */

profileEditButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  openPopUp(popUpProfile);
  resetImputsErrorMessage(popUpProfile, profileFormConfig);
});

popUpProfileForm.addEventListener('submit', function(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopUp(popUpProfile);
});

/* CARD */

cardAddButton.addEventListener('click', function() {
  openPopUp(popUpCard);
  resetImputsErrorMessage(popUpCard, addFormConfig);
  console.log(addFormConfig.formSelector);
});

popUpCardForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addCard(placeInput.value, linkInput.value);
  clearFormFields(popUpCardForm);
  closePopUp(popUpCard);
});

/* FUNC FOR NEW CARD */

function createCard(title, link) {
  const elementsItem = templateCard.querySelector('.elements__item').cloneNode(true);
  const cardImg = elementsItem.querySelector('.card__img');
  cardImg.alt = title;
  cardImg.src = link;
  cardImg.addEventListener('click', function() {
    popUpPicture.setAttribute('src', this.src);
    popUpPicture.setAttribute('alt', this.alt);
    popUpText.textContent = this.alt;
    openPopUp(popUpImg);
  });
  elementsItem.querySelector('.card__title').textContent = title;
  elementsItem.querySelector('.card__delete').addEventListener('click', function() {
    elementsItem.remove();
  });
  elementsItem.querySelector('.card__like').addEventListener('click', function() {
    this.classList.toggle('card__like_active');
  });
  return elementsItem;
}

function addCard(place, link) {
  const newCard = createCard(place, link);
  renderCard(elementsList, newCard);
}

function renderCard(parent, child) {
  parent.prepend(child);
}

function renderInitialCards() {
  initialCards.forEach(item => {
    addCard(item.name, item.link);
  });
}
renderInitialCards();

/* CLEAR FORM FILDS FUNC */

function clearFormFields(formName) {
  formName.reset();
}

function closeAnyPopUp() {
  const popUps = document.querySelectorAll('.pop-up');
  popUps.forEach(popUp => {
    popUp.addEventListener('mousedown', function(event) {
      if (event.target.classList.contains('pop-up_opened')) {
        clearFormFields(popUpCardForm);
        closePopUp(popUp);
      }
      if (event.target.classList.contains('pop-up__close')) {
        clearFormFields(popUpCardForm);
        closePopUp(popUp);
      }
    });
  });
}
closeAnyPopUp();

enableFormValidation(profileFormConfig);
enableFormValidation(addFormConfig);
