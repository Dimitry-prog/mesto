const editButton = document.querySelector('.profile__edit');
const popUpProfile = document.querySelector('.pop-up_profile');
const popUpOverlay = document.querySelector('.pop-up__overlay');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const editName = document.querySelector('.form__input_type_name');
const editActivity = document.querySelector('.form__input_type_activity');
const pageElement = document.querySelector('.page');
const closePopUpProfile = document.querySelector('.button_type_close-profile');
const popUpFormProfile = document.querySelector('.form_type_profile');
const popUpCard = document.querySelector('.pop-up_card');
const addCardButton = document.querySelector('.profile__add');
const closePopUpCard = document.querySelector('.button_type_close-card');
const popUpFormCard = document.querySelector('.form_type_card');

const initialCards = [{
    name: 'Порт Баркиз',
    link: 'https://images.unsplash.com/photo-1657030871212-95d863306bed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1889&q=80'
  },
  {
    name: 'Восход в горах',
    link: 'https://images.unsplash.com/photo-1657018982784-d7d573fe2745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
  },
  {
    name: 'Ночной самолет в синем небе',
    link: 'https://images.unsplash.com/photo-1657014826033-bbd8140711db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=754&q=80'
  },
  {
    name: 'Антарктида в цвете',
    link: 'https://images.unsplash.com/photo-1657010896979-c47163861598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Мадридские кусты',
    link: 'https://images.unsplash.com/photo-1657005649208-d1b11532e23f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Пальма?',
    link: 'https://images.unsplash.com/photo-1656143308904-47e95da8009e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80'
  }
];

function togglePopupProfile() {
  popUpProfile.classList.toggle('pop-up_opened');
  pageElement.classList.toggle('page_type_hidden');
}

editButton.addEventListener('click', function() {
  editName.value = profileName.textContent;
  editActivity.value = profileActivity.textContent;
  togglePopupProfile();
});

popUpFormProfile.addEventListener('submit', function(event) {
  event.preventDefault();
  profileName.textContent = editName.value;
  profileActivity.textContent = editActivity.value;
  togglePopupProfile();
});

closePopUpProfile.addEventListener('click', togglePopupProfile);

popUpProfile.addEventListener('click', function(event) {
  if (event.target === popUpProfile) {
    togglePopupProfile();
  }
});

function togglePopupAddCard() {
  popUpCard.classList.toggle('pop-up_opened');
  pageElement.classList.toggle('page_type_hidden');
}

popUpCard.addEventListener('click', function(event) {
  if (event.target === popUpCard) {
    togglePopupAddCard();
  }
});

addCardButton.addEventListener('click', togglePopupAddCard);

closePopUpCard.addEventListener('click', togglePopupAddCard);

function initCards() {
  initialCards.forEach(item => {
    const cardsTemplate = document.querySelector('#template__elements-item').content;
    const elementsItem = cardsTemplate.querySelector('.elements__item').cloneNode(true);
    const card = elementsItem.querySelector('.card');
    card.querySelector('.card__img').src = item.link;
    card.querySelector('.card__title').textContent = item.name;
    const elementsList = document.querySelector('.elements__list');
    elementsItem.append(card);
    elementsList.append(elementsItem);
  });
}
initCards();
