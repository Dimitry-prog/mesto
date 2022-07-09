const profileEditButton = document.querySelector('.profile__edit');
const popUpProfile = document.querySelector('.pop-up_profile');
const popUpOverlay = document.querySelector('.pop-up__overlay');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const pageElement = document.querySelector('.page');
const popUpCard = document.querySelector('.pop-up_card');
const cardAddButton = document.querySelector('.profile__add');
const popUpImg = document.querySelector('.pop-up_img');
const profilePopUpClose = popUpProfile.querySelector('.button_type_close-profile');
const popUpProfileForm = popUpProfile.querySelector('.form_type_profile');
const nameInput = popUpProfileForm.querySelector('.form__input_type_name');
const activityInput = popUpProfileForm.querySelector('.form__input_type_activity');
const popUpCardForm = popUpCard.querySelector('.form_type_card');
const popUpCardClose = popUpCard.querySelector('.button_type_close-card');
const placeInput = popUpCardForm.querySelector('.form__input_type_place');
const linkInput = popUpCardForm.querySelector('.form__input_type_link');
const popUpImgClose = popUpImg.querySelector('.button_type_close-img');
const popUpText = popUpImg.querySelector('.pop-up__text');
const popUpFiqure = popUpImg.querySelector('.pop-up__fiqure');
const popUpPicture = popUpImg.querySelector('.pop-up__picture');
const templateCard = document.querySelector('#template-card').content;
const elementsList = document.querySelector('.elements__list');

function openPopUp(popUpName) {
  popUpName.classList.add('pop-up_opened');
  pageElement.classList.add('page_type_hidden');
}

function closePopUp(popUpName) {
  popUpName.classList.remove('pop-up_opened');
  pageElement.classList.remove('page_type_hidden');
}

profileEditButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  openPopUp(popUpProfile);
});

popUpProfileForm.addEventListener('submit', function(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopUp(popUpProfile);
});

profilePopUpClose.addEventListener('click', function() {
  closePopUp(popUpProfile);
});

cardAddButton.addEventListener('click', function() {
  openPopUp(popUpCard);
});

popUpCardClose.addEventListener('click', function() {
  clearFormFields(popUpCardForm);
  closePopUp(popUpCard);
});

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
  renderCard(elementsList, elementsItem);
}

function addCard(...par) {
  createCard(...par);
}

function renderCard(parent, child) {
  parent.prepend(child);
}

function renderCards() {
  initialCards.forEach(item => {
    addCard(item.name, item.link);
  });
}
renderCards();

function clearFormFields(formName) {
  formName.reset();
}

popUpCardForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addCard(placeInput.value, linkInput.value);
  clearFormFields(popUpCardForm);
  closePopUp(popUpCard);
});

popUpImgClose.addEventListener('click', function() {
  closePopUp(popUpImg);
});
