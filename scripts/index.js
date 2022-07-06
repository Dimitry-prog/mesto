const editButton = document.querySelector('.profile__edit');
const popUpProfile = document.querySelector('.pop-up_profile');
const popUpOverlay = document.querySelector('.pop-up__overlay');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const nameInput = document.querySelector('.form__input_type_name');
const activityInput = document.querySelector('.form__input_type_activity');
const pageElement = document.querySelector('.page');
const closePopUpProfile = document.querySelector('.button_type_close-profile');
const popUpFormProfile = document.querySelector('.form_type_profile');
const popUpCard = document.querySelector('.pop-up_card');
const addCardButton = document.querySelector('.profile__add');
const closePopUpCard = document.querySelector('.button_type_close-card');
const popUpFormCard = document.querySelector('.form_type_card');
const placeInput = document.querySelector('.form__input_type_place');
const linkInput = document.querySelector('.form__input_type_link');

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

function togglePopUp(popUpName) {
  popUpName.classList.toggle('pop-up_opened');
  pageElement.classList.toggle('page_type_hidden');
}

editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  togglePopUp(popUpProfile);
});

popUpFormProfile.addEventListener('submit', function(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  togglePopUp(popUpProfile);
});

closePopUpProfile.addEventListener('click', function() {
  togglePopUp(popUpProfile);
});

popUpProfile.addEventListener('click', function(event) {
  if (event.target === popUpProfile) {
    togglePopUp(popUpProfile);
  }
});

popUpCard.addEventListener('click', function(event) {
  if (event.target === popUpCard) {
    togglePopUp(popUpCard);
  }
});

addCardButton.addEventListener('click', function() {
  togglePopUp(popUpCard);
});

closePopUpCard.addEventListener('click', function() {
  togglePopUp(popUpCard);
});

function templateElementsItem(title, link) {
  const cardsTemplate = document.querySelector('#template__elements-item').content;
  const elementsItem = cardsTemplate.querySelector('.elements__item').cloneNode(true);
  const card = elementsItem.querySelector('.card');
  card.querySelector('.card__img').src = link;
  card.querySelector('.card__img').alt = title;
  card.querySelector('.card__title').textContent = title;
  const elementsList = document.querySelector('.elements__list');
  elementsItem.append(card);
  elementsList.prepend(elementsItem);
}

function initCards() {
  initialCards.forEach(item => {
    templateElementsItem(item.name, item.link)
  });
}
initCards();

function addCard() {
  templateElementsItem(placeInput.value, linkInput.value);
}

popUpFormCard.addEventListener('submit', function(event) {
  event.preventDefault();
  addCard();
  togglePopUp(popUpCard);
});

function likeCards() {
  const cardLikes = document.querySelectorAll('.card__like');
  cardLikes.forEach(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('card__like_active');
    });
  });
}
likeCards();

function deleteCard() {
  const deleteCards = document.querySelectorAll('.card__delete');
  deleteCards.forEach(item => {
    item.addEventListener('click', function() {
      this.parentElement.parentElement.remove();
    });
  })
};

deleteCard();
