const profileEditButton = document.querySelector('.profile__edit');
const popUpProfile = document.querySelector('.pop-up_profile');
const popUpOverlay = document.querySelector('.pop-up__overlay');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const nameInput = document.querySelector('.form__input_type_name');
const activityInput = document.querySelector('.form__input_type_activity');
const pageElement = document.querySelector('.page');
const profilePopUpClose = document.querySelector('.button_type_close-profile');
const popUpProfileForm = document.querySelector('.form_type_profile');
const popUpCard = document.querySelector('.pop-up_card');
const cardAddButton = document.querySelector('.profile__add');
const popUpCardClose = document.querySelector('.button_type_close-card');
const popUpCardForm = document.querySelector('.form_type_card');
const placeInput = document.querySelector('.form__input_type_place');
const linkInput = document.querySelector('.form__input_type_link');
const popUpImg = document.querySelector('.pop-up_img');
const popUpImgClose = document.querySelector('.button_type_close-img');
const templateCard = document.querySelector('#template-card').content;
const elementsList = document.querySelector('.elements__list');
const popUpText = document.querySelector('.pop-up__text');
const popUpFiqure = document.querySelector('.pop-up__fiqure');

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
  clearInputFields(placeInput, linkInput);
  closePopUp(popUpCard);
});

function createImgElement(src, alt) {
  const bigImg = document.createElement('img');
  bigImg.src = src;
  bigImg.alt = alt;
  bigImg.classList.add('pop-up__picture');
  popUpFiqure.insertAdjacentElement('afterbegin', bigImg);
}

function addCard(title, link) {
  const elementsItem = templateCard.querySelector('.elements__item').cloneNode(true);
  const cardImg = elementsItem.querySelector('.card__img');
  cardImg.alt = title;
  cardImg.src = link;
  cardImg.addEventListener('click', function() {
    createImgElement(cardImg.src, cardImg.alt);
    popUpText.textContent = this.alt;
    openPopUp(popUpImg);
  });
  elementsItem.querySelector('.card__title').textContent = title;
  elementsItem.querySelector('.card__delete').addEventListener('click', function() {
    this.closest('.elements__item').remove();
  });
  elementsItem.querySelector('.card__like').addEventListener('click', function() {
    this.classList.toggle('card__like_active');
  });
  elementsList.prepend(elementsItem);
}

function renderCards() {
  initialCards.forEach(item => {
    addCard(item.name, item.link);
  });
}
renderCards();

function clearInputFields(...par) {
  par.forEach(item => item.value = '');
}

popUpCardForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addCard(placeInput.value, linkInput.value);
  clearInputFields(placeInput, linkInput);
  closePopUp(popUpCard);
});

popUpImgClose.addEventListener('click', function() {
  const popUpPicture = document.querySelector('.pop-up__picture');
  popUpPicture.remove();
  closePopUp(popUpImg);
});
